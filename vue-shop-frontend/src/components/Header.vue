<script setup lang="ts">
import { useStore } from "vuex";
const store = useStore();

const logout = async () => {
  await store.dispatch("logout");
};

const redirect = async () => {
  console.log('redirect')
  //await store.dispatch("logout");
};

const loggedIn = store.state.loggedIn
const isAdmin = store.getters["isAdmin"]

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
      <li class="nav-item" v-if="loggedIn">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to
          @click="redirect"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >购物系统</router-link>
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
      <li class="nav-item" v-if="isAdmin">
        <router-link
          class="nav-link authBtn"
          id="pills-contact-tab"
          data-toggle="pill"
          to="/admin/add"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >添加商品</router-link>
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
    <form class="form-inline" v-if="!loggedIn">
      <input class="form-control mr-sm-2" type="search" placeholder="商品名称" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
    </form>
  </nav>
</template>