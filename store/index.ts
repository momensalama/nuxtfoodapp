import { defineStore } from "pinia";

interface FoodDataTypes {
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
}

type State = {
  fooddata: FoodDataTypes[];
};

export const useStore = defineStore("store", {
  state: (): State => ({
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
