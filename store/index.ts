import { defineStore } from "pinia";
import type { CartTypes, StateStore } from "~/types";

export const useStore = defineStore("store", {
  state: (): StateStore => ({
    fooddata: [],
    cart: [],
  }),
  actions: {
    async getFoodData() {
      const config = useRuntimeConfig();
      if (this.fooddata.length) return;
      try {
        const response = await fetch(
          "https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants",
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": config.public.AWS_API_KEY,
            },
          }
        );
        const data = await response.json();
        this.fooddata = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    addToCart: (state) => {
      return (payload: CartTypes) => {
        state.cart.push(payload);
      };
    },
    totalPrice: (state) => {
      if (!state.cart.length) return 0;
      return state.cart.reduce((acu, cur) => acu + cur.price, 0).toFixed(2);
    },
    getCartCount: (state) => {
      if (!state.cart.length) return 0;
      return state.cart.reduce((acu, cur) => acu + cur.count, 0);
    },
  },
});
