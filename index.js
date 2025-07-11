const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(cors());
app.use('/uploads', express.static('uploads'));

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) =>
      cb(null, `${Math.random().toString(36).substring(2, 8)}${path.extname(file.originalname)}`)
  })
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `https://${req.get('host')}/uploads/${req.file.filename}` });
});
app.get('/', (req, res) => {
  res.send('NyxUploader Server is Live 🔥');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Uploader running on http://0.0.0.0:${PORT}`);
});
