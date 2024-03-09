<script setup lang="ts">
import { useStore } from "~/store/index";

const store = useStore();
const cartCount = computed(() => store.getCartCount);
</script>
<template>
  <nav>
    <ul>
      <li>
        <nuxt-link to="/">
          <AppLogo />
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/restaurants">Restaurants</nuxt-link>
      </li>
    </ul>
    <div class="smallnum" v-if="cartCount > 0">{{ cartCount }}</div>
    <NuxtLink to="/cart">Cart</NuxtLink>
  </nav>
</template>
