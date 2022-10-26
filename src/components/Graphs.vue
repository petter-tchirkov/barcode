<template>
  <div class="flex justify-between">
    <h2 class="text-md mb-4">
      Закупочная цена:
      <span class="text-green-400">{{ Math.max(myStore[0].datasets[0].data) }}</span>
    </h2>
    <h2 class="text-md mb-4">
      Остаток:
      <span class="text-green-400">{{ store.state.item.position_count }}</span>
    </h2>
  </div>
  <Line height="200" :chart-data="myStore[0]" :chart-options="chartOptions" />
  <div @click="log(s)" class="competitor" v-for="(s, index) in stores" :key="index">
    <Line height="200" :chart-data="s" :chart-options="competitorOptions" />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import { reactive } from "vue";
import { useStore } from "vuex";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement
);

const log = (s) => {
  console.log(s);
};

const store = useStore();

const myStore = JSON.parse(
  JSON.stringify(Object.values(store.state.item.main_store_price))
);
Object.assign(myStore[0].datasets[1]);
console.log(myStore[0].datasets[1]);

const stores = JSON.parse(
  JSON.stringify(Object.values(store.state.item.single_store_price))
);

const chartOptions = {
  responsive: true,
  backgroundColor: ["green", "yellow"],
};

const competitorOptions = {
  responsive: true,
  backgroundColor: "red",
};
</script>

<style lang="scss" scoped></style>
