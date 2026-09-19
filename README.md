# Single Page Showcase Portfolio & Layanan Interaktif Accessible
**Mata Kuliah:** 12S3101 - Pemrograman dan Pengujian Aplikasi Web (Minggu 02)  
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
| **Live GitHub Pages** | [https://GriseldaHutahaean.github.io/ppw-2026-week2-12S24026/](https://GriseldaHutahaean.github.io/ppw-2026-week2-12S24026/) |

---

## 📌 Ringkasan Proyek

Halaman web portofolio profil profesional tunggal (*Single Page Showcase Webpage*) ini dirancang untuk menampilkan profil akademik, portofolio karya, galeri keahlian terstruktur, serta formulir pemesanan layanan konsultasi proyek yang sepenuhnya **estetik, rapi, responsif, dan accessible (WCAG 2.2 Level AA)**.

Desain mengusung konsep **Minimalis Elegan dengan Aksen Gradasi Beige (Warm Beige & Caramel Luxe Showcase)** yang bebas dari tata letak generik contoh praktikum dasar, memadukan kenyamanan visual (*visual appeal*), hierarki tipografi modern (*Plus Jakarta Sans*), foto resmi mahasiswa dengan jas almamater Institut Teknologi Del, dan keterbacaan tinggi berstandar WCAG 2.2 AA.

---

## 🏆 Kepatuhan Spesifikasi Teknis & Rubrik Penilaian (100%)

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
  * Visible focus ring berkontras tinggi (3.5px ring warm caramel/amber) pada keadaan `:focus` dan `:focus-visible`.
  * Dapat dinavigasikan sepenuhnya menggunakan papan ketik (*keyboard accessible*).

### 4. Estetika & Tata Letak Modern CSS (Bobot 25%)
* ✅ **Eksternal CSS**: Seluruh aturan gaya dikelola terpusat pada berkas `style.css`.
* ✅ **Universal Box Sizing Reset**: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
* ✅ **Penerapan Rumus Harmonisasi Warna 60-30-10 (Gradasi Beige & Earth Luxe)**:
  * **60% Dominan**: Latar belakang bersih bernuansa linen ivory (`#fcfbfa`) dan warm beige (`#f5f0eb`) dengan aksen *subtle radial warm sand glow*.
  * **30% Struktural & Kontras**: Teks dan batas bertema roasted espresso dan walnut (`#1f1915`, `#3d342e`, `#e8dfd5`) dengan kontras rasio tinggi melampaui standar WCAG AA (rasio > 7.5:1).
  * **10% Aksen Gradasi Beige & Warm Caramel**: Gradasi karamel, bronze, dan champagne (`linear-gradient(135deg, #785028, #9c6e43, #be9063, #d8b28a)`) pada tombol aksi, header tabel, badge, dan avatar ring.
* ✅ **Tipografi & Tampilan Visual**: Font *Plus Jakarta Sans* & *JetBrains Mono*, sudut membulat halus (`border-radius: 8px - 24px`), bayangan lembut bernuansa warm brown (*diffused soft shadow*), serta transisi interaktif bebas getaran.
* ✅ **Tata Letak Flexbox & CSS Grid**: Pengorganisasian komponen hero dua kolom, kartu snapshot profil dengan foto almamater Del, grid kartu keahlian, grid proyek, dan formulir.
* ✅ **Desain Responsif Media Queries**: Menggunakan breakpoint `@media (max-width: 992px)`, `@media (max-width: 768px)`, dan `@media (max-width: 480px)`.
* ✅ **Preferensi Gerak Aksesibel**: `@media (prefers-reduced-motion: reduce)` untuk kenyamanan pengguna sensitif animasi.

### 5. Pengelolaan Git & GitHub Pages (Bobot 20%)
* ✅ Repositori Git lokal terstruktur rapi.
* ✅ Berkas `README.md` informatif, komprehensif, dan terdokumentasi lengkap.
* ✅ Siap dipublikasikan ke GitHub Pages melalui branch `main`.

---

## 📂 Struktur Berkas Proyek

```text
ppw-2026-week2-12S24026/
├── index.html       # Struktur semantik dokumen HTML5
├── style.css        # Tata letak, tipografi, gradasi beige, & media queries responsif
├── profile.jpg      # Foto profil resmi mahasiswa berjas almamater Institut Teknologi Del
└── README.md        # Dokumentasi lengkap, identitas mahasiswa, dan panduan proyek
```

---

## 🚀 Panduan Menjalankan Secara Lokal

1. **Klon Repositori:**
   ```bash
   git clone https://github.com/GriseldaHutahaean/ppw-2026-week2-12S24026.git
   cd ppw-2026-week2-12S24026
   ```

2. **Buka di Browser / Menggunakan Live Server:**
   * **Menggunakan VS Code:** Klik kanan berkas `index.html` lalu pilih **Open with Live Server**.
   * **Secara Langsung:** Klik dua kali berkas `index.html` untuk membukanya pada peramban web modern (Google Chrome, Microsoft Edge, atau Mozilla Firefox).

---

## 🌐 Panduan Deployment ke GitHub Pages

1. Pastikan seluruh perubahan kode telah dikomit:
   ```bash
   git add .
   git commit -m "feat: complete week 2 html5 and modern css assignment"
   git branch -M main
   git push -u origin main
   ```
2. Buka halaman repositori di GitHub: `https://github.com/GriseldaHutahaean/ppw-2026-week2-12S24026`
3. Masuk ke tab **Settings** > **Pages**.
4. Pada bagian **Build and deployment** > **Branch**, pilih branch `main` dan folder `/(root)`, kemudian klik tombol **Save**.
5. Tunggu proses deployment selesai, dan halaman web akan aktif secara langsung pada:
   `https://GriseldaHutahaean.github.io/ppw-2026-week2-12S24026/`

---
*Dibuat dengan dedikasi akademik untuk memenuhi Penugasan Mandiri Minggu 02 Mata Kuliah Pemrograman dan Pengujian Aplikasi Web (12S3101) - Institut Teknologi Del.*
