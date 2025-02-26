<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <router-link
      v-for="week in weeks"
      :key="week.id"
      :to="isUnlocked(week) ? `/week/${week.id}` : '#'"
      :class="[
        'p-6 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
        isUnlocked(week) && !isPast(week) ? 'bg-gradient-to-br from-purple-500 to-orange-400 text-white hover:from-purple-600 hover:to-orange-500' : '',
        isPast(week) ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : '',
        !isUnlocked(week) ? 'bg-gray-300 text-gray-500 opacity-75' : ''
      ]"
      @click="handleClick(week)"
    >
      <!-- Teks Pertemuan -->
      <span class="text-lg font-semibold tracking-wide">Pertemuan {{ week.id }}</span>

      <!-- Icon untuk minggu yang sudah lewat -->
      <span v-if="isPast(week)" class="absolute top-2 right-2 text-xl opacity-90 text-red-500">❌</span>

      <!-- Animasi Gesture Tangan -->
      <span
        v-if="isUnlocked(week) && !isPast(week)"
        class="absolute -right-4 top-1/2 transform -translate-y-1/2 text-3xl text-yellow-300 animate-pulse"
      >
        👉
      </span>

      <!-- Overlay untuk minggu yang terkunci -->
      <div
        v-if="!isUnlocked(week)"
        class="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center rounded-lg"
      >
        <span class="text-white text-sm font-bold">🔒 Terkunci</span>
      </div>
    </router-link>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const router = useRouter();
const startDate = new Date(2025, 2, 3);
const today = new Date();

const weeks = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i * 7);
  return { id: i + 1, date };
});

const isUnlocked = (week) => today >= week.date;
const isPast = (week) => today > week.date && week.id !== weeks.length;
const handleClick = (week) => {
  if (isUnlocked(week)) {
    router.push(`/week/${week.id}`);
  } else {
    Swal.fire({
      title: `<span style="color:#d9534f; font-weight:bold;">🔒 Belum Bisa Diakses!</span>`,
      html: `
        <div class="flex justify-center items-center mt-4">
          📅 Pertemuan <b>${week.id}</b> baru bisa diakses pada <b>&nbsp;${week.date.toLocaleDateString()}</b>.
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 15px;">
          <img src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" alt="Wait" style="width: 120px; border-radius: 10px;">
        </div>
      `,
      icon: 'warning',
      background: '#fef3c7',
      confirmButtonColor: '#d97706',
      confirmButtonText: 'Oke deh 😢',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-lg font-bold',
        confirmButton: 'bg-yellow-500 text-white p-2 rounded-lg',
      }
    });
  }
};

</script>

<style>
/* Animasi tangan */
.bounce-enter-active {
  animation: bounce 0.8s infinite;
}
@keyframes bounce {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
}
</style>
