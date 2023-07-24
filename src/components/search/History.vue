<template>
  <view class="History-wrap">
    <view class="head">
      <text>历史搜索</text>
      <img
        v-if="labelList.length !== 0"
        @click="confirmClear = true"
        class="icon"
        src="../../static/svg/Delete.svg"
      />
    </view>
    <view class="label-list">
      <view
        @click="labelSearch(item.label_name)"
        v-for="(item, index) in labelList"
        :key="index"
        class="label"
      >
        <text>{{ item.label_name }}</text>
      </view>
    </view>
  </view>
  <tm-modal
    color="white"
    okColor="red"
    cancelColor="red"
    okLinear="left"
    splitBtn
    title="确认弹窗"
    content="确定要清除所有的历史记录吗？"
    v-model:show="confirmClear"
    @ok="clearHistory"
  ></tm-modal>
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

let confirmClear = ref<boolean>(false);

const clearHistory = () => {
  labelList.value.splice(0);
};
const labelSearch = (label: string) => {
  emits("labelSearch", label);
};
</script>

<style scoped lang="less">
.History-wrap {
  position: relative;
  width: 690rpx;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 30rpx;
      font-weight: 290;
      color: #333333;
    }
    .icon {
      width: 30rpx;
      height: 30rpx;
    }
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
