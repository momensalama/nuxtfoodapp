export interface StateReactive {
  count: number;
  itemOptions: string;
  itemAddons: string[];
  isAddedToCart: boolean;
  errors: boolean;
}

export interface FoodDataTypes {
  id: string;
  name: string;
  deliveryTime: string;
  rating: number;
  freeDelivery: boolean;
  menu: {
    id: string;
    item: string | undefined;
    price: number;
    img: string;
    addOns: string[];
    description: string;
    options: string[] | string;
  }[];
}

type extractCartTypes = Omit<
  FoodDataTypes["menu"][number],
  "description" | "img"
>;

export interface CartTypes extends extractCartTypes {
  count: number;
}

export type StateStore = {
  fooddata: FoodDataTypes[];
  cart: CartTypes[];
};

export type AppRestaurantsInfoTypes = {
  datasource: FoodDataTypes[];
};

export type AppSelectTypes = {
  select: string;
  selectOptions: string[];
};
