<template>
  <view class="DealGoodItem-wrap">
    <img class="good-img" :src="dealGoodItem.good_img" />
    <view class="good-info">
      <view class="part1">
        <text class="name">
          {{ dealGoodItem.good_name }}
        </text>
        <text class="tip"> 规格：{{ dealGoodItem.good_specification }} </text>
        <text class="tip"> 数量：{{ dealGoodItem.good_count }} </text>
      </view>
      <view class="part2">
        <text>
          <text style="font-size: 22rpx">￥</text>
          {{ dealGoodItem.good_price }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { DealGoodInfo } from "@/utils/type";
defineProps<{
  dealGoodItem: DealGoodInfo;
}>();
</script>

<style scoped lang="less">
.DealGoodItem-wrap {
  position: relative;
  width: 630rpx;
  height: 200rpx;
  margin: 20rpx auto 0;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .good-img {
    width: 160rpx;
    height: 160rpx;
  }
  .good-info {
    display: flex;
    width: 450rpx;
    height: 160rpx;
    justify-content: space-between;
    align-items: flex-start;
    .part1 {
      display: flex;
      height: 160rpx;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .name {
        font-family: Microsoft YaHei;
        font-size: 26rpx;
        font-weight: 290;
        color: #333333;
      }
      .tip {
        font-family: Microsoft YaHei;
        font-size: 22rpx;
        font-weight: 290;
        color: #999999;
      }
    }
    .part2 {
      text {
        font-family: Microsoft YaHei;
        font-size: 32rpx;
        font-weight: 290;
        color: #333333;
      }
    }
  }
}
</style>
