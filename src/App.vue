<template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br from-sky-400 via-blue-500 to-blue-800 overflow-hidden">
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
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          🔍
        </button>
      </form>
    </div>

    <!-- Tombol Musik -->
    <div class="flex gap-4">
      <button
        ref="musicToggle"
        class="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <span ref="musicIcon">🎵</span>
      </button>
    </div>

    <!-- Audio -->
    <audio ref="backgroundMusic" loop>
      <source src="@/assets/lily.mp3" type="audio/mpeg" />
      Browser Anda tidak mendukung elemen audio.
    </audio>
  </nav>

    <!-- Tempat Hasil Pencarian Google -->
    <div v-if="showResults" class="gcse-searchresults-only mt-8"></div>

    <!-- Tombol Close -->
    <button
      v-if="showResults"
      @click="closeResults"
      class="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-all"
    >
      ✕
    </button>
    <!-- Main Content -->
    <div
      class="relative z-10 flex-grow w-full max-w-7xl mx-auto mt-8 p-8 rounded-2xl shadow-lg backdrop-blur-md border border-white/20
            hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-1"
      style="background-image: url('https://www.transparenttextures.com/patterns/fresh-snow.png'), linear-gradient(to bottom, #E0F2FE, #BAE6FD); background-blend-mode: overlay;"
    >
    
      <!-- Tempat Hasil Pencarian Google -->
      <div class="gcse-searchresults-only"></div>
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="relative z-10 w-full max-w-7xl mx-auto text-center text-white p-4 rounded-xl mt-8 mb-6">
      <p class="text-sm">© 2025 Sigit Hardianto. All rights reserved.</p>
    </footer>

   
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Refs untuk elemen DOM
const musicToggle = ref(null);
const musicIcon = ref(null);
const backgroundMusic = ref(null);

// State untuk pencarian Google
const searchQuery = ref('');

// Fungsi untuk memutar/menghentikan musik
onMounted(() => {
  // Pastikan elemen DOM sudah ada
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
});

// Fungsi untuk melakukan pencarian Google
const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Tunggu sebentar untuk memastikan elemen Google sudah siap
    setTimeout(() => {
      // Cari elemen input Google
      const googleInput = document.querySelector('.gsc-input input');
      if (googleInput) {
        // Set nilai query ke input Google
        googleInput.value = searchQuery.value;
        // Trigger event input (agar Google mengenali perubahan)
        const event = new Event('input', { bubbles: true });
        googleInput.dispatchEvent(event);
        // Submit form Google
        const googleForm = document.querySelector('.gsc-search-box form');
        if (googleForm) {
          googleForm.submit();
        }
      } else {
        console.error('Elemen Google input tidak ditemukan!');
      }
    }, 500); // Tunggu 500ms sebelum mencoba mengakses elemen
  }
};
</script>

<style>
/* Optional: Tambahkan animasi fade-in saat komponen dimuat */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animated Clouds */
.cloud {
  position: absolute;
  width: 200px;
  height: 100px;
  animation: moveCloud 20s infinite linear;
}

.cloud1 {
  top: 10%;
  left: -20%;
  animation-duration: 25s;
}

.cloud2 {
  top: 30%;
  left: -15%;
  animation-duration: 30s;
}

.cloud3 {
  top: 50%;
  left: -25%;
  animation-duration: 35s;
}

.cloud-part {
  position: absolute;
  background: white;
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

@keyframes moveCloud {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
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
  background: linear-gradient(90deg, rgba(0, 123, 255, 0.6), rgba(0, 255, 255, 0.6), rgba(0, 123, 255, 0.6));
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