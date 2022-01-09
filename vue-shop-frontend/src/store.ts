import { createStore } from "vuex";
import Repository from "./repositories/RepositoryFactory";
const AuthRepository = Repository.get("auth");

const store = createStore({
    state: {
        user: [],
        loggedIn: false,
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
                state.token = null;
                state.insights = null;
                state.loggedIn = false;
            }
        },
    },

    getters: {
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
