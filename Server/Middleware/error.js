const ErrorHandler = require("../Utils/errorHandler");
const asyncError = require("./tryCatchAsyncError");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const error = (err, req, res, next) => {
  console.log("err", err);
  err.statusCode = err.statusCode || 500;
  let error = { ...err };
  error.message = err.message;
  if (err.name === "CastError") {
    const message = `Id is incorrect for path ${err.path}`;
    error = new ErrorHandler(message, 404);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  // Handling Mongoose duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // Handling wrong JWT error
  console.log(err.name, "err.name");
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    error = new ErrorHandler(message, 400);
  }

  // Handling Expired JWT error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try Again!!!";
    error = new ErrorHandler(message, 400);
  }
  console.log(error);
  res.status(error.statusCode).json({
    success: false,
    error,
    stack: error.stack,
    message: error.message,
  });
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unkown Endpoint" });
};

const auth = asyncError(async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return next(new ErrorHandler("Authorization denied", 401));
  }
  const decodeToken = jwt.verify(token, SECRET);
  if (!decodeToken.id) {
    return next(new ErrorHandler("Authorization denied 2", 401));
  }
  req.user = decodeToken.id;
  next();
});
module.exports = { error, unknownEndpoint, auth };
