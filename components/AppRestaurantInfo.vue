<script setup lang="ts">
type FoodDataTypes = {
  id: number;
  name: string;
  deliveryTime: string;
  rating: number;
  freeDelivery: boolean;
  menu: {
    id: number;
    item: string;
    price: number;
    img: string;
  }[];
};
import { useStore } from "@/store/index";
const store = useStore();
store.getFoodData(); // Call the action to fetch data
const foodData = computed<FoodDataTypes[]>(() => store.fooddata);
</script>

<template>
  <section class="restaurantinfo">
    <div v-for="food in foodData" :key="food.id">
      <h2>
        {{ food.name }}
      </h2>
      <p>Delivery Time {{ food.deliveryTime }}</p>
      <p>rating: {{ food.rating }}</p>
      <p v-if="food.freeDelivery" class="label">
        <span>Free Delivery</span>
      </p>

      <div class="row">
        <div
          v-for="menuItem in food.menu"
          :key="menuItem.id"
          class="items"
          :style="`background: url(${menuItem.img}) no-repeat center center`"
        >
          <div class="iteminfo">
            <div>
              <h3>
                {{ menuItem.item }}
              </h3>
              <p>
                {{ `$${menuItem.price.toFixed(2)}` }}
              </p>
            </div>
            <button class="ghost">View Item &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
