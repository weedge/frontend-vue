<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore()
const router = useRouter()

const logout = async () => {
  await store.dispatch("logout");
  return router.push({
    name: "home",
  });
};

const redirect = async () => {
  console.log('redirect')
  //await store.dispatch("logout");
};

const search = async () => {
  await store.dispatch("search");
  return router.push({
    name: "home",
  });
};

const loggedIn = store.state.loggedIn || localStorage.getItem("loggedIn") == "1"

</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item">
        <router-link
          class="nav-link authBtn"
          id="pills-home-tab"
          data-toggle="pill"
          to="/"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
        >主页</router-link>
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-profile-tab"
          data-toggle="pill"
          to="/login"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
        >登录</router-link>
      </li>
      <li class="nav-item" v-if="!loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to="/register"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >注册</router-link>
      </li>
      <li class="nav-item" v-if="loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to
          @click="logout"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >登出</router-link>
      </li>
    </ul>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="商品名称" aria-label="Search" />
      <button @submit.prevent="search" class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
    </form>
  </nav>
</template>