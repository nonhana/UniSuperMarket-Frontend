<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <img class="icon" src="../../static/svg/GoodsDetailBack.svg" />
      <view>
        <img class="icon" src="../../static/svg/GoodsDetailShare.svg" />
        <img
          style="margin-left: 20rpx"
          class="icon"
          src="../../static/svg/GoodsDetailShoppingCart.svg"
        />
      </view>
    </view>
    <PictureSlides />
    <view class="good-info">
      <GoodInfo />
    </view>
    <view class="good-additional-info">
      <GoodAdditionalInfo :additional-info="goodAdditionalInfo" />
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PictureSlides from "@/components/goodsDetail/PictureSlides.vue";
import GoodInfo from "@/components/goodsDetail/GoodInfo.vue";
import GoodAdditionalInfo from "@/components/goodsDetail/GoodAdditionalInfo.vue";

interface ButtonInfo {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}
interface AdditionalInfo {
  distribution: string;
  service: string;
  offers: string;
}

const goodAdditionalInfo: AdditionalInfo = {
  distribution: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
  service: "内容内容内容内容内容内容内容内容内容内容内容",
  offers: "内容内容内容内容内容内容内容内容内容内容内容",
};

let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
  console.log(buttonInfo.value);
});
</script>

<style scoped lang="less">
.head {
  position: absolute;
  top: 110rpx;
  width: 540rpx;
  z-index: 100;
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
}
.good-info {
  position: relative;
  margin: 15rpx auto 0;
}
.good-additional-info {
  position: relative;
  margin: 15rpx auto 0;
}
</style>
