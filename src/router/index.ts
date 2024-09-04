import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SearchPage from "../views/SearchPage.vue";
import FavoritesPage from "../views/FavoritesPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Search",
    component: SearchPage,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
