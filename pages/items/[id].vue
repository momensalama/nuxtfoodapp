<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "~/store/index";
import type { StateReactive } from "~/types";

const route = useRoute();
const store = useStore();

store.getFoodData();

const fooddata = computed(() => store.fooddata);

const state = reactive<StateReactive>({
  count: 1,
  itemOptions: "",
  itemAddons: [],
  isAddedToCart: false,
  errors: false,
});

const rules = {
  itemOptions: { required },
  itemAddons: {
    required,
  },
};
const $v = useVuelidate(rules, state);

const getFoodItem = computed(() => {
  return fooddata.value
    .flatMap((category) => category.menu)
    .find((item) => item.id === route.params.id);
});

const combinedPrice = computed(() => {
  let price = getFoodItem.value?.price || 0;
  if (state.itemOptions) {
    price += 1;
  }
  if (state.itemAddons.length) {
    price += state.itemAddons.length;
  }
  return (price * state.count).toFixed(2);
});

function onAddToCart() {
  let formData = {
    item: getFoodItem.value?.item,
    price: Number(combinedPrice.value),
    count: state.count,
    options: state.itemOptions,
    addOns: state.itemAddons,
    id: crypto.randomUUID(),
  };
  let addonError = $v.value.itemAddons.$invalid;
  let optionError = getFoodItem.value?.options
    ? $v.value.itemOptions.$invalid
    : false;
  console.log(optionError);
  if (addonError || optionError) {
    state.errors = true;
  } else {
    state.errors = false;
    store.addToCart(formData);
    state.isAddedToCart = true;
  }
}
</script>

<template>
  <main class="container">
    <img class="image" :src="`/${getFoodItem?.img}`" />

    <section class="details">
      <AppToast v-if="state.isAddedToCart"
        >Order submitted <br />
        Check out more
        <NuxtLink to="/restaurants">restaurants</NuxtLink></AppToast
      >
      <app-toast v-if="state.errors">
        Please select options and
        <br />addons before continuing
      </app-toast>
      <h1>{{ getFoodItem?.item }}</h1>

      <h3>Price: ${{ getFoodItem?.price }}</h3>

      <div class="quantity">
        <input type="number" min="1" v-model="state.count" />
        <button @click="onAddToCart" class="primary">
          Add to Cart - {{ combinedPrice }}
        </button>
      </div>
      <fieldset v-if="getFoodItem?.options">
        <legend>
          <h3>Options</h3>
        </legend>
        <div v-for="option in getFoodItem?.options" :key="option">
          <input
            type="radio"
            name="option"
            :id="option"
            :value="option"
            v-model="$v.itemOptions.$model"
          />
          <label :for="option">{{ option }}</label>
        </div>
      </fieldset>

      <fieldset v-if="getFoodItem?.addOns">
        <legend>
          <h3>Add Ons</h3>
        </legend>
        <div v-for="addon in getFoodItem?.addOns" :key="addon">
          <input
            type="checkbox"
            name="addon"
            :id="addon"
            :value="addon"
            v-model="$v.itemAddons.$model"
          />
          <label :for="addon">{{ addon }}</label>
        </div>
      </fieldset>
      <section class="options">
        <h3>Description</h3>
        <p>{{ getFoodItem?.description }}</p>
      </section>
    </section>
  </main>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  gap: 2rem;

  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .details {
    width: 100%;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .quantity {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;

      input {
        padding: 0.5rem;
        width: 4rem;
      }

      button {
        padding: 0.5rem 1rem;
      }
    }

    fieldset {
      margin-top: 1rem;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;

      legend {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      input {
        margin-right: 1rem;
      }
    }
  }

  .options {
    width: 100%;

    h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}

@media (min-width: 768px) {
  .container {
    .image {
      width: 50%;
    }

    .details {
      width: 50%;
    }

    .options {
      width: 50%;
    }
  }
}
@media (max-width: 768px) {
  .container {
    flex-wrap: wrap;
  }
}
</style>
