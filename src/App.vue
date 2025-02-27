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
    <nav class="relative z-10 w-full max-w-7xl mx-auto bg-white/20 backdrop-blur-md shadow-lg rounded-xl p-4 flex justify-between items-center border border-white/30 mt-6">
      <!-- Logo dan Petir -->
      <div class="lightning-container">
        <img src="@/assets/tayo.png" alt="Icon" class="w-24 h-24 animate-glow">
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
      <div class="flex-grow mx-4">
        <form @submit.prevent="performSearch" class="flex items-center gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari di Google..."
            class="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class=" px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
          >
            🔍
          </button>
        </form>
      </div>

      <!-- Tombol Toggle Tema -->
     

      <!-- Tombol Musik -->
      <div class="flex justify-between gap-4">
        <button
          @click="toggleTheme"
          class="p-3 rounded-full shadow-lg bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all"
        >
          <span v-if="isDarkMode">🌞</span>
          <span v-else>🌙</span>
        </button>

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
      <source src="@/assets/lily.mp3" type="audio/mpeg" />
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
      <div class="gcse-searchresults-only"></div>
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

// Refs untuk elemen DOM
const musicToggle = ref(null);
const musicIcon = ref(null);
const backgroundMusic = ref(null);

// State untuk pencarian Google
const searchQuery = ref('');

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
    console.error('Elemen tidak ditemukan!');
  }

  const script = document.createElement('script');
  script.src = 'https://cse.google.com/cse.js?cx=84c3a5d56e2924c61';
  script.async = true;
  script.onload = () => {
    console.log('Google Custom Search script loaded successfully!');
  };
  script.onerror = () => {
    console.error('Failed to load Google Custom Search script.');
  };
  document.head.appendChild(script);


  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-theme');
  }
});

// Fungsi untuk melakukan pencarian Google
const performSearch = () => {
  if (searchQuery.value.trim()) {
    setTimeout(() => {
      const googleInput = document.querySelector('.gsc-input input');
      if (googleInput) {
        googleInput.value = searchQuery.value;
        const event = new Event('input', { bubbles: true });
        googleInput.dispatchEvent(event);
        const googleForm = document.querySelector('.gsc-search-box form');
        if (googleForm) {
          googleForm.submit();
        }
      } else {
        console.error('Elemen Google input tidak ditemukan!');
      }
    }, 500);
  }
};
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
:root {
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

/* Efek petir */
.lightning {
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

/* Efek glow pada teks dan ikon */
.animate-glow {
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
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
</style>