import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
// Vue.use(VueRouter);

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

// mode: 'history',
// linkActiveClass: 'active',
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
];

const router = createRouter({ history: createWebHistory(), routes });

// });

router.beforeEach((to, from, next) => {
  to.matched.some((record) => {
    console.log(record);
    return record.meta.requiresAuth;
  });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
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
