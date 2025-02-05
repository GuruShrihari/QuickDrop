const express = require('express');
const multer = require('multer');
const cors = require('cors');
const ngrok = require('ngrok');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware to handle CORS securely
app.use(cors({ origin: '*' }));

// Serve static files from the "uploads" directory
app.use(express.static(path.join(__dirname, 'uploads')));

// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Multer Upload Configuration
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // Limit file size to 500MB
  fileFilter: (req, file, cb) => {
    // Allow only specific file types (e.g., images, PDFs, documents)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, PDF, and TXT files are allowed.'));
    }
  },
});

// Route to serve uploaded files
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);

  // Check if the file exists before sending it
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found.' });
  }
});

// Route to handle file upload
app.post('/upload', (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      // Handle Multer errors (e.g., file size limit exceeded, invalid file type)
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File too large. Maximum size allowed is 500MB.' });
      } else if (err.message === 'Invalid file type. Only JPEG, PNG, PDF, and TXT files are allowed.') {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(500).json({ message: 'An error occurred while uploading the file.' });
      }
    }

    // Ensure a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Return success response with the file URL
    res.json({
      message: 'File uploaded successfully!',
      fileUrl: `/files/${req.file.filename}`,
    });
  });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  try {
    // Expose the server to the internet using ngrok
    const url = await ngrok.connect(PORT);
    console.log(`Ngrok tunnel created at: ${url}`);
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
});