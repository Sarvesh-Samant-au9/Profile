require("dotenv").config({
  path: "./config/.env",
});
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const connectDB = require("./Config/db");
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
app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
