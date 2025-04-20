import { createRouter, createWebHistory } from "vue-router";
import { inject } from "vue";
import Home from "@/views/HomeView.vue";
import WeekPage from "@/views/WeekView.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const startDate = new Date(2025, 2, 12); // 12 Maret 2025
const holidayStart = new Date(2025, 2, 26); // 26 Maret 2025
const holidayEnd = new Date(2025, 3, 15); // 15 April 2025

const weeks = [];
let currentDate = new Date(startDate);

for (let i = 1; i <= 14; i++) {
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
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (isHolidayUnlocked(weekDate)) return true;

  return hour >= 9 && (hour < 21 || (hour === 20 && minute <= 30));
};

const isDateUnlocked = (weekId) => {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return false;
  const today = new Date();
  return today >= week.date || isHolidayUnlocked(week.date);
};

const isTimeInvalid = (weekDate) => !isTimeValid(weekDate);

const routes = [
  { path: "/", component: Home },
  {
    path: "/week/:id",
    component: WeekPage,
    beforeEnter: (to, from, next) => {
      const weekId = parseInt(to.params.id);
      const week = weeks.find((w) => w.id === weekId);
      if (!week) {
        next("/");
        return;
      }

      const today = new Date();
      const nowHour = today.getHours();
      const nowMinutes = today.getMinutes().toString().padStart(2, "0");

      const isUnlockedByDate = isDateUnlocked(weekId);
      const timeValid = isTimeValid(week.date);
      const inHoliday = isHolidayUnlocked(week.date);

      // Mengakses nilai isDarkMode dari inject
      const isDarkMode = inject('isDarkMode', ref(false));  // Pastikan ref(false) adalah nilai default jika inject gagal

      // Gunakan isDarkMode di sini sesuai kebutuhan, misalnya untuk menyesuaikan tema dalam SweetAlert
      if (!isUnlockedByDate) {
        Swal.fire({
          title: "🔒 Belum Bisa Diakses!",
          html: `📅 Pertemuan <b style="color:${isDarkMode.value ? '#9CA3AF' : '#3B82F6'}">${weekId}</b> baru bisa dibuka pada <b>${week.date.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}</b>`,
          icon: "info",
          confirmButtonText: "Oke deh 😢",
          background: isDarkMode.value ? "#1F2937" : "#EFF6FF",  // Menyesuaikan warna latar belakang
          confirmButtonColor: isDarkMode.value ? "#3B82F6" : "#3B82F6",
        });
        next("/");
      } else if (!timeValid) {
        Swal.fire({
          title: "⏰ Di Luar Jam Akses!",
          html: `Pertemuan ini hanya bisa dibuka antara pukul <b>09:00 - 20:30</b>. Sekarang jam <b>${nowHour}:${nowMinutes}</b>.<br><br>${
            inHoliday
              ? `<i>Tapi karena ini masa liburan 🌴, masih bisa diakses kapan saja! 😄</i>`
              : "<i>Silakan kembali di rentang jam tersebut ya.</i>"
          }`,
          icon: "warning",
          confirmButtonText: "Mengerti 🫡",
          background: isDarkMode.value ? "#1F2937" : "#FEF2F2",  // Menyesuaikan latar belakang
          confirmButtonColor: isDarkMode.value ? "#EF4444" : "#EF4444",
        });

        if (inHoliday) {
          next(); // tetap lanjut karena liburan
        } else {
          next("/");
        }
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
