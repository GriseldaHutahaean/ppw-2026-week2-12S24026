# Portofolio Dinamis & Layanan Interaktif
**Mata Kuliah:** 12S3101 - Pemrograman dan Pengujian Aplikasi Web (Minggu 04)  
**Program Studi:** S1 Sistem Informasi, Fakultas Informatika dan Teknik Elektro  
**Institusi:** Institut Teknologi Del, Sitoluama, Laguboti, Sumatera Utara  

---

## 👤 Identitas Mahasiswa

| Atribut | Informasi Mahasiswa |
| :--- | :--- |
| **Nama Lengkap** | Griselda Tabitha Nathania Hutahaean |
| **NIM** | 12S24026 |
| **Program Studi** | S1 Sistem Informasi |
| **Kelas / Angkatan** | SI 2024 |
| **Repositori GitHub** | [ppw-2026-week2-12S24026](https://github.com/GriseldaHutahaean/ppw-2026-week2-12S24026) |
| **URL GitHub Pages** | [https://GriseldaHutahaean.github.io/ppw-2026-week2-12S24026/](https://GriseldaHutahaean.github.io/ppw-2026-week2-12S24026/) (status deployment belum diverifikasi) |

---

## 📌 Ringkasan Proyek

Portofolio satu halaman ini menampilkan profil akademik, karya, keahlian, dan layanan konsultasi. Proyek mempertahankan identitas visual portofolio sebelumnya, sekaligus mengubah konten utama menjadi aplikasi sisi-klien yang mengambil data dari berkas JSON dan merendernya secara dinamis.

Desain memakai tema **Coastal Midnight Luxe** dan tipografi Plus Jakarta Sans. Foto profil dipakai pada kartu profil; kartu proyek tidak menggunakan gambar.

## Arsitektur

| Tier | Berkas | Tanggung jawab |
| :--- | :--- | :--- |
| Presentasi | `index.html`, `style.css`, `css/custom-style.css` | Struktur halaman, gaya, keadaan UI, dan responsivitas. |
| Aplikasi | `js/app.js` | Mengambil state, merender konten, menangani filter, modal, formulir, dan notifikasi pesanan. |
| Data | `data/profile.json`, `data/projects.json`, `data/services.json` | Sumber data profil, proyek, dan layanan. |
| Data access | `js/api-service.js` | Mengambil JSON melalui Fetch API dan memproses simulasi submit secara asynchronous. |

`app.js` memuat data JSON dengan `async/await` dan `Promise.all`. Halaman perlu dijalankan melalui HTTP lokal atau hosting statis agar permintaan `fetch()` ke berkas JSON dapat berfungsi.

---

## Fitur dan Spesifikasi

### 1. Struktur Semantik HTML5 (Bobot 20%)
* ✅ **`<header>`**: Berisi identitas monogram merek `GH.` dan navigasi situs yang sticky dengan efek *frosted glass backdrop-blur*.
* ✅ **`<nav>`**: Mengelompokkan tautan navigasi primer (`#tentang`, `#keahlian`, `#portofolio`, `#metodologi`, `#layanan`).
* ✅ **`<main id="konten-utama">`**: Kontainer tunggal pembungkus seluruh konten inti halaman.
* ✅ **Minimal 3 Buah `<section>` Tematik**:
  1. `<section id="tentang">`: Ringkasan profil naratif dan 3 pilar visi profesional.
  2. `<section id="keahlian">`: Galeri keahlian terstruktur dalam 4 pilar kompetensi.
  3. `<section id="portofolio">`: Showcase proyek unggulan, tabel semantik rekapitulasi, dan metodologi siklus proyek.
  4. `<section id="layanan">`: Formulir pemesanan layanan konsultasi resmi.
* ✅ **`<aside>`**: Snapshot profil eksekutif sampingan mandiri dengan metrik IPK, kampus Del, dan daftar deskripsi `<dl>` untuk kontak cepat.
* ✅ **`<footer>`**: Penutup dokumen memuat identitas hak cipta, legalitas, navigasi sekunder, dan tautan jejaring sosial.
* ✅ **Tanpa *Div-Soup***: Memaksimalkan elemen semantik seperti `<article>`, `<time>`, `<dl>`, `<dt>`, `<dd>`, `<fieldset>`, `<legend>`, `<header>`, `<ul>`, dan `<ol>`.

### 2. Penyajian Data Tabular & Lists (Bobot 15%)
* ✅ **Tabel Data Semantik Lengkap**:
  * Elemen `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`.
  * Atribut eksplisit `scope="col"` pada seluruh kolom header dan `scope="row"` pada penomoran baris.
  * Menyajikan 5 riwayat capaian proyek komprehensif lengkap dengan peran, domain, teknologi, tahun, dan badge status.
  * Responsif dengan kontainer pembungkus `table-responsive-wrapper` yang mendukung *horizontal scroll* pada layar kecil.
* ✅ **Minimal Dua Jenis HTML Lists**:
  * `<ul>`: Tag pills keahlian, deliverables proyek, dan navigasi footer.
  * `<ol>`: Metodologi 5 tahapan siklus pengembangan proyek secara berurutan.
  * `<dl>`: Daftar deskripsi metadata profil pada komponen `<aside>`.

### 3. Formulir Interaktif & Accessible (Bobot 20%)
* ✅ **Dikelompokkan dengan Minimal 2 Blok `<fieldset>` & `<legend>`**:
  * **Blok 01**: Informasi Identitas & Kontak Pemohon.
  * **Blok 02**: Spesifikasi Layanan & Rincian Konsultasi.
* ✅ **Memuat 8 Tipe Kontrol Input Lengkap**:
  1. `text`: Nama Lengkap (`#input-nama`) & Asal Institusi (`#input-institusi`)
  2. `email`: Alamat Email Resmi (`#input-email`)
  3. `tel`: Nomor Telepon / WhatsApp Aktif (`#input-telepon`)
  4. `select`: Pilihan Topik Layanan (`#select-topik`)
  5. `date`: Perkiraan Tanggal Konsultasi (`#input-tanggal`)
  6. `number`: Estimasi Durasi Konsultasi (`#input-durasi`)
  7. `radio`: Preferensi Moda Diskusi (`#mode-daring`, `#mode-luring`)
  8. `textarea`: Deskripsi Kebutuhan Proyek (`#textarea-pesan`)
  9. `checkbox`: Persetujuan Privasi & Verifikasi Data (`#checkbox-persetujuan`)
* ✅ **Keterhubungan Label Eksplisit**: Seluruh kontrol input memiliki pasangan `<label for="...">` eksplisit dengan `id` unik.
* ✅ **Validasi Native & Aksesibilitas WCAG 2.2 AA**:
  * Atribut `required`, `pattern`, `min`, `max`, `placeholder`.
  * Atribut `aria-describedby` terhubung ke elemen petunjuk bantuan (`.field-hint`).
  * Visible focus ring berkontras tinggi (3.5px ring coastal cyan glow) pada keadaan `:focus` dan `:focus-visible`.
  * Dapat dinavigasikan sepenuhnya menggunakan papan ketik (*keyboard accessible*).

### 4. Estetika & Tata Letak Modern CSS (Bobot 25%)
* ✅ **CSS modular**: Gaya dasar dan tata letak berada di `style.css`; gaya komponen dinamis berada di `css/custom-style.css`.
* ✅ **Universal Box Sizing Reset**: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
* ✅ **Penerapan Rumus Harmonisasi Warna 60-30-10 (Coastal Midnight Luxe)**:
  * **60% Dominan**: Latar belakang deep oceanic midnight (`#0a111e`) dan coastal midnight slate (`#101c2e`) dengan aksen *radial bioluminescent cyan & seafoam glow*.
  * **30% Struktural & Kontras**: Tipografi moonlit white dan silver (`#f1f5f9`, `#cbd5e1`) dengan batas marine transparan (`rgba(56, 189, 248, 0.14)`).
  * **10% Aksen Gradasi Coastal Midnight**: Gradasi biru samudra, cyan elektrik, dan seafoam teal (`linear-gradient(135deg, #0284c7, #0ea5e9, #06b6d4, #14b8a6)`) pada tombol aksi, header tabel, badge, avatar ring, dan nomor langkah metodologi.
* ✅ **Tipografi & Tampilan Visual**: Font *Plus Jakarta Sans* & *JetBrains Mono*, sudut membulat halus (`border-radius: 8px - 24px`), bayangan lembut bernuansa coastal glow (*diffused soft shadow*), serta transisi interaktif bebas getaran.
* ✅ **Tata Letak Flexbox & CSS Grid**: Pengorganisasian komponen hero dua kolom, kartu profil dengan foto, grid kartu keahlian, grid proyek tanpa gambar, dan formulir.
* ✅ **Desain Responsif Media Queries**: Menggunakan breakpoint `@media (max-width: 992px)`, `@media (max-width: 768px)`, dan `@media (max-width: 480px)`.
* ✅ **Preferensi Gerak Aksesibel**: `@media (prefers-reduced-motion: reduce)` untuk kenyamanan pengguna sensitif animasi.

### 5. Alur Pemesanan dan Notifikasi
* Tombol **Pilih layanan** memilih topik terkait, menggulir langsung ke formulir, dan memfokuskan kolom nama.
* Formulir diproses secara asynchronous. Pesan sukses atau gagal ditampilkan di dekat formulir setelah submit; tidak ada notifikasi yang muncul otomatis saat halaman dibuka.
* Setelah submit berhasil, pesanan ditambahkan ke badge lonceng. Lonceng membuka daftar pesanan terbaru dan detail seluruh field formulir.
* Pesanan disimpan pada `localStorage` dengan key `portfolio_service_orders`, sehingga tetap tersedia setelah reload di browser yang sama.
* **Batas penyimpanan:** `localStorage` hanya tersedia pada browser/perangkat tersebut. Implementasi ini tidak mengirim pesanan ke server atau menyinkronkannya untuk pengunjung lain. Data formulir contoh atau sensitif sebaiknya tidak dimasukkan ke situs publik tanpa backend yang sesuai.

### 6. Pengelolaan dan Deployment
* Repositori menggunakan berkas HTML, CSS, JavaScript ES modules, dan JSON statis.
* GitHub Pages dapat digunakan untuk hosting statis, tetapi status deployment URL pada tabel identitas belum diverifikasi dalam dokumentasi ini.

---

## Struktur Berkas Proyek

```text
.
├── index.html
├── style.css
├── css/
│   └── custom-style.css
├── data/
│   ├── profile.json
│   ├── projects.json
│   └── services.json
├── js/
│   ├── api-service.js
│   └── app.js
├── profile.jpg
├── verify.js
├── package.json
├── package-lock.json
└── README.md
```

## Menjalankan Lokal

Jalankan perintah dari direktori proyek:

```powershell
python -m http.server 8000
```

Buka `http://localhost:8000/`. Jangan membuka `index.html` langsung melalui `file://`, karena browser dapat memblokir Fetch API untuk berkas JSON.

Skrip verifikasi browser menggunakan Playwright dan mengharapkan server lokal aktif pada port 8000:

```powershell
npm install
node verify.js
```

Skrip tersebut memeriksa data JSON, jumlah proyek/layanan, waktu pemuatan, dan error browser. Pengukuran performa yang lebih rinci dapat dilakukan melalui tab **Network** dan **Performance** di DevTools; README ini tidak menyertakan hasil benchmark yang belum diukur.
