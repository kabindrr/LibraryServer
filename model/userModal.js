import userSchema from "./userSchema.js";

// create
export const addUser = (item) => {
  return userSchema(item).save();
};

// read
export const getUser = () => {
  return userSchema.findById();
};

// update
export const updateUser = () => {
  return userSchema.findByIdAndUpdate();
};

// delete
export const deleteUser = () => {
  return userSchema.findByIdAndDelete();
};
