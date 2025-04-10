Untuk membuat body request di Postman yang sesuai dengan kode backend Anda (yang menggunakan connectOrCreate untuk kategori dan tag), Anda perlu mengirimkan data dalam format JSON. Berikut adalah beberapa contoh struktur body request, tergantung pada skenario yang ingin Anda uji:

Skenario 1: Membuat Produk Baru dan Menghubungkan ke Kategori/Tag yang Sudah Ada (Berdasarkan ID)

Dalam skenario ini, Anda tahu ID kategori dan tag yang sudah ada di database.

JSON

{
  "name": "Produk Digital Spesial",
  "description": "Produk ini sangat spesial dan hanya tersedia terbatas.",
  "price": 499000,
  "image": "https://example.com/special-product.jpg",
  "categories": [
    { "id": 1 }, // Menghubungkan ke kategori dengan ID 1
    { "id": 3 }  // Menghubungkan ke kategori dengan ID 3
  ],
  "tags": [
    { "id": 5 }, // Menghubungkan ke tag dengan ID 5
    { "id": 7 }  // Menghubungkan ke tag dengan ID 7
  ]
}
Skenario 2: Membuat Produk Baru dan Membuat Kategori/Tag Baru (Berdasarkan Nama)

Dalam skenario ini, Anda ingin membuat kategori atau tag baru jika belum ada.

JSON

{
  "name": "Produk Inovatif Lainnya",
  "description": "Produk ini memiliki fitur inovatif.",
  "price": 349000,
  "image": "https://example.com/inovatif.jpg",
  "categories": [
    { "name": "Alat Produktivitas" }, // Membuat kategori "Alat Produktivitas" jika belum ada
    { "name": "Software" }          // Membuat kategori "Software" jika belum ada
  ],
  "tags": [
    { "name": "Efisiensi" },      // Membuat tag "Efisiensi" jika belum ada
    { "name": "Work From Home" } // Membuat tag "Work From Home" jika belum ada
  ]
}
Skenario 3: Membuat Produk Baru dan Mencampur Menghubungkan yang Sudah Ada dengan Membuat yang Baru

Ini adalah skenario yang paling umum, di mana Anda mungkin ingin menghubungkan ke beberapa kategori/tag yang sudah ada berdasarkan ID, dan membuat yang lain berdasarkan nama jika belum ada.

JSON

{
  "name": "Produk Kombinasi",
  "description": "Produk ini menggabungkan berbagai elemen.",
  "price": 599000,
  "image": "https://example.com/kombinasi.jpg",
  "categories": [
    { "id": 2 },                // Menghubungkan ke kategori dengan ID 2
    { "name": "Template Desain" } // Membuat kategori "Template Desain" jika belum ada
  ],
  "tags": [
    { "id": 6 },            // Menghubungkan ke tag dengan ID 6
    { "name": "Siap Pakai" } // Membuat tag "Siap Pakai" jika belum ada
  ]
}
Penting untuk Diperhatikan dalam Body Request:

name, description, price, image: Ini adalah field dasar untuk produk. Pastikan Anda menyediakan nilai yang sesuai.
categories: Ini adalah array objek. Setiap objek di dalam array dapat memiliki properti:
id: Jika Anda ingin menghubungkan ke kategori yang sudah ada (kirimkan ID integer kategori).
name: Jika Anda ingin membuat kategori baru (kirimkan nama string kategori). Prisma akan mencoba mencari berdasarkan id terlebih dahulu. Jika id tidak ada atau tidak ditemukan, Prisma akan mencoba mencari berdasarkan name. Jika name tidak ditemukan, kategori baru akan dibuat.
tags: Ini juga merupakan array objek dengan logika yang sama seperti categories untuk menghubungkan atau membuat tag.
Langkah-langkah di Postman:

Buat request POST ke endpoint /products Anda.
Pilih tab "Body".
Pilih format "raw" dan tipe "JSON".
Salin salah satu contoh JSON di atas (atau sesuaikan dengan kebutuhan Anda) ke dalam body request.
Klik "Send".
Pastikan server backend Anda berjalan dan database Anda terhubung dengan benar. Jika berhasil, Anda akan menerima respons dengan status 201 Created dan data produk yang baru dibuat.