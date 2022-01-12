<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="1">
            <router-link
                class="nav-link authBtn"
                id="pills-home-tab"
                data-toggle="pill"
                to="/"
                role="tab"
                aria-controls="pills-home"
                aria-selected="false"
            >商品购物中心</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link
                class="nav-link authBtn"
                id="pills-profile-tab"
                data-toggle="pill"
                to="/login"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
            >登录</router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link
                class="nav-link authBtn"
                id="pills-contact-tab"
                data-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
            >注册</router-link>
        </el-menu-item>
        <!--
        <el-sub-menu index="2">
            <template #title>登录</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>信息</el-menu-item>
        -->
        <el-form class="form-inline right">
            <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="商品名称"
                aria-label="Search"
            />
            <button
                @submit.prevent="search"
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
            >查找</button>
        </el-form>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

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
