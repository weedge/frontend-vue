<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";

const store = useStore()
const router = useRouter()
const route = useRoute()

const logout = async () => {
  await store.dispatch("logout");
  location.reload()
  return router.push({
    name: "home",
  });
};

const redirect = async () => {
  console.log('redirect')
  //await store.dispatch("logout");
};

// validate
const schema = object({
  keyword: string().required().trim(),
});

useForm({
  validationSchema: schema,
});

const { value: keyword } = useField("keyword");

const search = async () => {
  console.log('search', keyword.value)
  await store.dispatch("search", keyword.value);
  return router.push({
    name: "home",
  });
};

const loggedIn = store.state.loggedIn || localStorage.getItem("loggedIn") == "1"
const userOrders = async () => {
  if (loggedIn) {
    const uid = store.state.user.id ? store.state.user.id : store.getters["getUid"]
    return router.push({
      name: "userOrders",
      params: { id: uid },
    });
  } else {
    return router.push({
      name: "login",
      query: { redirect: route.fullPath },
    });
  }
};


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
          @click="userOrders"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >用户订单</router-link>
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
    <form class="form-inline" @submit.prevent="search">
      <input
        class="form-control mr-sm-2"
        type="search"
        name="keyword"
        v-model="keyword"
        placeholder="商品名称关键字"
        aria-label="Search"
      />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">查找</button>
    </form>
  </nav>
</template>