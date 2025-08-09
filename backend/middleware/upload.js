const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate cryptographically secure filename
    const randomName = crypto.randomBytes(16).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + '-' + randomName + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Strict file type validation
  const allowedMimeTypes = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg', 
    'image/png': '.png',
    'image/gif': '.gif',
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx'
  };
  
  const ext = path.extname(file.originalname).toLowerCase();
  const expectedExt = allowedMimeTypes[file.mimetype];
  
  // Check both mimetype and extension match
  if (expectedExt && ext === expectedExt) {
    // Additional security: check file size
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return cb(new Error('File too large (max 10MB)'));
    }
    return cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${Object.values(allowedMimeTypes).join(', ')}`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  }
});

module.exports = upload;