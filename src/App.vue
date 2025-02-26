<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-purple-400 flex flex-col items-center p-6 transition-all duration-300">
    <!-- Navbar -->
    <nav class="w-full max-w-4xl bg-white/20 backdrop-blur-md shadow-lg rounded-xl p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white drop-shadow-md">📱 Mobile Teknologi</h1>
    </nav>

    <!-- Main Content -->
    <div
      class="w-full max-w-4xl mt-6 p-8 rounded-2xl shadow-xl bg-white/90 backdrop-blur-sm border border-white/20
            hover:shadow-2xl hover:border-purple-300/50 transition-all duration-300 transform hover:-translate-y-1"
    >
      <router-view />
    </div>
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
</style>