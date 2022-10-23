<template>
  <header class="header flex justify-between pb-2 border-b border-b-gray-400">
    <div class="header__route text-xs bg-gray-400 rounded p-1 text-white">
      {{ label }}
    </div>
    <div @click="logOut" class="header__user text-xs bg-gray-400 rounded p-1 text-white">
      {{ user.name }}
    </div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

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

const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("vuex");
  router.push("/login");
};
</script>

<style lang="scss" scoped></style>
