# Panduan Portofolio (versi Web Developer)

## 1. Pasang ke repo GitHub Pages
1. Di folder repo lokalmu (`AchmadAdam-ch.github.io`), **hapus** `index.html`, `style.css`, dan folder `img/Projects/` yang lama.
2. Salin **semua isi** folder ini ke repo (folder `batik/` isinya sama seperti punyamu, boleh ditimpa).
3. Buka `index.html` langsung di browser untuk mengecek. Lalu `git add . && git commit -m "redesign portofolio" && git push`.

## 2. Arah portofolio: Web Developer
Semua narasi sudah diputar ke web development:
- Judul halaman, deskripsi, dan gambar pratinjau (`img/og-image.png`) → **Web Developer**.
- Efek ketik di hero: `Web Developer` → `Front-End Enthusiast` → `Siswa RPL` (ubah di `script.js`, cari `const words`).
- Proyek unggulan sekarang **Warisan Batik**; **Pixel Horror** turun jadi kartu biasa dan dibingkai sebagai proyek lama tempat kamu belajar logika.
- Bagian Skill: Web jadi grup pertama; Construct dipindah ke grup "Pernah dipakai".
- Logo/brand **Happy Game sudah dihapus total** dari paket ini.

## 3. Bagian Magang (LAZIS Sabilillah)
Sudah diisi: instansi, divisi Media, cakupan Radio Desimal 89,5 FM, tujuan magang, profil instansi, tanggung jawab, 3 blok hasil kerja, skill yang didapat, dan refleksi.

Yang **masih kosong** dan cuma kamu yang tahu — ditandai kotak kuning putus-putus (`class="todo"`). Di VS Code tekan `Ctrl+Shift+F` lalu cari `todo`:
- tanggal periode & durasi magang
- nama pembimbing industri dan pembimbing sekolah
- jurnal mingguan (judul kegiatan + tanggal tiap minggu)
- keterangan foto dokumentasi
- kutipan pembimbing
- ringkasan tiap bab laporan

Setelah diisi, hapus tag `<span class="todo">…</span>`-nya, sisakan teksnya.

File opsional yang bisa kamu tambahkan:
- `laporan/laporan-magang.pdf` — lalu aktifkan tombol "Unduh PDF" (cari `AKTIFKAN` di `magang.html` dan `index.html`)
- `laporan/sertifikat-magang.pdf`
- `img/magang/foto-1.webp` … `foto-4.webp`

Tambah minggu di timeline: salin satu blok `<article class="tl-item …">`.
Tambah hasil kerja: salin satu blok `<article class="deliverable …">`.

## 4. Kontak
Email `Ohd8094@gmail.com` dan WhatsApp `0898-0500-898` sudah aktif di bagian Kontak `index.html`.
Kalau nanti punya LinkedIn atau CV, tinggal salin satu blok `<a class="contact__link">` dan ganti isinya
(untuk CV: cari `AKTIFKAN` di bagian hero, taruh filenya di folder `cv/`).

## 5. Menambah proyek baru
Di `index.html`, salin satu blok `<article class="card glass reveal">` (di dalam `<div class="cards">`), lalu ganti gambar, judul, deskripsi, dan link. Simpan screenshot di `img/projects/` (format WebP, lebar ±1200 px).

## 6. Mengganti warna
Semua warna ada di bagian `:root` paling atas `style.css` (`--primary`, `--secondary`, `--accent`).

## 7. Yang perlu kamu cek
- Angka di hero (**4 proyek, 2 website live, 2 sertifikat**) diisi manual di `index.html` — ubah kalau bertambah.
- Tag teknologi di tiap proyek saya susun dari yang terlihat di kodenya — koreksi kalau meleset.
- Link **Pixel Horror** masih ke server sekolah (`http://103.186.167.18:8002/…`). Kalau server itu mati, link ikut mati. Sebaiknya export dari Construct lalu upload ke itch.io.
