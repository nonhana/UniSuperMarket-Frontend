<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <text class="title">购物车</text>
      <text @click="showWindow = !showWindow" class="delete">删除</text>
    </view>
    <view v-if="shoppingCart.length === 0" class="empty">
      <text class="empty-title">购物车空空如也</text>
      <text class="empty-content">赶紧慰劳一下自己吧？</text>
      <view @click="toPageHome" class="button">
        <text>去逛逛</text>
      </view>
    </view>
    <view v-else class="shopping-cart">
      <view v-for="(item, index) in shoppingCart" :key="index">
        <tm-checkbox
          @click="chooseItem(item.item_id)"
          v-model="item.item_choose"
          :round="10"
          color="orange"
        ></tm-checkbox>
        <ShoppingCartItem :shopping-cart-item="item" />
      </view>
    </view>
    <view class="bottom">
      <view class="choose-all">
        <tm-checkbox
          @click="chooseItem(0)"
          :round="10"
          color="orange"
          v-model="selectAllStatus"
          label="全选"
        ></tm-checkbox>
      </view>
      <view class="payment">
        <text class="payment-price">
          合计:
          <text style="font-size: 22rpx">￥</text>
          {{ totalPrice }}
        </text>
        <view class="payment-button">
          <text>去结算</text>
        </view>
      </view>
    </view>
    <tm-modal
      color="white"
      okColor="#40ae36"
      cancelColor="#40ae36"
      okLinear="left"
      splitBtn
      title="提示"
      content="确定要删除该商品吗？"
      v-model:show="showWindow"
      @ok="confirmDelete"
    ></tm-modal>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import { useStore } from "@/store";
import type { ShoppingCartInfo } from "@/utils/type";
import ShoppingCartItem from "@/little/ShoppingCartItem.vue";

let localShoppingCart = useStore();
let shoppingCart = ref<ShoppingCartInfo[]>([]);
let totalPrice = ref<number>(0);
let selectAllStatus = ref<boolean>(false);
let showWindow = ref<boolean>(false);

const toPageHome = () => {
  uni.switchTab({
    url: "../home/home",
  });
};
const chooseItem = async (item_id: number) => {
  console.log(shoppingCart.value);
  await nextTick();
  if (item_id !== 0) {
    const index = shoppingCart.value.findIndex(
      (item) => item.item_id === item_id
    );
    if (shoppingCart.value[index].item_choose) {
      totalPrice.value +=
        shoppingCart.value[index].item_price *
        shoppingCart.value[index].item_count;
    } else {
      totalPrice.value -=
        shoppingCart.value[index].item_price *
        shoppingCart.value[index].item_count;
    }
    selectAllStatus.value = shoppingCart.value.every(
      (item) => item.item_choose
    );
  } else {
    shoppingCart.value.forEach((item) => {
      item.item_choose = selectAllStatus.value;
    });
    if (selectAllStatus.value) {
      totalPrice.value = shoppingCart.value.reduce(
        (total, item) => total + item.item_price * item.item_count,
        0
      );
    } else {
      totalPrice.value = 0;
    }
  }
};
const confirmDelete = async () => {
  shoppingCart.value = shoppingCart.value.filter((item) => !item.item_choose);
  localShoppingCart.shoppingCart = shoppingCart.value;
  await nextTick();
  showWindow.value = false;
};

watch(localShoppingCart.shoppingCart, (newV, _) => {
  shoppingCart.value = newV;
});

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
  border-radius: 20rpx;
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
.shopping-cart {
  position: relative;
  width: 700rpx;
  margin: 15rpx auto 0;
  padding: 10rpx;
  border-radius: 20rpx;
  background: #ffffff;
  view {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 710rpx;
  height: 100rpx;
  padding: 0 20rpx;
  background: #ffffff;
  .choose-all {
    display: flex;
    align-items: center;
    text {
      margin-left: 10rpx;
      font-family: Microsoft YaHei;
      font-size: 24rpx;
      font-weight: 290;
      color: #333333;
    }
  }
  .payment {
    display: flex;
    align-items: center;
    &-price {
      margin-right: 20rpx;
      font-family: Microsoft YaHei;
      font-size: 32rpx;
      font-weight: 290;
      color: #333333;
    }
    &-button {
      width: 180rpx;
      height: 70rpx;
      border-radius: 100rpx;
      background: #40ae36;
      display: flex;
      justify-content: center;
      align-items: center;
      text {
        font-family: Microsoft YaHei;
        font-size: 26rpx;
        font-weight: 290;
        color: #ffffff;
      }
    }
  }
}
</style>
