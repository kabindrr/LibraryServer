import express from "express";
import cors from "cors";
import morgan from "morgan";
//import userRouter from "./routes/userRouter.js";
import { connectMongoDb } from "./src/databaseConfig/mongoDbconfig.js";
import routes from "./src/routes/routers.js";
import filePath from "path";

const app = express();
const PORT = 8010;

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Database connection
connectMongoDb();

// route to read/access static files/images/css directly from server
const __dirname = filePath.resolve();
console.log(filePath.join(__dirname, "public/image"));
app.use(express.static(filePath.join(__dirname, "public/image")));

// app.use("/api/v1/users", userRouter);
routes.map(({ path, middlewawers }) =>
  app.use(
    path,
    middlewawers.map((item) => item)
  )
);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Server Online",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log("server error")
    : console.log(`server connected at ${PORT}`);
});
