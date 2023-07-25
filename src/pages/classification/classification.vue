<template>
  <tm-app color="#fff">
    <notch style="background-color: #f8f9fa" />
    <view
      :style="{
        height: `${buttonInfo?.height}px`,
      }"
      style="background-color: #f8f9fa"
    >
    </view>
    <view class="head">
      <img class="icon" src="../../static/svg/Back.svg" @click="back" />
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
    <tm-side-menu
      v-model:active="active"
      :height="1300"
      :itemHeight="100"
      :list="list"
    >
      <view class="result-head">
        <view v-if="filterStatus" class="filter-details">
          <view class="filter-details-head">
            <text>全部分类</text>
            <img
              style="transform: rotate(180)"
              class="more"
              src="../../static/svg/ClassificationMore.svg"
              @click="filterListAction(0)"
            />
          </view>
          <view class="filter-list">
            <view
              v-for="(filter, index) in filterList"
              :key="index"
              :style="{
                backgroundColor: filterColorList[index][0],
              }"
              class="filter-list-item"
              @click="chooseFilter(index)"
            >
              <text
                :style="{
                  color: filterColorList[index][1],
                }"
                >{{ filter }}</text
              >
            </view>
          </view>
        </view>
        <scroll-view class="filter" scroll-x="true">
          <view>
            <view
              v-for="(filter, index) in filterList"
              :key="index"
              :style="{
                backgroundColor: filterColorList[index][0],
              }"
              class="filter-item"
              @click="chooseFilter(index)"
            >
              <text
                :style="{
                  color: filterColorList[index][1],
                }"
                >{{ filter }}</text
              >
            </view>
          </view>
        </scroll-view>
        <img
          class="more"
          src="../../static/svg/ClassificationMore.svg"
          @click="filterListAction(1)"
        />
      </view>
      <view
        :style="{
          filter: listBlur,
        }"
        style="transition: all 0.3s"
      >
        <view v-if="searchResultList.length !== 0" style="margin: 10rpx">
          <SearchResultItem
            v-for="(item, index) in searchResultList"
            :key="index"
            :search-result-item="item"
            :type="1"
            @addShoppingCart="updateShoppingCart"
          />
        </view>
        <view v-else class="empty">
          <img class="empty-img" src="../../static/svg/SearchResultEmpty.svg" />
          <text>抱歉，没有找到相关的商品哦</text>
        </view>
      </view>
    </tm-side-menu>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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
interface GoodType {
  [key: string]: string | number;
}

const active = ref<number>(0);
const list = ref<GoodType[]>([
  { text: "水果蔬菜", id: 1 },
  { text: "肉禽蛋品", id: 2 },
  { text: "海鲜水产", id: 3 },
  { text: "速食冷冻", id: 4 },
  { text: "粮油米面", id: 5 },
]);
const searchResultList = ref<SearchResultItemInfo[]>([
  {
    item_id: 1,
    item_name: "Product A",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["Label 1", "Label 2", "Label 3"],
    item_hallmarks: ["Hallmark 1", "Hallmark 2"],
    item_current_price: 19.9,
    item_origin_price: 24.9,
    item_classifier: "份",
  },
  {
    item_id: 2,
    item_name: "Product B",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["Label 4", "Label 5"],
    item_hallmarks: ["Hallmark 3", "Hallmark 4", "Hallmark 5"],
    item_current_price: 12.9,
    item_origin_price: 15.9,
    item_classifier: "个",
  },
  {
    item_id: 3,
    item_name: "Product C",
    item_img: "https://dummyimage.com/400X400",
    item_labels: ["Label 1", "Label 6"],
    item_hallmarks: ["Hallmark 2", "Hallmark 6"],
    item_current_price: 29.5,
    item_origin_price: 34.9,
    item_classifier: "包",
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
let filterList = ref<string[]>([
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
  "标签1",
]);
let filterColorList = ref<string[][]>([]);
let filterStatus = ref<boolean>(false);
let listBlur = ref<string>("blur(0px)");

const back = () => {
  uni.switchTab({
    url: "../home/home",
  });
};
const handleSearch = () => {
  uni.navigateTo({
    url: `../search/searchResult?keywords=${keywords.value}`,
  });
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
const chooseFilter = (index: number) => {
  filterColorList.value = new Array(filterList.value.length).fill([
    "#EDEFF2",
    "#666666",
  ]);
  filterColorList.value[index] = ["#40AE3620", "#333333"];
};
const filterListAction = (type: number) => {
  filterStatus.value = !filterStatus.value;
  if (type === 0) {
    listBlur.value = "blur(0px)";
  } else {
    listBlur.value = "blur(4px)";
  }
};

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
  filterColorList.value = new Array(filterList.value.length).fill([
    "#EDEFF2",
    "#666666",
  ]);
  filterColorList.value[0] = ["#40AE3620", "#333333"];
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
.result-head {
  width: 560rpx;
  height: 80rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .filter {
    margin: 10rpx;
    white-space: nowrap;
    width: 454rpx;
    view {
      display: flex;
      flex-wrap: nowrap;
      .filter-item {
        margin-right: 20rpx;
        width: max-content;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5rpx 10rpx;
        border-radius: 6rpx;
        text {
          font-family: Microsoft YaHei;
          font-size: 24rpx;
          font-weight: 290;
        }
      }
    }
  }
  .more {
    width: 18rpx;
    height: 11rpx;
  }
  .filter-details {
    position: absolute;
    top: 0;
    z-index: 1000;
    width: 560rpx;
    background-color: #fff;
    padding: 0 0 30rpx 0;
    &-head {
      padding: 0 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80rpx;
      text {
        font-family: Microsoft YaHei;
        font-size: 26rpx;
        font-weight: 290;
        color: #333333;
      }
    }
    .filter-list {
      width: 528rpx;
      display: flex;
      flex-wrap: wrap;
      margin: 20rpx auto 0;
      .filter-list-item {
        margin: 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 156rpx;
        height: 70rpx;
        border-radius: 10rpx;
        text {
          font-family: Microsoft YaHei;
          font-size: 24rpx;
          font-weight: 290;
        }
      }
    }
  }
}
.empty {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 250rpx auto 0;
  .empty-img {
    width: 250rpx;
    height: 250rpx;
  }
  text {
    margin-top: 80rpx;
    font-family: Microsoft YaHei;
    font-size: 32rpx;
    font-weight: 290;
    color: #999999;
  }
}
</style>
