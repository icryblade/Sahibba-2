# SAHIBBA V4 - Permainan Silang Kata Digital Bahasa Melayu

Versi rekaan semula moden bagi permainan Sahibba yang menggabungkan dua antara muka baharu:
1. **Lobi & Tetapan Perlawanan (Login / Setup Cockpit)**: Berdasarkan folder `login screen`
2. **Arena Papan Permainan (Game Arena)**: Berdasarkan folder `stitch_sahibba_game_ui_redesign` (UI Design)

---

## Ciri-Ciri Utama & Penambahbaikan

### 1. Antara Muka Lobi & Persediaan
- **Aestetik "Modern Tactile Wordplay"**: Kad kokpit kaca frosted (*glassmorphic*), jubin terapung 3D dengan bayang fizikal neomorfik, dan animasi interaktif.
- **Pengenalan Pemain**: Medan nama dengan butang **"Jana Nama Rawak"** beranimasi dadu yang menjana nama tokoh pahlawan Melayu (Hang Tuah, Tun Teja, Mahsuri, Pendeta Za'ba, dsb.).
- **Pilihan Mod Permainan**:
  - **Mod Biasa**: Skor standard mengikut jubin rasmi dengan bonus kepanjangan kata.
  - **Serangan Masa**: Mod pantas dengan loceng tamat dan bonus multiplier streak (x1.5).
  - **Cabaran Kamus**: Kosa kata klasik/arkaik dan kata panjang dengan bonus gandaan x2.0.
- **Tetapan Tempoh & Kesukaran Bento Grid**: Pilihan 30 saat, 3 minit, 5 minit, atau 10 minit; serta kesukaran Mudah, Sederhana, atau Pakar.
- **Modal Panduan & Nilai Jubin**: Jadual nilai markah huruf rasmi dan peraturan pengesahan Kamus Dewan DBP.

### 2. Arena Papan Permainan (Game Arena)
- **Top HUD Beranimasi**:
  - Profil pemain dengan avatar berhuruf singkatan, lencana pangkat ("Jaguh Kata"), dan penunjuk giliran masa nyata.
  - Jam pengira detik bulat SVG dengan gegelung kemajuan (*countdown ring*) dan ikon jam pasir bergoyang.
  - Paparan jumlah markah langsung dengan kesan lonjakan markah (*score bump animation*).
- **Papan Jubin 6 &times; 6 Tactile**:
  - 36 jubin berhuruf fizikal dengan nilai markah huruf rasmi Sahibba (A=1, B=3, K=2, Q=10, dsb.).
  - Algoritma taburan huruf Bahasa Melayu yang seimbang antara huruf vokal (10–14 huruf) dan konsonan.
  - Penggantian jubin automatik yang mengekalkan imbangan huruf selepas perkataan sah dihantar.
  - Butang **"Rombak Papan"** untuk menyusun semula kedudukan jubin secara rawak.
- **Jokers (Wildcard) Reserve & On-Board**:
  - Jubin Wildcard `*` berwarna ungu kecubung yang boleh menggantikan sebarang huruf.
  - Tray simpanan 3 Wildcard sedia untuk ditarik ke tray bina perkataan.
- **Tray Bina Perkataan ("Bina Perkataan")**:
  - Anggaran nilai kata masa nyata (`+X mata`).
  - Sokongan drag-and-drop / SortableJS dan klik untuk menyusun semula.
  - Butang **Padam** (buang huruf terakhir) dan **Batal Semua** (pulangkan semua huruf ke papan).
  - Butang **HANTAR JAWAPAN** dengan animasi kilauan (*shimmer*).

### 3. Pengesahan Pangkalan Data Kamus Dewan (DBP)
- Menggunakan pangkalan data rasmi mengandungi **24,562 perkataan Bahasa Melayu** (`dictionary.json`).
- Pengesahan $O(1)$ sepantas kilat serta pemadanan regex untuk huruf wildcard (`*`).
- **Maklum Balas Kejayaan**: Letupan konfeti berbilang warna, kord muzik kemenangan, pertambahan markah, dan kemasukan kata ke dalam senarai perkataan sah.
- **Maklum Balas Ralat**: Animasi getaran tray dan bunyi amaran mesra sekiranya perkataan tidak dijumpai.

### 4. Panel Sisi & Kemudahan Tambahan
- **Senarai Perkataan Sah**: Merekodkan semua perkataan yang telah dibina berserta huraian huruf, kepanjangan, markah, dan cop rasmi "Sah DBP".
- **Purata Mata Sekata**: Statistik perlawanan secara dinamik.
- **Semakan Maksud Pantas**: Kad akordion takrifan Kamus Dewan Edisi Ke-4 untuk perkataan terkini yang dibina.
- **Semakan Kata DBP**: Kotak carian segera untuk memeriksa kesahihan sebarang perkataan dalam kamus.
- **Papan Markah (Leaderboard)**: Rekod markah terbaik disimpan dalam `localStorage`.
- **Penukar Tema**: Tiga tema visual — **Biru Moden**, **Papan Kayu Klasik**, dan **Mod Gelap**.
- **Sintesis Audio Web**: Kesan bunyi klik jubin, rombak, dan kemenangan tanpa memerlukan fail audio luaran.

---

## Cara Menjalankan

### Melalui Pelayan Tempatan (Python):
```bash
python3 -m http.server 8080
```
Buka penyemak imbas di: `http://localhost:8080/index.html`

### Melalui Node.js Express (jika dipasang):
```bash
npm install
node server.js
```
Buka penyemak imbas di: `http://localhost:3000`

---
&copy; 2025 Sahibba Klasik Moden. Hak Cipta Terpelihara Jackie Wong Sing Qie.
