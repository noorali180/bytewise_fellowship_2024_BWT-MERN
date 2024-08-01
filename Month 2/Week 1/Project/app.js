import express from "express";
import morgan from "morgan";
import userRouter from "./routes/userRoutes.js";

const app = express();

// to parse JSON request bodies
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);

export default app;
