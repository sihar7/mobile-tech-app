<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <router-link
      v-for="week in weeks"
      :key="week.id"
      :to="week.id <= 5 ? `/week/${week.id}` : '#'"
      :class="[ 
        'p-6 rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
        week.id <= 5
          ? isDarkMode
            ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800 border-4 border-gray-600'
            : 'bg-gradient-to-br from-sky-400 to-blue-600 text-white hover:from-sky-500 hover:to-blue-700 border-4 border-blue-500'
          : isDarkMode
            ? 'bg-gray-800 text-gray-400 border-gray-700'
            : 'bg-blue-50 text-blue-600 border-blue-200'
      ]"
      @click="handleClick(week)"
    >
      <span class="text-xl font-bold tracking-wide">Pertemuan {{ week.id }}</span>

      <!-- Overlay untuk minggu yang terkunci -->
      <div
        v-if="week.id > 5"
        class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/40 dark:from-gray-700/30 dark:to-gray-600/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
      >
        <span class="text-white text-2xl drop-shadow-md">🔒</span>
        <span class="text-white text-sm font-bold drop-shadow-md mt-1">Terkunci</span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const isDarkMode = inject('isDarkMode', ref(false));
const router = useRouter();

// Generate minggu-minggu kuliah (1-14)
const weeks = [];
for (let i = 1; i <= 14; i++) {
  weeks.push({ id: i });
}

// Klik handler
const handleClick = (week) => {
  const isDark = isDarkMode.value;

  if (week.id <= 5) {
    router.push(`/week/${week.id}`);
  } else {
    Swal.fire({
      title: `<span style="color: ${isDark ? '#9CA3AF' : '#3B82F6'}; font-weight: bold; font-size: 1.5rem;">🔒 Terkunci</span>`,
      html: `
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 1rem; font-size: 1rem; color: ${isDark ? '#9CA3AF' : '#1E40AF'};">
          Pertemuan ${week.id} saat ini tidak tersedia
        </div>
      `,
      icon: 'info',
      background: isDark ? '#111827' : '#EFF6FF',
      confirmButtonColor: isDark ? '#1F2937' : '#3B82F6',
      confirmButtonText: 'Mengerti',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
  }
};
</script>