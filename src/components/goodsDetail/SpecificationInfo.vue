<template>
  <view class="SpecificationInfo-wrap">
    <text class="title">规格信息</text>
    <view class="table">
      <tm-row
        v-for="(item, index) in specificationInfo"
        :key="index"
        :column="12"
        :width="680"
      >
        <tm-col
          :border-gutter="[2, 2, 2, 2]"
          :height="70"
          :col="3"
          border-color="#EDEDED"
          color="#F8F9FA"
        >
          <text>{{ item.name }}</text>
        </tm-col>
        <tm-col
          :border-gutter="[2, 2, 2, 2]"
          :height="70"
          :col="9"
          border-color="#EDEDED"
          color="#fff"
        >
          <text>{{ item.info }}</text>
        </tm-col>
      </tm-row>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { SpecificationInfo } from "@/utils/type";

defineProps<{
  goodId: number;
  specificationInfo: SpecificationInfo[];
}>();
</script>

<style scoped lang="less">
.SpecificationInfo-wrap {
  position: relative;
  width: 680rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  .title {
    font-family: Microsoft YaHei;
    font-size: 26rpx;
    font-weight: 290;
    color: #333333;
  }
  .table {
    margin-top: 30rpx;
  }
}
</style>
