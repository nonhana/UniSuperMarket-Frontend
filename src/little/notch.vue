<script lang="ts" setup>
import { getSystemInfo } from "@/utils/common/systemInfo";
// 获取刘海屏高度
const statusBarHeight = getSystemInfo().statusBarHeight;
</script>

<template>
  <view class="notch" :style="{ height: `${statusBarHeight}px` }" />
</template>
