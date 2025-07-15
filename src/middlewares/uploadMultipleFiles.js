import multer from "multer";

// uploading multiple files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/userProfile"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname); // Rename file
  },
});
const uploadMultiple = multer({ storage: storage });

export default uploadMultiple.array("postImages", 10);
