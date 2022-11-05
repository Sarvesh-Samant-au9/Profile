const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../Models/user");
const SECRET = process.env.JWT_SECRET;
const ErrorHandler = require("../Utils/errorHandler");
const tryCatchAsyncError = require("../Middleware/tryCatchAsyncError");

// @description
// User Login Controller

const loginUser = tryCatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User not registered", 400));
  }
  const credential = await bcrypt.compare(password, user.password);
  if (!credential) {
    return next(new ErrorHandler("Invalid Credentials", 401));
  }
  const payloadToken = { id: user._id };
  const token = jwt.sign(payloadToken, SECRET);

  res.status(200).json({
    token,
    displayName: user.displayName,
    email: user.email,
  });
});

// @description
// USer Registration
const registerUser = tryCatchAsyncError(async (req, res, next) => {
  const { email, password, displayName } = req.body;
  if (!password || !email || !displayName) {
    return next(new ErrorHandler("All fields are required", 400));
  }
  if (password.length < 6) {
    return next(
      new ErrorHandler("Password should be atleast 6 characters long", 400)
    );
  }

  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Email is not valid", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorHandler("The mail has already been taken", 400));
  }

  const salt = 10;
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({
    displayName,
    email,
    password,
  });

  const savedUser = await user.save();

  const payloadToken = {
    id: savedUser._id,
  };

  const token = jwt.sign(payloadToken, SECRET);

  return res.status(200).json({
    token,
    displayName: savedUser.displayName,
    email: savedUser.email,
  });
});

module.exports = { loginUser, registerUser };
