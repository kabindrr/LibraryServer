import express from "express";
import { addUser, getUser, updateUser } from "../model/userModal.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  signAccessJWT,
  signRefreshJWT,
  verifyAccessJWT,
} from "../utils/jwt.js";
import {
  addToken,
  deleteToken,
  getToken,
} from "../model/session/sessionModal.js";
import { auth } from "../middlewares/auth.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { emailVerification } from "../utils/nodemailer.js";
import { v4 as uuidv4 } from "uuid";

const userRouter = express.Router();

// signup
userRouter.post("/signup", newUserValidation, async (req, res, next) => {
  req.body.password = hashPassword(req.body.password);
  const result = await addUser(req.body);

  if (result?.id) {
    // unique key
    const uniqueKey = uuidv4();

    // email verification email generator
    await emailVerification(result?.email, result?.fName, uniqueKey);

    // save unique key as token and email as associate in session table which will be used to verify email
    await addToken({ token: uniqueKey, associate: result?.email });

    return res.json({
      status: "success",
      message: "Check email to verify account",
    });
  }

  res.json({
    status: "error",
    message: "eeError message",
  });
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(email);

  //1. get user from db using email as filter(type object)
  const user = await getUser({ email });
  // console.log(user);

  //2. check if the user exist by checking if it has an _id
  if (user?._id) {
    // 3. compare password
    const isPasswordCorrect = comparePassword(password, user.password);

    // 4. if isPasswordCorrect === true, send success message
    return isPasswordCorrect
      ? res.json({
          status: "success",
          message: "User login success",
          //send tokens
          tokens: {
            accessJWT: signAccessJWT(email),
            refreshJWT: signRefreshJWT(email),
          },
        })
      : res.json({
          status: "error",
          message: "Password Incorrect",
        });
  }

  // if error
  res.json({
    status: "error",
    message: "Something didnt add up",
  });
});

// get user profile
userRouter.get("/user-profile", auth, async (req, res, next) => {
  try {
    const user = req.userInfo;

    // for jwt auth
    // const {email} = req.userInfo

    // 6. send the user back to frontend
    return res.json({
      status: "success",
      message: "User Profile Found",
      user,
      // accessJWT: signAccessJWT(email)
    });
  } catch (error) {
    console.log("User Profile Error: ", error);

    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// verify-email routes
// TODO
// 1. get unique and email in req.body
// 2. check if token is present with same unique key as token and email as associate
// 3. update User ==> isEmailVerifiec:true
// 4. delete that token
// 5. notification email saying account verified
// 6. res.json to frontend

userRouter.post("/verify-email", async (req, res, next) => {
  try {
    // 1. get unique and email in req.body
    const { ukey, e } = req.body;

    // 2. check if token is present with same unique key as token and email as associate
    const tokenInSessionTable = await getToken({ token: ukey, associate: e });

    // 3. update User ==> isEmailVerifiec:true
    if (tokenInSessionTable?._id) {
      const updatedUser = await updateUser(
        { email: e },
        { isEmailVerified: true }
      );

      // 4. delete that token
      if (updatedUser?._id) {
        await deleteToken(tokenInSessionTable._id);

        // 6. res.json to frontend
        return res.json({
          status: "success",
          message: "Email Verified, Login Now",
        });
      }
    }

    //if error in verifying token
    res.json({
      status: "error",
      message: "Crowdstrike.....Oh noooooo",
    });
  } catch (error) {
    console.log("User Email Verify Error: ", error);

    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default userRouter;
