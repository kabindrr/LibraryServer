import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  token: {
    type: String,
    required: true,
  },
  associate: {
    type: String,
    default: "",
  },
});

export default mongoose.model("SessionList", schema);
