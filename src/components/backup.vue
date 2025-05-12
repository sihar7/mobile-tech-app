
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
  return currentHour >= 8 && (currentHour < 24 || (currentHour === 23 && currentMinutes <= 59));
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
  const now = new Date(); // Ambil waktu terkini
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const dateValid = now >= week.date || isHolidayUnlocked(week.date);
  const timeValid = isHolidayUnlocked(week.date) || (currentHour >= 8 && (currentHour < 24 || (currentHour === 23 && currentMinutes <= 59)));
  const past = isPast(week);

  let message = '';

  if (!dateValid) {
    message = `📅 Pertemuan <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${week.id}</b> baru bisa diakses pada <b style="color: ${isDark ? '#9CA3AF' : '#3B82F6'};">${formatDate(week.date)}</b>`;
  } else if (past && !timeValid) {
    message = `⚠️ Pertemuan <b>${week.id}</b> sudah lewat, tapi masih bisa dibuka. Namun hanya bisa diakses antara <b>08:00 - 24:00</b>. Sekarang jam <b>${currentHour}:${currentMinutes.toString().padStart(2, '0')}</b>`;
  } else if (!timeValid) {
    message = `⏰ Pertemuan hanya bisa diakses antara pukul <b>08:30 - 24:00</b>. Sekarang jam <b>${currentHour}:${currentMinutes.toString().padStart(2, '0')}</b>`;
  }

  if (isUnlocked(week) && timeValid) {
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
