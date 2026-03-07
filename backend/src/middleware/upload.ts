import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure uploads directory exists
const UPLOADS_DIR = 'uploads/';
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Better Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * Math.pow(10, 9));
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + (file.originalname || 'file'));
  }
});

export const upload = multer({ storage: storage });
