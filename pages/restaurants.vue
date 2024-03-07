<script setup lang="ts">
import { useStore } from "~/store/index";

const selectedRestaurant = ref<string>("");

const store = useStore();

store.getFoodData();

const fooddata = computed(() => store.fooddata);

const filteredRestaurants = computed(() => {
  if (selectedRestaurant) {
    return fooddata.value.filter((el) => {
      let name = el.name.toLowerCase();
      return name.includes(selectedRestaurant.value);
    });
  }
  return fooddata.value;
});
</script>

<template>
  <main class="container restaurant">
    <div class="restaurantheading">
      <h1>Hello from restaurants!</h1>
      <AppSelect @change="selectedRestaurant = $event" />

      >
    </div>
    <AppRestaurantInfo :datasource="filteredRestaurants" />
  </main>
</template>

<style></style>
