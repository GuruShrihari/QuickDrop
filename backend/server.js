const express = require('express');
const multer = require('multer');
const cors = require('cors');
const ngrok = require('ngrok');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const cron = require('node-cron'); // Added cron
const app = express();
const PORT = 5000;
const DELETE_AFTER_MS = 30 * 60 * 1000; // 30 minutes
const UPLOAD_DIR = path.join(__dirname, 'uploads');

app.use(cors({ origin: '*' }));
app.use(express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
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
}).array('files', 10);

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
      return res.status(500).json({ message: 'File upload error.', error: err.message });
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

// Cron job runs every minute to delete old files
cron.schedule('* * * * *', () => {
  console.log('Running cron job to clean up old files...');
  const now = Date.now();

  fs.readdir(UPLOAD_DIR, (err, files) => {
    if (err) {
      console.error('Error reading upload directory:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(UPLOAD_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for file ${file}:`, err);
          return;
        }

        if (now - stats.ctimeMs > DELETE_AFTER_MS) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}:`, err);
            } else {
              console.log(`Deleted old file: ${file}`);
            }
          });
        }
      });
    });
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    const url = await ngrok.connect(PORT);
    console.log(`Ngrok tunnel created at: ${url}`);
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
});
