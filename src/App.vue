<template>
  <div :class="{'dark-theme': isDarkMode}" class="relative min-h-screen flex flex-col overflow-hidden">
    <!-- Animated Clouds -->
    <div class="absolute inset-0 opacity-50">
      <div class="cloud cloud1">
        <div class="cloud-part part1"></div>
        <div class="cloud-part part2"></div>
        <div class="cloud-part part3"></div>
        <div class="cloud-part part4"></div>
      </div>
      <div class="cloud cloud2">
        <div class="cloud-part part1"></div>
        <div class="cloud-part part2"></div>
        <div class="cloud-part part3"></div>
        <div class="cloud-part part4"></div>
      </div>
      <div class="cloud cloud3">
        <div class="cloud-part part1"></div>
        <div class="cloud-part part2"></div>
        <div class="cloud-part part3"></div>
        <div class="cloud-part part4"></div>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="relative z-10 w-full max-w-7xl mx-auto bg-white/20 backdrop-blur-md shadow-lg rounded-xl p-4 flex flex-col md:flex-row justify-between items-center border border-white/30 mt-6">
    <!-- Logo dan Petir -->
    <div class="lightning-container flex items-center gap-2">
      <h1 class="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
        <span class="text-3xl animate-glow">📱</span>
        <span class="animate-glow">Mobile Teknologi</span>
      </h1>
      <!-- SVG untuk petir -->
      <svg class="lightning" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 0 L60 30 L50 40 L70 50 L40 70 L50 60 L30 50 Z"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <!-- Form Pencarian Custom -->
    <!-- <div class="flex-grow mx-4 w-full md:w-auto mt-4 md:mt-0">
      <form @submit.prevent="performSearch" class="flex items-center gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari di Google..."
          class="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
        >
          🔍
        </button>
      </form>
    </div> -->
   <!-- Jam Digital + Cuaca -->
    <div class="flex-grow mx-4 w-full md:w-auto mt-4 md:mt-0 flex justify-center items-center gap-4">
      <!-- Jam -->
      <div
        class="px-5 py-2 rounded-2xl font-mono text-2xl md:text-3xl text-center tracking-widest shadow-xl"
        :class="[isDarkMode ? 'text-blue-300 bg-white/10 border border-blue-500/30' : 'text-blue-900 bg-white/60 border border-blue-300/50', 'backdrop-blur-md transition-all duration-700']"
      >
        ⏰ {{ currentTime }}
      </div>

      <!-- Cuaca -->
      <div
        class="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-xl"
        :class="[isDarkMode ? 'text-white bg-white/10 border border-white/20' : 'text-blue-900 bg-white/60 border border-blue-300/50', 'backdrop-blur-md transition-all duration-700']"
      >
        <span v-if="weatherIcon" v-html="weatherIcon"></span>
        <span>{{ location }}: {{ weatherDescription }}</span>
      </div>
    </div>


    <!-- Tombol Toggle Tema dan Musik -->
    <div class="flex justify-between gap-4 mt-4 md:mt-0">
      <!-- Tombol Toggle Tema -->
      <button
        @click="toggleTheme"
        class="p-3 rounded-full shadow-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
      >
        <span v-if="isDarkMode">🌞</span>
        <span v-else>🌙</span>
      </button>

      <!-- Tombol Musik -->
      <button
        ref="musicToggle"
        class="p-3 rounded-full shadow-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
      >
        <span ref="musicIcon">🎵</span>
      </button>
    </div>
  </nav>

    <!-- Audio -->
    <audio ref="backgroundMusic" loop>
      <source src="@/assets/wildflower.mp3" type="audio/mpeg" />
      Browser Anda tidak mendukung elemen audio.
    </audio>
    <!-- Main Content -->
    <div
      class="relative z-10 flex-grow w-full max-w-7xl mx-auto mt-8 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/20 hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-1"
      :style="{
        backgroundImage: isDarkMode
          ? 'url(https://www.transparenttextures.com/patterns/cartographer.png), linear-gradient(to bottom, #0a0a23, #1a1a2e)' /* Gradien gerhana bulan */
          : 'url(https://www.transparenttextures.com/patterns/cartographer.png), linear-gradient(to bottom, #0091ff, #a4dcfc)', /* Gradien langit cerah */
        backgroundBlendMode: 'overlay',
      }"
    >
      <!-- Tempat Hasil Pencarian Google -->
      <!-- <div class="gcse-searchresults-only"></div>
  -->
      <router-view />
    </div>

    <!-- Footer -->
   <footer
    class="relative z-10 w-full max-w-7xl mx-auto text-center text-white p-4 rounded-xl mt-8 mb-6"
    :class="{'dark-theme-footer': isDarkMode, 'light-theme-footer': !isDarkMode}"
  >
    <p class="text-sm">© 2025 Sigit Hardianto. All rights reserved.</p>
  </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// Refs untuk elemen DOM
