<template>
  <section class="stores px-4 pt-4">
    <Header label="Выбор магазина" />
    <div class="stores__items border-b border-b-gray-400">
      <h2 class="text-xl text-red-400 pt-2">Выбор магазина</h2>
      <p v-if="store.state.savedItem" class="mb-2 text-xs text-gray-400">
        Сохранено: {{ store.state.savedItem.position_name }}
      </p>
      <p v-else class="mb-2 text-xs">Укажите магазин, в котором находитесь</p>
      <router-link
        :to="{
          name: 'Barcode',
          query: { storeid: store.storeid, storename: store.storename },
        }"
        class="store__item bg-blue-400 mb-2 rounded text-white flex flex-col justify-center items-center"
        v-for="(store, index) in store.state.stores.stores"
        :key="index"
        @click="setStore(store)"
      >
        <p>{{ store.location }}</p>
        <p>{{ store.storename }}</p>
      </router-link>
    </div>
    <div class="add-store pt-2">
      <h2 class="text-xl text-red-400">Добавление магазина</h2>
      <p class="mb-2 text-xs">Если магазина нет в списке - просто добавьте его здесь</p>
      <div class="add-store__form flex flex-col">
        <input
          type="text"
          class="border-2 h-8 pl-2 rounded mb-2"
          placeholder="Название магазина"
        />
        <input
          type="text"
          class="border-2 h-8 pl-2 rounded mb-2"
          placeholder="Адрес магазина"
        />
        <input
          type="submit"
          class="bg-blue-400 h-12 rounded text-white font-bold"
          value="Сохранить и выбрать"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";

const store = useStore();
const router = useRouter();

const getStores = async () => {
  const response = await axios
    .post("https://houmi.store/apiv3/hs/api_v2", {
      section: "selectstore",
      token: store.getters.user.token,
      id: store.getters.user.id,
    })
    .then((response) => {
      store.dispatch("saveStores", response.data);
      console.log(response.data);
    });
};

const setStore = (storeItem) => {
  store.dispatch("saveStore", storeItem);
};

onMounted(() => {
  getStores();
});
</script>

<style lang="scss" scoped></style>
