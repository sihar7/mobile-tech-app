import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import WeekPage from "@/views/WeekView.vue";

const startDate = new Date(2025, 2, 12); // 12 Maret 2025
const today = new Date();
const currentHour = today.getHours();
const currentMinutes = today.getMinutes();

// Jam akses dari 09:00 sampai 20:30
const isTimeValid = (weekDate) => {
  if (isHolidayUnlocked(weekDate)) {
    return true; // Jika minggu liburan, bisa diakses 24 jam
  }
  return currentHour >= 9 && (currentHour < 20 || (currentHour === 20 && currentMinutes <= 30));
};

// Generate daftar minggu
const weeks = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i * 7);
  return { id: i + 1, date };
});

// Cek apakah tanggal pertemuan masuk dalam liburan
const isHolidayUnlocked = (weekDate) => {
  const holidayEnd = new Date(2025, 3, 4); // 4 April 2025
  return weekDate <= holidayEnd;
};

// Cek apakah minggu ini sudah terbuka
function isUnlocked(weekId) {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return false;

  // Jika minggu ini berada dalam masa liburan, izinkan akses
  if (isHolidayUnlocked(week.date)) {
    return true;
  }

  // Jika minggu ini sudah lewat tanggalnya dan waktu akses valid, izinkan akses
  return today >= week.date && isTimeValid;
}

// Konfigurasi route
const routes = [
  { path: "/", component: Home },
  {
    path: "/week/:id",
    component: WeekPage,
    beforeEnter: (to, from, next) => {
      if (!isUnlocked(to.params.id)) {
        next("/"); // Redirect ke home jika minggu ini terkunci
      } else {
        next(); // Izinkan akses jika minggu ini terbuka
      }
    },
  },
];

// Buat router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;