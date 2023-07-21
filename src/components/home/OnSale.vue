<template>
  <view class="OnSale-wrap">
    <view class="head">
      <view class="title">
        <text>超划算</text>
        <view class="tip">
          <text>冬日礼遇</text>
        </view>
      </view>
      <text class="more">查看全部</text>
    </view>
    <view class="on-sale-list">
      <OnSaleItem
        v-for="(item, index) in onSaleItemList"
        :key="index"
        :on-sale-item="item"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import OnSaleItem from "@/little/OnSaleItem.vue";

type OnSaleItemInfo = {
  item_id: number;
  item_img: string;
  item_name: string;
  item_price: number;
};

const onSaleItemList: OnSaleItemInfo[] = [
  {
    item_id: 1,
    item_img: "https://dummyimage.com/400X400",
    item_name: "Product A",
    item_price: 20.99,
  },
  {
    item_id: 2,
    item_img: "https://dummyimage.com/400X400",
    item_name: "Product B",
    item_price: 15.49,
  },
  {
    item_id: 3,
    item_img: "https://dummyimage.com/400X400",
    item_name: "Product C",
    item_price: 30.75,
  },
];
</script>

<style scoped lang="less">
.OnSale-wrap {
  position: relative;
  padding: 20rpx;
  width: 650rpx;
  background-color: #fff;
  .head {
    margin-bottom: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text {
        font-family: Microsoft YaHei;
        font-size: 30rpx;
        font-weight: 290;
        color: #333333;
      }
      .tip {
        margin-left: 10rpx;
        width: max-content;
        display: flex;
        align-items: center;
        padding: 5rpx 10rpx;
        border-radius: 4rpx;
        background: #ec9f09;
        text {
          font-family: Microsoft YaHei;
          font-size: 18rpx;
          font-weight: 290;
          color: #ffffff;
        }
      }
    }
    .more {
      font-family: Microsoft YaHei;
      font-size: 24rpx;
      font-weight: 290;
      color: #40ae36;
    }
  }
  .on-sale-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
