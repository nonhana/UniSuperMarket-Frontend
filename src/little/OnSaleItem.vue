<template>
  <view class="OnSaleItem-wrap">
    <img class="item-picture" :src="onSaleItem.item_img" />
    <text>{{ onSaleItem.item_name }}</text>
    <view class="foot-info">
      <text>
        <text style="font-size: 22rpx">￥</text>
        {{ onSaleItem.item_price }}
      </text>
      <img class="icon" src="../static/svg/OnSaleItemButton.svg" />
    </view>
  </view>
</template>

<script setup lang="ts">
type OnSaleItemInfo = {
  item_id: number;
  item_img: string;
  item_name: string;
  item_price: number;
};

defineProps<{
  onSaleItem: OnSaleItemInfo;
}>();
</script>

<style scoped lang="less">
.OnSaleItem-wrap {
  position: relative;
  padding: 10rpx;
  width: 184rpx;
  height: 282rpx;
  background-color: #fff;
  border: 2rpx solid #40ae36;
  border-radius: 10rpx;
  .item-picture {
    width: 184rpx;
    height: 184rpx;
  }
  text {
    width: 184rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Microsoft YaHei;
    font-size: 24rpx;
    font-weight: 290;
    color: #666666;
  }
  .foot-info {
    margin-top: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 32rpx;
      font-weight: 290;
      color: #f55726;
    }
    .icon {
      width: 44rpx;
      height: 44rpx;
    }
  }
}
</style>
