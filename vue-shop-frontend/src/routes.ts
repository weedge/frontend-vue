import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import UserOrder from "./views/user/Order.vue";
import ShopItemInfo from "./views/ShopItemInfo.vue";
import MenuVue from "./components/element-plus/Menu.vue";

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
  },
];

const router = createRouter({ history: createWebHistory(), routes: routes });

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => {
    console.log(record);
    return record.meta.requiresAuth;
  });
  let logedIn = document.getElementsByClassName("loggedIn")
  let unLogin = document.getElementsByClassName("unLogIn")
  if (store.state.loggedIn || localStorage.getItem("loggedIn") == "1") {
    for (var i = 0, len = logedIn.length | 0; i < len; i = i + 1 | 0) {
      logedIn[i].hidden = false
    }
    for (var i = 0, len = unLogin.length | 0; i < len; i = i + 1 | 0) {
      unLogin[i].hidden = true
    }
  } else {
    for (var i = 0, len = logedIn.length | 0; i < len; i = i + 1 | 0) {
      logedIn[i].hidden = true
    }
    for (var i = 0, len = unLogin.length | 0; i < len; i = i + 1 | 0) {
      unLogin[i].hidden = false
    }
  }
  if (requiresAuth) {
    //console.log(store.state.loggedIn, localStorage.getItem("loggedIn"))
    if (store.state.loggedIn || localStorage.getItem("loggedIn") == "1") {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
