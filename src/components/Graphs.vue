<template>
  <h2 class="text-xl mb-4">
    Закупочная цена:
    <span class="text-green-400">{{ Math.max(...Object.values(myStore[0])) }}</span>
  </h2>
  <Line :chart-data="data.chartData" />
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

const store = useStore();

const myStore = JSON.parse(
  JSON.stringify(Object.values(store.state.item.main_store_price))
);

const dates = Object.keys(myStore[0]).map((e) => e.split("e")[1]);

const data = reactive({
  chartData: {
    labels: dates,
    datasets: [
      {
        label: "Закупочные цены",
        backgroundColor: "rgb(74 222 128)",
        data: Object.values(myStore[0]),
      },
      {
        label: "Розничные цены",
        backgroundColor: "rgb(248 113 113)",
        data: Object.values(myStore[1]),
      },
    ],
  },
});
</script>

<style lang="scss" scoped></style>
