// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to file name
  }
});

const upload = multer({ storage: storage });

// Endpoint for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'Upload OK', file: `/uploads/${req.file.filename}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
