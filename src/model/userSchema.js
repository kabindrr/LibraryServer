import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  refreshJWT: {
    type: String,
    default: "",
  },
});
export default mongoose.model("StudentList", userSchema);
