<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 to-white flex flex-col items-center p-6 transition-all duration-300">
    <!-- Navbar -->
    <nav class="w-full max-w-4xl bg-white/30 backdrop-blur-md shadow-md rounded-lg p-4 flex justify-between items-center text-gray-900">
      <h1 class="text-xl font-bold text-white drop-shadow-lg">📱 Mobile Teknologi</h1>
    </nav>

    <!-- Main Content -->
   <div
      class="w-full max-w-4xl mt-6 p-6 rounded-xl shadow-lg bg-white border border-purple-300/50
            hover:shadow-purple-400/30 hover:border-purple-500/70 transition-all duration-300"
    >
      <router-view />
    </div>


  </div>
</template>
