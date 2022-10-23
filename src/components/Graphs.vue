<template>
  <h2 class="text-xl text-green-400">Ваш магазин</h2>
  <div class="flex justify-between">
    <span class="text-xs">
      Закупочные цены:
      {{
        Object.values(store.state.item.main_store_price.buyingprice)[
          Object.values(store.state.item.main_store_price.buyingprice).length - 1
        ]
      }}
    </span>
    <span class="text-xs">Остаток: {{ store.state.item.position_count }}</span>
  </div>
  <Chart
    :height="200"
    :styles="chartStyles"
    :chart-data="data.chartData"
    :chart-options="data.chartOptions"
  />
  <h2 class="text-xl text-red-400">Конкуренты</h2>

  <div class="competitor" v-for="(s, index) in stores" :key="index">
    <Chart
      :height="200"
      :styles="chartStyles"
      :chart-data="data.competitorChartData"
      :chart-options="data.chartOptions"
      class="mb-4"
    />
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, onMounted } from "vue";
import Chart from "./Chart.vue";
const store = useStore();

onMounted(() => {
  console.log(stores);
});

const dates = Object.keys(store.state.item.main_store_price.buyingprice)
  .map((e) => {
    return e.split("e")[1];
  })
  .reverse();
const buyingPrices = Object.values(
  store.state.item.main_store_price.buyingprice
).reverse();

const sellingPrices = Object.values(
  store.state.item.main_store_price.sellingprice
).reverse();

const chartStyles = reactive({
  position: "relative",
  fontSize: "8px",
});

const stores = Object.values(
  JSON.parse(JSON.stringify(store.state.item.single_store_price))
);
stores.forEach((e) => {
  e["label"] = e["storename"];
  delete e["storename"];
  e.data = Object.values(e.sellingprice);
});
const storeLabels = Object.entries(stores).map((e) => {
  return e[1].storename;
});
const storePrices = Object.entries(stores).map((e) => {
  return Object.values(e[1].sellingprice);
});

const data = reactive({
  chartData: {
    labels: dates,
    datasets: [
      {
        label: "Закупочные",
        backgroundColor: "rgb(74 222 128)",
        borderColor: "rgb(74 222 128)",
        data: buyingPrices,
      },
      {
        label: "Розничные",
        backgroundColor: "rgb(248 113 113)",
        borderColor: "rgb(248 113 113)",
        data: sellingPrices,
      },
    ],
  },
  competitorChartData: {
    labels: dates,
    datasets: [
      {
        backgroundColor: "rgb(74 222 128)",
        borderColor: "rgb(74 222 128)",
        data: storePrices,
      },
    ],
  },
  chartOptions: {
    responsive: true,
  },
});
</script>

<style lang="scss" scoped></style>
