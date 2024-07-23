import sessionSchema from "./sessionSchema.js";

// create
export const addToken = (item) => {
  return sessionSchema(item).save();
};

// read
export const getToken = (tokenObj) => {
  return sessionSchema.findOne(tokenObj);
};

// // update
// export const updateUser = () => {
//   return userSchema.findByIdAndUpdate();
// };

// delete
export const deleteToken = (_id) => {
  return sessionSchema.findByIdAndDelete(_id);
};
