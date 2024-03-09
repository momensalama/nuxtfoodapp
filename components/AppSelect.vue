<script setup lang="ts">
import type { AppSelectTypes } from "~/types";

withDefaults(defineProps<AppSelectTypes>(), {
  select: "cuisine",
  selectOptions: () => ["tacos", "pizza", "dim sum"],
});
defineEmits(["change"]);
</script>

<template>
  <div>
    <label :for="select">What {{ select }} do you want? </label>
    <select
      @change="$emit('change', ($event.target as HTMLInputElement)?.value)"
      :name="select"
      :id="select"
    >
      <option :value="`--Please select a ${select}`">
        --Please select a {{ select }}
      </option>
      <option v-for="option in selectOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style></style>
