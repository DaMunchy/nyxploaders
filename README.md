# NyxUploader Server

A simple file upload server built with Express and Multer. Useful for uploading files from web frontends or bots like WhatsApp (Baileys).

## 🚀 Features

- Upload single file via POST `/api/upload`
- Automatically saves file to `/uploads/` folder
- Returns a public URL to access the uploaded file
- CORS enabled

---

## 🛠 Installation

```bash
git clone https://github.com/yourusername/nyx-uploader.git
cd nyx-uploader
npm install
node index.js

Server will run on http://localhost:8000 by default.
```



## 📤 Upload API

POST /api/upload
Form field: file (type: multipart/form-data)

## ✅ Example curl:

curl -F "file=@yourfile.png" http://localhost:8000/api/upload

## ✅ Example response:
```bash
{
  "url": "http://localhost:8000/uploads/abc123.png"
}
```

## 🌐 Example Web Usage (HTML + JS)

<form id="uploadForm">
  <input type="file" name="file" />
  <button type="submit">Upload</button>
</form>

<script>
document.getElementById('uploadForm').onsubmit = async (e) => {
  e.preventDefault();
  const file = e.target.file.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://localhost:8000/api/upload', {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  console.log('File URL:', data.url);
};
</script>

## 🤖 Example Bot Usage

const axios = require('axios');
const fs = require('fs');

async function uploadAndSend(sock, jid, path) {
  const form = new FormData();
  form.append('file', fs.createReadStream(path));

  const res = await axios.post('http://localhost:8000/api/upload', form, {
    headers: form.getHeaders()
  });

  const fileUrl = res.data.url;

  await sock.sendMessage(jid, {
    text: `File uploaded: ${fileUrl}`
  });
}

> Replace http://localhost:8000 with your hosted server if deployed (e.g. Railway)




---

🌍 Deploy

You can deploy to Railway, Render, or any VPS. Just make sure to allow public access to /uploads.


---

📝 License

MIT

---

Kalau lo mau, gw bisa bantu buatin file `README.md` beneran dan kasih teks siap di-copy atau langsung auto-push ke GitHub repo lo. Mau lanjut ke situ?

