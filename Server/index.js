require("dotenv").config({
  path: "./Config/.env",
});
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./Routes/authRoutes");
const app = express();
const cloudinary = require("cloudinary");
const connectDB = require("./Config/db");
const { error, unknownEndpoint } = require("./Middleware/error");
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(
  cors({
    origin: "",
    credentials: true,
  })
);
connectDB();

app.use("/api", authRoutes);

app.use(error);
app.use(unknownEndpoint);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});

module.exports = app;
