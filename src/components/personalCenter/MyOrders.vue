<template>
  <view class="MyOrders-wrap">
    <view class="head">
      <text class="title">我的订单</text>
      <view>
        <text>全部订单</text>
        <img
          class="icon"
          src="../../static/svg/PersonalCenterMyOrderEnter.svg"
        />
      </view>
    </view>
    <view class="button-list">
      <tm-row :width="650" :column="12">
        <tm-col
          v-for="(item, index) in myOrderButtons"
          color="#fff"
          :key="index"
          :height="180"
          :col="4"
        >
          <view class="button-item">
            <img class="button-item-img" :src="item.icon" />
            <text>{{ item.text }}</text>
          </view>
        </tm-col>
      </tm-row>
    </view>
  </view>
</template>

<script setup lang="ts">
const myOrderButtons = [
  {
    text: "待付款",
    icon: "../../static/svg/PersonalCenterMyOrderIcon1.svg",
  },
  {
    text: "待评价",
    icon: "../../static/svg/PersonalCenterMyOrderIcon2.svg",
  },
  {
    text: "退款/售后",
    icon: "../../static/svg/PersonalCenterMyOrderIcon3.svg",
  },
];
</script>

<style scoped lang="less">
.MyOrders-wrap {
  position: relative;
  width: 650rpx;
  height: 234rpx;
  padding: 20rpx;
  border-radius: 20rpx;
  background: #ffffff;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-family: Microsoft YaHei;
      font-size: 28rpx;
      font-weight: 290;
      color: #333333;
    }
    view {
      display: flex;
      align-items: center;
      text {
        margin-right: 10rpx;
        font-family: Microsoft YaHei;
        font-size: 24rpx;
        font-weight: 290;
        color: #666666;
      }
      .icon {
        width: 24rpx;
        height: 18rpx;
      }
    }
  }
  .button-list {
    margin: 20rpx auto 0;
    .button-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-img {
        width: 48rpx;
        height: 48rpx;
      }
      text {
        margin-top: 10rpx;
        font-family: Microsoft YaHei;
        font-size: 22rpx;
        font-weight: 290;
        color: #666666;
      }
    }
  }
}
</style>
