import { createStore } from "vuex";
import VuexPersister from "vuex-persister";

const vuexPersister = new VuexPersister({
  // ...your options
});

const store = createStore({
  state: () => ({
    user: {},
    stores: [],
    store: {},
    item: {},
    savedItem: {},
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
  },
  plugins: [vuexPersister.persist], // integrate the plugin
});

export default store;
