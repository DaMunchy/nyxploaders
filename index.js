const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

app.use(cors());
app.use(express.static(__dirname)); // Serve root folder as public

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, __dirname),
    filename: (_, file, cb) =>
      cb(null, `${Math.random().toString(36).substring(2, 8)}${path.extname(file.originalname)}`)
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    url: `https://${req.get('host')}/${req.file.filename}`
  });
});

app.get('/', (req, res) => {
  res.send('Nothing here');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Uploader running on http://0.0.0.0:${PORT}`);
});
