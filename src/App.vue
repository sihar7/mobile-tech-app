<template>
  <div class="relative min-h-screen flex flex-col bg-gradient-to-br from-purple-800 via-purple-600 to-purple-400 overflow-hidden">
    <!-- Animated Background Waves -->
    <div class="absolute inset-0 opacity-20">
      <div class="wave wave1"></div>
      <div class="wave wave2"></div>
    </div>

    <!-- Navbar -->
    <nav class="relative z-10 w-full max-w-7xl mx-auto bg-white/20 backdrop-blur-md shadow-lg rounded-xl p-4 flex justify-between items-center border border-white/30 mt-6">
      <h1 class="text-2xl font-bold text-white drop-shadow-md flex items-center gap-2">
        <span class="text-3xl">📱</span> Mobile Teknologi
      </h1>
      <div class="flex gap-4">
        <button class="text-white text-lg hover:text-gray-300 transition">🔍</button>
        <button class="text-white text-lg hover:text-gray-300 transition">⚙️</button>
      </div>
    </nav>

    <!-- Main Content -->
    <div
      class="relative z-10 flex-grow w-full max-w-7xl mx-auto mt-8 p-8 rounded-2xl shadow-lg bg-white/90 backdrop-blur-md border border-white/20
            hover:shadow-2xl hover:border-purple-400/50 transition-all duration-500 transform hover:-translate-y-1 hover:bg-white/80"
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

/* Animated Background Waves */
.wave {
  position: absolute;
  width: 200%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0) 70%);
  animation: moveWave 12s infinite linear;
}

.wave1 {
  top: -30%;
  left: -50%;
  animation-delay: 0s;
}

.wave2 {
  top: 50%;
  left: -50%;
  animation-delay: 6s;
}

@keyframes moveWave {
  0% {
    transform: translateX(-10%);
  }
  50% {
    transform: translateX(10%);
  }
  100% {
    transform: translateX(-10%);
  }
}
</style>