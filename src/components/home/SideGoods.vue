<template>
  <view class="SideGoods-wrap">
    <text class="title">
      {{ sideDetail.title }}
    </text>
    <text class="second-title">
      {{ sideDetail.second_title }}
    </text>
    <view class="img-list">
      <img
        v-for="(item, index) in sideDetail.img_list"
        :key="index"
        class="img"
        :src="item"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface SideInfo {
  title: string;
  second_title: string;
  img_list: string[];
}

const props = defineProps<{
  type: number;
}>();

let sideDetail = ref<SideInfo>({
  title: "",
  second_title: "",
  img_list: [],
});

watch(
  () => props.type,
  (newV, _) => {
    if (newV === 0) {
      sideDetail.value.title = "吃好点";
      sideDetail.value.second_title = "美国小木瓜尝鲜";
      sideDetail.value.img_list = [
        "https://dummyimage.com/400X400",
        "https://dummyimage.com/400X400",
      ];
    } else {
      sideDetail.value.title = "产地量贩";
      sideDetail.value.second_title = "核桃19.9元/箱";
      sideDetail.value.img_list = [
        "https://dummyimage.com/400X400",
        "https://dummyimage.com/400X400",
      ];
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.SideGoods-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20rpx;
  width: 294rpx;
  height: 216rpx;
  border-radius: 20rpx;
  background: #ffffff;
  .title {
    font-family: Microsoft YaHei;
    font-size: 30rpx;
    font-weight: 290;
    color: #333333;
  }
  .second-title {
    font-family: Microsoft YaHei;
    font-size: 24rpx;
    font-weight: 290;
    color: #999999;
  }
  .img-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .img {
      width: 130rpx;
      height: 130rpx;
    }
  }
}
</style>
