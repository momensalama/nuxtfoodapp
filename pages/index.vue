<script setup lang="ts">
import { useStore } from "~/store/index.js";

const store = useStore();

store.getFoodData();

const fooddata = computed(() => store.fooddata);
</script>

<template>
  <AppHeader />
  <main>
    <AppRestaurantInfo :datasource="fooddata" />
    <NuxtPage />
  </main>
</template>
