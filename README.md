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
git clone https://github.com/DaMunchy/nyxploaders.git
cd nyxploaders
npm install
node index.js / npm start
```
Server will run on http://localhost:8000 by default.




## 📤 Upload API

`POST /api/upload`
- Form field: file (type: multipart/form-data)

## ✅ Example curl:
```bash
curl -F "file=@yourfile.png" http://localhost:8000/api/upload
```
## ✅ Example response:
```bash
{
  "url": "http://localhost:8000/uploads/abc123.png"
}
```

## 🌐 Example Web Usage (HTML + JS)
```javascript
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
```
