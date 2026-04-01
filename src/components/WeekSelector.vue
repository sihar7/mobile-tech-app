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
      @click.prevent="handleClick(week)"
    >
      <span class="text-xl font-bold tracking-wide">
        Pertemuan {{ week.id }}<span v-if="week.id === 15"></span>
      </span>

      <!-- Ikon liburan - Fixed colors for light/dark mode -->
      <span
        v-if="isHolidayUnlocked(week.date)"
        class="absolute top-2 left-2 text-2xl opacity-90"
        :class="isDarkMode ? 'text-green-500' : 'text-green-600'"
      >🌴</span>

      <!-- Ikon lewat - Fixed colors for light/dark mode -->
      <span
        v-if="isPast(week)"
        class="absolute top-2 right-2 text-2xl opacity-90"
        :class="isDarkMode ? 'text-red-500' : 'text-red-600'"
      >❌</span>

      <!-- Ikon khusus minggu perbaikan - Fixed colors for light/dark mode -->
      <span
        v-if="week.id === 15"
        class="absolute bottom-2 right-2 text-2xl opacity-90"
        :class="isDarkMode ? 'text-emerald-500' : 'text-emerald-600'"
      >✅</span>

      <!-- Overlay terkunci -->
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

// Tanggal awal dan libur
const startDate = new Date(2026, 2, 25); // 25 Maret 2026 → Pertemuan 1
const holidayStart = new Date(2026, 11, 24); // geser libur jauh agar tidak mengganggu
const holidayEnd = new Date(2026, 11, 31);

// Generate 15 minggu
const weeks = [];
let currentDate = new Date(startDate);

for (let i = 1; i <= 15; i++) {
  while (currentDate >= holidayStart && currentDate <= holidayEnd) {
    currentDate.setDate(currentDate.getDate() + 7);
  }

  weeks.push({
    id: i,
    date: new Date(currentDate)
  });

  currentDate.setDate(currentDate.getDate() + 7);
}

const isHolidayUnlocked = (date) => {
  return date >= holidayStart && date <= holidayEnd;
};

const isUnlocked = (week) => {
  return today >= week.date || isHolidayUnlocked(week.date);
};

const isPast = (week) => {
  const endOfValidTime = new Date(week.date);
  endOfValidTime.setHours(23, 59, 0, 0);
  return today > endOfValidTime && week.id !== weeks.length;
};

const handleClick = async (week) => {
  const isDark = isDarkMode.value;
  const now = new Date();

  const dateValid = now >= week.date || isHolidayUnlocked(week.date);
  const past = isPast(week);

  // Pertemuan 15: Perbaikan dengan password
  if (week.id === 15) {
    if (!dateValid) {
      return Swal.fire({
        title: `🔒 Belum Bisa Diakses!`,
        text: `Pertemuan ${week.id} baru bisa dibuka setelah tanggal ${formatDate(week.date)}`,
        icon: 'info',
        background: isDark ? '#111827' : '#EFF6FF',
        confirmButtonColor: isDark ? '#1F2937' : '#3B82F6',
        confirmButtonText: 'Oke',
      });
    }

    const result = await Swal.fire({
      title: '🔐 Akses Pertemuan Perbaikan',
      input: 'password',
      inputLabel: 'Masukkan password untuk membuka',
      inputPlaceholder: 'Password...',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Akses',
      background: isDark ? '#111827' : '#EFF6FF',
      confirmButtonColor: isDark ? '#1F2937' : '#3B82F6',
      cancelButtonColor: '#d33',
      preConfirm: (password) => {
        if (password !== 'mobilekuteknologi2025') {
          Swal.showValidationMessage('❌ Password salah');
        }
        return password;
      },
    });

    if (!result.isConfirmed || result.value !== 'mobilekuteknologi2025') {
      return router.push('/');
    }

    return router.push(`/week/${week.id}`);
  }

  // Pertemuan 1–14
  let message = '';
  if (!dateValid) {
    message = `📅 Pertemuan <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${week.id}</b> baru bisa diakses pada <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${formatDate(week.date)}</b>`;
  } else if (past) {
    message = `⚠️ Pertemuan <b>${week.id}</b> sudah lewat`;
  }

  if (isUnlocked(week)) {
    router.push(`/week/${week.id}`);
  } else if (message) {
    Swal.fire({
      title: `<span style="color: ${isDark ? '#9CA3AF' : '#3B82F6'}; font-weight: bold; font-size: 1.5rem;">🔒 Belum Bisa Diakses!</span>`,
      html: `
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 1rem; font-size: 1rem; color: ${isDark ? '#9CA3AF' : '#1E40AF'};">
          ${message}
        </div>
      `,
      icon: 'info',
      background: isDark ? '#111827' : '#EFF6FF',
      confirmButtonColor: isDark ? '#1F2937' : '#3B82F6',
      confirmButtonText: 'Oke deh 😢',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
    });
  }
};
</script>