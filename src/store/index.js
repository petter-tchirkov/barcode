import { createStore } from "vuex";
import VuexPersister from "vuex-persister";

const vuexPersister = new VuexPersister({
  overwrite: true,
  storage: sessionStorage,
});

const store = createStore({
  state: () => ({
    user: {},
    stores: [],
    store: {},
    item: {},
    savedItem: {},
    storeName: "Выберите магазин",
  }),
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_STORES(state, payload) {
      state.stores = payload;
    },
    SET_STORE(state, payload) {
      state.store = payload;
    },
    REQUEST_ITEMS(state, payload) {
      state.item = payload;
    },
    SET_SAVED_ITEM(state, payload) {
      state.savedItem = payload;
    },
    EMPTY_SAVED_ITEM(state) {
      state.savedItem = {};
    },
    RESET_STATE(state) {
      state = {};
      console.log(state);
    },
  },
  actions: {
    saveUser({ commit }, data) {
      commit("SET_USER", data);
    },
    saveStores({ commit }, data) {
      commit("SET_STORES", data);
    },
    saveStore({ commit }, data) {
      commit("SET_STORE", data);
    },
    requestItems({ commit }, data) {
      commit("REQUEST_ITEMS", data);
    },
    setSavedStore({ commit }, data) {
      commit("SET_SAVED_ITEM", data);
    },
    emptySavedStore({ commit }, data) {
      commit("EMPTY_SAVED_ITEM", data);
    },
    resetState({ commit }, data) {
      commit("RESET_STATE", data);
      console.log("state reset");
    },
  },
  plugins: [vuexPersister.persist], // integrate the plugin
});

export default store;
