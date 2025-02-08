const express = require('express');
const multer = require('multer');
const cors = require('cors');
const ngrok = require('ngrok');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const app = express();
const PORT = 5000;
const DELETE_AFTER_MS = 30 * 60 * 1000; // 30 minutes
const UPLOAD_DIR = path.join(__dirname, 'uploads');


app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // Allow all file types
    cb(null, true);
  },
}).array('files', 10); // Allow up to 10 files

app.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found.' });
  }
});

app.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: 'File too large. Maximum size allowed is 500MB.' });
      }
      return res.status(500).json({ message: 'An error occurred while uploading the files.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    const zipFileName = `batch-${Date.now()}.zip`;
    const zipFilePath = path.join(__dirname, 'uploads', zipFileName);
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

      // Schedule file deletion after 30 minutes
      setTimeout(() => {
        deleteFiles([...req.files.map(f => path.join(UPLOAD_DIR, f.filename)), zipFilePath]);
      }, DELETE_AFTER_MS);
      
    });

    

    archive.on('error', (err) => {
      res.status(500).json({ message: 'Error creating zip file.' });
    });

    archive.pipe(output);

    req.files.forEach(file => {
      archive.file(file.path, { name: file.originalname });
    });

    archive.finalize();
  });
});

function deleteFiles(files) {
  files.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
        } else {
          return true;
        }
      });
    }
  });
}


app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    const url = await ngrok.connect(PORT);
    console.log(`Ngrok tunnel created at: ${url}`);
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
});