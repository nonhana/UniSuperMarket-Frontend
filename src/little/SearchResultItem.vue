<template>
  <view
    :style="{
      width: sizeList[0],
      height: sizeList[1],
    }"
    class="SearchResultItem-wrap"
  >
    <img
      :style="{
        width: sizeList[1],
        height: sizeList[1],
      }"
      :src="searchResultItem.item_img"
    />
    <view
      :style="{
        width: sizeList[2],
        height: sizeList[1],
      }"
      class="item-info"
    >
      <view class="head">
        <text class="title">{{ searchResultItem.item_name }}</text>
        <view class="label-list">
          <text
            v-for="(label, index) in searchResultItem.item_labels"
            :key="index"
            >{{ label }}
          </text>
        </view>
      </view>
      <view class="bottom">
        <view class="hallmark-list">
          <view
            v-for="(hallmark, index) in searchResultItem.item_hallmarks"
            :key="index"
          >
            <text>{{ hallmark }}</text>
          </view>
        </view>
        <view class="price">
          <text>
            <text style="font-size: 22rpx">￥</text>
            {{ searchResultItem.item_current_price }}
            <text style="font-size: 22rpx; color: #999999"
              >/{{ searchResultItem.item_classifier }}</text
            >
            <text
              style="
                font-size: 22rpx;
                color: #cccccc;
                margin-left: 20rpx;
                text-decoration: line-through;
              "
              >￥{{ searchResultItem.item_origin_price }}/{{
                searchResultItem.item_classifier
              }}</text
            >
          </text>
          <tm-badge
            :count="itemCount"
            :maxCount="99"
            color="red"
            linear="top"
            :top="-10"
            :right="-10"
          >
            <img
              @click="addShoppingCart"
              class="icon"
              src="../static/svg/OnSaleItemButton.svg"
            />
          </tm-badge>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface ShoppingCartInfo {
  item_id: number;
  item_count: number;
}

const props = defineProps<{
  searchResultItem: {
    item_id: number;
    item_name: string;
    item_img: string;
    item_labels: string[];
    item_hallmarks: string[];
    item_current_price: number;
    item_origin_price: number;
    item_classifier: string;
  };
  type: number;
}>();

const emits = defineEmits<{
  (e: "addShoppingCart", data: ShoppingCartInfo): void;
}>();

let sizeList: string[] = new Array(3).fill("");
let itemCount = ref<number>(0);

const addShoppingCart = () => {
  itemCount.value++;
  emits("addShoppingCart", {
    item_id: props.searchResultItem.item_id,
    item_count: itemCount.value,
  });
};

watch(
  () => props.type,
  (newV, _) => {
    if (newV === 0) {
      sizeList = ["690rpx", "240rpx", "420rpx"];
    } else {
      sizeList = ["540rpx", "220rpx", "310rpx"];
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="less">
.SearchResultItem-wrap {
  position: relative;
  margin-bottom: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .head {
      .title {
        font-family: Microsoft YaHei;
        font-size: 26rpx;
        font-weight: 290;
        color: #333333;
      }
      .label-list {
        display: flex;
        margin-top: 10rpx;
        text {
          margin-right: 10rpx;
          font-family: Microsoft YaHei;
          font-size: 22rpx;
          font-weight: 290;
          color: #999999;
        }
      }
    }
    .bottom {
      .hallmark-list {
        display: flex;
        margin-bottom: 10rpx;
        view {
          margin-right: 10rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5rpx 10rpx;
          border-radius: 5rpx;
          border: 1rpx solid #f55726;
          text {
            font-family: Microsoft YaHei;
            font-size: 18rpx;
            font-weight: 290;
            color: #f55726;
          }
        }
      }
      .price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        text {
          font-family: Microsoft YaHei;
          font-size: 32rpx;
          font-weight: 290;
          color: #f55726;
        }
        .icon {
          width: 48rpx;
          height: 48rpx;
        }
      }
    }
  }
}
</style>