const musicToggle = ref(null);
const musicIcon = ref(null);
const backgroundMusic = ref(null);

// State untuk pencarian Google
const searchQuery = ref('');
const currentTime = ref("");
const notified = ref(false); // supaya notifikasi jam 12:00 cuma muncul sekali
const weatherDescription = ref('Memuat cuaca...')
const weatherIcon = ref(null)
const location = ref(''); 

// State untuk tema gelap
const isDarkMode = ref(localStorage.getItem('theme') === 'dark');

// Fungsi untuk mengubah tema
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark-theme', isDarkMode.value);
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

provide('isDarkMode', isDarkMode);
// Fungsi untuk memutar/menghentikan musik
onMounted(() => {
  // Update waktu & notifikasi
  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    currentTime.value = `${hours}:${minutes}:${seconds}`;

    // Notifikasi jam pelajaran selesai
    if (hours === "12" && minutes === "00" && !notified.value) {
      Swal.fire({
        title: "📚 Jam Pelajaran Selesai!",
        text: "Waktunya istirahat atau lanjut ke kegiatan lainnya.",
        icon: "success",
        confirmButtonText: "Siap! 🚀",
        background: isDarkMode.value ? "#1f2937" : "#f0f9ff",
        color: isDarkMode.value ? "#f9fafb" : "#1f2937",
        confirmButtonColor: isDarkMode.value ? "#4ade80" : "#3b82f6",
      });
      notified.value = true;
    }

    // Reset notifikasi keesokan harinya
    if (hours === "00" && minutes === "00" && seconds === "00") {
      notified.value = false;
    }
  };

  updateTime();
  setInterval(updateTime, 1000);

  // Cek tema dark
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
  }

  // Toggle musik
  if (musicToggle.value && musicIcon.value && backgroundMusic.value) {
    musicToggle.value.addEventListener('click', () => {
      if (backgroundMusic.value.paused) {
        backgroundMusic.value.play();
        musicIcon.value.textContent = '⏸️';
      } else {
        backgroundMusic.value.pause();
        musicIcon.value.textContent = '🎵';
      }
    });
  } else {
    console.error('Elemen musik tidak ditemukan!');
  }

  // Load Google Custom Search
  // const script = document.createElement('script');
  // script.src = 'https://cse.google.com/cse.js?cx=84c3a5d56e2924c61';
  // script.async = true;
  // script.onload = () => {
  //   console.log('Google Custom Search script loaded successfully!');
  // };
  // script.onerror = () => {
  //   console.error('Failed to load Google Custom Search script.');
  // };
  // document.head.appendChild(script);

  // Ambil cuaca (langsung di sini)
  const apiKey = 'b3a273f9c8b9b6b545daeddc92c6d50a'; // ← Ganti ini!
  const lat = -6.901277336454229;
  const lon = 107.59783869058961;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=id&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      const city = data.name || 'Lokasi tidak diketahui';
      location.value = `Cuaca di ${city}`;

      if (data.weather && data.weather.length > 0) {
        weatherDescription.value = `${data.weather[0].description}`;
        const iconCode = data.weather[0].icon;
        weatherIcon.value = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" class="w-8 h-8" />`;
      } else {
        weatherDescription.value = 'Data cuaca kosong';
        weatherIcon.value = '';
      }
    })

    .catch(err => {
      weatherDescription.value = 'Gagal ambil cuaca';
      location.value = '';
      console.error('Fetch weather error:', err);
    });

});


