<template>
  <view class="SlidePictures-wrap">
    <tm-carousel
      autoplay
      :round="5"
      :width="690"
      :height="240"
      :list="listimg"
    ></tm-carousel>
  </view>
</template>

<script setup lang="ts">
const listimg = [
  "https://dummyimage.com/345X120",
  "https://dummyimage.com/345X120",
  "https://dummyimage.com/345X120",
  "https://dummyimage.com/345X120",
];
</script>

<style scoped lang="less">
.SlidePictures-wrap {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
