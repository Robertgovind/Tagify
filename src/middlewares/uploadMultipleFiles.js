import multer from "multer";

// uploading multiple files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/postImages"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname); // Rename file
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only images are allowed!"), false); // Reject file
  }
};
const uploadMultiple = multer({ storage: storage, fileFilter: fileFilter });

export default uploadMultiple.array("postImages", 10);
