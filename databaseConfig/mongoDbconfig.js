import mongoose from "mongoose";

const uri = process.env.MongoDbConfig;

export const connectMongoDb = () => {
  try {
    mongoose.connect(uri);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log(error.message);
  }
};
