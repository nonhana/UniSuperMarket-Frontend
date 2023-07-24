<template>
  <view class="RealTimeSearch-wrap">
    <text>实时热搜</text>
    <view class="label-list">
      <view
        @click="labelSearch(item.label_name)"
        v-for="(item, index) in labelList"
        :key="index"
        class="label"
      >
        <text>{{ index }}&nbsp;{{ item.label_name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{
  (e: "labelSearch", label: string): void;
}>();

interface Label {
  label_id: number;
  label_name: string;
}

const labelList = ref<Label[]>([
  {
    label_id: 1,
    label_name: "标签1标签1标签1标签1标签1标签1",
  },
  {
    label_id: 2,
    label_name: "标签2标签2标签2",
  },
  {
    label_id: 3,
    label_name: "标签3",
  },
  {
    label_id: 4,
    label_name: "标签4标签4标签4标签4",
  },
]);

const labelSearch = (label: string) => {
  emits("labelSearch", label);
};
</script>

<style scoped lang="less">
.RealTimeSearch-wrap {
  position: relative;
  width: 690rpx;
  text {
    font-family: Microsoft YaHei;
    font-size: 30rpx;
    font-weight: 290;
    color: #333333;
  }
  .label-list {
    display: flex;
    flex-wrap: wrap;
    .label {
      margin: 20rpx 20rpx 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15rpx 30rpx;
      border-radius: 100rpx;
      background: #f8f9fa;
      text {
        font-family: Microsoft YaHei;
        font-size: 22rpx;
        font-weight: 290;
        color: #666666;
      }
    }
  }
}
</style>
