// Daftar kata bertema Nusantara: [kata, petunjuk]
const daftarKata = [
  ["REOG", "Tarian Ponorogo dengan topeng singa raksasa"],
  ["BATIK", "Kain bermotif dari teknik lilin malam"],
  ["KERIS", "Senjata tradisional berkelok"],
  ["WAYANG", "Pertunjukan boneka kulit"],
  ["BROMO", "Gunung berpasir di Jawa Timur"],
  ["MERAPI", "Gunung api aktif dekat Yogyakarta"],
  ["KOMODO", "Kadal raksasa dari Nusa Tenggara"],
  ["GAMELAN", "Musik tradisional Jawa dan Bali"],
  ["ANGKLUNG", "Alat musik dari bambu"],
  ["PANCASILA", "Dasar negara Indonesia"],
  ["BOROBUDUR", "Candi Buddha di Magelang"],
  ["MAJAPAHIT", "Kerajaan besar di masa Gajah Mada"],
  ["SRIWIJAYA", "Kerajaan maritim di Sumatra"],
  ["KRAKATAU", "Gunung di Selat Sunda yang meletus tahun 1883"],
  ["RAJAAMPAT", "Surga selam di Papua Barat"]
];

// Variabel permainan
let kata = "";       // jawaban yang benar
let skor = 0;
let nyawa = 3;
let waktu = 20;
let timer = null;
let main = false;    // true kalau permainan sedang berjalan

// Ambil elemen dari HTML
const kotak = document.getElementById("kotak");
const elSkor = document.getElementById("skor");
const elNyawa = document.getElementById("nyawa");
const elWaktu = document.getElementById("waktu");
const elRekor = document.getElementById("rekor");
const elBar = document.getElementById("isiBar");
const elPetunjuk = document.getElementById("petunjuk");
const elAcak = document.getElementById("acak");
const elJawaban = document.getElementById("jawaban");
const elPesan = document.getElementById("pesan");
const form = document.getElementById("form");

// Tampilkan rekor yang tersimpan di browser
elRekor.textContent = localStorage.getItem("rekor") || 0;

// Fungsi mengacak huruf sebuah kata
function acakKata(teks) {
  let huruf = teks.split("");
  for (let i = huruf.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [huruf[i], huruf[j]] = [huruf[j], huruf[i]];
  }
  return huruf.join("");
}

// Menampilkan pesan di terminal (jenis: "benar" atau "salah")
function tampilPesan(teks, jenis) {
  elPesan.textContent = teks;
  elPesan.className = jenis;
}

// Memperbarui skor dan nyawa (nyawa ditampilkan sebagai kotak ■)
function updateStatus() {
  elSkor.textContent = skor;
  elNyawa.textContent = "■".repeat(nyawa) + "□".repeat(3 - nyawa);
}

// Menampilkan huruf acak sebagai kotak-kotak bercahaya
function tampilHuruf(teks) {
  elAcak.innerHTML = "";
  for (let i = 0; i < teks.length; i++) {
    elAcak.innerHTML += '<span class="huruf" style="animation-delay:' + i * 0.06 + 's">' + teks[i] + "</span>";
  }
}

// Efek getar pada kotak saat jawaban salah
function getar() {
  kotak.classList.add("goyang");
  setTimeout(function () {
    kotak.classList.remove("goyang");
  }, 400);
}

// Membuat soal baru
function soalBaru() {
  let pilih = daftarKata[Math.floor(Math.random() * daftarKata.length)];
  kata = pilih[0];
  elPetunjuk.textContent = pilih[1];

  // acak sampai hasilnya berbeda dari kata aslinya
  let hasil = acakKata(kata);
  while (hasil === kata) {
    hasil = acakKata(kata);
  }
  tampilHuruf(hasil);

  elJawaban.value = "";
  elJawaban.focus();
  mulaiTimer();
}

// Hitung mundur 20 detik + atur lebar bar waktu
function mulaiTimer() {
  clearInterval(timer);
  waktu = 20;
  elWaktu.textContent = waktu;
  elBar.style.width = "100%";
  elBar.classList.remove("habis");

  timer = setInterval(function () {
    waktu--;
    elWaktu.textContent = waktu;
    elBar.style.width = (waktu / 20) * 100 + "%";
    if (waktu <= 5) elBar.classList.add("habis");  // bar berubah merah
    if (waktu === 0) jawabanSalah("WAKTU HABIS! Jawabannya: " + kata);
  }, 1000);
}

// Dipanggil saat jawaban salah atau waktu habis
function jawabanSalah(teks) {
  nyawa--;
  updateStatus();
  tampilPesan(teks, "salah");
  getar();

  if (nyawa === 0) {
    gameOver();
  } else {
    soalBaru();
  }
}

// Permainan selesai
function gameOver() {
  clearInterval(timer);
  main = false;

  // simpan rekor kalau skor lebih tinggi
  if (skor > Number(localStorage.getItem("rekor"))) {
    localStorage.setItem("rekor", skor);
    elRekor.textContent = skor;
  }
  tampilPesan("SISTEM TERKUNCI! Skor akhir: " + skor, "salah");
  tampilHuruf("GAGAL");
  elPetunjuk.textContent = "Tekan MULAI PERETASAN untuk mencoba lagi";
}

// Mulai / ulangi permainan
document.getElementById("btnMulai").onclick = function () {
  skor = 0;
  nyawa = 3;
  main = true;
  updateStatus();
  tampilPesan("Koneksi dibuka... susun kata sandinya!", "benar");
  soalBaru();
};

// Saat tombol CEK ditekan atau Enter
form.onsubmit = function (e) {
  e.preventDefault();
  if (!main) return;

  let jawab = elJawaban.value.toUpperCase().trim();
  if (jawab === kata) {
    skor += 10 + waktu;   // makin cepat, makin besar skornya
    updateStatus();
    tampilPesan("AKSES DITERIMA! +" + (10 + waktu) + " poin", "benar");
    soalBaru();
  } else {
    jawabanSalah("AKSES DITOLAK! Soal diganti.");
  }
};

// Tombol hint: tampilkan huruf pertama
document.getElementById("btnHint").onclick = function () {
  if (!main) return;
  if (skor < 5) {
    tampilPesan("Skor belum cukup untuk memakai hint.", "salah");
    return;
  }
  skor -= 5;
  updateStatus();
  tampilPesan("Huruf pertama: " + kata[0] + " | jumlah huruf: " + kata.length, "benar");
};

// Tombol lewati: nyawa berkurang
document.getElementById("btnLewati").onclick = function () {
  if (!main) return;
  jawabanSalah("Dilewati. Jawabannya: " + kata);
};

// Tampilan awal
updateStatus();