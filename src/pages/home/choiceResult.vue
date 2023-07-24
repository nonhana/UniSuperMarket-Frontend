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
    <view class="choice-list">
      <tm-row :width="750" :column="10">
        <tm-col
          @click="changeChoice(index)"
          :height="180"
          color="#F8F9FA"
          v-for="(item, index) in choicesList"
          :key="index"
          :col="2"
        >
          <view
            class="choice-img"
            :style="{
              border: `2rpx solid ${choicesColorList[index][0]}`,
            }"
          >
            <img class="img" :src="item.img" />
          </view>
          <view
            class="choice-text"
            :style="{
              backgroundColor: choicesColorList[index][1],
            }"
          >
            <text
              :style="{
                color: choicesColorList[index][2],
              }"
              >{{ item.title }}</text
            >
          </view>
        </tm-col>
      </tm-row>
    </view>
    <tm-side-menu
      v-model:active="active"
      :height="1000"
      :itemHeight="100"
      :list="list"
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
    </tm-side-menu>
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
interface ChoiceItemInfo {
  img: string;
  title: string;
}

const active = ref<number>(0);
const list = ref([
  { text: "分类", id: 1 },
  { text: "分类", id: 2 },
  { text: "分类", id: 3 },
  { text: "分类", id: 4 },
  { text: "分类", id: 5 },
  { text: "分类", id: 6 },
  { text: "分类", id: 7 },
  { text: "分类", id: 8 },
  { text: "分类", id: 9 },
  { text: "分类", id: 10 },
  { text: "分类", id: 11 },
  { text: "分类", id: 12 },
]);
const choicesList: ChoiceItemInfo[] = [
  {
    img: "../../static/img/HomeChoice1.png",
    title: "水果蔬菜",
  },
  {
    img: "../../static/img/HomeChoice2.png",
    title: "水果蔬菜",
  },
  {
    img: "../../static/img/HomeChoice3.png",
    title: "肉禽蛋品",
  },
  {
    img: "../../static/img/HomeChoice4.png",
    title: "海鲜水产",
  },
  {
    img: "../../static/img/HomeChoice5.png",
    title: "速食冷冻",
  },
];
const searchResultList = ref<SearchResultItemInfo[]>([]);

let choicesColorList = ref<string[][]>([]);
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
const changeChoice = (index: number) => {
  choicesColorList.value = new Array(5).fill(["#fff", "#f8f9fa", "#666666"]);
  choicesColorList.value[index] = ["#40AE36", "#40AE36", "#fff"];
};

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
});

onLoad((options: any) => {
  choicesColorList.value = new Array(5).fill(["#fff", "#f8f9fa", "#666666"]);
  choicesColorList.value[options.index] = ["#40AE36", "#40AE36", "#fff"];
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
.choice-list {
  position: relative;
  .choice-img {
    width: 114rpx;
    height: 114rpx;
    border-radius: 57rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    .img {
      width: 108rpx;
      height: 108rpx;
    }
  }
  .choice-text {
    width: max-content;
    margin-top: 10rpx;
    padding: 6rpx 12rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100rpx;
    background: #40ae36;
    text {
      font-family: Microsoft YaHei;
      font-size: 24rpx;
      font-weight: 290;
      color: #ffffff;
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
