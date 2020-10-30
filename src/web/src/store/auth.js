import axios from "axios";
import { AUTH_CHECK_URL, LOGOUT_URL } from "../urls";

const state = {
    user: null,
    fullName: ""
};
const getters = {
    isAuthenticated: state => !!state.user,
    fullName: state => { return state.fullName },
};
const actions = {
    async checkAuthentication({ commit }) {
        await axios.get(AUTH_CHECK_URL)
            .then(resp => {
                commit("setUser", resp.data);
            }).catch(() => {
                commit("clearUser");
            });
    },
    async signOut({ commit }) {
        await axios.get(LOGOUT_URL)
            .then(() => {
                commit("clearUser");
            }).catch(err => {
                console.error(err);
            });
    }
};
const mutations = {
    setUser(state, user) {
        state.user = user;
        state.fullName = user.displayName;
    },
    clearUser(state) {
        state.user = null;
        state.fullName = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};