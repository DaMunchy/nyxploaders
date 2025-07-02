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
