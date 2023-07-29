<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <text class="title">购物车</text>
      <text class="delete">删除</text>
    </view>
    <view v-if="shoppingCart.length === 0" class="empty">
      <text class="empty-title">购物车空空如也</text>
      <text class="empty-content">赶紧慰劳一下自己吧？</text>
      <view @click="toPageHome" class="button">
        <text>去逛逛</text>
      </view>
    </view>
    <view v-else></view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/store";
import type { ShoppingCartInfo } from "@/utils/type";

let localShoppingCart = useStore();
let shoppingCart = ref<ShoppingCartInfo[]>([]);

const toPageHome = () => {
  uni.switchTab({
    url: "../home/home",
  });
};

onMounted(() => {
  shoppingCart.value = localShoppingCart.shoppingCart;
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 690rpx;
  height: 250rpx;
  padding: 0 30rpx;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  .title {
    position: absolute;
    left: 50%;
    top: 180rpx;
    transform: translate(-50%);
    font-family: Microsoft YaHei;
    font-size: 36rpx;
    font-weight: 290;
    color: #01000d;
  }
  .delete {
    position: relative;
    top: 190rpx;
    font-family: Microsoft YaHei;
    font-size: 28rpx;
    font-weight: 290;
    color: #666666;
  }
}
.empty {
  position: relative;
  width: 720rpx;
  height: 300rpx;
  margin: 15rpx auto 0;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-title {
    margin-bottom: 30rpx;
    font-family: Microsoft YaHei;
    font-size: 32rpx;
    font-weight: 290;
    color: #333333;
  }
  &-content {
    margin-bottom: 30rpx;
    font-family: Microsoft YaHei;
    font-size: 28rpx;
    font-weight: 290;
    color: #999999;
  }
  .button {
    width: 180rpx;
    height: 70rpx;
    border-radius: 35rpx;
    border: 2rpx solid #40ae36;
    display: flex;
    justify-content: center;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 26rpx;
      font-weight: 290;
      color: #40ae36;
    }
  }
}
</style>
