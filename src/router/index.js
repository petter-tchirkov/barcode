import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Barcode from "../components/Barcode.vue";
import Item from "../components/Item.vue";

const routes = [
  { path: "/", name: "Выбор магазина", component: Home },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/barcode",
    name: "Barcode",
    component: Barcode,
  },
  { path: "/item", name: "Item", component: Item },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");

  if (token || to.name === "Login") {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;
