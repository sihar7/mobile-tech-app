import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import WeekPage from "@/views/WeekView.vue";

const startDate = new Date(2025, 2, 12);
const today = new Date();
const currentHour = today.getHours();
const currentMinutes = today.getMinutes();

const weeks = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(startDate);
  date.setDate(startDate.getDate() + i * 7);
  return { id: i + 1, date };
});

function isUnlocked(weekId) {
  const week = weeks.find((w) => w.id === parseInt(weekId));
  if (!week) return false;

  const isTimeValid =
    currentHour === 7 ||
    (currentHour === 9 && currentMinutes <= 30) ||
    currentHour === 8;
  return today >= week.date && isTimeValid;
}

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
