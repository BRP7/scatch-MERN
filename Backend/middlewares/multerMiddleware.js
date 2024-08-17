import multer from 'multer';

// Configure multer to use a temporary folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination directory for uploaded files
    cb(null, 'temp-uploads/');
  },
  filename: (req, file, cb) => {
    // Set the file name for the uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage });

export default upload;
