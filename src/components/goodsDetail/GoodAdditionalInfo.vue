<template>
  <view class="GoodAdditionalInfo-wrap">
    <text style="margin: 10rpx 0">
      <text style="color: #999999">配送</text>&emsp;{{
        additionalInfo.distribution
      }}
    </text>
    <text style="margin: 10rpx 0">
      <text style="color: #999999">服务</text>&emsp;{{ additionalInfo.service }}
    </text>
    <text style="margin: 10rpx 0">
      <text style="color: #999999">优惠</text>&emsp;{{ additionalInfo.offers }}
    </text>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  additionalInfo: {
    distribution: string;
    service: string;
    offers: string;
  };
}>();
</script>

<style scoped lang="less">
.GoodAdditionalInfo-wrap {
  position: relative;
  width: 680rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  text {
    font-family: Microsoft YaHei;
    font-size: 24rpx;
    font-weight: 290;
    color: #333333;
  }
}
</style>
