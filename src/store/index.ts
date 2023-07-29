import { defineStore } from "pinia";
import type { ShoppingCartInfo } from "@/utils/type";

let shoppingCart: ShoppingCartInfo[] = [];

export const useStore = defineStore("ShoppingCart", {
  state: () => {
    return {
      user_id: 0,
      shoppingCart,
    };
  },
});
