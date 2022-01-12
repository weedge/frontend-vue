import { useRoute } from "vue-router";
import { createStore } from "vuex";
import { string } from "yup";
import OrderRepository from "./repositories/OrderRepository";
import Repository from "./repositories/RepositoryFactory";
import ShopItemRepository from "./repositories/ShopItemRepository";
const AuthRepository = Repository.get("auth");

const store = createStore({
    state: {
        user: {},
        token: "",
        loggedIn: false,
        items: [],
        userorders: [],
        item: {},
    },

    actions: {
        async register({ commit }, payload) {
            commit("STORE_REGISTER_USER", await AuthRepository.register(payload));
        },

        async login({ commit }, payload) {
            commit("STORE_LOGGED_IN_USER", await AuthRepository.login(payload));
        },

        async logout({ commit }) {
            try {
                await AuthRepository.logout();
                commit("STORE_LOGGED_OUT_USER", true);
                return true;
            } catch (error) {
                console.log(error);
            }
            return false;
        },

        async order({ commit }, payload) {
            commit("STORE_USER_ORDER", await OrderRepository.order(payload));
        },

        async getUserOrders({ commit }, uid) {
            commit("STORE_GET_USER_ORDERS", await OrderRepository.getUserOrders(uid));
        },

        async getItems({ commit }) {
            commit("STORE_GET_ITEMS", await ShopItemRepository.getItems());
        },

        async search({ commit }, keyword) {
            commit("STORE_SEARCH_ITEMS", await ShopItemRepository.search(keyword));
        },

        async getItem({ commit }, id) {
            commit("STORE_GET_ITEM", await ShopItemRepository.getItem(id));
        },
    },

    mutations: {
        STORE_REGISTER_USER: (state, response) => {
            const { data } = response;

            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.user);
                localStorage.setItem("loggedIn", "1");
                state.user = data.user;
                state.token = data.token;
                state.loggedIn = true;
            }
            console.log(state.user)
        },

        STORE_LOGGED_IN_USER: (state, response) => {
            const { data } = response;

            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("loggedIn", "1");
                state.user = data.user;
                state.token = data.token;
                state.loggedIn = true;
            }
            console.log(localStorage.getItem("user"))
        },

        STORE_LOGGED_OUT_USER: (state, response) => {
            if (response) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("loggedIn");
                state.user = {};
                state.token = "";
                state.loggedIn = false;
                //state.insights = null;
            }
        },

        STORE_GET_ITEM: (state, response) => {
            const { data } = response;
            state.item = data;
        },

        STORE_GET_ITEMS: (state, response) => {
            const { data } = response;
            state.items = data;
        },

        STORE_SEARCH_ITEMS: (state, response) => {
            const { data } = response;
            state.items = data;
        },

        // 客户端拼装数据,减少后端计算
        STORE_GET_USER_ORDERS: (state, response) => {
            const { data } = response;
            if (data) {
                state.userorders = data.orders
                state.userorders.forEach(element => {
                    element.shopItem = data.itemMap[element.item_id]
                });
                console.log(state.userorders)
            }
        },

        STORE_USER_ORDER: (state, response) => {
            const { data } = response;
            console.log(data)
        },
    },

    getters: {
        getUid: (state) => {
            if (!state.user.id) {
                const jsonUser = localStorage.getItem("user")
                if (jsonUser) {
                    state.user = JSON.parse(jsonUser)
                }
            }
            return state.user.id
        },

        getItem: (state) => (id: any) => {
            return state.items.find((item) => item.id == id);
        },

        getUserOrder: (state) => (orderId: any) => {
            return state.userorders.find((item) => item.orderId == orderId);
        },
    },

    // strict: true
});

export default store;
