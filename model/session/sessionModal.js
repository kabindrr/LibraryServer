import sessionSchema from "./sessionSchema.js";

// create
export const addToken = (item) => {
  return sessionSchema(item).save();
};

// read
export const getToken = (token) => {
  return sessionSchema.findOne({ token, associate });
};

// // update
// export const updateUser = () => {
//   return userSchema.findByIdAndUpdate();
// };

// // delete
// export const deleteUser = () => {
//   return userSchema.findByIdAndDelete();
// };
