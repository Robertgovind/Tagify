import multer from "multer";
// uploadin single file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/userProfile"); // Save files in 'uploads' folder
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
const uploadSingle = multer({ storage: storage, fileFilter: fileFilter });

export default uploadSingle.single("profile"); // Export the middleware for single file upload
