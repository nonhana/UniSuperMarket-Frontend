<template>
  <div class="GoodInfo-wrap">
    <view class="head">
      <text>
        <text style="font-size: 22rpx">￥</text>
        {{ goodMainInfo.good_current_price }}
        <text style="font-size: 22rpx; color: #999999"
          >/{{ goodMainInfo.good_classifier }}</text
        >
        <text
          style="
            margin-left: 10rpx;
            font-size: 22rpx;
            color: #cccccc;
            text-decoration: line-through;
          "
        >
          ￥{{ goodMainInfo.good_origin_price }}/{{
            goodMainInfo.good_classifier
          }}
        </text>
      </text>
      <view class="labels">
        <view
          v-for="(label, index) in goodMainInfo.good_labels.slice(0, 2)"
          :key="index"
          class="labels-item"
        >
          <text>{{ label }}</text>
        </view>
      </view>
    </view>
    <view class="name">
      <text>
        {{ goodMainInfo.good_name }}
      </text>
    </view>
    <view class="foot">
      <view
        v-for="(hallmark, index) in goodMainInfo.good_hallmarks"
        :key="index"
        :style="{
          backgroundColor: hallmarkColorList[index][0],
        }"
        class="hallmark"
        @click="changeHallmark(index)"
      >
        <text
          :style="{
            color: hallmarkColorList[index][1],
          }"
          >{{ hallmark }}</text
        >
      </view>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MainInfo } from "@/utils/type";

const props = defineProps<{
  goodId: number;
  goodMainInfo: MainInfo;
}>();

let hallmarkColorList = ref<string[][]>([]);

const changeHallmark = (index: number) => {
  hallmarkColorList.value = new Array(
    props.goodMainInfo.good_hallmarks.length
  ).fill(["#fff", "#666666"]);
  hallmarkColorList.value[index] = ["#40AE36", "#fff"];
};

onMounted(() => {
  hallmarkColorList.value = new Array(
    props.goodMainInfo.good_hallmarks.length
  ).fill(["#fff", "#666666"]);
  hallmarkColorList.value[0] = ["#40AE36", "#fff"];
});
</script>

<style scoped lang="less">
.GoodInfo-wrap {
  position: relative;
  width: 680rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 42rpx;
      font-weight: 290;
      color: #f55726;
    }
    .labels {
      display: flex;
      &-item {
        margin-left: 10rpx;
        width: max-content;
        padding: 5rpx 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4rpx;
        border: 1rpx solid #cccccc;
        text {
          font-family: Microsoft YaHei;
          font-size: 18rpx;
          font-weight: 290;
          color: #999999;
        }
      }
    }
  }
  .name {
    margin: 30rpx auto;
    text {
      font-family: Microsoft YaHei;
      font-size: 36rpx;
      font-weight: 290;
      line-height: 21.06px;
      text-align: justify;
      color: #333333;
    }
  }
  .foot {
    display: flex;
    justify-content: flex-start;
    .hallmark {
      margin-right: 10rpx;
      width: max-content;
      padding: 5rpx 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4rpx;
      text {
        font-family: Microsoft YaHei;
        font-size: 22rpx;
        font-weight: 290;
      }
    }
  }
}
</style>
