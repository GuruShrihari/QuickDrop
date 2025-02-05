const express = require('express');
const multer = require('multer');
const cors = require('cors');
const ngrok = require('ngrok');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage,
  limits: { fileSize: 500 * 1024 * 1024 },});

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'uploads')));

// Route to serve uploaded files
app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully!', fileUrl: `/files/${req.file.filename}` });
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Expose the server to the internet using ngrok
  const url = await ngrok.connect(PORT);
  console.log(`Ngrok tunnel created at: ${url}`);
});