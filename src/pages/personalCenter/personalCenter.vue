<template>
  <tm-app color="#f8f9fa">
    <view class="background">
      <img
        class="background-img"
        src="../../static/img/PersonalCenterBackImg.png"
      />
    </view>
    <view class="head">
      <view class="part1">
        <img class="head-img" :src="userInfo.user_avatar" />
        <view class="head-info">
          <text>{{ userInfo.user_name }}</text>
          <text style="font-size: 24rpx">{{ userInfo.user_phone }}</text>
        </view>
      </view>
      <view class="part2">
        <img class="icon" src="../../static/svg/PersonalCenterSetting.svg" />
      </view>
    </view>
    <view class="my-orders">
      <MyOrders />
    </view>
    <view class="recommended-products">
      <RecommendedProducts />
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store/index";
import type { UserInfo } from "@/utils/type";
import MyOrders from "@/components/personalCenter/MyOrders.vue";
import RecommendedProducts from "@/components/personalCenter/RecommendedProducts.vue";

const store = useStore();

const userInfo = ref<UserInfo>(store.userInfo);
</script>

<style scoped lang="less">
.background {
  position: absolute;
  width: 750rpx;
  height: 563rpx;
  &-img {
    width: 750rpx;
    height: 563rpx;
  }
}
.head {
  position: relative;
  top: 180rpx;
  width: 690rpx;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  .part1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .head-img {
      width: 110rpx;
      height: 110rpx;
      border-radius: 1000rpx;
    }
    .head-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 20rpx;
      text {
        font-family: Microsoft YaHei;
        font-size: 32rpx;
        font-weight: 290;
        color: #ffffff;
      }
    }
  }
  .part2 {
    .icon {
      width: 48rpx;
      height: 48rpx;
    }
  }
}
.my-orders {
  position: relative;
  margin: 250rpx auto 0;
}
.recommended-products {
  position: relative;
  margin: 20rpx auto 0;
}
</style>
