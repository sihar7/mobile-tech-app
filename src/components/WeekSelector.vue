<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <router-link
      v-for="week in weeks"
      :key="week.id"
      :to="isUnlocked(week) ? `/week/${week.id}` : '#'"
      :class="[ 
        'p-6 rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
        isUnlocked(week) && !isPast(week)
          ? 'bg-gradient-to-br from-teal-400 to-indigo-600 text-white hover:from-teal-500 hover:to-indigo-700 border-4 border-purple-500'
          : '',
        isPast(week)
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed border-gray-400'
          : '',
        !isUnlocked(week)
          ? 'bg-gray-100 text-gray-500 border-gray-300'
          : ''
      ]"
      @click="handleClick(week)"
    >
      <!-- Teks Pertemuan -->
      <span class="text-xl font-bold tracking-wide text-gray-900">Pertemuan {{ week.id }}</span>

      <!-- Icon untuk minggu yang sudah lewat -->
      <span
        v-if="isPast(week)"
        class="absolute top-2 right-2 text-2xl opacity-90 text-red-500"
      >
        ❌
      </span>

      <!-- Animasi Gesture Tangan -->
      <span
        v-if="isUnlocked(week) && !isPast(week)"
        class="absolute -right-4 top-1/2 transform -translate-y-1/2 text-4xl text-yellow-300 animate-bounce"
      >
        👉
      </span>

      <!-- Overlay untuk minggu yang terkunci -->
      <div
        v-if="!isUnlocked(week)"
        class="absolute inset-0 bg-black/30 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
      >
        <span class="text-white text-lg font-bold drop-shadow-md">🔒 Terkunci</span>
        <span class="text-white text-sm mt-1 drop-shadow-md">Buka pada {{ week.unlockDate }}</span>
      </div>
    </router-link>
  </div>
</template>




<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function formatDate(date) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
}

const router = useRouter();
const startDate = new Date(2025, 2, 5);
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
      title: `<span style="color: #7C3AED; font-weight: bold; font-size: 20px;">🔒 Belum Bisa Diakses!</span>`,
      html: `
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 10px; font-size: 16px; color: #4C1D95;">
          📅 Pertemuan <b style="color: #7C3AED;">${week.id}</b> baru bisa diakses pada <b style="color: #7C3AED;">${formatDate(week.date)}</b>.
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 10px;">
          <img src="https://media.giphy.com/media/3o7aD2d7hy9ktXNDP2/giphy.gif" alt="Wait" style="width: 120px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);">
        </div>
      `,
      icon: 'warning',
      background: '#F5F3FF',
      confirmButtonColor: '#7C3AED',
      confirmButtonText: 'Oke deh 😢',
      customClass: {
        popup: 'rounded-xl shadow-lg',
        title: 'text-xl font-bold',
        confirmButton: 'bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-all duration-200',
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
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
