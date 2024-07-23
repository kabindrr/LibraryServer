import JWT from "jsonwebtoken";
import { addToken } from "../model/session/sessionModal.js";
import { updateUser } from "../model/userModal.js";

const Access_Secret_Key = "asdfghjkl";
const Refresh_Secret_Key = "xcfghjnhbvfftygvb";

// for access JWT
// 1. sign access
export const signAccessJWT = (email) => {
  const token = JWT.sign({ email }, Access_Secret_Key, {
    expiresIn: "20m",
  });
  // save to session table
  addToken({ token });
  return token;
};

// 2. verify access
export const verifyAccessJWT = (token) => {
  try {
    return JWT.verify(token, Access_Secret_Key);
  } catch (error) {
    return error;
  }
};

//===========================================================================================
// for refresh JWT

// 1. sign refresh
export const signRefreshJWT = (email) => {
  const refreshJWT = JWT.sign({ email }, Refresh_Secret_Key, {
    expiresIn: "20d",
  });

  // update user table, update refresh JWT
  updateUser({ email }, { refreshJWT });
  return refreshJWT;
};

// 2. verify refresh
export const verifyRefreshJWT = (token) => {
  JWT.verify(token, Refresh_Secret_Key);
};
