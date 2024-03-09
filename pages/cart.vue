<script setup lang="ts">
import { useStore } from "~/store/index";

const store = useStore();

const cart = store.cart;
const total = store.totalPrice;
</script>

<template>
  <main class="container cart">
    <h1>Your cart</h1>
    <table v-if="cart.length">
      <thead>
        <tr>
          <th>Item</th>
          <th>Add Ons</th>
          <th>Amount</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>
            {{ item.item }}
            <span v-if="item.options">- {{ item.options }}</span>
          </td>
          <td>
            <span v-for="addOn in item.addOns" :key="addOn" class="comma">
              {{ addOn }}
            </span>
          </td>
          <td>
            {{ item.count }}
          </td>
          <td>
            {{ item.price }}
          </td>
        </tr>
        <tr>
          <td colspan="3"></td>
          <td class="total">Total: ${{ total }}</td>
        </tr>
      </tbody>
    </table>

    <AppEmptyCart v-else />
  </main>
</template>
