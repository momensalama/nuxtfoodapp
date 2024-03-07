import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    fooddata: [],
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
  // getters: {
  //   doubleCount() {
  //     return this.count * 2;
  //   },
  // },
});
