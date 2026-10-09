/**
 * SAHIBBA V4 - JAVASCRIPT GAME ENGINE
 * Combines Lobby/Setup Cockpit and In-Game Arena Interface
 * Features: Authentic DBP Dictionary Validation, Tactile 3D Physics,
 * Sound Synthesizer, Dynamic Vowel Balancing, Multi-Theme Engine
 */

(function initSahibbaApp() {
  'use strict';

  // =========================================================================
  // CONSTANTS & GAME DATA
  // =========================================================================
  const TILE_SCORES = {
    'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2,
    'H': 3, 'I': 1, 'J': 4, 'K': 2, 'L': 2, 'M': 2, 'N': 1,
    'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1,
    'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10, '*': 0
  };

  const FUNNY_NAMES = [
    "Oyen Garang",
    "Raja Kicap",
    "Ketua Kampung",
    "Mak Cik Bawang",
    "Kapten Sambal",
    "Kancil Turbo",
    "Cikgu Disiplin",
    "Pocong Terbang",
    "Abang Lori",
    "Pak Kodi",
    "Sotong Kurita",
    "Durian Runtuh",
    "Ayam Golek",
    "Kaki Lepak",
    "Tok Mudim",
    "Budak WeChat",
    "Pencuri Hati",
    "Cendol Pulut",
    "Nasi Lemak 50 Sen",
    "Pakar Tidur",
    "Hantu Karipap",
    "Raja Gombal",
    "Abang Grab",
    "Si Comel Meow"
  ];

  // Comprehensive embedded fallback vocabulary (over 400 common valid Malay words)
  const FALLBACK_WORDS = [
    "abad", "abadi", "abah", "abai", "abang", "abjad", "ada", "adat", "adik", "adil",
    "aduan", "agama", "agih", "ahli", "aib", "air", "aja", "ajar", "ajak", "ajal",
    "akal", "akar", "akhir", "akrab", "akta", "aku", "alah", "alam", "alang", "alap",
    "alat", "alih", "alir", "alis", "alur", "amal", "aman", "amat", "ambang", "ambil",
    "anak", "anai", "ancam", "anda", "andai", "aneh", "angan", "anggap", "anggota", "angin",
    "angkat", "angkut", "anjur", "antara", "api", "arah", "arang", "aras", "arca", "arif",
    "arka", "arkib", "arus", "asah", "asak", "asal", "asas", "asin", "asing", "asuh",
    "atap", "atas", "atau", "awak", "awal", "awan", "awas", "ayah", "ayat", "ayam",
    "azam", "azab", "baca", "badai", "badan", "badut", "bagai", "bagus", "bah", "bahagia",
    "bahan", "bahas", "bahasa", "bahu", "baik", "baja", "bajak", "baju", "bakal", "bakar",
    "bakat", "bakul", "balas", "balang", "balek", "balik", "balut", "banci", "bandar", "bangga",
    "bangsa", "bangun", "banjir", "bantah", "bantal", "bantu", "bapa", "bara", "barang", "barat",
    "baris", "basah", "basi", "basuh", "batal", "batang", "batas", "batu", "batuk", "bawa",
    "bawah", "bawang", "baya", "bayang", "bayar", "bebas", "beban", "bekal", "bekas", "bela",
    "belah", "belajar", "belakang", "belas", "beli", "belia", "belut", "benar", "bencana", "benda",
    "bendera", "bengkel", "benih", "bentuk", "berani", "beras", "berat", "berdaya", "beri", "berita",
    "berkat", "bersih", "besar", "besi", "betina", "betul", "beza", "biar", "biasa", "biaya",
    "bibir", "bicara", "bidas", "bijak", "biji", "bilah", "bilang", "bimbang", "bina", "binatang",
    "bintang", "bintik", "biru", "bisa", "bisik", "bisu", "bocorkan", "bogel", "boleh", "bom",
    "bongkar", "borang", "bosan", "botol", "buah", "buai", "bual", "buang", "buas", "buat",
    "buaya", "bubar", "budi", "budak", "bujang", "buka", "bukan", "bukti", "buku", "bulan",
    "bulat", "bulu", "bumi", "bunga", "bungkus", "bunyi", "buruk", "burung", "buru", "busuk",
    "cabang", "cabaran", "cabut", "cacat", "cacing", "cadang", "cahaya", "cair", "cakap", "calon",
    "campur", "canggih", "cantik", "capai", "cara", "cari", "catat", "catur", "cawan", "cekap",
    "cepat", "cerah", "cerdik", "cerita", "cermat", "cetak", "cincin", "cinta", "cipta", "cita",
    "cium", "cuba", "cuci", "cucu", "cuka", "cukup", "cuma", "curi", "cuti", "dada", "daerah",
    "daftar", "dagang", "daging", "dahi", "dapur", "dara", "darah", "darat", "dari", "daripada",
    "dasar", "datang", "datuk", "daun", "daya", "dayung", "debu", "degil", "dekat", "delapan",
    "demam", "demi", "dendam", "dengar", "derma", "desa", "destinasi", "dewan", "diam", "didik",
    "dingin", "dini", "diri", "doa", "doktor", "dua", "duduk", "duga", "duit", "dunia", "duri",
    "dusta", "edar", "ehsan", "eja", "ekonomi", "emas", "empat", "empuk", "enak", "enam", "enggan",
    "fajar", "faktor", "faham", "falsafah", "fikir", "gajah", "gaji", "gambar", "ganjaran", "garam",
    "garis", "gelap", "gembira", "gigi", "guna", "gunung", "habis", "hadir", "haiwan", "hakim",
    "halus", "hantar", "harga", "hari", "harum", "hati", "hidup", "hijau", "hilang", "hujan",
    "hutan", "ibu", "ikan", "ilmu", "indah", "ingat", "ini", "insan", "isi", "islam", "isteri",
    "itik", "izin", "jadi", "jaga", "jaguh", "jahit", "jalan", "jamuan", "janji", "jantung", "jarak",
    "jarum", "jauh", "jawab", "jelas", "jemput", "jendela", "jenguk", "jeruk", "jiwa", "jual",
    "juara", "jujur", "jumpa", "juta", "kaca", "kacang", "kadar", "kaedah", "kain", "kaki", "kala",
    "kalah", "kalau", "kali", "kamera", "kami", "kampung", "kamus", "kanan", "kapal", "kawan",
    "kayu", "kejar", "kelapa", "kemas", "kenang", "kereta", "kerja", "kertas", "ketawa", "khabar",
    "khazanah", "khemah", "khidmat", "kini", "kira", "kiri", "kita", "kolej", "kosa", "kota",
    "kuala", "kucing", "kuda", "kunci", "kuning", "kursus", "lagu", "lahir", "lain", "laju", "laki",
    "lakon", "laksamana", "langit", "langkah", "lapang", "lapar", "lari", "laut", "layak", "layang",
    "layar", "lebai", "lebih", "leher", "lelap", "lemah", "lemang", "lembu", "lengkap", "lepas",
    "letih", "lihat", "lima", "luas", "luka", "lulus", "lumba", "lupa", "lurus", "maaf", "mahal",
    "mahir", "main", "maju", "makan", "maksud", "malam", "malas", "malu", "mampu", "manis", "masa",
    "masak", "masuk", "mata", "mati", "mawar", "maya", "mega", "meja", "melaka", "melayu", "menang",
    "menteri", "merah", "merdeka", "mesra", "minit", "minum", "minyak", "muda", "mudah", "muhibah",
    "muka", "mula", "mulia", "mulut", "murah", "murid", "musim", "muzik", "nafas", "naik", "nama",
    "nasi", "nasib", "negeri", "nenek", "niaga", "niat", "nilai", "nombor", "nota", "nyanyi", "nyata",
    "ombak", "orang", "otak", "padang", "pagar", "pagi", "pahlawan", "pakai", "pakar", "panas",
    "pandai", "pandang", "panjang", "pantai", "pantas", "papan", "pasang", "pasar", "pasir", "pasukan",
    "patah", "patung", "payung", "pecah", "pedas", "pegang", "pekan", "pelajar", "pelari", "peluru",
    "pemain", "pendekar", "penuh", "perahu", "perak", "perang", "periksa", "perintah", "perkara",
    "perlawanan", "perlu", "petang", "pilih", "pindah", "pinggan", "pintu", "pisang", "pisau", "pokok",
    "polis", "pondok", "poskod", "puan", "puas", "pucuk", "pulang", "pulau", "punca", "pusing",
    "pustaka", "puteri", "putih", "putus", "raba", "racun", "raden", "ragu", "rahsia", "raja",
    "rajin", "rakan", "rakyat", "ramai", "rambut", "rantai", "ranting", "rapat", "rasa", "rata",
    "rawak", "rebung", "rehat", "rekod", "rendah", "rezeki", "ribu", "ringan", "rintih", "risau",
    "roda", "rombak", "ruang", "rumah", "rumput", "rupa", "saat", "sahabat", "saham", "sahibba",
    "saing", "sakit", "saksama", "saksi", "salam", "salin", "sama", "sambil", "sampai", "sana",
    "sangat", "sanggup", "santai", "santubong", "satu", "saudara", "sayang", "sayur", "sebab",
    "seberang", "sebut", "sedang", "sederhana", "sedia", "sedih", "sedikit", "segar", "segera",
    "sejarah", "sejuk", "sekarang", "sekolah", "selamat", "selatan", "selesai", "selimut", "seluruh",
    "semak", "semangat", "sembilan", "semua", "semut", "senang", "senapang", "sendiri", "seni",
    "senjata", "sentuh", "senyum", "sepak", "sepatu", "seperti", "serang", "serangan", "seronok",
    "sesak", "sesuai", "siang", "siap", "siapa", "sihat", "siku", "silang", "silat", "simpan",
    "sinar", "singkat", "sini", "siri", "sisa", "soal", "sokong", "sopan", "suami", "suara",
    "suasana", "subuh", "sudut", "suka", "sukar", "sukan", "sultan", "sumbang", "sungai", "sungguh",
    "sunyi", "supaya", "surat", "susah", "susu", "susun", "syarat", "syukur", "tahu", "tahun",
    "tajam", "takut", "taman", "tamat", "tambah", "tampak", "tamu", "tanah", "tanam", "tanda",
    "tangan", "tangguh", "tanggung", "tangis", "tangkap", "tanya", "taraf", "tarik", "tarikh",
    "tatabahasa", "tawar", "tebal", "teduh", "tegah", "tegak", "tegap", "tegas", "teguh", "teja",
    "teka", "tekun", "telinga", "teliti", "telur", "teman", "tembaga", "tempat", "tempoh", "tenaga",
    "tenang", "tengah", "tengok", "tentera", "tentu", "tepat", "tepi", "terang", "terbang", "terbit",
    "terima", "ternak", "tertib", "tetap", "tetamu", "tiang", "tiap", "tiba", "tidur", "tiga",
    "tikam", "tikam", "tikor", "timbul", "timur", "tinggi", "tinggal", "tingkat", "tinju", "tinta",
    "titik", "tiup", "toko", "tolak", "tolong", "tongkat", "topi", "tua", "tuah", "tuan",
    "tuang", "tuba", "tudung", "tugas", "tuhan", "tuju", "tujuh", "tukang", "tukar", "tulang",
    "tulis", "tumbuh", "tumpah", "tunggu", "tunjuk", "turun", "turut", "tutur", "tutup", "ubat",
    "ucap", "udara", "uji", "ukur", "ulang", "ular", "ulat", "umat", "umpama", "undang",
    "unggul", "unik", "unit", "unsur", "unta", "untung", "upacara", "upaya", "usaha", "usia",
    "utama", "utusan", "wajah", "wajar", "wajib", "wakil", "waktu", "walau", "wang", "wangi",
    "waris", "warna", "warta", "waspada", "wayang", "wilayah", "wujud", "yakin", "yatim", "za'ba", "zaman"
  ];

  // Curated definitions for Malaysian words
  const WORD_DEFINITIONS = {
    "SAHIBBA": {
      meaning: "Permainan susun perkataan silang kata rasmi Bahasa Melayu berasaskan jubin berhuruf untuk menguji kosa kata dan strategi.",
      example: "Murid-murid sekolah giat berlatih Sahibba menjelang perlawanan peringkat kebangsaan.",
      roots: "Kata Nama Khas • Jenama Permainan Tradisi",
      synonyms: "Silang Kata, Teka Kata"
    },
    "PENDEKAR": {
      meaning: "Orang yang pandai bersilat (bermain senjata); jagoan atau pahlawan gagah berani dalam tradisi Melayu.",
      example: "Laksamana Hang Tuah digelar pendekar terbilang kerajaan Melaka.",
      roots: "Kata Dasar • Terbitan: berpendekar, kependekaran",
      synonyms: "Pahlawan, Jagoan, Pendekar"
    },
    "SAHABAT": {
      meaning: "Kawan karib, taulan, teman akrab yang sentiasa bersama dalam suka dan duka.",
      example: "Sahabat sejati sentiasa bersedia menghulurkan bantuan tanpa diminta.",
      roots: "Kata Nama • Kata Terbitan: persahabatan, bersahabat",
      synonyms: "Teman, Rakan, Kawan, Taulan"
    },
    "BERDAYA": {
      meaning: "Mempunyai kemampuan atau keupayaan untuk melakukan sesuatu; bertenaga.",
      example: "Generasi muda perlu berdaya saing dalam menempuh era digital moden.",
      roots: "Kata Kerja Terbitan: ber- + daya",
      synonyms: "Mampu, Berkebolehan, Bertenaga"
    },
    "BINA": {
      meaning: "Mendirikan (bangunan dll), membentuk, memupuk semangat atau mewujudkan sesuatu asas.",
      example: "Kerjasama erat antara kaum penting untuk membina negara yang sejahtera.",
      roots: "Kata Kerja • Terbitan: pembinaan, terbina, membina",
      synonyms: "Dirikan, Bentuk, Wujudkan"
    },
    "MAKAN": {
      meaning: "Memasukkan makanan ke dalam mulut dan mengunyah serta menelannya; menikmati santapan.",
      example: "Keluarga itu berkumpul untuk makan malam bersama-sama.",
      roots: "Kata Kerja • Terbitan: makanan, pemakanan",
      synonyms: "Santap, Jamah, Santapan"
    },
    "BAHASA": {
      meaning: "Sistem lambang bunyi suara yang digunakan oleh manusia untuk berhubung dan melahirkan fikiran.",
      example: "Bahasa Melayu ialah bahasa kebangsaan yang menyatukan seluruh rakyat.",
      roots: "Kata Nama • Terbitan: berbahasa, perbahasaan",
      synonyms: "Pertuturan, Tutur kata"
    },
    "JAGUH": {
      meaning: "Juara dalam sesuatu perlawanan, pertandingan atau bidang kemahiran.",
      example: "Pemain itu dinobatkan sebagai jaguh Sahibba selepas menewaskan pencabarnya.",
      roots: "Kata Nama • Terbitan: kejaguhan",
      synonyms: "Juara, Tokoh, Pahlawan"
    }
  };

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  let dictSet = new Set(FALLBACK_WORDS);
  let dictArray = [...FALLBACK_WORDS];
  let isDictionaryLoaded = false;

  let playerState = {
    name: "", // requires manual input
    mode: "serangan", // biasa, serangan, kamus
    durationSeconds: 300, // 5 mins
    difficulty: "sederhana"
  };

  let gameState = {
    isActive: false,
    timerInterval: null,
    timeRemaining: 300,
    totalDuration: 300,
    score: 0,
    round: 1,
    verifiedWords: [],
    streakCount: 0,
    lastWordTime: 0,
    boardTiles: [], // 36 tiles { id, letter, score, isWildcard, isUsed }
    rackTiles: [],  // currently selected tiles in tray
    reserveWildcards: [true, true, true], // 3 wildcards
    shuffleChances: 3 // 3 chances to refresh all alphabets
  };

  let audioEnabled = true;
  let audioCtx = null;

  // =========================================================================
  // DOM REFERENCES
  // =========================================================================
  const viewLogin = document.getElementById("view-login");
  const viewGame = document.getElementById("view-game");

  // Lobby Elements
  const inputPlayerName = document.getElementById("playerNameInput");
  const btnRandomName = document.getElementById("btnRandomizeName");
  const iconRandom = document.getElementById("randomizeIcon");
  const modeCards = document.querySelectorAll(".mode-card");
  const durationBtns = document.querySelectorAll(".duration-btn");
  const diffBtns = document.querySelectorAll(".diff-btn");
  const selectedDurationLabel = document.getElementById("selectedDurationLabel");
  const selectedDifficultyLabel = document.getElementById("selectedDifficultyLabel");
  const btnStartGame = document.getElementById("btnStartGame");
  const serverStatusDot = document.getElementById("serverStatusDot");
  const serverStatusText = document.getElementById("serverStatusText");

  // Arena HUD Elements
  const headerPlayerName = document.getElementById("headerPlayerName");
  const headerPlayerBadge = document.getElementById("headerPlayerBadge");
  const headerModeBadge = document.getElementById("headerModeBadge");
  const hudPlayerName = document.getElementById("hudPlayerName");
  const hudPlayerInitials = document.getElementById("hudPlayerInitials");
  const hudPlayerRank = document.getElementById("hudPlayerRank");
  const hudRoundIndicator = document.getElementById("hudRoundIndicator");
  const hudStreakBadge = document.getElementById("hudStreakBadge");
  const countdownTimer = document.getElementById("countdownTimer");
  const timerProgressRing = document.getElementById("timerProgressRing");
  const playerTotalScore = document.getElementById("playerTotalScore");
  const scoreBadgeIcon = document.getElementById("scoreBadgeIcon");
  const remainingTilesCounter = document.getElementById("remainingTilesCounter");

  // Game Arena Board & Tray Elements
  const tileGrid = document.getElementById("tileGrid");
  const activeWordRack = document.getElementById("activeWordRack");
  const trayPlaceholder = document.getElementById("trayPlaceholder");
  const wordScoreBadge = document.getElementById("wordScoreBadge");
  const currentWordScore = document.getElementById("currentWordScore");
  const btnClear = document.getElementById("btnClear");
  const btnCancel = document.getElementById("btnCancel");
  const btnSubmitWord = document.getElementById("btnSubmitWord");
  const btnShuffle = document.getElementById("btnShuffle");
  const shuffleCountBadge = document.getElementById("shuffleCountBadge");
  const wildcardReserveContainer = document.getElementById("wildcardReserveContainer");

  // Sidebar Elements
  const wordListContainer = document.getElementById("wordListContainer");
  const wordListEmptyState = document.getElementById("wordListEmptyState");
  const headerWordCountPill = document.getElementById("headerWordCountPill");
  const averageScoreDisplay = document.getElementById("averageScoreDisplay");
  const dictExpandedDetails = document.getElementById("dictExpandedDetails");
  const dictWordTitle = document.getElementById("dictWordTitle");
  const dictStatusBadge = document.getElementById("dictStatusBadge");
  const dictBriefText = document.getElementById("dictBriefText");
  const dictExampleText = document.getElementById("dictExampleText");
  const dictExampleParagraph = document.getElementById("dictExampleParagraph");
  const dictRootsText = document.getElementById("dictRootsText");
  const dictRootsParagraph = document.getElementById("dictRootsParagraph");
  const dictSynonymText = document.getElementById("dictSynonymText");
  const quickLookupInput = document.getElementById("quickLookupInput");
  const quickLookupBtn = document.getElementById("quickLookupBtn");
  const quickLookupSuggestions = document.getElementById("quickLookupSuggestions");
  const quickSuggestionsList = document.getElementById("quickSuggestionsList");
  const dailyChallengeText = document.getElementById("dailyChallengeText");

  // Utility Controls
  const themeSelect = document.getElementById("themeSelect");
  const btnAudioToggle = document.getElementById("btnAudioToggle");
  const audioIcon = document.getElementById("audioIcon");
  const btnFullscreen = document.getElementById("btnFullscreen");
  const btnExitToLobby = document.getElementById("btnExitToLobby");
  const navLogoLobby = document.getElementById("navLogoLobby");

  // Modals
  const rulesModal = document.getElementById("rulesModal");
  const btnOpenRulesLobby = document.getElementById("btnOpenRulesLobby");
  const btnOpenRulesArena = document.getElementById("btnOpenRulesArena");
  const btnCloseRules = document.getElementById("btnCloseRules");
  const btnModalUnderstood = document.getElementById("btnModalUnderstood");

  const dictModal = document.getElementById("dictModal");
  const btnNavDict = document.getElementById("btnNavDict");
  const btnQuickDict = document.getElementById("btnQuickDict");
  const btnCloseDictModal = document.getElementById("btnCloseDictModal");
  const dictSearchInput = document.getElementById("dictSearchInput");
  const btnDoSearchWord = document.getElementById("btnDoSearchWord");
  const dictSearchResultBox = document.getElementById("dictSearchResultBox");

  const leaderboardModal = document.getElementById("leaderboardModal");
  const btnNavScores = document.getElementById("btnNavScores");
  const btnQuickLeaderboard = document.getElementById("btnQuickLeaderboard");
  const btnCloseLeaderboard = document.getElementById("btnCloseLeaderboard");
  const leaderboardList = document.getElementById("leaderboardList");

  const gameEndPopup = document.getElementById("gameEndPopup");
  const gameResultTitle = document.getElementById("gameResultTitle");
  const endFinalScore = document.getElementById("endFinalScore");
  const endFinalWordCount = document.getElementById("endFinalWordCount");
  const endPlayerTitle = document.getElementById("endPlayerTitle");
  const endBestWord = document.getElementById("endBestWord");
  const btnEndBackToLobby = document.getElementById("btnEndBackToLobby");
  const btnEndPlayAgain = document.getElementById("btnEndPlayAgain");

  // Toasts & Celebration
  const gameToast = document.getElementById("gameToast");
  const toastMessage = document.getElementById("toastMessage");
  const toastIcon = document.getElementById("toastIcon");
  const confettiContainer = document.getElementById("confettiContainer");

  // =========================================================================
  // AUDIO SYNTHESIZER (Web Audio API)
  // =========================================================================
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.08, volume = 0.08) {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function playFanfare() {
    if (!audioEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.18, 0.12), idx * 80);
    });
  }

  function playErrorBuzzer() {
    if (!audioEnabled) return;
    playTone(180, 'sawtooth', 0.15, 0.1);
    setTimeout(() => playTone(150, 'sawtooth', 0.2, 0.1), 90);
  }

  function playShuffleCascade() {
    if (!audioEnabled) return;
    const notes = [440, 493.88, 554.37, 659.25, 739.99];
    notes.forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'sine', 0.06, 0.07), idx * 45);
    });
  }

  // =========================================================================
  // TOAST & CONFETTI CELEBRATION
  // =========================================================================
  let toastTimer = null;
  function showToast(message, icon = 'check_circle') {
    if (!gameToast) return;
    toastMessage.textContent = message;
    toastIcon.textContent = icon;
    gameToast.classList.remove('translate-y-24', 'opacity-0');
    gameToast.classList.add('translate-y-0', 'opacity-100');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      gameToast.classList.remove('translate-y-0', 'opacity-100');
      gameToast.classList.add('translate-y-24', 'opacity-0');
    }, 2800);
  }

  function triggerConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
    if (!confettiContainer) return;
    const colors = ['#006194', '#007bb9', '#8455ef', '#39b8fd', '#cce5ff', '#ffd700', '#f59e0b'];
    for (let i = 0; i < 32; i++) {
      const p = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.floor(Math.random() * 8) + 6;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 200 + 70;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist - 30;
      const rot = Math.floor(Math.random() * 360) + 'deg';

      p.style.position = 'fixed';
      p.style.left = `${originX}px`;
      p.style.top = `${originY}px`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.backgroundColor = color;
      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);
      p.style.setProperty('--rot', rot);
      p.style.animation = `confettiParticle 0.85s cubic-bezier(0.12, 0.8, 0.32, 1) forwards`;

      confettiContainer.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }
  }

  // =========================================================================
  // DICTIONARY LOADING & VALIDATION (Kamus Dewan Edisi Keempat)
  // =========================================================================
  let edisiKeempatData = null;

  async function loadEdisiKeempat() {
    try {
      // Load comprehensive 80,000+ words dataset from DBP
      let res = await fetch('./dbp_lengkap.json');
      if (!res.ok) {
        res = await fetch('./edisi_keempat.json');
      }
      if (res.ok) {
        edisiKeempatData = await res.json();
        console.log('Kamus DBP Lengkap dimuatkan:', Object.keys(edisiKeempatData).length, 'entri kata');
        
        // Merge valid headwords into dictSet for gameplay
        Object.keys(edisiKeempatData).forEach((k) => {
          const cleanK = k.toLowerCase().trim();
          if (cleanK.length >= 2 && !cleanK.includes(' ') && /^[a-z]+$/.test(cleanK)) {
            dictSet.add(cleanK);
          }
        });
        dictArray = Array.from(dictSet);
        if (serverStatusText) {
          serverStatusText.textContent = `Kamus DBP Lengkap (${dictSet.size.toLocaleString()} Kata)`;
        }
      }
    } catch (err) {
      console.warn('Perhatian: dbp_lengkap.json dimuatkan melalui takrifan asas.', err);
    }
  }

  async function loadDictionary() {
    try {
      const res = await fetch('./dictionary.json');
      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(w => dictSet.add(w.toLowerCase().trim()));
        dictArray = Array.from(dictSet);
        isDictionaryLoaded = true;
        if (serverStatusText) {
          serverStatusText.textContent = `Kamus DBP Aktif (${dictSet.size.toLocaleString()} Kata)`;
        }
        if (serverStatusDot) {
          serverStatusDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse";
        }
      }
    } catch (err) {
      console.warn("Notice: Using embedded authentic DBP dictionary fallback (400+ words).", err);
      dictArray = [...FALLBACK_WORDS];
      dictSet = new Set(dictArray);
      isDictionaryLoaded = true;
      if (serverStatusText) {
        serverStatusText.textContent = `Kamus Modul Tempatan (${dictArray.length} Kata)`;
      }
    }
  }

  function formatDewanEntry(word, rawLines) {
    if (!rawLines || rawLines.length === 0) return null;

    const wordLower = word.toLowerCase();
    const mainLines = [];
    const derivativeList = [];

    rawLines.forEach((line) => {
      const trimmed = line.trim();
      const match = trimmed.match(/^([a-zA-Z\-]+)\s+/);
      if (match && match[1].toLowerCase() !== wordLower &&
          (match[1].startsWith('ber') || match[1].startsWith('mem') || match[1].startsWith('men') ||
           match[1].startsWith('meng') || match[1].startsWith('ter') || match[1].startsWith('ke') ||
           match[1].startsWith('pe') || match[1].startsWith('per') || match[1].endsWith('an'))) {
        if (!derivativeList.includes(match[1])) {
          derivativeList.push(match[1]);
        }
      } else {
        mainLines.push(trimmed);
      }
    });

    const fullMain = (mainLines.length > 0 ? mainLines.join(' ') : rawLines[0]).replace(/~/g, word);

    let example = '';
    const colonMatch = fullMain.match(/:\s*([^;]+)/);
    if (colonMatch && colonMatch[1]) {
      example = colonMatch[1].trim();
    }

    let cleanMeaning = fullMain;
    const colonIndex = cleanMeaning.indexOf(':');
    if (colonIndex > 20) {
      cleanMeaning = cleanMeaning.substring(0, colonIndex).trim();
    }

    return {
      meaning: cleanMeaning,
      example: example ? `"${example}"` : `"${word.toUpperCase()}" digunakan secara meluas dalam penulisan dan pertuturan bahasa Melayu.`,
      roots: derivativeList.length > 0 ? `Kata Terbitan: ${derivativeList.slice(0, 5).join(', ')}` : `Bentuk Kata Rasmi Kamus Dewan Edisi Ke-4`,
      synonyms: `Daftar Rasmi Kamus Dewan Edisi Keempat (DBP)`
    };
  }

  function getDewanDefinition(word) {
    if (!word) return null;
    const clean = word.toLowerCase().trim();
    if (edisiKeempatData) {
      const raw = edisiKeempatData[clean] ||
                  edisiKeempatData[clean.toUpperCase()] ||
                  edisiKeempatData[clean.charAt(0).toUpperCase() + clean.slice(1)];
      if (raw) {
        // If from dbp_lengkap.json (object with {m, p, j, c})
        if (typeof raw === 'object' && !Array.isArray(raw)) {
          const meaning = raw.m || `Perkataan sah mengikut daftar rasmi Dewan Bahasa dan Pustaka (DBP).`;
          const example = raw.c ? `"${raw.c}"` : `"${clean.toUpperCase()}" sah digunakan dalam perlawanan Sahibba.`;
          let rootsInfo = `Korpus Rasmi Dewan Bahasa dan Pustaka`;
          if (raw.p || raw.j) {
            const parts = [];
            if (raw.p) parts.push(`Sebutan: [${raw.p}]`);
            if (raw.j) parts.push(`Jawi: ${raw.j}`);
            rootsInfo = parts.join('  •  ');
          }
          return {
            meaning: meaning,
            example: example,
            roots: rootsInfo,
            synonyms: `Korpus DBP Lengkap (80,000+ Kata)`,
            pronunciation: raw.p || '',
            jawi: raw.j || ''
          };
        }
        // If array from edisi_keempat.json fallback
        if (Array.isArray(raw)) {
          return formatDewanEntry(clean, raw);
        }
      }
    }
    return WORD_DEFINITIONS[word.toUpperCase()] || null;
  }

  function findDewanSuggestions(query, limit = 4) {
    if (!query) return [];
    const clean = query.toLowerCase().trim();
    if (clean.length < 2) return [];

    const results = [];
    if (edisiKeempatData) {
      const keys = Object.keys(edisiKeempatData);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const kLower = k.toLowerCase();
        if (kLower.startsWith(clean) && kLower !== clean) {
          results.push(kLower);
          if (results.length >= limit) break;
        }
      }
    }

    if (results.length < limit && dictArray && dictArray.length > 0) {
      for (let i = 0; i < dictArray.length; i++) {
        const w = dictArray[i];
        if (w.startsWith(clean) && w !== clean && !results.includes(w)) {
          results.push(w);
          if (results.length >= limit) break;
        }
      }
    }
    return results;
  }

  function validateWordInDictionary(rawWord) {
    if (!rawWord || rawWord.length < 2) return false;
    const cleanWord = rawWord.toLowerCase().trim();

    // Check with wildcards
    if (cleanWord.includes('*')) {
      const pattern = new RegExp(`^${cleanWord.replace(/\*/g, '.')}$`, 'i');
      return dictArray.some(w => w.length === cleanWord.length && pattern.test(w));
    }

    // Direct O(1) set lookup
    return dictSet.has(cleanWord) || (edisiKeempatData && Boolean(edisiKeempatData[cleanWord]));
  }

  // =========================================================================
  // LETTER DISTRIBUTION & GENERATION
  // =========================================================================
  function getRandomVowel() {
    const vowels = ['A', 'A', 'E', 'E', 'I', 'I', 'O', 'U', 'U'];
    return vowels[Math.floor(Math.random() * vowels.length)];
  }

  function getRandomConsonant() {
    // High frequency in Malay: B, D, G, H, K, L, M, N, P, R, S, T
    const frequent = ['B', 'D', 'G', 'H', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T'];
    // Rare: C, J, Y, W, F, V, Q, X, Z
    const rare = ['C', 'J', 'Y', 'W', 'F', 'V', 'Q', 'X', 'Z'];

    if (Math.random() < 0.12) {
      return rare[Math.floor(Math.random() * rare.length)];
    }
    return frequent[Math.floor(Math.random() * frequent.length)];
  }

  function generateBoardTile(id, forceVowel = null) {
    let letter;
    if (forceVowel === true) {
      letter = getRandomVowel();
    } else if (forceVowel === false) {
      letter = getRandomConsonant();
    } else {
      letter = (Math.random() < 0.38) ? getRandomVowel() : getRandomConsonant();
    }

    // 4% chance of in-board wildcard
    const isWild = (Math.random() < 0.04);
    if (isWild) letter = '*';

    return {
      id: id,
      letter: letter,
      score: TILE_SCORES[letter] || 1,
      isWildcard: isWild,
      isUsed: false
    };
  }

  function generateFullBoard() {
    const totalTiles = 36;
    const vowelCount = Math.floor(Math.random() * 3) + 12; // 12-14 vowels
    let tiles = [];

    // Add vowels
    for (let i = 0; i < vowelCount; i++) {
      tiles.push(generateBoardTile(`tile_${i}`, true));
    }
    // Add consonants
    for (let i = vowelCount; i < totalTiles; i++) {
      tiles.push(generateBoardTile(`tile_${i}`, false));
    }

    // Ensure at least 1 wildcard on board occasionally
    if (Math.random() < 0.35 && !tiles.some(t => t.letter === '*')) {
      tiles[Math.floor(Math.random() * tiles.length)] = {
        id: `tile_wild`,
        letter: '*',
        score: 0,
        isWildcard: true,
        isUsed: false
      };
    }

    // Shuffle tiles
    tiles.sort(() => Math.random() - 0.5);
    // Assign definitive grid IDs
    return tiles.map((t, idx) => ({ ...t, id: `grid_${idx}` }));
  }

  // =========================================================================
  // RENDER BOARD & TRAY
  // =========================================================================
  function renderBoardGrid() {
    if (!tileGrid) return;
    tileGrid.innerHTML = '';

    gameState.boardTiles.forEach((tile, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = tile.id;
      btn.setAttribute('data-id', tile.id);
      btn.setAttribute('data-letter', tile.letter);
      btn.setAttribute('data-score', tile.score);
      btn.setAttribute('data-wildcard', tile.isWildcard ? 'true' : 'false');

      const isWild = tile.isWildcard;
      const isSelected = tile.isUsed;

      btn.className = `tile-btn tile-interactive group relative w-11 h-11 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] rounded-xl flex items-center justify-center cursor-pointer select-none transition-all ${
        isWild
          ? 'bg-gradient-to-b from-[#faf5ff] to-[#f3e8ff] border border-[#f3e8ff] shadow-[0_4px_0_#d8b4fe,0_6px_14px_rgba(107,56,212,0.15)] wildcard-interactive'
          : 'bg-gradient-to-b from-surface-container-lowest to-[#f1f5f9] border border-outline-variant/30 shadow-[0_4px_0_#cbd5e1,0_6px_12px_rgba(15,23,42,0.08)]'
      } ${isSelected ? 'tile-selected' : ''}`;

      btn.innerHTML = `
        <span class="font-tile-letter text-lg sm:text-2xl md:text-3xl font-black ${isWild ? 'text-tertiary' : 'text-on-surface'} group-hover:scale-105 transition-transform">
          ${tile.letter}
        </span>
        <span class="absolute bottom-1 right-1.5 font-tile-score text-[10px] sm:text-xs font-bold ${isWild ? 'text-tertiary' : 'text-on-surface-variant'}">
          ${isWild ? '&infin;' : tile.score}
        </span>
      `;

      btn.addEventListener('click', () => {
        handleBoardTileClick(tile);
      });

      tileGrid.appendChild(btn);
    });

    updateRemainingCounter();
  }

  function updateRemainingCounter() {
    if (!remainingTilesCounter) return;
    const available = gameState.boardTiles.filter(t => !t.isUsed).length;
    remainingTilesCounter.textContent = `${available}/36`;
  }

  function handleBoardTileClick(tile) {
    if (tile.isUsed) {
      // If already in tray, find and remove it from tray
      const existingIdx = gameState.rackTiles.findIndex(item => item.sourceTileId === tile.id);
      if (existingIdx > -1) {
        removeTileFromRack(existingIdx);
      }
      return;
    }

    if (gameState.rackTiles.length >= 10) {
      showToast('Maksimum 10 huruf dalam satu perkataan!', 'warning');
      playErrorBuzzer();
      return;
    }

    // Mark as used
    tile.isUsed = true;
    const tileEl = document.getElementById(tile.id);
    if (tileEl) {
      tileEl.classList.add('tile-pop-click', 'tile-selected');
      setTimeout(() => tileEl.classList.remove('tile-pop-click'), 240);
    }

    playTone(tile.isWildcard ? 680 : 440 + gameState.rackTiles.length * 40, 'triangle', 0.08);

    gameState.rackTiles.push({
      letter: tile.letter,
      score: tile.score,
      isWildcard: tile.isWildcard,
      sourceTileId: tile.id,
      isReserveWildcard: false
    });

    renderRack();
  }

  function addReserveWildcard(reserveIdx) {
    if (!gameState.reserveWildcards[reserveIdx]) return;
    if (gameState.rackTiles.length >= 10) {
      showToast('Maksimum 10 huruf dalam satu perkataan!', 'warning');
      playErrorBuzzer();
      return;
    }

    gameState.reserveWildcards[reserveIdx] = false;
    updateReserveWildcardUI();

    playTone(720, 'triangle', 0.1);
    gameState.rackTiles.push({
      letter: '*',
      score: 0,
      isWildcard: true,
      sourceTileId: null,
      isReserveWildcard: true,
      reserveIdx: reserveIdx
    });

    renderRack();
  }

  function updateReserveWildcardUI() {
    if (!wildcardReserveContainer) return;
    const buttons = wildcardReserveContainer.querySelectorAll('button');
    buttons.forEach((btn, idx) => {
      const isAvail = gameState.reserveWildcards[idx];
      if (isAvail) {
        btn.disabled = false;
        btn.classList.remove('opacity-30', 'pointer-events-none');
      } else {
        btn.disabled = true;
        btn.classList.add('opacity-30', 'pointer-events-none');
      }
    });
  }

  function renderRack() {
    if (!activeWordRack) return;
    activeWordRack.innerHTML = '';

    if (gameState.rackTiles.length === 0) {
      if (trayPlaceholder) trayPlaceholder.classList.remove('hidden');
      if (wordScoreBadge) {
        wordScoreBadge.classList.add('hidden');
        wordScoreBadge.classList.remove('flex');
      }
      return;
    }

    if (trayPlaceholder) trayPlaceholder.classList.add('hidden');
    if (wordScoreBadge) {
      wordScoreBadge.classList.remove('hidden');
      wordScoreBadge.classList.add('flex');
    }

    // Calculate score estimation
    let rawScore = gameState.rackTiles.reduce((acc, t) => acc + t.score, 0);
    // Apply mode rules
    if (playerState.mode === 'serangan' && gameState.streakCount > 0) {
      rawScore = Math.round(rawScore * 1.5);
    } else if (playerState.mode === 'kamus' && (gameState.rackTiles.length >= 6 || gameState.rackTiles.some(t => ['Q', 'X', 'Z', 'J'].includes(t.letter)))) {
      rawScore = rawScore * 2;
    }

    if (currentWordScore) currentWordScore.textContent = rawScore;

    gameState.rackTiles.forEach((tile, index) => {
      const el = document.createElement('div');
      const isWild = tile.isWildcard;

      el.className = `rack-tile-anim relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-tile-letter text-xl sm:text-2xl font-black cursor-pointer select-none transition-all shadow-[0_3px_0_#94a3b8,0_6px_10px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_5px_0_#94a3b8] active:scale-95 group ${
        isWild
          ? 'bg-gradient-to-b from-[#faf5ff] to-[#f3e8ff] text-tertiary border border-tertiary/40'
          : 'bg-gradient-to-b from-white to-[#f1f5f9] text-on-surface border border-outline-variant/30'
      }`;

      el.title = 'Klik untuk mengeluarkan huruf ini';
      el.innerHTML = `
        <span class="group-hover:scale-105 transition-transform">${tile.letter}</span>
        <span class="absolute bottom-1 right-1.5 font-tile-score text-[9px] text-on-surface-variant font-bold">
          ${isWild ? '&infin;' : tile.score}
        </span>
        <span class="absolute -top-1 -right-1 w-4 h-4 bg-error text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          &times;
        </span>
      `;

      el.addEventListener('click', () => {
        playTone(320, 'sine', 0.05);
        removeTileFromRack(index);
      });

      activeWordRack.appendChild(el);
    });

    // Make sortable if SortableJS is loaded
    if (window.Sortable && !activeWordRack._sortable) {
      activeWordRack._sortable = Sortable.create(activeWordRack, {
        animation: 150,
        ghostClass: 'opacity-40',
        onEnd: (evt) => {
          const item = gameState.rackTiles.splice(evt.oldIndex, 1)[0];
          gameState.rackTiles.splice(evt.newIndex, 0, item);
          renderRack();
        }
      });
    }
  }

  function removeTileFromRack(index) {
    const removed = gameState.rackTiles.splice(index, 1)[0];
    if (!removed) return;

    if (removed.sourceTileId) {
      const boardTile = gameState.boardTiles.find(t => t.id === removed.sourceTileId);
      if (boardTile) {
        boardTile.isUsed = false;
        const el = document.getElementById(boardTile.id);
        if (el) el.classList.remove('tile-selected');
      }
    } else if (removed.isReserveWildcard && removed.reserveIdx !== undefined) {
      gameState.reserveWildcards[removed.reserveIdx] = true;
      updateReserveWildcardUI();
    }

    renderRack();
    updateRemainingCounter();
  }

  function clearRack() {
    while (gameState.rackTiles.length > 0) {
      removeTileFromRack(0);
    }
  }

  // =========================================================================
  // WORD SUBMISSION & VALIDATION
  // =========================================================================
  function submitConstructedWord() {
    if (!gameState.isActive) {
      showToast('Permainan belum bermula atau masa telah tamat!', 'warning');
      return;
    }

    if (gameState.rackTiles.length < 2) {
      playErrorBuzzer();
      showToast('Sila susun sekurang-kurangnya 2 huruf!', 'warning');
      const box = document.getElementById('wordConstructionBox');
      if (box) {
        box.classList.add('shake-anim');
        setTimeout(() => box.classList.remove('shake-anim'), 400);
      }
      return;
    }

    const rawWord = gameState.rackTiles.map(t => t.letter).join('');
    const isValid = validateWordInDictionary(rawWord);

    if (!isValid) {
      playErrorBuzzer();
      showToast(`Perkataan "${rawWord}" tidak dijumpai dalam Kamus Dewan!`, 'cancel');
      const box = document.getElementById('wordConstructionBox');
      if (box) {
        box.classList.add('shake-anim');
        setTimeout(() => box.classList.remove('shake-anim'), 400);
      }
      return;
    }

    // Check if word was already found in this match
    if (gameState.verifiedWords.some(w => w.word.toLowerCase() === rawWord.toLowerCase())) {
      playErrorBuzzer();
      showToast(`Perkataan "${rawWord}" telah pun dibina sebelum ini!`, 'info');
      return;
    }

    // Calculate score
    let baseScore = gameState.rackTiles.reduce((acc, t) => acc + t.score, 0);
    let bonusMultiplier = 1;

    if (playerState.mode === 'biasa') {
      if (rawWord.length >= 8) baseScore += 10;
      else if (rawWord.length >= 6) baseScore += 5;
    } else if (playerState.mode === 'serangan') {
      const now = Date.now();
      if (now - gameState.lastWordTime < 30000 && gameState.lastWordTime > 0) {
        gameState.streakCount++;
        bonusMultiplier = 1.5;
        if (hudStreakBadge) hudStreakBadge.textContent = 'Streak x1.5';
      } else {
        gameState.streakCount = 1;
        bonusMultiplier = 1.0;
        if (hudStreakBadge) hudStreakBadge.textContent = 'Standard';
      }
      gameState.lastWordTime = now;
      baseScore = Math.round(baseScore * bonusMultiplier);
    } else if (playerState.mode === 'kamus') {
      if (rawWord.length >= 6 || rawWord.includes('Q') || rawWord.includes('X') || rawWord.includes('Z')) {
        bonusMultiplier = 2.0;
        baseScore = baseScore * 2;
        if (hudStreakBadge) hudStreakBadge.textContent = 'Bonus x2.0';
      }
    }

    // Update total score with animated count
    const oldScore = gameState.score;
    gameState.score += baseScore;
    animateScoreCounter(oldScore, gameState.score);

    // Fanfare & Confetti
    playFanfare();
    const btnRect = btnSubmitWord.getBoundingClientRect();
    triggerConfetti(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);

    // Save word
    const wordEntry = {
      rank: gameState.verifiedWords.length + 1,
      word: rawWord,
      score: baseScore,
      length: rawWord.length,
      multiplier: bonusMultiplier,
      time: new Date().toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' })
    };
    gameState.verifiedWords.unshift(wordEntry);

    // Update UI lists
    updateVerifiedWordListUI();
    updateDictionaryDefinitionCard(rawWord);
    if (quickLookupInput) quickLookupInput.value = rawWord;

    // Replace used board tiles with fresh letters
    replaceUsedBoardTiles();

    // Clear rack without restoring replaced tiles
    gameState.rackTiles = [];
    renderRack();

    showToast(`Tahniah! Perkataan "${rawWord}" (+${baseScore} mata) disahkan oleh DBP!`, 'verified');
  }

  function animateScoreCounter(startVal, endVal) {
    if (!playerTotalScore) return;
    let current = startVal;
    const step = Math.ceil((endVal - startVal) / 12) || 1;
    const timer = setInterval(() => {
      current += step;
      if (current >= endVal) {
        current = endVal;
        clearInterval(timer);
      }
      playerTotalScore.textContent = current.toLocaleString();
    }, 25);

    playerTotalScore.classList.add('score-bump');
    if (scoreBadgeIcon) scoreBadgeIcon.classList.add('score-bump');
    setTimeout(() => {
      playerTotalScore.classList.remove('score-bump');
      if (scoreBadgeIcon) scoreBadgeIcon.classList.remove('score-bump');
    }, 500);
  }

  function replaceUsedBoardTiles() {
    gameState.boardTiles.forEach((tile, index) => {
      if (tile.isUsed) {
        // Generate replacement keeping vowel balance
        const isVowelPosition = (Math.random() < 0.38);
        const newTile = generateBoardTile(`grid_${index}`, isVowelPosition);
        gameState.boardTiles[index] = newTile;
      }
    });

    renderBoardGrid();
  }

  function updateVerifiedWordListUI() {
    if (!wordListContainer) return;
    if (wordListEmptyState) wordListEmptyState.classList.add('hidden');

    wordListContainer.innerHTML = '';
    const totalWords = gameState.verifiedWords.length;
    if (headerWordCountPill) {
      headerWordCountPill.textContent = `${totalWords} Kata Sah`;
      headerWordCountPill.classList.add('scale-105');
      setTimeout(() => headerWordCountPill.classList.remove('scale-105'), 200);
    }

    gameState.verifiedWords.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'p-3 bg-surface-container-low hover:bg-surface-container hover:translate-x-1 rounded-2xl transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-primary/20 shadow-sm';

      const hyphenated = item.word.toLowerCase().split('').join('•');

      card.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center font-label-caps text-xs font-black shadow-sm group-hover:scale-110 transition-transform">
            ${item.rank}
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-headline-md text-sm font-bold text-on-surface tracking-wide">${item.word}</span>
              <span class="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
            </div>
            <span class="font-label-md text-[11px] text-on-surface-variant">${hyphenated} (${item.length} huruf)</span>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <div class="flex items-baseline gap-1">
            <span class="font-headline-md text-sm font-extrabold text-primary">+${item.score}</span>
            <span class="font-label-caps text-[10px] text-on-surface-variant">mata</span>
          </div>
          <span class="text-[10px] text-secondary font-medium">Sah DBP</span>
        </div>
      `;

      card.addEventListener('click', () => {
        updateDictionaryDefinitionCard(item.word);
        if (quickLookupInput) quickLookupInput.value = item.word;
      });

      wordListContainer.appendChild(card);
    });

    // Update average
    if (totalWords > 0 && averageScoreDisplay) {
      const avg = (gameState.score / totalWords).toFixed(1);
      averageScoreDisplay.textContent = `${avg} Mata / Kata`;
    }

    // Check daily quest
    if (dailyChallengeText && gameState.verifiedWords.filter(w => w.length >= 6).length >= 2) {
      dailyChallengeText.innerHTML = `<span class="text-emerald-600 font-bold">Cabaran Selesai! (+30 XP Diberikan)</span>`;
    }
  }

  function updateDictionaryDefinitionCard(word) {
    if (!word) return;
    let cleanWord = word.trim().toLowerCase();

    // Resolve wildcards if any
    let matchedWord = cleanWord;
    if (cleanWord.includes('*')) {
      const pattern = new RegExp(`^${cleanWord.replace(/\*/g, '.')}$`, 'i');
      const found = dictArray.find(w => w.length === cleanWord.length && pattern.test(w));
      if (found) matchedWord = found;
    }

    const uppercase = (matchedWord !== cleanWord ? `${matchedWord.toUpperCase()} (Ganti *)` : cleanWord.toUpperCase());
    if (dictWordTitle) dictWordTitle.textContent = uppercase;

    const entry = getDewanDefinition(matchedWord);
    if (entry) {
      if (dictStatusBadge) {
        dictStatusBadge.textContent = 'Sah DBP';
        dictStatusBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800';
      }
      if (dictBriefText) dictBriefText.textContent = entry.meaning;
      if (dictExampleText) dictExampleText.textContent = entry.example;
      if (dictExampleParagraph) dictExampleParagraph.classList.remove('hidden');
      if (dictRootsText) dictRootsText.textContent = entry.roots;
      if (dictRootsParagraph) dictRootsParagraph.classList.remove('hidden');
      if (dictSynonymText) dictSynonymText.textContent = entry.synonyms || 'Kamus Dewan Edisi Keempat (DBP)';

      if (quickLookupSuggestions) quickLookupSuggestions.classList.add('hidden');
    } else {
      // Check suggestions (e.g. typing "ruju" suggests "rujuk")
      const suggestions = findDewanSuggestions(cleanWord, 4);
      if (suggestions.length > 0) {
        if (dictStatusBadge) {
          dictStatusBadge.textContent = 'Cadangan';
          dictStatusBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800';
        }

        // Render suggestion chips
        if (quickSuggestionsList && quickLookupSuggestions) {
          quickSuggestionsList.innerHTML = '';
          suggestions.forEach((sug) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'px-2 py-0.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold transition-all cursor-pointer text-[10px] uppercase';
            btn.textContent = sug;
            btn.addEventListener('click', () => {
              if (quickLookupInput) quickLookupInput.value = sug;
              updateDictionaryDefinitionCard(sug);
            });
            quickSuggestionsList.appendChild(btn);
          });
          quickLookupSuggestions.classList.remove('hidden');
        }

        // Show closest suggestion definition preview!
        const previewEntry = getDewanDefinition(suggestions[0]);
        if (previewEntry) {
          if (dictBriefText) {
            dictBriefText.innerHTML = `<span class="font-bold text-primary">${suggestions[0].toUpperCase()}:</span> ${previewEntry.meaning}`;
          }
          if (dictExampleText) dictExampleText.textContent = previewEntry.example;
          if (dictExampleParagraph) dictExampleParagraph.classList.remove('hidden');
          if (dictRootsText) dictRootsText.textContent = previewEntry.roots;
          if (dictRootsParagraph) dictRootsParagraph.classList.remove('hidden');
        } else {
          if (dictBriefText) {
            dictBriefText.textContent = `Kata tepat "${cleanWord.toUpperCase()}" tiada. Sila pilih cadangan di atas.`;
          }
          if (dictExampleParagraph) dictExampleParagraph.classList.add('hidden');
          if (dictRootsParagraph) dictRootsParagraph.classList.add('hidden');
        }
      } else {
        if (dictStatusBadge) {
          dictStatusBadge.textContent = 'Tidak Ditemui';
          dictStatusBadge.className = 'text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800';
        }
        if (dictBriefText) {
          dictBriefText.textContent = `Perkataan "${cleanWord.toUpperCase()}" tiada dalam daftar Kamus Dewan Edisi Ke-4. Sila semak ejaan.`;
        }
        if (dictExampleParagraph) dictExampleParagraph.classList.add('hidden');
        if (dictRootsParagraph) dictRootsParagraph.classList.add('hidden');
        if (quickLookupSuggestions) quickLookupSuggestions.classList.add('hidden');
      }
      if (dictSynonymText) dictSynonymText.textContent = 'Semakan Kamus Dewan Edisi Ke-4';
    }
  }

  // =========================================================================
  // MATCH TIMER & ENGINE
  // =========================================================================
  function startMatch() {
    gameState.isActive = true;
    gameState.timeRemaining = playerState.durationSeconds;
    gameState.totalDuration = playerState.durationSeconds;
    gameState.score = 0;
    gameState.round = 1;
    gameState.verifiedWords = [];
    gameState.streakCount = 0;
    gameState.lastWordTime = 0;
    gameState.rackTiles = [];
    gameState.reserveWildcards = [true, true, true];
    gameState.shuffleChances = 3;
    updateShuffleButtonUI();

    // HUD Profile
    const activeName = playerState.name || 'Pemain';
    if (hudPlayerName) hudPlayerName.textContent = activeName;
    if (headerPlayerName) headerPlayerName.textContent = activeName;
    const initials = activeName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'P';
    if (hudPlayerInitials) hudPlayerInitials.textContent = initials;
    if (headerModeBadge) {
      const modeLabels = { biasa: 'Mod Biasa', serangan: 'Serangan Masa', kamus: 'Cabaran Kamus' };
      headerModeBadge.textContent = modeLabels[playerState.mode] || 'Klasik';
    }

    // Generate letters & board
    gameState.boardTiles = generateFullBoard();
    renderBoardGrid();
    renderRack();
    updateReserveWildcardUI();

    // Reset word list UI
    if (wordListContainer && wordListEmptyState) {
      wordListContainer.innerHTML = '';
      wordListContainer.appendChild(wordListEmptyState);
      wordListEmptyState.classList.remove('hidden');
    }
    if (headerWordCountPill) headerWordCountPill.textContent = '0 Kata Sah';
    if (playerTotalScore) playerTotalScore.textContent = '0';
    if (averageScoreDisplay) averageScoreDisplay.textContent = '0.0 Mata / Kata';

    // Start timer interval
    if (gameState.timerInterval) clearInterval(gameState.timerInterval);
    updateTimerDisplay();

    gameState.timerInterval = setInterval(() => {
      gameState.timeRemaining--;
      updateTimerDisplay();

      if (gameState.timeRemaining === 30) {
        showToast('Tinggal 30 saat lagi!', 'timer');
        playTone(330, 'sine', 0.1);
      }

      if (gameState.timeRemaining <= 0) {
        clearInterval(gameState.timerInterval);
        endMatch();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    if (!countdownTimer) return;
    const totalSecs = Math.max(0, gameState.timeRemaining);
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    countdownTimer.textContent = `${mins}:${secs}`;

    // Update circular SVG progress
    if (timerProgressRing && gameState.totalDuration > 0) {
      const circumference = 125.66; // 2 * PI * 20
      const progress = totalSecs / gameState.totalDuration;
      const offset = circumference * (1 - progress);
      timerProgressRing.style.strokeDashoffset = offset;
    }
  }

  function endMatch() {
    gameState.isActive = false;
    playTone(260, 'sawtooth', 0.25);
    setTimeout(() => playTone(220, 'sawtooth', 0.35), 180);

    // Save to local score records
    saveMatchRecord();

    // Show End Modal
    if (endFinalScore) endFinalScore.textContent = gameState.score.toLocaleString();
    if (endFinalWordCount) endFinalWordCount.textContent = gameState.verifiedWords.length;
    
    // Find best word
    let best = "-";
    if (gameState.verifiedWords.length > 0) {
      const topWord = [...gameState.verifiedWords].sort((a, b) => b.score - a.score)[0];
      best = `${topWord.word} (+${topWord.score})`;
    }
    if (endBestWord) endBestWord.textContent = best;

    // Title rank
    let title = "Pendekar Kata";
    if (gameState.score >= 120) title = "Laksamana Bahasa";
    else if (gameState.score >= 60) title = "Pendeta Cendekia";
    else if (gameState.score >= 30) title = "Pahlawan Dewan";
    if (endPlayerTitle) endPlayerTitle.textContent = title;

    if (gameEndPopup) {
      gameEndPopup.classList.remove('hidden');
    }
  }

  function saveMatchRecord() {
    try {
      const existing = JSON.parse(localStorage.getItem('sahibba_records') || '[]');
      existing.unshift({
        name: playerState.name,
        score: gameState.score,
        wordCount: gameState.verifiedWords.length,
        mode: playerState.mode,
        date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      // Keep top 10
      localStorage.setItem('sahibba_records', JSON.stringify(existing.slice(0, 10)));
    } catch (e) {}
  }

  // =========================================================================
  // VIEW TRANSITIONS & LOBBY CONTROLS
  // =========================================================================
  function switchView(viewName) {
    if (viewName === 'game') {
      viewLogin.classList.add('hidden');
      viewGame.classList.remove('hidden');
      window.scrollTo(0, 0);
    } else {
      if (gameState.timerInterval) clearInterval(gameState.timerInterval);
      gameState.isActive = false;
      viewGame.classList.add('hidden');
      viewLogin.classList.remove('hidden');
      window.scrollTo(0, 0);
    }
  }

  // Lobby Name Randomizer (Funny Names)
  if (btnRandomName) {
    btnRandomName.addEventListener('click', () => {
      let counter = 0;
      if (iconRandom) iconRandom.classList.add('rotate-180');
      playTone(520, 'sine', 0.04);

      const interval = setInterval(() => {
        const temp = FUNNY_NAMES[Math.floor(Math.random() * FUNNY_NAMES.length)];
        inputPlayerName.value = temp;
        counter++;
        if (counter > 6) {
          clearInterval(interval);
          const current = inputPlayerName.value;
          const choices = FUNNY_NAMES.filter(n => n !== current);
          const pick = choices[Math.floor(Math.random() * choices.length)];
          inputPlayerName.value = pick;
          playerState.name = pick;
          if (iconRandom) iconRandom.classList.remove('rotate-180');
          inputPlayerName.focus();
          playTone(680, 'triangle', 0.08);
        }
      }, 50);
    });
  }

  if (inputPlayerName) {
    inputPlayerName.addEventListener('input', (e) => {
      playerState.name = e.target.value.trim();
    });
  }

  // Lobby Mode Selection
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      modeCards.forEach(c => {
        c.classList.remove('bg-surface-container', 'ring-2', 'ring-primary', 'shadow-lg', 'shadow-xl', 'border-primary/20');
        c.classList.add('bg-surface-container-low', 'border-transparent');
        const check = c.querySelector('.mode-check');
        if (check) check.classList.replace('opacity-100', 'opacity-0');
        const iconBox = c.querySelector('.mode-icon-box');
        if (iconBox) {
          iconBox.classList.remove('bg-primary', 'text-on-primary');
          iconBox.classList.add('bg-surface-container-lowest', 'text-primary');
        }
      });

      card.classList.remove('bg-surface-container-low', 'border-transparent');
      card.classList.add('bg-surface-container', 'ring-2', 'ring-primary', 'shadow-lg', 'border-primary/20');
      const check = card.querySelector('.mode-check');
      if (check) check.classList.replace('opacity-0', 'opacity-100');
      const iconBox = card.querySelector('.mode-icon-box');
      if (iconBox) {
        iconBox.classList.remove('bg-surface-container-lowest', 'text-primary');
        iconBox.classList.add('bg-primary', 'text-on-primary');
      }

      playerState.mode = card.getAttribute('data-mode') || 'serangan';
      playTone(480, 'sine', 0.05);
    });
  });

  // Duration Selection
  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-on-primary', 'shadow-md');
        b.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      });
      btn.classList.add('active', 'bg-primary', 'text-on-primary', 'shadow-md');
      btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');

      const secs = parseInt(btn.getAttribute('data-time') || '300', 10);
      playerState.durationSeconds = secs;
      if (selectedDurationLabel) {
        const mins = secs >= 60 ? `${Math.floor(secs / 60)} Minit` : `${secs} Saat`;
        selectedDurationLabel.textContent = mins;
      }
      playTone(440, 'sine', 0.05);
    });
  });

  // Difficulty Selection
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-on-primary', 'shadow-md');
        b.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      });
      btn.classList.add('active', 'bg-primary', 'text-on-primary', 'shadow-md');
      btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');

      const diff = btn.getAttribute('data-diff') || 'sederhana';
      playerState.difficulty = diff;
      if (selectedDifficultyLabel) {
        selectedDifficultyLabel.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
      }
      playTone(460, 'sine', 0.05);
    });
  });

  // Start Game Button in Lobby
  if (btnStartGame) {
    btnStartGame.addEventListener('click', () => {
      const name = inputPlayerName.value.trim();
      if (!name) {
        showToast('Sila masukkan nama pemain terlebih dahulu!', 'warning');
        inputPlayerName.focus();
        return;
      }
      playerState.name = name;

      btnStartGame.innerHTML = `<span class="material-symbols-outlined animate-spin text-2xl">sync</span><span>Menyediakan Arena Papan...</span>`;
      btnStartGame.classList.add('opacity-90');
      playTone(520, 'sine', 0.1);

      setTimeout(() => {
        btnStartGame.innerHTML = `<span class="material-symbols-outlined text-2xl">play_circle</span><span>Mula Permainan Sekarang</span>`;
        btnStartGame.classList.remove('opacity-90');
        switchView('game');
        startMatch();
      }, 450);
    });
  }

  // Interactive Tile Wiggle in Lobby Header Banner
  document.querySelectorAll('.interactive-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      tile.classList.remove('tile-wiggle');
      void tile.offsetWidth; // Reflow
      tile.classList.add('tile-wiggle');

      const score = tile.getAttribute('data-score');
      const badge = document.createElement('div');
      badge.textContent = `+${score}`;
      badge.className = 'absolute -top-4 font-tile-score font-black text-xs text-primary bg-surface-container-lowest px-1.5 py-0.5 rounded-full shadow-md animate-bounce pointer-events-none';
      tile.appendChild(badge);
      setTimeout(() => badge.remove(), 800);

      playTone(550, 'sine', 0.06);
    });
  });

  // =========================================================================
  // ARENA ACTION BUTTONS
  // =========================================================================
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (gameState.rackTiles.length > 0) {
        playTone(300, 'sine', 0.06);
        removeTileFromRack(gameState.rackTiles.length - 1);
      }
    });
  }

  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      if (gameState.rackTiles.length > 0) {
        playTone(260, 'sine', 0.08);
        clearRack();
        showToast('Pilihan huruf telah dibatalkan.', 'info');
      }
    });
  }

  function updateShuffleButtonUI() {
    if (shuffleCountBadge) {
      shuffleCountBadge.textContent = `${gameState.shuffleChances}/3`;
      if (gameState.shuffleChances === 0) {
        shuffleCountBadge.className = 'ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-200 text-neutral-500';
      } else {
        shuffleCountBadge.className = 'ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary';
      }
    }
    if (btnShuffle) {
      if (gameState.shuffleChances <= 0) {
        btnShuffle.disabled = true;
        btnShuffle.classList.add('opacity-50', 'cursor-not-allowed');
        btnShuffle.classList.remove('hover:bg-surface-container-high', 'hover:text-primary');
        btnShuffle.title = 'Peluang rombak papan telah habis (0/3)';
      } else {
        btnShuffle.disabled = false;
        btnShuffle.classList.remove('opacity-50', 'cursor-not-allowed');
        btnShuffle.classList.add('hover:bg-surface-container-high', 'hover:text-primary');
        btnShuffle.title = `Rombak Papan (Baki: ${gameState.shuffleChances}/3)`;
      }
    }
  }

  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      if (!gameState.isActive) {
        showToast('Permainan belum bermula atau masa telah tamat!', 'warning');
        return;
      }

      if (gameState.shuffleChances <= 0) {
        soundFX.playError();
        showToast('Peluang rombak papan telah habis (0/3)!', 'warning');
        return;
      }

      gameState.shuffleChances--;
      updateShuffleButtonUI();

      // Return any current tray letters before refreshing board
      clearRack();

      // Generate a brand new set of 36 balanced letters
      gameState.boardTiles = generateFullBoard();

      playShuffleCascade();
      renderBoardGrid();
      renderRack();
      updateRemainingCounter();

      showToast(`Papan dirombak dengan semua huruf baharu! (Baki: ${gameState.shuffleChances}/3)`, 'sync');
    });
  }

  if (btnSubmitWord) {
    btnSubmitWord.addEventListener('click', () => {
      submitConstructedWord();
    });
  }

  // Wildcard reserve buttons
  if (wildcardReserveContainer) {
    wildcardReserveContainer.querySelectorAll('button').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        addReserveWildcard(idx);
      });
    });
  }

  // Audio Toggle
  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioIcon.textContent = 'volume_up';
        showToast('Kesan bunyi diaktifkan', 'volume_up');
        playTone(520, 'sine', 0.1);
      } else {
        audioIcon.textContent = 'volume_off';
        showToast('Kesan bunyi diredamkan', 'volume_off');
      }
    });
  }

  // Fullscreen Toggle
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Theme Switcher
  function applyTheme(themeKey) {
    document.body.classList.remove('theme-kayu', 'theme-gelap');
    if (themeKey === 'kayu-klasik') {
      document.body.classList.add('theme-kayu');
    } else if (themeKey === 'mod-gelap') {
      document.body.classList.add('theme-gelap');
    }
    localStorage.setItem('sahibba_theme', themeKey);
    if (themeSelect) themeSelect.value = themeKey;
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      applyTheme(e.target.value);
    });
    // Load saved theme
    const savedTheme = localStorage.getItem('sahibba_theme') || 'biru-moden';
    applyTheme(savedTheme);
  }

  // Back to Lobby
  function confirmExitToLobby() {
    if (gameState.isActive && gameState.timeRemaining > 0 && gameState.verifiedWords.length > 0) {
      if (confirm('Perlawanan sedang berlangsung. Adakah anda pasti mahu kembali ke lobi?')) {
        switchView('login');
      }
    } else {
      switchView('login');
    }
  }

  if (btnExitToLobby) btnExitToLobby.addEventListener('click', confirmExitToLobby);
  if (navLogoLobby) navLogoLobby.addEventListener('click', confirmExitToLobby);

  // Semakan Maksud Pantas Search & Lookup (Live search & Instant matching)
  function performQuickLookup(playAudio = false) {
    if (!quickLookupInput) return;
    const query = quickLookupInput.value.trim();
    if (!query) {
      if (quickLookupSuggestions) quickLookupSuggestions.classList.add('hidden');
      return;
    }

    if (playAudio) soundFX.playClick();
    updateDictionaryDefinitionCard(query);
  }

  if (quickLookupInput) {
    // Live lookup on every keystroke
    quickLookupInput.addEventListener('input', () => {
      performQuickLookup(false);
    });
    quickLookupInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performQuickLookup(true);
      }
    });
  }

  if (quickLookupBtn) {
    quickLookupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      performQuickLookup(true);
    });
  }

  // =========================================================================
  // MODAL HANDLERS
  // =========================================================================
  // 1. Rules Modal
  function toggleRulesModal(show) {
    if (rulesModal) {
      if (show) rulesModal.classList.remove('hidden');
      else rulesModal.classList.add('hidden');
    }
  }

  if (btnOpenRulesLobby) btnOpenRulesLobby.addEventListener('click', () => toggleRulesModal(true));
  if (btnOpenRulesArena) btnOpenRulesArena.addEventListener('click', () => toggleRulesModal(true));
  if (btnCloseRules) btnCloseRules.addEventListener('click', () => toggleRulesModal(false));
  if (btnModalUnderstood) btnModalUnderstood.addEventListener('click', () => toggleRulesModal(false));
  if (rulesModal) {
    rulesModal.addEventListener('click', (e) => {
      if (e.target === rulesModal) toggleRulesModal(false);
    });
  }

  // 2. Dictionary Search Modal
  function toggleDictModal(show) {
    if (dictModal) {
      if (show) {
        dictModal.classList.remove('hidden');
        if (dictSearchInput) {
          dictSearchInput.value = '';
          dictSearchInput.focus();
        }
      } else {
        dictModal.classList.add('hidden');
      }
    }
  }

  if (btnNavDict) btnNavDict.addEventListener('click', () => toggleDictModal(true));
  if (btnQuickDict) btnQuickDict.addEventListener('click', () => toggleDictModal(true));
  if (btnCloseDictModal) btnCloseDictModal.addEventListener('click', () => toggleDictModal(false));
  if (dictModal) {
    dictModal.addEventListener('click', (e) => {
      if (e.target === dictModal) toggleDictModal(false);
    });
  }

  function executeDictSearch() {
    const query = (dictSearchInput.value || '').trim().toLowerCase();
    if (!query) return;

    const exists = validateWordInDictionary(query);
    if (!dictSearchResultBox) return;

    if (exists) {
      const entry = getDewanDefinition(query) || {
        meaning: `Perkataan sah mengikut daftar rasmi Kamus Dewan Edisi Ke-4 Dewan Bahasa dan Pustaka.`,
        example: `"${query.toUpperCase()}" sah digunakan dalam perlawanan Sahibba.`,
        roots: `Bentuk Kata Rasmi DBP`,
        synonyms: `Daftar Rasmi Kamus Dewan Edisi Keempat (DBP)`
      };

      dictSearchResultBox.innerHTML = `
        <div class="w-full text-left max-h-[300px] overflow-y-auto pr-1">
          <div class="flex items-center gap-2 mb-2">
            <span class="font-headline-md text-base font-bold text-primary">${query.toUpperCase()}</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">SAH DBP ED. 4</span>
          </div>
          <p class="text-xs text-on-surface leading-relaxed mb-2 font-medium">${entry.meaning}</p>
          ${entry.example ? `<p class="text-[11px] text-on-surface-variant italic mb-2 bg-surface-container p-2 rounded-lg">Contoh: ${entry.example}</p>` : ''}
          ${entry.roots ? `<p class="text-[10px] text-secondary font-semibold">${entry.roots}</p>` : ''}
        </div>
      `;
    } else {
      dictSearchResultBox.innerHTML = `
        <div class="text-center text-error">
          <span class="material-symbols-outlined text-3xl mb-1">cancel</span>
          <p class="font-bold text-sm">${query.toUpperCase()} - Tidak Sah</p>
          <p class="text-xs text-on-surface-variant mt-1">Perkataan ini tidak dijumpai dalam daftar Kamus Dewan Edisi Keempat.</p>
        </div>
      `;
    }
  }

  if (btnDoSearchWord) btnDoSearchWord.addEventListener('click', executeDictSearch);
  if (dictSearchInput) {
    dictSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') executeDictSearch();
    });
  }

  // 3. Leaderboard Modal
  function toggleLeaderboardModal(show) {
    if (leaderboardModal) {
      if (show) {
        leaderboardModal.classList.remove('hidden');
        renderLeaderboardRecords();
      } else {
        leaderboardModal.classList.add('hidden');
      }
    }
  }

  function renderLeaderboardRecords() {
    if (!leaderboardList) return;
    leaderboardList.innerHTML = '';
    const records = JSON.parse(localStorage.getItem('sahibba_records') || '[]');

    if (records.length === 0) {
      leaderboardList.innerHTML = `
        <div class="p-6 text-center text-xs text-on-surface-variant">
          Belum ada rekod perlawanan dicatatkan. Main perlawanan pertama anda sekarang!
        </div>
      `;
      return;
    }

    records.forEach((rec, idx) => {
      const row = document.createElement('div');
      row.className = 'p-3 rounded-2xl bg-surface-container-low flex items-center justify-between text-xs';
      row.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="w-6 h-6 rounded-lg ${idx < 3 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface'} flex items-center justify-center font-bold text-[11px]">
            ${idx + 1}
          </span>
          <div class="flex flex-col">
            <span class="font-bold text-on-surface">${rec.name}</span>
            <span class="text-[10px] text-on-surface-variant">${rec.wordCount} kata &bull; ${rec.date}</span>
          </div>
        </div>
        <div class="flex items-baseline gap-1 font-bold text-primary text-sm">
          ${rec.score} <span class="text-[10px] font-normal text-on-surface-variant">mata</span>
        </div>
      `;
      leaderboardList.appendChild(row);
    });
  }

  if (btnNavScores) btnNavScores.addEventListener('click', () => toggleLeaderboardModal(true));
  if (btnQuickLeaderboard) btnQuickLeaderboard.addEventListener('click', () => toggleLeaderboardModal(true));
  if (btnCloseLeaderboard) btnCloseLeaderboard.addEventListener('click', () => toggleLeaderboardModal(false));
  if (leaderboardModal) {
    leaderboardModal.addEventListener('click', (e) => {
      if (e.target === leaderboardModal) toggleLeaderboardModal(false);
    });
  }

  // 4. Game End Modal Buttons
  if (btnEndBackToLobby) {
    btnEndBackToLobby.addEventListener('click', () => {
      if (gameEndPopup) gameEndPopup.classList.add('hidden');
      switchView('login');
    });
  }

  if (btnEndPlayAgain) {
    btnEndPlayAgain.addEventListener('click', () => {
      if (gameEndPopup) gameEndPopup.classList.add('hidden');
      startMatch();
    });
  }

  // =========================================================================
  // INITIALIZE APP
  // =========================================================================
  Promise.all([loadDictionary(), loadEdisiKeempat()]).then(() => {
    if (window.location.hash === '#game' || window.location.search.includes('view=game')) {
      switchView('game');
      startMatch();
    }
  });

})();
