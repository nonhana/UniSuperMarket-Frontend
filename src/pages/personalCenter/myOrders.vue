<template>
  <tm-app color="#F8F9FA">
    <view class="head">
      <img class="icon" src="../../static/svg/Back.svg" />
      <text>我的订单</text>
    </view>
    <view class="tab">
      <tm-row :width="750" :column="12">
        <tm-col
          @click="selectTab(index)"
          v-for="(item, index) in tabList"
          :key="index"
          :height="80"
          :col="4"
          color="#fff"
        >
          <view class="tab-item">
            <text
              :style="{
                color: selectedTab[index][0],
              }"
              >{{ item }}</text
            >
            <view v-if="selectedTab[index][1]" class="line"></view>
          </view>
        </tm-col>
      </tm-row>
    </view>
    <view v-if="orderList.length === 0" class="empty">
      <img class="empty-img" src="../../static/svg/MyOrderEmpty.svg" />
      <text>抱歉，没有找到订单哦</text>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const tabList: string[] = ["全部", "待付款", "待评价"];
const orderList: any[] = [];

let selectedTab = ref<[string, boolean][]>([]);

const selectTab = (index: number) => {
  selectedTab.value = selectedTab.value.map((_, i) => {
    if (i === index) {
      return ["#333333", true];
    } else {
      return ["#666666", false];
    }
  });
};

onMounted(() => {
  selectedTab.value = tabList.map(() => ["#666666", false]);
  selectedTab.value[0] = ["#333333", true];
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
.tab {
  position: relative;
  margin: 0 auto;
  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 30rpx;
      font-weight: 290;
      color: #333333;
    }
    .line {
      width: 60rpx;
      height: 6rpx;
      border-radius: 1000rpx;
      background: #40ae36;
    }
  }
}
.empty {
  margin-top: 300rpx;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty-img {
    width: 218rpx;
    height: 250rpx;
  }
  text {
    margin-top: 50rpx;
    font-family: Microsoft YaHei;
    font-size: 32rpx;
    font-weight: 290;
    color: #999999;
  }
}
</style>
