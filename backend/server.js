const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Render requires process.env.PORT
const DELETE_AFTER_MS = 30 * 60 * 1000; // 30 minutes
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

app.use(cors({ origin: '*' }));
app.use(express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
}).array('files', 10); // Allow up to 10 files

app.get('/files/:filename', (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found.' });
  }
});

app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading files.', error: err });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const zipFileName = `batch-${Date.now()}.zip`;
    const zipFilePath = path.join(UPLOAD_DIR, zipFileName);
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      res.json({
        message: 'Files uploaded successfully!',
        files: req.files.map(file => ({
          name: file.originalname,
          size: file.size,
          type: file.mimetype
        })),
        zipUrl: `/files/${zipFileName}`
      });

      setTimeout(() => {
        deleteFiles([...req.files.map(f => path.join(UPLOAD_DIR, f.filename)), zipFilePath]);
      }, DELETE_AFTER_MS);
    });

    archive.on('error', (err) => {
      console.error('ZIP Error:', err);
      res.status(500).json({ message: 'Error creating zip file.' });
    });

    archive.pipe(output);
    req.files.forEach(file => archive.file(file.path, { name: file.originalname }));
    archive.finalize();
  });
});

function deleteFiles(files) {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlink(file, (err) => {
        if (err) console.error(`Error deleting file ${file}:`, err);
      });
    }
  });
}

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});