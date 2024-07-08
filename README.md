# Nama Proyek

Proyek ini untuk final Project BE Hari Senin (kelompok 4) yaitu mengenai coffe shop
-Pandegar Bila Auda
-Muhammad Rifqi. M
-Ferell Geo Atlanta

## Daftar Isi

- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Penggunaan](#penggunaan)
- [API Endpoints](#api-endpoints)
- [Lisensi](#lisensi)

## Instalasi

Langkah-langkah untuk menginstal proyek ini di lingkungan lokal Anda.

```bash
git clone https://github.com/rifqimuzhaffar/marketplace-sederhana-backend.git
cd repo-name
npm install
openssl random -hex 32    -->mengisi JWT
npx prisma migrate dev --name ()
npx prisma migrate deploy
node prisma/seed.js  --build dummy

Konfigurasi
SERVER_PORT = 8000
DATABASE_URL= "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"


Penggunaan
npm Run dev

API Endpoints
Berikut adalah daftar endpoint API yang tersedia dalam proyek ini.

User
GET /api/users - Mendapatkan daftar semua pengguna.
POST /api/users - Membuat pengguna baru.
GET /api/users/ - Mendapatkan detail pengguna berdasarkan ID.
PATCH /api/users/ - Memperbarui informasi pengguna berdasarkan ID.
DELETE /api/users/ - Menghapus pengguna berdasarkan ID.
Product
GET /api/products - Mendapatkan daftar semua produk.
POST /api/products - Membuat produk baru.
GET /api/products/- Mendapatkan detail produk berdasarkan ID.
PATCH /api/products/- Memperbarui informasi produk berdasarkan ID.
DELETE /api/products/- Menghapus produk berdasarkan ID.
Purchase
GET /api/purchases - Mendapatkan daftar semua pembelian.
POST /api/purchases - Membuat pembelian baru.
GET /api/purchases/- Mendapatkan detail pembelian berdasarkan ID.
PATCH /api/purchases/- Memperbarui informasi pembelian berdasarkan ID.
DELETE /api/purchases/- Menghapus pembelian berdasarkan ID.

Lisensi

File `README.md` ini memberikan panduan yang jelas dan komprehensif tentang cara menginstal, mengkonfigurasi, menggunakan, dan berkontribusi pada proyek Anda. Ini juga memberikan struktur proyek yang jelas dan dokumentasi API endpoints yang tersedia.

```
