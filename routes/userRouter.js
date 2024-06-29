import express from "express";
import { addUser } from "../model/userModal.js";

export const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  console.log("some message received from frontend", req.body);
  const result = await addUser(req.body);

  res.json({
    result,
    message: "Following user has been added to the database",
  });
});
