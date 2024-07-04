import express from "express";
import { addUser, getUser } from "../model/userModal.js";
import { hashPassword } from "../utils/bcrypt.js";

const userRouter = express.Router();

// signup
userRouter.post("/signup", async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  const result = await addUser(req.body);

  result?._id
    ? res.json({
        status: "success",
        message: "Following user has been added to the database",
      })
    : res.json({
        status: "error",
        message: "eeError message",
      });
});

//login
userRouter.post("/login", async (req, res) => {
  const result = await getUser(req.body);

  res.json({
    result,
    message: "Here is the user you are looking for",
  });
});

export default userRouter;
