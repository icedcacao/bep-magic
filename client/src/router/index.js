import { createRouter, createWebHistory } from "vue-router";

import { isLoggedIn } from "@/utils/auth";
// Layout
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

// Client Views
import OrderView from "@/views/OrderView.vue";
import CartGetIdView from "@/views/CartGetIdView.vue";
import LoginView from "@/views/LoginView.vue";

// Admin Views
import FoodAdminGetView from "@/views/FoodAdminGetView.vue";
import FoodAdminPostView from "@/views/FoodAdminPostView.vue";
import FoodAdminPutView from "@/views/FoodAdminPutView.vue";
import CartAdminGetView from "@/views/CartAdminGetView.vue";
import CartAdminPostView from "@/views/CartAdminPostView.vue";
import CartAdminPutView from "@/views/CartAdminPutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "",
          redirect: { name: "order" },
        },
        {
          path: "order",
          name: "order",
          component: OrderView,
        },
        // {
        //   path: "cart/:id",
        //   name: "cartGetId",
        //   component: CartGetIdView,
        // },
      ],
    },
    { path: "/login", name: "login", component: LoginView },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "food",
          name: "foodAdminGet",
          component: FoodAdminGetView,
        },
        {
          path: "food/post",
          name: "foodAdminPost",
          component: FoodAdminPostView,
        },
        {
          path: "food/put/:id",
          name: "foodAdminPut",
          component: FoodAdminPutView,
        },
        {
          path: "cart",
          name: "cartAdminGet",
          component: CartAdminGetView,
        },
        {
          path: "cart/post",
          name: "cartAdminPost",
          component: CartAdminPostView,
        },
        {
          path: "cart/put/:id",
          name: "cartAdminPut",
          component: CartAdminPutView,
        },
      ],
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, form) => {
  if (to.meta.requiresAuth && !(await isLoggedIn()) && to.name != "login") {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
  if (to.name == "login" && (await isLoggedIn())) {
    return {
      name: "foodAdminGet",
    };
  }
});

export default router;
