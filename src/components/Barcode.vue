<template>
  <div class="barcode px-4 pt-2">
    <Header :label="store.state.store.storename" />
    <form class="barcode__form pt-8">
      <input
        class="border-2 h-8 pl-2 rounded mb-8 w-full"
        type="text"
        placeholder="Barcode"
        ref="barcode"
        v-model="data.barcode"
        @input="sendBarcode"
      />
      <p
        v-if="Object.keys(store.state.savedItem).length !== 0"
        class="mb-2 text-xs text-gray-400"
      >
        Сохранено: {{ store.state.savedItem.position_name }}
      </p>
      <button
        class="bg-blue-400 h-12 rounded text-white font-bold w-full mb-2"
        @click.prevent="sendBarcode"
      >
        Отправить
      </button>
    </form>
    <div class="barcode__grid grid grid-cols-3 gap-2">
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('1')"
      >
        1
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('2')"
      >
        2
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('3')"
      >
        3
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('4')"
      >
        4
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('5')"
      >
        5
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('6')"
      >
        6
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('7')"
      >
        7
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('8')"
      >
        8
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('9')"
      >
        9
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="router.go(-1)"
      >
        Back
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="addNumber('0')"
      >
        0
      </div>
      <div
        class="grid-item bg-blue-400 text-center p-4 rounded text-3xl text-white"
        @click="handleClear"
      >
        C
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "./Header.vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const barcode = ref(null);
const route = useRoute();
const router = useRouter();
const store = useStore();
const data = reactive({
  barcode: "",
  changed: false,
});

const setInputFocus = () => {
  barcode.value.readOnly = true;
  barcode.value.focus();
  setTimeout(() => {
    barcode.value.readOnly = false;
  });
};

const sendBarcode = async () => {
  const response = await axios
    .post("https://houmi.store/apiv3/hs/api_v2", {
      section: "checkbarcode",
      token: store.state.user.token,
      id: store.state.user.id,
      storeid: store.state.store.storeid,
      barcode: data.barcode,
    })
    .then((response) => {
      const dataObject = response.data;
      Object.assign(dataObject, { barcode: data.barcode });
      store.dispatch("requestItems", dataObject);
      router.replace({
        path: "/item",
        query: {
          id: store.state.user.id,
          storeid: store.state.store.storeid,
          storename: store.state.store.storename,
        },
      });
    });
};

const addNumber = (number) => {
  if (data.changed === false) {
    data.barcode = number;
    data.changed = true;
  } else {
    data.barcode = data.barcode + number;
  }
  barcode.value.focus();
};

const handleClear = () => {
  data.barcode = "";
  barcode.value.focus();
};

onMounted(() => {
  setInputFocus();
});
</script>

<style lang="scss" scoped></style>
