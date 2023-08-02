import { defineStore } from "pinia";
import type { ShoppingCartInfo, UserInfo } from "@/utils/type";

let shoppingCart: ShoppingCartInfo[] = [
  {
    item_choose: false,
    item_id: 1,
    item_name: "商品1",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签1", "标签2"],
    item_specification: ["红色", "XL"],
    item_count: 2,
    item_price: 50,
    item_origin_price: 60,
    item_info: [
      { name: "颜色", value: "红色" },
      { name: "尺寸", value: "XL" },
    ],
  },
  {
    item_choose: false,
    item_id: 2,
    item_name: "商品2",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签3", "标签4"],
    item_specification: ["红色", "XL"],
    item_count: 1,
    item_price: 30,
    item_origin_price: 30,
    item_info: [
      { name: "颜色", value: "蓝色" },
      { name: "材质", value: "棉布" },
    ],
  },
  {
    item_choose: false,
    item_id: 3,
    item_name: "商品3",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签1", "标签4"],
    item_specification: ["红色", "XL"],
    item_count: 3,
    item_price: 20,
    item_origin_price: 25,
    item_info: [
      { name: "尺寸", value: "M" },
      { name: "材质", value: "丝绸" },
    ],
  },
];
let userInfo: UserInfo = {
  user_id: 0,
  user_name: "用户名称",
  user_avatar: "https://dummyimage.com/400X400",
  user_phone: "13385030987",
};

export const useStore = defineStore("ShoppingCart", {
  state: () => {
    return {
      userInfo,
      shoppingCart,
    };
  },
  actions: {
    // 添加商品到购物车
    addGoodIntoShoppingCart(good_id: number) {
      const good = this.shoppingCart.find((item) => item.item_id === good_id);
      if (good) {
        // 如果购物车中已经有该商品，则数量加一
        good.item_count++;
      } else {
        // 如果购物车中没有该商品，则添加该商品
        this.shoppingCart.push({
          item_choose: false,
          item_id: good_id,
          item_name: "商品1",
          item_img: "https://dummyimage.com/400X400",
          item_labels: ["标签1", "标签2"],
          item_specification: ["红色", "XL"],
          item_count: 1,
          item_price: 50,
          item_origin_price: 60,
          item_info: [
            { name: "颜色", value: "红色" },
            { name: "尺寸", value: "XL" },
          ],
        });
      }
    },
  },
});
