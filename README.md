# DWP Internet Package Store

Prototype frontend e-commerce untuk pembelian paket data internet, dibuat sebagai pengerjaan technical test Frontend Developer.

## Live Demo

- **Frontend (Vercel)**: https://dwp-internet-package-store.vercel.app
- **Mock API (Render)**: https://dwp-internet-package-store.onrender.com

> ⚠️ Mock API menggunakan Render free tier — mungkin perlu **30–50 detik** untuk wake up jika sedang tidak aktif.

## Deskripsi Singkat

Aplikasi ini menyediakan dashboard pelanggan untuk login, melihat ringkasan akun, membeli paket internet, melihat riwayat transaksi, serta halaman manajemen data customer (CRUD). Backend disimulasikan menggunakan `json-server` yang di-deploy di Render sebagai mock REST API.

## Tech Stack

- React 19 + Vite
- TypeScript
- Material UI (MUI) v6
- React Router DOM v7
- Axios
- json-server 0.17 (mock API, deployed di Render)

## Fitur

- **Login Page** — Login dummy menggunakan email & password dari `json-server`, data customer disimpan di `localStorage`, dengan validasi & pesan error.
- **Dashboard Page** — Ringkasan profil customer, total transaksi, transaksi berhasil, transaksi pending, total pengeluaran, dan rekomendasi paket internet.
- **Internet Packages Page** — Daftar paket internet dalam bentuk card (nama, provider, kuota, masa aktif, harga, deskripsi) dengan tombol "Beli Paket" yang membuat transaksi baru (status `pending`) via POST request.
- **Transactions Page** — Riwayat transaksi customer yang sedang login, lengkap dengan badge status berwarna (success/pending/failed) dan filter berdasarkan status.
- **Customers Page** — Daftar customer dengan fitur CRUD penuh (create, update, delete) menggunakan dialog/modal MUI.

## Cara Instalasi

```bash
npm install
```

## Cara Menjalankan Mock API (lokal)

Mock API berjalan di `http://localhost:3001` menggunakan data dari `db.json`.

```bash
npm run mock
```

## Cara Menjalankan Frontend (lokal)

Jalankan di terminal terpisah (pastikan mock API sudah berjalan):

```bash
npm run dev
```

Buka aplikasi di `http://localhost:5173`.

## Akun Login Dummy

```
Email    : passyah@example.com
Password : 123456
```

Akun lain yang tersedia: `siti@example.com` dan `budi@example.com`, keduanya dengan password `123456`.

## Waktu Pengerjaan

- **Mulai**: 11 Juni 2026, 21:48 WIB
- **Selesai**: 12 Juni 2026, 23:10 WIB

## Catatan & Asumsi

- Login bersifat simulasi: pencocokan email & password dilakukan langsung terhadap data `customers` di `json-server` (tanpa hashing/JWT) karena backend nyata berada di luar cakupan tes ini.
- Pembelian paket otomatis membuat transaksi baru dengan status `pending`, untuk mensimulasikan proses verifikasi pembayaran sebelum status berubah menjadi `success`/`failed` (perubahan status tersebut dapat dilakukan manual di `db.json` untuk demonstrasi).
- "Total Pengeluaran" pada dashboard hanya menjumlahkan transaksi dengan status `success`.
- Halaman Customers menampilkan seluruh data customer (bukan hanya yang sedang login) untuk mendemonstrasikan fitur CRUD secara penuh sesuai permintaan soal.
- Data paket, customer, dan transaksi pada `db.json` adalah data dummy yang dibuat untuk keperluan demonstrasi.
- Mock API di-deploy ke Render (free tier) menggunakan `json-server` agar prototype dapat diakses secara publik tanpa biaya tambahan.
