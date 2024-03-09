<script setup lang="ts">
import type { AppRestaurantsInfoTypes } from "~/types";

defineProps<AppRestaurantsInfoTypes>();
</script>

<template>
  <section class="restaurantinfo">
    <div v-for="food in datasource" :key="food.id">
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
            <NuxtLink :to="`/items/${menuItem.id}`">
              <button class="ghost">View Item &rarr;</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
