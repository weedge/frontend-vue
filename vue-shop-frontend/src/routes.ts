import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import UserOrder from "./views/user/Order.vue";
import ShopItemInfo from "./views/ShopItemInfo.vue";

// mode: 'history',
// linkActiveClass: 'active',
// https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/items/:id",
    name: "shopItem",
    component: ShopItemInfo,
  },
  {
    path: "/user/:id/orders",
    name: "userOrders",
    component: UserOrder,
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      if (
        store.getters["isUser"] &&
        parseInt(store.state.user.id) === parseInt(to.params.id)
      ) {
        next();
      } else {
        next({
          name: "login",
        });
      }
    },
  },
];

const router = createRouter({ history: createWebHistory(), routes: routes });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => {
    console.log(record);
    return record.meta.requiresAuth;
  });
  if (requiresAuth) {
    if (!store.state.loggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
