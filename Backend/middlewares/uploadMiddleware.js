// middleware/upload.js
import multer from 'multer';
import path from 'path';

// Define storage location and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Please upload an image file'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter
});

export default upload;
