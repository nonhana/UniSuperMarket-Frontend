<template>
  <view class="GoodsList-wrap">
    <tm-waterfall ref="wall" :width="690">
      <tm-waterfall-item
        v-for="(item, index) in goodList"
        :key="index"
        :img="item.good_img_list[0]"
        @img-click="itemClick(item.good_id)"
      >
        <view class="item-wrap">
          <text class="name">{{ item.good_main_info.good_name }}</text>
          <view class="label-list">
            <view
              v-for="(label, label_index) in item.good_main_info.good_labels"
              :key="label_index"
              class="label"
            >
              <text>{{ label }}</text>
            </view>
          </view>
          <view class="bottom">
            <text>
              <text style="font-size: 22rpx">￥</text>
              {{ item.good_main_info.good_current_price }}
              <text style="font-size: 22rpx; color: #999999"
                >/{{ item.good_main_info.good_classifier }}</text
              >
            </text>

            <tm-badge
              :count="10"
              :maxCount="99"
              color="red"
              linear="top"
              :top="-15"
              :right="-15"
            >
              <img
                @click="addIntoShoppingCart(item.good_id)"
                class="buy-button"
                src="../../static/svg/OnSaleItemButton.svg"
              />
            </tm-badge>
          </view>
        </view>
      </tm-waterfall-item>
    </tm-waterfall>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useStore } from "@/store";
import type { GoodDetailInfo } from "@/utils/type";
import tmWaterfall from "@/tmui/components/tm-waterfall/tm-waterfall.vue";

type Count = { good_id: number; good_count: number };

const localShoppingCart = useStore();
const wall = ref<InstanceType<typeof tmWaterfall> | null>(null);
const goodList = ref<GoodDetailInfo[]>(
  new Array(10).fill({
    good_id: 1,
    good_img_list: [
      "https://dummyimage.com/400X400",
      "https://dummyimage.com/400X400",
      "https://dummyimage.com/400X400",
      "https://dummyimage.com/400X400",
      "https://dummyimage.com/400X400",
    ],
    good_main_info: {
      good_name: "优质商品",
      good_current_price: 100,
      good_origin_price: 150,
      good_classifier: "件",
      good_labels: ["标签1", "标签2", "标签3", "标签4"],
      good_hallmarks: ["特点1", "特点2", "特点3"],
    },
    good_additional_info: {
      distribution: "快递配送",
      service: "售后服务",
      offers: "优惠活动",
    },
    good_specifications: [
      {
        name: "颜色",
        labels: ["红色", "蓝色", "绿色"],
      },
      {
        name: "尺寸",
        labels: ["S", "M", "L", "XL"],
      },
    ],
    good_specification_info: [
      {
        name: "颜色",
        info: "红色",
      },
      {
        name: "尺寸",
        info: "M",
      },
    ],
  }) as GoodDetailInfo[]
);
const countOfShoppingCart = ref<Count[]>([]);

const itemClick = (good_id: number) => {
  uni.navigateTo({
    url: `../../pages/goodsDetail/goodsDetail?good_id=${good_id}`,
  });
};
const addIntoShoppingCart = (good_id: number) => {
  localShoppingCart.addGoodIntoShoppingCart(good_id);
};

onMounted(() => {
  goodList.value.forEach((item) => {
    countOfShoppingCart.value.push({
      good_id: item.good_id,
      good_count: 0,
    });
  });
  localShoppingCart.shoppingCart.forEach((item) => {
    countOfShoppingCart.value.forEach((count) => {
      if (count.good_id === item.item_id) {
        count.good_count = item.item_count;
      }
    });
  });
  console.log(countOfShoppingCart.value);
});
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
