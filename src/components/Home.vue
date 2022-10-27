<template>
  <section class="stores px-4 pt-4">
    <Header label="Выбор магазина" />
    <div class="stores__items border-b border-b-gray-400">
      <h2 class="text-xl text-red-400 pt-2">Выбор магазина</h2>
      <p class="mb-2 text-xs">Укажите магазин, в котором находитесь</p>
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
          v-model="data.newStoreName"
        />
        <input
          type="text"
          class="border-2 h-8 pl-2 rounded mb-2"
          placeholder="Адрес магазина"
          v-model="data.newStoreAddress"
        />
        <router-link
          class="bg-blue-400 text-white text-center p-2 rounded font-bold"
          :to="{
            name: 'Barcode',
            query: {
              storelocation: data.newStoreAddress,
              storename: data.newStoreName,
            },
          }"
          >Сохранить и выбрать</router-link
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";

const store = useStore();
const router = useRouter();

const data = reactive({
  newStoreName: "",
  newStoreAddress: "",
});

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
  store.dispatch("emptySavedStore");
  store.dispatch("saveStore", storeItem);
};

onMounted(() => {
  getStores();
});
</script>

<style lang="scss" scoped></style>
