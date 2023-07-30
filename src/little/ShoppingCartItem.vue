<template>
  <view class="ShoppingCartItem-wrap">
    <img class="item-img" :src="shoppingCartItem.item_img" />
    <view class="item-info">
      <view class="part1">
        <text>{{ shoppingCartItem.item_name }}</text>
      </view>
      <view class="part2">
        <view
          v-for="(label, index) in shoppingCartItem.item_labels"
          :key="index"
          class="label"
        >
          <text>{{ label }}</text>
        </view>
      </view>
      <view class="part3">
        <view class="part3-price">
          <text class="origin">￥{{ shoppingCartItem.item_origin_price }}</text>
          <text class="current">
            <text style="font-size: 22rpx">￥</text>
            {{ shoppingCartItem.item_price }}
          </text>
        </view>
        <view class="part3-count">
          <tm-stepper
            v-model="presentShoppingCartItem.item_count"
            color="#333333"
            bgColor="#F8F9FA"
            circular
            :defaultValue="presentShoppingCartItem.item_count"
          ></tm-stepper>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { ShoppingCartInfo } from "@/utils/type";
import { useStore } from "@/store";

const props = defineProps<{
  shoppingCartItem: ShoppingCartInfo;
}>();

const localShoppingCart = useStore();

let presentShoppingCartItem = ref<ShoppingCartInfo>(props.shoppingCartItem);

watch(
  () => presentShoppingCartItem.value.item_count,
  (newV, _) => {
    const index = localShoppingCart.shoppingCart.findIndex(
      (item) => item.item_id === presentShoppingCartItem.value.item_id
    );
    localShoppingCart.shoppingCart[index].item_count = newV;
  }
);
</script>

<style scoped lang="less">
.ShoppingCartItem-wrap {
  position: relative;
  width: 636rpx;
  height: 208rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 20rpx;
  .item-img {
    width: 180rpx;
    height: 180rpx;
  }
  .item-info {
    width: 420rpx;
    height: 208rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .part1 {
      text {
        font-family: Microsoft YaHei;
        font-size: 26rpx;
        font-weight: 290;
        color: #333333;
      }
    }
    .part2 {
      display: flex;
      .label {
        width: max-content;
        padding: 5rpx 10rpx;
        border-radius: 4rpx;
        border: 0.5px solid #f55726;
        display: flex;
        justify-content: center;
        align-items: center;
        text {
          font-family: Microsoft YaHei;
          font-size: 18rpx;
          font-weight: 290;
          color: #f55726;
        }
      }
    }
    .part3 {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      &-price {
        display: flex;
        flex-direction: column;
        .origin {
          font-family: Microsoft YaHei;
          font-size: 22rpx;
          font-weight: 290;
          text-decoration: line-through;
          color: #cccccc;
        }
        .current {
          font-family: Microsoft YaHei;
          font-size: 32rpx;
          font-weight: 290;
          color: #f55726;
        }
      }
    }
  }
}
</style>
