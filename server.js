import express from "express";
import { connectMongoDb } from "./databaseConfig/mongoDbconfig.js";
import cors from "cors";
import morgan from "morgan";
import { userRouter } from "./routes/userRouter.js";

const app = express();
const PORT = 8010;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Database connection
connectMongoDb();

app.use("/", userRouter);

app.listen(PORT, (error) => {
  error
    ? console.log("server error")
    : console.log(`server connected at ${PORT}`);
});
