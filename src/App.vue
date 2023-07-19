<script lang="ts" setup>
import { onLaunch } from "@dcloudio/uni-app";

onLaunch(() => {
  // 获取胶囊按钮的坐标
  const getMenu = uni.getStorageSync("MenuButton");
  if (!getMenu) {
    const res = uni.getMenuButtonBoundingClientRect();
    uni.setStorageSync("MenuButton", res);
  }
});
</script>

<style>
/* #ifdef APP-PLUS-NVUE */
@import "./tmui/scss/nvue.css";
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import "./tmui/scss/noNvue.css";
/* #endif */
</style>
