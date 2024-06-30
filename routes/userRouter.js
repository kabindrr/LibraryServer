import express from "express";
import { addUser, getUser } from "../model/userModal.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  console.log("some message received from frontend", req.body);
  const result = await addUser(req.body);

  res.json({
    result,
    message: "Following user has been added to the database",
  });
});

userRouter.get("/", async (req, res) => {
  const result = await getUser(req.body);

  res.json({
    result,
    message: "Here is the user you are looking for",
  });
});
