<template>
  <tm-app color="#F8F9FA">
    <notch style="background-color: #40ae36" />
    <view
      :style="{
        height: `${buttonInfo?.height + 8}px`,
      }"
      class="head"
    >
      <view class="part1">
        <img class="icon" src="../../static/svg/HomeHeadPosition.svg" />
        <text>{{ position }}</text>
        <img
          style="margin-left: 10rpx"
          class="little-icon"
          src="../../static/svg/HomeHeadPositionDropDown.svg"
        />
      </view>
      <view class="part2">
        <img class="icon" src="../../static/svg/HomeHeadQRCode.svg" />
        <img
          style="margin-left: 20rpx"
          class="icon"
          src="../../static/svg/HomeHeadMessage.svg"
        />
      </view>
    </view>
    <view class="search-box">
      <input
        v-model="keywords"
        type="text"
        placeholder="吃出美好生活"
        @confirm="handleSearch"
      />
    </view>
    <view class="slide-pictures">
      <SlidePictures />
    </view>
    <view class="choice-list">
      <tm-row :width="690" :column="10">
        <tm-col
          :height="160"
          color="#F8F9FA"
          v-for="(item, index) in choicesList"
          :key="index"
          :col="2"
        >
          <img class="choice-img" :src="item.img" />
          <text>{{ item.title }}</text>
        </tm-col>
      </tm-row>
    </view>
    <view class="on-sale">
      <OnSale />
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import notch from "@/little/notch.vue";
import SlidePictures from "@/components/home/SlidePictures.vue";
import OnSale from '@/components/home/OnSale.vue'

type ButtonInfo = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};
type ChoiceItemInfo = {
  img: string;
  title: string;
};

const choicesList: ChoiceItemInfo[] = [
  {
    img: "../../static/img/HomeChoice1.png",
    title: "水果蔬菜",
  },
  {
    img: "../../static/img/HomeChoice2.png",
    title: "水果蔬菜",
  },
  {
    img: "../../static/img/HomeChoice3.png",
    title: "肉禽蛋品",
  },
  {
    img: "../../static/img/HomeChoice4.png",
    title: "海鲜水产",
  },
  {
    img: "../../static/img/HomeChoice5.png",
    title: "速食冷冻",
  },
];

let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});
let position = ref<string>("海淀村中关村大厦");
let keywords = ref<string>("");

const handleSearch = () => {
  console.log(keywords.value);
};

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
  console.log(buttonInfo.value);
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 100%;
  background-color: #40ae36;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
  .little-icon {
    width: 16rpx;
    height: 9rpx;
  }
  .part1 {
    margin-left: 20rpx;
    display: flex;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 30rpx;
      font-weight: 290;
      color: #ffffff;
    }
  }
  .part2 {
    margin-right: 230rpx;
    display: flex;
    align-items: center;
  }
}
.search-box {
  position: relative;
  width: 100%;
  margin-top: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 610rpx;
    padding: 0 0 0 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: #edeff2;
    background-image: url("../../static/svg/HomeSearchIcon.svg");
    background-size: 40rpx 40rpx;
    background-repeat: no-repeat;
    background-position: 30rpx 20rpx;
  }
}
.slide-pictures {
  position: relative;
  width: 690rpx;
  margin: 30rpx auto 0;
}
.choice-list {
  position: relative;
  width: 690rpx;
  margin: 30rpx auto 0;
  .choice-img {
    width: 108rpx;
    height: 108rpx;
    border-radius: 54rpx;
  }
  text {
    margin-top: 10rpx;
    font-family: Microsoft YaHei;
    font-size: 24rpx;
    font-weight: 290;
    color: #666666;
  }
}
.on-sale{
  position: relative;
  margin: 30rpx auto 0;
}
</style>
