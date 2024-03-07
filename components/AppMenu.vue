<script setup lang="ts">
const linksList = [
  { name: "Home", path: "/" },
  { name: "Restaurants", path: "/restaurants" },
];
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in linksList">
        <nuxt-link :to="link.path">{{ link.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>
