import { getToken } from "../model/session/sessionModal.js";
import { getUser } from "../model/userModal.js";
import { verifyAccessJWT } from "../utils/jwt.js";

// function to verify access JWT and return user
export const auth = async (req, res, next) => {
  try {
    // another get method to fetch user
    // 1. take the accessJWT as authorization header
    // 2. verify token
    // 3. get tokenObj from session table
    // 4. if tokenObj has _id, using email get user
    // 5. if user found, attach the user in req
    // 6. send the user back to frontend

    // 1. take the accessJWT as authorization header
    const { authorization } = req.headers;

    // 2. verify token
    const verified = verifyAccessJWT(authorization);

    // 3. extract email if verified and get tokenObj from session table using authorization
    if (verified?.email) {
      const tokenObj = await getToken({
        token: authorization,
      });

      // 4. if tokenObj has _id, using email get user
      if (tokenObj?._id) {
        const user = await getUser({ email: verified?.email });

        // 5. if user found, attach the user in req
        if (user?._id) {
          user.password = undefined;
          user.__v = undefined;
          user.refreshJWT = undefined;

          req.userInfo = user;

          // next middlewares
          return next();
        }
      }
    }

    // error: message
    res.json({
      status: "error",
      message: verified,
    });
  } catch (error) {
    console.log("Error form auth", error);
    res.json({
      status: "error",
      message: error,
    });
  }
};
