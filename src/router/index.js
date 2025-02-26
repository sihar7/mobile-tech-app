import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WeekView from "@/views/WeekView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/week/:id", component: WeekView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
