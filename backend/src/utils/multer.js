import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the temp directory exists
const tempDir = 'temp/';
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir); // Store in the temporary directory
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
