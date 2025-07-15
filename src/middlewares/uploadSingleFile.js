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
const uploadSingle = multer({ storage: storage });

export default uploadSingle.single("profile"); // Export the middleware for single file upload
