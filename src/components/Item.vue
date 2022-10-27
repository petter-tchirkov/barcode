<template>
  <section class="item px-4 pt-2">
    <Header :label="store.state.store.storename" />
    <input
      class="border-2 h-8 pl-2 rounded mb-2 w-full mt-4"
      type="text"
      placeholder="Укажите позицию"
      v-model="data.positionName"
    />
    <input
      class="border-2 h-8 pl-2 rounded mb-2 w-full"
      placeholder="Укажите цену"
      type="number"
      pattern="[0-9]*"
      inputmode="numeric"
      v-model="data.positionPrice"
    />
    <button
      @click="sendPosition"
      class="bg-blue-400 h-12 rounded text-white font-bold w-full mb-2"
    >
      Сохранить
    </button>
    <div v-if="store.state.item.position_id === ''" class="item__not-found mt-2">
      <h2 class="text-xl">Товар не найдет в базе</h2>
      <ul class="pl-4">
        <li class="list-decimal">Отредактируйте название</li>
        <li class="list-decimal">Укажите цену</li>
        <li class="list-decimal">Сохраните</li>
      </ul>
    </div>
    <Graphs v-else />
  </section>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Header from "./Header.vue";
import axios from "axios";
import router from "../router";
import Graphs from "./Graphs.vue";

const store = useStore();
const route = useRoute();
const data = reactive({
  positionName: store.state.item.position_name,
  positionPrice: "",
});

const sendPosition = async () => {
  const response = await axios
    .post("https://houmi.store/apiv3/hs/api_v2", {
      section: "saveprice",
      token: store.state.user.token,
      id: store.state.user.id,
      storeid: store.state.store.storeid,
      barcode: store.state.item.barcode,
      position_name: data.positionName,
      position_id: store.state.item.position_id,
      newprice: data.positionPrice,
    })
    .then((response) => {
      const saved = response.data;
      Object.assign(saved, { position_name: data.positionName });
      store.dispatch("setSavedStore", saved);
      router.replace({
        path: "/barcode",
        query: { storeid: store.storeid, storename: store.storename },
      });
    });
};
</script>

<style lang="scss" scoped></style>
