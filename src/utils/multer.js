import multer from "multer";

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = "public/image";
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

// limit
const limits = {
  fileSize: 1024 * 1024 * 10, // 10MB
};

// filteFilter
// filters
const multerFilters = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // file type is acceptable
    cb(null, true);
  } else {
    const err = new Error("Invalid file type, Only JPEG and PNG allowed.");
    cb(err, false);
  }
};

// configure multer and export
const upload = multer({ storage, limits, fileFilter: multerFilters });

export default upload;
