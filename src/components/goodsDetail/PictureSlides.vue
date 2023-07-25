<template>
  <div class="PictureSlides-wrap">
    <tm-carousel
      autoplay
      :width="750"
      :height="750"
      :list="listimg"
    ></tm-carousel>
  </div>
</template>

<script setup lang="ts">
const listimg = [
  "https://dummyimage.com/400X400",
  "https://dummyimage.com/400X400",
  "https://dummyimage.com/400X400",
  "https://dummyimage.com/400X400",
  "https://dummyimage.com/400X400",
];
</script>

<style scoped lang="less">
.PictureSlides-wrap {
  position: relative;
  width: 750rpx;
  height: 750rpx;
}
</style>
