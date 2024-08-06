import express from "express";
import upload from "../utils/multer.js";
const imageRouter = express.Router();

// upload image route
imageRouter.post("/", upload.array("images", 4), (req, res) => {
  try {
    // iterate the req.file and get an array of filepath of all the files
    // save filepath in mongo
    const imagePathArray = req.files?.map((item) =>
      item.path.replace("public\\image\\", "")
    );

    console.log(imagePathArray);

    res.json({
      message: "Checking",
      imageURL: imagePathArray,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default imageRouter;
