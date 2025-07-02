const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { randomBytes } = require('crypto');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use('/uploads', express.static('uploads'));

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (_, file, cb) =>
      // Generate random filename to avoid collisions
      // This also strips original file name from the URL
      // Final URL will look like: /uploads/abc123.png instead of /uploads/original-name.png
      // If you want to keep original names, replace this with:
      // cb(null, file.originalname)
      cb(null, `${Math.random().toString(36).substring(2, 8)}${path.extname(file.originalname)}`)
  })
});


app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: `https://${req.get('host')}/uploads/${req.file.filename}` });
});

app.listen(PORT, () => console.log(`Uploader running at http://localhost:${PORT}`));
