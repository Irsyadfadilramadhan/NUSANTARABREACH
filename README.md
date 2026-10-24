# NUSANTARA//BREACH

Program **permainan kata sederhana** berbasis web untuk tugas mata kuliah Pemrograman Web. Pemain berperan sebagai "peretas" yang harus membobol sistem dengan menyusun huruf acak menjadi kata sandi bertema budaya, tempat, dan sejarah Indonesia.

## Tema Program

**Permainan kata sederhana** (tebak susun kata / word scramble) dengan tampilan bergaya hacker (latar gelap, warna neon, efek glitch, dan pesan ala terminal).

## Cara Bermain

1. Klik tombol **MULAI PERETASAN**.
2. Baca **petunjuk** dan lihat huruf-huruf acak yang muncul.
3. Ketik kata yang benar pada kolom jawaban, lalu tekan **Enter** atau tombol **CEK**.
4. Jawab sebelum waktu 20 detik habis. Makin cepat menjawab, makin besar skor yang didapat.
5. Salah menjawab, waktu habis, atau menekan **LEWATI** akan mengurangi satu "integritas" (nyawa). Jika integritas habis, permainan berakhir.
6. Tombol **HINT** menampilkan huruf pertama dan jumlah huruf, dengan biaya 5 poin.

## Fitur

- 15 kata sandi bertema Nusantara beserta petunjuknya
- Huruf soal diacak otomatis setiap ronde
- Skor berdasarkan kecepatan menjawab (10 poin + sisa waktu)
- 3 nyawa (integritas) dan hitung mundur 20 detik dengan bar waktu
- Tombol bantuan: HINT dan LEWATI
- Rekor skor tertinggi tersimpan di browser (`localStorage`)
- Tampilan interaktif: latar grid bergerak, judul glitch, huruf bercahaya, dan efek getar saat salah

## Struktur File

| File | Fungsi |
|------|--------|
| `index.html` | Kerangka halaman: papan status, area soal, form jawaban, dan tombol |
| `style.css` | Tampilan bertema hacker beserta animasi |
| `script.js` | Logika permainan: mengacak kata, timer, skor, nyawa, dan pengecekan jawaban |

## Teknologi

- HTML5
- CSS3 (flexbox, grid, animasi `@keyframes`)
- JavaScript (DOM, event, `setInterval`, `localStorage`)

## Cara Menjalankan

1. Unduh ketiga file (`index.html`, `style.css`, `script.js`) dan simpan dalam satu folder.
2. Buka `index.html` menggunakan browser (Chrome, Edge, Firefox, dan sebagainya).
3. Tidak memerlukan instalasi atau koneksi internet.

## Penjelasan Singkat Kode

- `daftarKata` menyimpan pasangan kata dan petunjuk dalam bentuk array.
- `acakKata()` mengacak huruf dengan algoritma Fisher-Yates.
- `soalBaru()` memilih kata secara acak dan menampilkannya sebagai kotak-kotak huruf.
- `mulaiTimer()` menjalankan hitung mundur dengan `setInterval` dan memperbarui bar waktu.
- `jawabanSalah()` mengurangi nyawa, menampilkan pesan, dan memanggil `gameOver()` jika nyawa habis.
- Form dicek pada event `submit`: jawaban benar menambah skor, jawaban salah memanggil `jawabanSalah()`.

## Pembuat

- Nama: Irsyad Fadil Ramadhan
- NIM: 25533985
- Program Studi: Informatika
- Universitas Muhammadiyah Ponorogo