// Fungsi untuk melakukan pencarian Google
// const performSearch = () => {
//   if (searchQuery.value.trim()) {
//     // NProgress.start();
//     setTimeout(() => {
//       const googleInput = document.querySelector('.gsc-input input');
//       if (googleInput) {
//         googleInput.value = searchQuery.value;
//         const event = new Event('input', { bubbles: true });
//         googleInput.dispatchEvent(event);
//         const googleForm = document.querySelector('.gsc-search-box form');
//         if (googleForm) {
//           googleForm.submit();
//           // NProgress.done(); 
//         }
//       } else {
//         console.error('Elemen Google input tidak ditemukan!');
//         // NProgress.done(); 
//       }
//     }, 500);
//   }
// };
</script>

<style>


/* Tema Gelap */
.dark-theme {
  background: linear-gradient(to bottom, #0a0a23, #1a1a2e); /* Gradien biru tua ke hitam */
  color: #ffffff; /* Warna teks putih */
}

.dark-theme nav {
  background: rgba(0, 0, 0, 0.5); /* Latar belakang semi-transparan */
  border-color: rgba(255, 255, 255, 0.1); /* Warna border */
}

.dark-theme input {
  background: rgba(255, 255, 255, 0.1); /* Latar belakang input semi-transparan */
  color: #ffffff; /* Warna teks input */
}

.dark-theme .cloud-part {
  background: rgba(255, 255, 255, 0.1); /* Latar belakang elemen awan */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Bayangan untuk efek kedalaman */
}

/* Efek tambahan untuk nuansa gerhana bulan */
.dark-theme::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.1), transparent 70%);
  pointer-events: none;
}

