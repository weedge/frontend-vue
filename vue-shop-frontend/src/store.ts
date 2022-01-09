import { createStore } from "vuex";
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
    },

    actions: {
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

        async register({ commit }, payload) {
            return await AuthRepository.register(payload);
        },

        async getUserOrders({ commit }, id) {
            commit("STORE_GET_USER_ORDERS", await OrderRepository.getUserOrders(id));
        },

        async getItems({ commit }) {
            commit("STORE_GET_ITEMS", await ShopItemRepository.getItems());
        },

    },

    mutations: {
        STORE_LOGGED_IN_USER: (state, response) => {
            const { data } = response;

            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", data.user);
                state.user = data.user;
                state.token = data.token;
                state.loggedIn = true;
            }
        },

        STORE_LOGGED_OUT_USER: (state, response) => {
            if (response) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                state.user = {};
                state.token = "";
                state.loggedIn = false;
                //state.insights = null;
            }
        },
        STORE_GET_ITEMS: (state, response) => {
            const { data } = response;
            state.items = data;
        },
        STORE_GET_USER_ORDERS: (state, response) => {
            const { data } = response;
            state.userorders = data;
        },
    },

    getters: {
        getEvent: (state) => (id) => {
            return state.items.find((item) => item.id == id);
        },

        isAdmin: (state) => {
            return state.user.is_admin;
        },
        isUser: (state) => {
            return !state.user.is_admin;
        },
    },

    // strict: true
});

export default store;
