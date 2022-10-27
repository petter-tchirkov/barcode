<template>
  <header class="header flex justify-between pb-2 border-b border-b-gray-400">
    <router-link
      to="/"
      class="header__route text-xs bg-gray-400 rounded p-1 text-white"
      >{{ label }}</router-link
    >
    <div @click="logOut" class="header__user text-xs bg-gray-400 rounded p-1 text-white">
      {{ user.name }}
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = useStore();

const user = computed(() => {
  return store.state.user;
});

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
});

const logOut = async () => {
  const response = await axios
    .post("https://houmi.store/apiv3/hs/api_v2", {
      section: "logout",
      id: store.state.user.id,
      token: store.state.user.token,
    })
    .then(() => {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login");
      let resetState = {};
      Object.keys(store.state).forEach((key) => {
        resetState[key] = null;
      });
    });
};
</script>

<style lang="scss" scoped></style>
