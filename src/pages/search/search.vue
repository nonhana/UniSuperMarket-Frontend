<template>
  <tm-app color="#fff">
    <notch style="background-color: #f8f9fa" />
    <view
      :style="{
        height: `${buttonInfo?.height}px`,
      }"
      style="background-color: #f8f9fa"
    ></view>
    <view class="head">
      <img @click="back" class="icon" src="../../static/svg/Back.svg" />
      <input
        v-model="keywords"
        class="search-box"
        placeholder="吃出美好生活"
        type="text"
        @confirm="handleSearch"
      />
      <text @click="cancel">取消</text>
    </view>
    <view class="history">
      <History @label-search="labelSearch" />
    </view>
    <view class="real-time-search">
      <RealTimeSearch @label-search="labelSearch" />
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onShow } from "@dcloudio/uni-app";
import notch from "@/little/notch.vue";
import History from "@/components/search/History.vue";
import RealTimeSearch from "@/components/search/RealTimeSearch.vue";

interface ButtonInfo {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}

let keywords = ref<string>("");
let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});

const back = () => {
  uni.navigateBack({
    delta: -1,
  });
};
const handleSearch = () => {
  uni.navigateTo({
    url: `../search/searchResult?keywords=${keywords.value}`,
  });
};
const labelSearch = (label: string) => {
  uni.navigateTo({
    url: `../search/searchResult?keywords=${label}`,
  });
};
const cancel = () => {
  keywords.value = "";
};

onShow(() => {
  keywords.value = "";
});
onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 710rpx;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
  .search-box {
    width: 500rpx;
    padding: 0 0 0 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: #fff;
    background-image: url("../../static/svg/HomeSearchIcon.svg");
    background-size: 40rpx 40rpx;
    background-repeat: no-repeat;
    background-position: 30rpx 20rpx;
  }
  text {
    font-family: Microsoft YaHei;
    font-size: 28rpx;
    font-weight: 290;
    color: #666666;
  }
}
.history {
  position: relative;
  margin: 30rpx auto 0;
}
.real-time-search {
  position: relative;
  margin: 80rpx auto 0;
}
</style>
