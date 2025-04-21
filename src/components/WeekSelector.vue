<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <router-link
      v-for="week in weeks"
      :key="week.id"
      :to="(isUnlocked(week) || isHolidayUnlocked(week)) ? `/week/${week.id}` : '#'"
      :class="[ 
        'p-6 rounded-2xl shadow-2xl text-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden',
        isUnlocked(week) && !isPast(week)
          ? isDarkMode
            ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white hover:from-gray-600 hover:to-gray-800 border-4 border-gray-600'
            : 'bg-gradient-to-br from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 border-4 border-green-500'
          : '',
        isPast(week)
          ? isDarkMode
            ? 'bg-gray-800 text-gray-400 cursor-not-allowed border-gray-600'
            : 'bg-pink-100 text-pink-700 cursor-not-allowed border-pink-300'
          : '',
        !isUnlocked(week)
          ? isDarkMode
            ? 'bg-gray-900 text-gray-500 border-gray-700'
            : 'bg-blue-50 text-green-600 border-green-200'
          : ''
      ]"
      @click="handleClick(week)"
    >
      <span class="text-xl font-bold tracking-wide">Pertemuan {{ week.id }}</span>

      <!-- Ikon untuk minggu yang bisa diakses karena masih liburan -->
      <span
        v-if="isHolidayUnlocked(week.date)"
        class="absolute top-2 left-2 text-2xl opacity-90 text-green-500"
      >
        🌴
      </span>

      <!-- Icon untuk minggu yang sudah lewat -->
      <span
        v-if="isPast(week)"
        class="absolute top-2 right-2 text-2xl opacity-90 text-red-500"
      >
        ❌
      </span>

      <!-- Overlay untuk minggu yang terkunci -->
      <div
        v-if="!(isUnlocked(week) || isHolidayUnlocked(week.date))"
        class="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-blue-800/40 dark:from-gray-700/30 dark:to-gray-600/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
      >
        <span class="text-white text-2xl drop-shadow-md">🔒</span>
        <span class="text-white text-sm font-bold drop-shadow-md mt-1">Terkunci</span>
        <span class="text-white text-xs font-normal drop-shadow-md mt-0 text-center max-w-xs break-words">
          Buka pada {{ formatDate(week.date) }}
        </span>
      </div>
    </router-link>
  </div>
</template>


<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function formatDate(date) {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
}

const isDarkMode = inject('isDarkMode', ref(false));
const router = useRouter();
const today = new Date();
const currentHour = today.getHours();
const currentMinutes = today.getMinutes();

// Tanggal mulai pertemuan dan liburan
const startDate = new Date(2025, 2, 12); // 12 Maret 2025
const holidayStart = new Date(2025, 2, 26); // Libur mulai 26 Maret
const holidayEnd = new Date(2025, 3, 15); // Libur selesai 15 April

// Generate minggu-minggu kuliah
const weeks = [];
let currentDate = new Date(startDate);

for (let i = 1; i <= 14; i++) {
  // Skip jika sedang masa libur
  while (currentDate >= holidayStart && currentDate <= holidayEnd) {
    currentDate.setDate(currentDate.getDate() + 7);
  }

  weeks.push({
    id: i,
    date: new Date(currentDate)
  });

  currentDate.setDate(currentDate.getDate() + 7);
}

// Cek apakah tanggal berada dalam masa libur
const isHolidayUnlocked = (date) => {
  return date >= holidayStart && date <= holidayEnd;
};

// Cek waktu akses valid (jam 09:00–23:59 atau dalam masa libur)
const isTimeValid = (weekDate) => {
  if (isHolidayUnlocked(weekDate)) return true;
  return currentHour >= 9 && (currentHour < 24 || (currentHour === 23 && currentMinutes <= 59));
};

// Cek apakah minggu sudah terbuka
const isUnlocked = (week) => {
  return today >= week.date || isHolidayUnlocked(week.date);
};

// Cek apakah minggu sudah lewat (kecuali minggu terakhir)
const isPast = (week) => {
  const endOfValidTime = new Date(week.date);
  endOfValidTime.setHours(23, 59, 0, 0);
  return today > endOfValidTime && week.id !== weeks.length;
};

// Klik handler
const handleClick = (week) => {
  const isDark = isDarkMode.value;
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const green = isDark ? '#A5D6A7' : '#388e3c'; // hijau yang nyaman
  const gray = isDark ? '#CBD5E1' : '#4B5563';  // abu lembut
  const dateValid = now >= week.date || isHolidayUnlocked(week.date);
  const timeValid = isHolidayUnlocked(week.date) || (currentHour >= 9 && (currentHour < 24 || (currentHour === 23 && currentMinutes <= 59)));
  const past = isPast(week);

  const timeNow = `${currentHour}:${currentMinutes.toString().padStart(2, '0')}`;

  let message = '';

  if (!dateValid) {
    message = `
      📅 Pertemuan <b style="color: ${green};">Minggu ${week.id}</b> baru bisa diakses pada 
      <b style="color: ${green};">${formatDate(week.date)}</b>.
    `;
  } else if (past && !timeValid) {
    message = `
      ⚠️ Pertemuan <b>Minggu ${week.id}</b> sudah lewat, namun masih bisa dibuka.
      <br/>⏰ Hanya bisa diakses antara pukul <b>09:00 - 24:00</b>.<br/>
      Sekarang jam <b>${timeNow}</b>.
    `;
  } else if (!timeValid) {
    message = `
      ⏰ Pertemuan hanya bisa diakses antara pukul <b>09:00 - 24:00</b>.
      <br/>Sekarang jam <b>${timeNow}</b>.
    `;
  }

  if (isUnlocked(week) && timeValid) {
    router.push(`/week/${week.id}`);
  } else if (message) {
    Swal.fire({
      title: `<span style="color: ${green}; font-weight: bold; font-size: 1.4rem;">🔒 Belum Bisa Diakses!</span>`,
      html: `
        <div style="font-size: 1rem; color: ${gray}; text-align: center; margin-top: 0.75rem; line-height: 1.6;">
          ${message}
        </div>
      `,
      icon: 'info',
      background: isDark ? '#1e293b' : '#e8f5e9',
      confirmButtonColor: isDark ? '#334155' : '#4caf50',
      confirmButtonText: 'Oke deh 😢',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
  }
};

</script>

