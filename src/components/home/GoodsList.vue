<template>
  <view class="GoodsList-wrap">
    <tm-waterfall ref="wall" :width="690">
      <tm-waterfall-item
        v-for="(item, index) in goodList"
        :key="index"
        :img="item.good_img"
        @click="itemClick"
      >
        <view class="item-wrap">
          <text class="name">{{ item.good_name }}</text>
          <view class="label-list">
            <view
              v-for="(label, label_index) in item.good_labels"
              :key="label_index"
              class="label"
            >
              <text>{{ label }}</text>
            </view>
          </view>
          <view class="bottom">
            <text>
              <text style="font-size: 22rpx">￥</text>
              {{ item.good_price }}
              <text style="font-size: 22rpx; color: #999999"
                >/{{ item.good_classifier }}</text
              >
            </text>
            <img
              class="buy-button"
              src="../../static/svg/OnSaleItemButton.svg"
            />
          </view>
        </view>
      </tm-waterfall-item>
    </tm-waterfall>
  </view>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import tmWaterfall from "@/tmui/components/tm-waterfall/tm-waterfall.vue";

interface GoodInfo {
  good_id: number;
  good_name: string;
  good_img: string;
  good_labels: string[];
  good_price: number;
  good_classifier: string;
}

const wall = ref<InstanceType<typeof tmWaterfall> | null>(null);
const goodList = ref<GoodInfo[]>([
  {
    good_id: 1,
    good_name: "商品1",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签1", "标签2"],
    good_price: 100,
    good_classifier: "分类1",
  },
  {
    good_id: 2,
    good_name: "商品2",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签3", "标签4"],
    good_price: 150,
    good_classifier: "分类2",
  },
  {
    good_id: 3,
    good_name: "商品3",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签1", "标签5"],
    good_price: 80,
    good_classifier: "分类1",
  },
  {
    good_id: 4,
    good_name: "商品3",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签1", "标签5"],
    good_price: 80,
    good_classifier: "分类1",
  },
  {
    good_id: 5,
    good_name: "商品3",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签1", "标签5"],
    good_price: 80,
    good_classifier: "分类1",
  },
  {
    good_id: 6,
    good_name: "商品3",
    good_img: "https://dummyimage.com/400X400",
    good_labels: ["标签1", "标签5"],
    good_price: 80,
    good_classifier: "分类1",
  },
]);

function itemClick() {
  uni.navigateTo({
    url: "tree",
  });
}
</script>
<style scoped lang="less">
.GoodsList-wrap {
  position: relative;
  display: flex;
  .item-wrap {
    padding: 12rpx;
    width: 320rpx;
    .name {
      font-family: Microsoft YaHei;
      font-size: 26rpx;
      font-weight: 290;
      color: #333333;
    }
    .label-list {
      margin-top: 10rpx;
      display: flex;
      .label {
        margin-right: 10rpx;
        padding: 3rpx 6rpx;
        border-radius: 4rpx;
        border: 1rpx solid #f55726;
        display: flex;
        justify-content: center;
        align-items: center;
        text {
          font-family: Microsoft YaHei;
          font-size: 18rpx;
          font-weight: 290;
          color: #f55726;
        }
      }
    }
    .bottom {
      margin-top: 10rpx;
      display: flex;
      justify-content: space-between;
      text {
        font-family: Microsoft YaHei;
        font-size: 32rpx;
        font-weight: 290;
        color: #f55726;
      }
      .buy-button {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
}
</style>
