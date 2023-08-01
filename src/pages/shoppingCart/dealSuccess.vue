<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <img @click="back" class="icon" src="../../static/svg/Back.svg" />
      <text>付款</text>
    </view>

    <view class="success">
      <img class="success-img" src="../../static/svg/DealSuccess.svg" />
      <text>付款成功</text>
    </view>

    <view class="deal-info">
      <view class="deal-info-item">
        <text style="color: #999999">付款金额：</text>
        <text>{{ dealInfo.deal_price }}</text>
      </view>
      <tm-divider></tm-divider>
      <view class="deal-info-item">
        <text style="color: #999999">付款时间：</text>
        <text>{{ dealInfo.deal_time }}</text>
      </view>
      <tm-divider></tm-divider>
      <view class="deal-info-item">
        <text style="color: #999999">付款方式：</text>
        <text>{{ dealInfo.deal_payment_method }}</text>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { DealInfo } from "@/utils/type";
import { onLoad } from "@dcloudio/uni-app";

let dealInfo = ref<DealInfo>({
  deal_price: 0,
  deal_time: "",
  deal_payment_method: "",
});

const back = () => {
  uni.switchTab({
    url: "../shoppingCart/shoppingCart",
  });
};

onLoad((options) => {
  if (options) {
    dealInfo.value = JSON.parse(options.dealInfo);
  }
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 750rpx;
  height: 200rpx;
  background-color: #ffffff;
  .icon {
    position: absolute;
    left: 20rpx;
    bottom: 20rpx;
    width: 50rpx;
    height: 50rpx;
  }
  text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20rpx;
    font-family: Microsoft YaHei;
    font-size: 36rpx;
    font-weight: 290;
    color: #01000d;
  }
}
.success {
  margin-top: 200rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-img {
    width: 180rpx;
    height: 180rpx;
  }
  text {
    margin-top: 30rpx;
    font-family: Microsoft YaHei;
    font-size: 30rpx;
    font-weight: 290;
    color: #333333;
  }
}
.deal-info {
  position: relative;
  width: 650rpx;
  margin: 200rpx auto 0;
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;

    text {
      font-family: Microsoft YaHei;
      font-size: 30rpx;
      font-weight: 290;
      color: #333333;
    }
  }
}
</style>
