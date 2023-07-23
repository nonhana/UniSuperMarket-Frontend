<template>
  <tm-app color="#fff">
    <notch style="background-color: #f8f9fa" />
    <view
      :style="{
        height: `${buttonInfo?.height}px`,
      }"
      style="background-color: #f8f9fa"
    ></view>
    <view class="head">
      <img @click="back" class="icon" src="../../static/svg/Back.svg" />
      <input
        v-model="keywords"
        class="search-box"
        placeholder="吃出美好生活"
        type="text"
        @confirm="handleSearch"
      />
      <tm-badge
        :count="shoppingCartCount"
        :maxCount="99"
        color="red"
        linear="top"
        :top="-10"
        :right="-10"
      >
        <img class="icon" src="../../static/svg/ShoppingCartNormal.svg" />
      </tm-badge>
    </view>
    <view class="sort-bar">
      <tm-row :width="750" :column="12">
        <tm-col color="#fff" :height="90" :col="4">
          <view class="sort-bar-item">
            <text>价格</text>
            <img class="icon" src="../../static/svg/SearchResultSort1.svg" />
          </view>
        </tm-col>
        <tm-col color="#fff" :height="90" :col="4">
          <text>销量</text>
        </tm-col>
        <tm-col color="#fff" :height="90" :col="4">
          <view class="sort-bar-item">
            <text>筛选</text>
            <img class="icon" src="../../static/svg/SearchResultSort2.svg" />
          </view>
        </tm-col>
      </tm-row>
    </view>
    <view class="item-list">
      <SearchResultItem
        v-for="(item, index) in searchResultList"
        :key="index"
        :search-result-item="item"
        @addShoppingCart="updateShoppingCart"
      />
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import notch from "@/little/notch.vue";
import SearchResultItem from "@/little/SearchResultItem.vue";

interface ButtonInfo {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}
interface SearchResultItemInfo {
  item_id: number;
  item_name: string;
  item_img: string;
  item_labels: string[];
  item_hallmarks: string[];
  item_current_price: number;
  item_origin_price: number;
  item_classifier: string;
}
interface ShoppingCartInfo {
  item_id: number;
  item_count: number;
}

const searchResultList = ref<SearchResultItemInfo[]>([
  {
    item_id: 1,
    item_name: "商品1",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签1", "标签2"],
    item_hallmarks: ["商标1"],
    item_current_price: 100,
    item_origin_price: 120,
    item_classifier: "分类1",
  },
  {
    item_id: 2,
    item_name: "商品2",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签3", "标签4"],
    item_hallmarks: ["商标2", "商标3"],
    item_current_price: 150,
    item_origin_price: 180,
    item_classifier: "分类2",
  },
  {
    item_id: 3,
    item_name: "商品3",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["标签1", "标签5"],
    item_hallmarks: ["商标4"],
    item_current_price: 80,
    item_origin_price: 90,
    item_classifier: "分类1",
  },
]);

let shoppingCartCount = ref<number>(0);
let keywords = ref<string>("");
let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});
let shoppingCartList: ShoppingCartInfo[] = [];

const back = () => {
  uni.navigateBack({
    delta: -1,
  });
};
const handleSearch = () => {
  console.log(keywords.value);
};
const updateShoppingCart = (data: ShoppingCartInfo) => {
  shoppingCartCount.value = 0;
  const itemIndex = shoppingCartList.findIndex(
    (item) => item.item_id === data.item_id
  );
  if (itemIndex === -1) {
    shoppingCartList.push(data);
  } else {
    shoppingCartList[itemIndex].item_count = data.item_count;
  }
  shoppingCartList.forEach((item) => {
    shoppingCartCount.value += item.item_count;
  });
};

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
});

onLoad((options: any) => {
  keywords.value = options.keywords;
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 710rpx;
  background-color: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
  .search-box {
    width: 500rpx;
    padding: 0 0 0 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: #fff;
    background-image: url("../../static/svg/HomeSearchIcon.svg");
    background-size: 40rpx 40rpx;
    background-repeat: no-repeat;
    background-position: 30rpx 20rpx;
  }
}
.sort-bar {
  position: relative;
  text {
    font-family: Microsoft YaHei;
    font-size: 26rpx;
    font-weight: 290;
    color: #666666;
  }
  .icon {
    margin-left: 10rpx;
    width: 16rpx;
    height: 20rpx;
  }
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.item-list {
  position: relative;
  width: 690rpx;
  margin: 30rpx auto 0;
}
</style>
