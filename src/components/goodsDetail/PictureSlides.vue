<template>
  <div class="PictureSlides-wrap">
    <tm-carousel
      autoplay
      :width="750"
      :height="750"
      :list="goodImgList"
    ></tm-carousel>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  goodImgList: string[];
}>();
</script>

<style scoped>
.PictureSlides-wrap {
  position: relative;
  width: 750rpx;
  height: 750rpx;
}
</style>
