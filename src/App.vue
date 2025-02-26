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
      <h1 class="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
        <!-- Logo dengan efek menyala -->
        <span class="text-3xl animate-glow">📱</span>
        <!-- Teks Mobile Teknologi dengan efek menyala -->
        <span class="animate-glow">Mobile Teknologi</span>
      </h1>
      <div class="flex gap-4">
        <button class="text-white text-lg hover:text-gray-200 transition">🔍</button>
        <button class="text-white text-lg hover:text-gray-200 transition">⚙️</button>
      </div>
    </nav>

    <!-- Main Content -->
    <div
      class="relative z-10 flex-grow w-full max-w-7xl mx-auto mt-8 p-8 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md border border-white/20
            hover:shadow-2xl hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-1 hover:bg-white/80"
    >
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="relative z-10 w-full max-w-7xl mx-auto bg-white/20 backdrop-blur-md text-center text-white p-4 border border-white/30 rounded-xl mt-8 mb-6">
      <p class="text-sm">© 2025 Sigit Hardianto. All rights reserved.</p>
    </footer>
  </div>
</template>

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

/* Efek Glow */
@keyframes glow {
  0% {
    text-shadow: 0 0 10px #ffffff, 0 0 20px #00aaff, 0 0 30px #00aaff, 0 0 40px #00aaff;
  }
  50% {
    text-shadow: 0 0 20px #ffffff, 0 0 30px #00aaff, 0 0 40px #00aaff, 0 0 50px #00aaff;
  }
  100% {
    text-shadow: 0 0 10px #ffffff, 0 0 20px #00aaff, 0 0 30px #00aaff, 0 0 40px #00aaff;
  }
}

.animate-glow {
  animation: glow 1.5s infinite alternate;
}
</style>