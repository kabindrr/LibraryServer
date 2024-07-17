import userSchema from "./userSchema.js";

// create
export const addUser = (item) => {
  return userSchema(item).save();
};

// read
export const getUser = (filter) => {
  return userSchema.findOne(filter);
};

// update
export const updateUser = (filter, obj) => {
  return userSchema.findOneAndUpdate(filter, obj, { new: true });
};

// delete
export const deleteUser = () => {
  return userSchema.findByIdAndDelete();
};
