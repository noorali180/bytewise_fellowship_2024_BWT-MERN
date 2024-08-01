const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes.js");

const app = express();

// to parse JSON request bodies
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

module.exports = app;
