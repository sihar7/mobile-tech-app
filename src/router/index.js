import { createRouter, createWebHistory } from "vue-router";
 import Home from "@/views/HomeView.vue";
 import WeekPage from "@/views/WeekView.vue";
 
 const startDate = new Date(2025, 2, 12); // 12 Maret 2025
 const holidayStart = new Date(2025, 2, 26); // 26 Maret 2025
 const holidayEnd = new Date(2025, 3, 15); // 15 April 2025
 const today = new Date();
 const currentHour = today.getHours();
 const currentMinutes = today.getMinutes();
 
 // Buat daftar minggu, skip tanggal dalam masa liburan
 const weeks = [];
 let currentDate = new Date(startDate);
 
 for (let i = 1; i <= 14; i++) {
   // skip minggu liburan
   while (currentDate >= holidayStart && currentDate <= holidayEnd) {
     currentDate.setDate(currentDate.getDate() + 7);
   }
 
   weeks.push({ id: i, date: new Date(currentDate) });
 
   currentDate.setDate(currentDate.getDate() + 7);
 }
 
 // Cek apakah minggu masuk masa liburan
 const isHolidayUnlocked = (weekDate) => {
   return weekDate >= holidayStart && weekDate <= holidayEnd;
 };
 
 // Cek waktu akses valid
 const isTimeValid = (weekDate) => {
   if (isHolidayUnlocked(weekDate)) {
     return true;
   }
   return (
     currentHour >= 9 &&(currentHour < 21 || (currentHour === 20 && currentMinutes <= 30))
   );
 };
 
 // Cek apakah minggu terbuka
 function isUnlocked(weekId) {
   const week = weeks.find((w) => w.id === parseInt(weekId));
   if (!week) return false;
 
   return today >= week.date && isTimeValid(week.date);
 }
 
 function isDateUnlocked(weekId) {
   const week = weeks.find((w) => w.id === parseInt(weekId));
   if (!week) return false;
 
   return today >= week.date || isHolidayUnlocked(week.date);
 }
 
 function isPast(weekId) {
   const week = weeks.find((w) => w.id === parseInt(weekId));
   if (!week) return false;
 
   const endOfValidTime = new Date(week.date);
   endOfValidTime.setHours(23, 59, 0, 0);
   return today > endOfValidTime && week.id !== weeks.length;
 }
 
 
 // Route config
 const routes = [
   { path: "/", component: Home },
   {
     path: "/week/:id",
     component: WeekPage,
     beforeEnter: (to, from, next) => {
       if (!isUnlocked(to.params.id)) {
         next("/");
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