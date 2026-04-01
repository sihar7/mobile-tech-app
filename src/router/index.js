import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import WeekPage from "@/views/WeekView.vue";

const startDate = new Date(2026, 2, 25); // 25 Mar 2026
const holidayStart = new Date(2026, 11, 24);
const holidayEnd = new Date(2026, 11, 31);

const weeks = [];
let currentDate = new Date(startDate);

for (let i = 1; i <= 15; i++) {
  while (currentDate >= holidayStart && currentDate <= holidayEnd) {
    currentDate.setDate(currentDate.getDate() + 7);
  }
  weeks.push({ id: i, date: new Date(currentDate) });
  currentDate.setDate(currentDate.getDate() + 7);
}

const isHolidayUnlocked = (weekDate) => {
  return weekDate >= holidayStart && weekDate <= holidayEnd;
};

const isTimeValid = (weekDate) => {
  if (isHolidayUnlocked(weekDate)) return true;
  const h = new Date().getHours();
  return h >= 8 && h <= 23;
};

// Fungsi untuk mendapatkan tanggal penutupan pertemuan (H-1 sebelum pertemuan berikutnya)
const getClosingDate = (weekId) => {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return null;
  
  // Untuk pertemuan terakhir (ke-15), tidak ada penutupan
  if (week.id === 15) return null;
  
  // Cari pertemuan berikutnya
  const nextWeek = weeks.find((w) => w.id === week.id + 1);
  if (!nextWeek) return null;
  
  // Tanggal penutupan adalah H-1 dari pertemuan berikutnya (jam 23:59:59)
  const closingDate = new Date(nextWeek.date);
  closingDate.setDate(closingDate.getDate() - 1);
  closingDate.setHours(23, 59, 59, 999);
  
  return closingDate;
};

// Fungsi untuk mengecek apakah pertemuan sudah ditutup
const isClosed = (weekId) => {
  const closingDate = getClosingDate(weekId);
  if (!closingDate) return false; // Pertemuan terakhir tidak pernah ditutup
  return new Date() > closingDate;
};

function isUnlocked(weekId) {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return false;
  
  const now = new Date();
  const isDateValid = now >= week.date || isHolidayUnlocked(week.date);
  const isTimeValidCheck = isTimeValid(week.date);
  
  // Cek apakah sudah ditutup
  const closed = isClosed(weekId);
  
  return isDateValid && isTimeValidCheck && !closed;
}

function isPast(weekId) {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return false;
  
  // Untuk pertemuan 15 (perbaikan), tidak dianggap lewat
  if (week.id === 15) return false;
  
  const closingDate = getClosingDate(weekId);
  if (!closingDate) return false;
  
  return new Date() > closingDate;
}

const routes = [
  { path: "/", component: Home },
  {
    path: "/week/:id",
    component: WeekPage,
    beforeEnter: (to, from, next) => {
      const id = parseInt(to.params.id);

      if (isNaN(id) || id < 1 || id > 15) return next("/");
      if (!isUnlocked(id)) return next("/");
      if (isPast(id) && id !== 15) return next("/");

      next();
    },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;