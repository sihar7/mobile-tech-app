<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <router-link
      v-for="week in weeks"
      :key="week.id"
      :to="isUnlocked(week) ? `/week/${week.id}` : '#'"
      :class="[ 
        'p-6 rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
        isUnlocked(week) && !isPast(week)
          ? isDarkMode
            ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800 border-4 border-gray-600'
            : 'bg-gradient-to-br from-sky-400 to-blue-600 text-white hover:from-sky-500 hover:to-blue-700 border-4 border-blue-500'
          : '',
        isPast(week)
          ? isDarkMode
            ? 'bg-gray-800 text-gray-400 cursor-not-allowed border-gray-600'
            : 'bg-pink-100 text-pink-700 cursor-not-allowed border-pink-300'
          : '',
        !isUnlocked(week)
          ? isDarkMode
            ? 'bg-gray-900 text-gray-500 border-gray-700'
            : 'bg-blue-50 text-blue-600 border-blue-200'
          : ''
      ]"
      @click="handleClick(week)"
    >
      <!-- Teks Pertemuan -->
      <span class="text-xl font-bold tracking-wide">Pertemuan {{ week.id }}</span>

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
        class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/40 dark:from-gray-700/30 dark:to-gray-600/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
      >
        <!-- Icon Kunci dengan efek glow -->
        <span class="text-white text-2xl drop-shadow-md">🔒</span>
        
        <!-- Teks "Terkunci" -->
        <span class="text-white text-sm font-bold drop-shadow-md mt-1">Terkunci</span>
        
        <!-- Tanggal Pembukaan -->
        <span class="text-white text-xs font-normal drop-shadow-md mt-0 text-center max-w-xs break-words">
          Buka pada {{ formatDate(week.date) }}
        </span>
      </div>
    </router-link>
  </div>
</template>


<script setup>
import { ref, inject  } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function formatDate(date) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
}

const isDarkMode = inject('isDarkMode', ref(false));
const router = useRouter();
const startDate = new Date(2025, 2, 10);
const today = new Date();
const currentHour = today.getHours();
const currentMinutes = today.getMinutes();

const weeks = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i * 7);

  return { id: i + 1, date };
});

const isUnlocked = (week) => {
  const isTimeValid = (currentHour === 15 || (currentHour === 17 && currentMinutes <= 30) || (currentHour === 16));
  
  return today >= week.date && isTimeValid;
};

const isPast = (week) => {
  const endOfValidTime = new Date(week.date);
  endOfValidTime.setHours(17, 30, 0, 0); // Set batas waktu ke 09:30

  return today > endOfValidTime && week.id !== weeks.length;
};


const handleClick = (week) => {
  const isDark = isDarkMode.value;
  const isTimeValid = (currentHour === 15 || (currentHour === 17 && currentMinutes <= 30) || (currentHour === 16));
  const isDateValid = today >= week.date;

  let message = "";

  if (!isDateValid) {
    // Jika tanggal masih belum sesuai
    message = `📅 Pertemuan <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${week.id}</b> baru bisa diakses pada <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${formatDate(week.date)}</b>`;
  } else if (!isTimeValid) {
    // Jika tanggal sudah sesuai, tapi jam tidak valid
    message = `⏰ Pertemuan hanya bisa diakses antara pukul <b>07:00 - 09:30</b>. Sekarang jam <b>${currentHour}:${currentMinutes.toString().padStart(2, '0')}</b>`;
  }

  if (isUnlocked(week)) {
    router.push(`/week/${week.id}`);
  } else {

      Swal.fire({
      title: `<span style="color: ${isDark ? '#9CA3AF' : '#3B82F6'}; font-weight: bold; font-size: 1.5rem;">🔒 Belum Bisa Diakses!</span>`,
      html: `
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 1rem; font-size: 1rem; color: ${isDark ? '#9CA3AF' : '#1E40AF'};">
          ${message}
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 1rem;">
          <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnh2MmczY2NmaGQxZzgyN211d295b3F2N3B0bnRvdng3aTJicTNjZiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9Zw/JYx5as9hOA8hwvv7FE/giphy.gif" 
               alt="Wait" 
               style="width: 100%; max-width: 120px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);">
        </div>
      `,
      icon: 'info',
      background: isDark ? '#111827' : '#EFF6FF',
      confirmButtonColor: isDark ? '#1F2937' : '#3B82F6', 
      confirmButtonText: 'Oke deh 😢',
      customClass: {
        popup: `rounded-xl shadow-lg ${isDark ? 'bg-gray-900 text-gray-500 border-gray-700' : 'bg-blue-50 text-blue-600 border-blue-200'}`,
        title: 'text-xl font-bold',
        confirmButton: `px-6 py-2 rounded-md transition-all duration-300 ${
          isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`,
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

</style>