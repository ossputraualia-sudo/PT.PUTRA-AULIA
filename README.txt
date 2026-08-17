PAG DOCS FIELD PWA - MODULAR STARTER

BACKEND:
1. Buat Google Spreadsheet baru: PAG_DOCS_PENGAWASAN.
2. Extensions > Apps Script > paste backend/Code.gs.
3. Jalankan setup() satu kali.
4. Deploy sebagai Web App, Execute as Me, akses Anyone.
5. Salin URL Web App backend.

FRONTEND:
1. Isi FIELD_BACKEND_URL di js/core/01_Config.js.
2. Upload folder ini ke GitHub Pages.
3. PWA dapat di-install dari browser.

CATATAN:
06_WebUtamaSync diarahkan ke URL Web Utama yang Anda berikan, tetapi endpoint Web Utama harus memiliki action=fieldMaster agar master Paket/Personil nyata dapat diambil. Struktur adapter sudah dipisahkan agar nanti hanya modul ini yang disesuaikan.