/* Tema Terang */
:root:root {
  background: linear-gradient(to bottom, #0091ff, #a4dcfc); /* Gradien biru langit cerah */
  color: #000000; /* Warna teks hitam */
}

:root nav {
  background: rgba(255, 255, 255, 0.2); /* Latar belakang semi-transparan */
  border-color: rgba(255, 255, 255, 0.3); /* Warna border */
}

:root input {
  background: rgba(255, 255, 255, 0.2); /* Latar belakang input semi-transparan */
  color: #000000; /* Warna teks input */
}

:root .cloud-part {
  background: rgba(255, 255, 255, 0.8); /* Latar belakang elemen awan */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bayangan untuk efek kedalaman */
}
/* Animasi dan efek lainnya */
@keyframes moveCloud {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

.cloud {
  position: absolute;
  width: 200px;
  height: 100px;
  animation: moveCloud 20s infinite linear;
}

.cloud-part {
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
}

.cloud .part1 {
  width: 80px;
  height: 80px;
  top: 0;
  left: 0;
}

.cloud .part2 {
  width: 100px;
  height: 100px;
  top: -30px;
  left: 50px;
}

.cloud .part3 {
  width: 120px;
  height: 120px;
  top: -50px;
  left: 120px;
}

.cloud .part4 {
  width: 80px;
  height: 80px;
  top: 0;
  left: 180px;
}

/* Container untuk petir */
.lightning-container {
  position: relative;
}

/* Animasi petir */
@keyframes lightning-strike {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  10% {
    opacity: 1;
    transform: scale(1.2);
  }
  20% {
    opacity: 0;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.dark-theme .lightning {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 20%,
    rgba(0, 0, 0, 0.6) 50%,
    transparent 80%
  );
  clip-path: polygon(50% 0%, 60% 20%, 55% 40%, 65% 60%, 50% 80%, 35% 60%, 45% 40%, 40% 20%);
  animation: lightning-strike 2s infinite;
  pointer-events: none;
  z-index: 1;
}


/* Efek petir untuk tema terang */
:root .lightning {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 20%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 80%
  );
  clip-path: polygon(50% 0%, 60% 20%, 55% 40%, 65% 60%, 50% 80%, 35% 60%, 45% 40%, 40% 20%);
  animation: lightning-strike 2s infinite;
  pointer-events: none;
  z-index: 1;
}
:root .animate-glow {
  animation: glow-light 1.5s infinite alternate;
}

@keyframes glow-light {
  0% {
    text-shadow: 
      0 0 5px #ffffff, 
      0 0 10px #ffffff, 
      0 0 20px #00ffff, 
      0 0 40px #00ffff, 
      0 0 80px #00ffff;
    filter: drop-shadow(0 0 5px #ffffff) drop-shadow(0 0 10px #00ffff);
  }
  90% {
    text-shadow: none;
    filter: none;
  }
  100% {
    text-shadow: 
      0 0 5px #ffffff, 
      0 0 10px #ffffff, 
      0 0 20px #00ffff, 
      0 0 40px #00ffff, 
      0 0 80px #00ffff;
    filter: drop-shadow(0 0 5px #ffffff) drop-shadow(0 0 10px #00ffff);
  }
}


.dark-theme .animate-glow {
  animation: glow-dark 1.5s infinite alternate;
}

@keyframes glow-dark {
  0% {
    text-shadow: 
      0 0 5px #000000, 
      0 0 10px #000000, 
      0 0 20px #0077ff, 
      0 0 40px #0077ff, 
      0 0 80px #0077ff;
    filter: drop-shadow(0 0 5px #000000) drop-shadow(0 0 10px #0077ff);
  }
  90% {
    text-shadow: none;
    filter: none;
  }
  100% {
    text-shadow: 
      0 0 5px #000000, 
      0 0 10px #000000, 
      0 0 20px #0077ff, 
      0 0 40px #0077ff, 
      0 0 80px #0077ff;
    filter: drop-shadow(0 0 5px #000000) drop-shadow(0 0 10px #0077ff);
  }
}

/* Animasi gradien bergerak seperti air mengalir */
@keyframes flowing-water {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

/* Animasi ripple (gelombang air) */
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

/* Styling footer dengan efek air yang realistis */
footer {
  position: relative;
  overflow: hidden; /* Agar efek ripple tidak keluar dari footer */
   background: linear-gradient(to bottom, #0091ff, #a4dcfc);
  background-size: 200% 100%; /* Membuat gradien lebih lebar untuk animasi */
  animation: flowing-water 6s infinite linear; /* Animasi gradien bergerak */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Border transparan */
  backdrop-filter: blur(10px); /* Efek blur */
  color: white; /* Warna teks */
  border-radius: 15px; /* Sudut melengkung */
  padding: 20px; /* Padding */
  text-align: center; /* Teks di tengah */
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4); /* Bayangan biru untuk efek air */
}

/* Efek ripple (gelombang air) */
footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
  animation: ripple 4s infinite ease-in-out;
  border-radius: 15px;
  pointer-events: none; /* Agar tidak mengganggu interaksi */
}

.dark-theme-footer {
  background: linear-gradient(to bottom, #0a0a23, #1a1a2e);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.light-theme-footer {
  background: linear-gradient(90deg, rgba(0, 123, 255, 0.6), rgba(0, 255, 255, 0.6), rgba(0, 123, 255, 0.6));
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

/* Sembunyikan form default Google */
.gsc-control-cse {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}

.gsc-input-box {
  border: none !important;
  background: transparent !important;
}

.gsc-input {
  display: none !important; /* Sembunyikan input default */
}

.gsc-search-button {
  display: none !important; /* Sembunyikan tombol search default */
}

/* Hasil pencarian */
.gsc-results {
  margin-top: 20px;
}
/* Responsif untuk layar kecil */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .lightning-container {
    margin-bottom: 1rem;
  }

  .flex-grow {
    width: 100%;
  }

  .flex.justify-between {
    width: 100%;
    justify-content: space-between;
  }
}
</style>