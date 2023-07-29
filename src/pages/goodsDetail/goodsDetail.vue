<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <img
        @click="back"
        class="icon"
        src="../../static/svg/GoodsDetailBack.svg"
      />
      <view>
        <img class="icon" src="../../static/svg/GoodsDetailShare.svg" />
        <img
          style="margin-left: 20rpx"
          class="icon"
          src="../../static/svg/GoodsDetailShoppingCart.svg"
        />
      </view>
    </view>
    <PictureSlides :good-img-list="goodInfo.good_img_list" />
    <view class="good-info">
      <GoodInfo
        :good-id="goodInfo.good_id"
        :good-main-info="goodInfo.good_main_info"
      />
    </view>
    <view class="good-additional-info">
      <GoodAdditionalInfo
        :good-id="goodInfo.good_id"
        :additional-info="goodInfo.good_additional_info"
      />
    </view>
    <view @click="showWin = !showWin" class="good-specifications">
      <view class="choosed-specifications">
        <text v-if="choosedSpecifications.length <= 1">
          请选择该商品对应的规格
        </text>
        <text v-else>
          已选
          <text
            v-for="(item, index) in choosedSpecifications.filter(
              (item) => item.name !== 'number'
            )"
            :key="index"
            >{{ item.name }}：{{ item.value }}</text
          >
        </text>
        <img
          class="choosed-specifications-icon"
          src="../../static/svg/GoodsDetailChooseSpecification.svg"
        />
      </view>
    </view>
    <view class="specification-info">
      <SpecificationInfo
        :good-id="goodInfo.good_id"
        :specification-info="goodInfo.good_specification_info"
      />
    </view>
    <view class="bottom">
      <view class="little-button-list">
        <view class="little-button">
          <img
            class="little-button-icon"
            src="../../static/svg/GoodsDetailsCollectButton.svg"
          />
          <text>收藏</text>
        </view>
        <view class="little-button">
          <img
            class="little-button-icon"
            src="../../static/svg/GoodsDetailsCustomerServiceButton.svg"
          />
          <text>客服</text>
        </view>
      </view>
      <view @click="addIntoShoppingCart" class="button">
        <text>加入购物车</text>
      </view>
    </view>
    <tm-drawer ref="calendarView" placement="bottom" v-model:show="showWin">
      <view class="specification-choices">
        <view
          v-for="(item, index) in goodInfo.good_specifications"
          :key="index"
          class="label"
        >
          <text>{{ item.name }}</text>
          <view class="label-list">
            <view
              @click="chooseSpecification(index, labelIndex)"
              v-for="(label, labelIndex) in item.labels"
              :key="labelIndex"
              class="label-list-item"
            >
              <text
                :style="{
                  color: goodSpecificationsColorList[index][labelIndex],
                }"
                >{{ label }}</text
              >
            </view>
          </view>
        </view>
        <view class="label">
          <text>选择数量</text>
          <view class="label-list">
            <view @click="changeNumber(0)" class="label-list-item">
              <text>-</text>
            </view>
            <text>{{
              choosedSpecifications[
                choosedSpecifications.findIndex(
                  (item) => item.name === "number"
                )
              ].value
            }}</text>
            <view @click="changeNumber(1)" class="label-list-item">
              <text>+</text>
            </view>
          </view>
        </view>
      </view>
    </tm-drawer>
    <tm-message ref="msg" :lines="2"></tm-message>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "@/store/index";
import type {
  GoodDetailInfo,
  ButtonInfo,
  ShoppingCartInfo,
  ShoppingCartItemInfo,
} from "@/utils/type";
import PictureSlides from "@/components/goodsDetail/PictureSlides.vue";
import GoodInfo from "@/components/goodsDetail/GoodInfo.vue";
import GoodAdditionalInfo from "@/components/goodsDetail/GoodAdditionalInfo.vue";
import SpecificationInfo from "@/components/goodsDetail/SpecificationInfo.vue";
import tmCalendarView from "@/tmui/components/tm-calendar-view/tm-calendar-view.vue";
import tmMessage from "@/tmui/components/tm-message/tm-message.vue";

const localShoppingCart = useStore();
const msg = ref<InstanceType<typeof tmMessage> | null>(null);
const calendarView = ref<InstanceType<typeof tmCalendarView> | null>(null);
const showWin = ref(false);
const goodInfo: GoodDetailInfo = {
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
};

let shoppingCart = ref<ShoppingCartInfo[]>([]);
let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});
let choosedSpecifications = ref<ShoppingCartItemInfo[]>([
  {
    name: "number",
    value: 0,
  },
]);
let goodSpecificationsColorList = ref<string[][]>([]);

const back = () => {
  uni.navigateBack({
    delta: -1,
  });
};
const chooseSpecification = (index: number, labelIndex: number) => {
  const specification = goodInfo.good_specifications[index];
  const choosedSpecificationIndex = choosedSpecifications.value.findIndex(
    (item) => item.name === specification.name
  );

  if (goodSpecificationsColorList.value[index][labelIndex] === "#40AE36") {
    goodSpecificationsColorList.value[index][labelIndex] = "#333333";
    if (choosedSpecificationIndex !== -1) {
      choosedSpecifications.value.splice(choosedSpecificationIndex, 1);
    }
  } else {
    goodSpecificationsColorList.value[index] = new Array(
      specification.labels.length
    ).fill("#333333");
    goodSpecificationsColorList.value[index][labelIndex] = "#40AE36";
    if (choosedSpecificationIndex === -1) {
      choosedSpecifications.value.push({
        name: specification.name,
        value: specification.labels[labelIndex],
      });
    } else {
      choosedSpecifications.value[choosedSpecificationIndex].value =
        specification.labels[labelIndex];
    }
  }
};
const addIntoShoppingCart = () => {
  if (choosedSpecifications.value.length === 1) {
    msg.value?.show({ model: "error", text: "请先选择对应的商品信息！" });
  } else {
    const index = shoppingCart.value.findIndex(
      (item) => item.item_id === goodInfo.good_id
    );
    if (index === -1) {
      shoppingCart.value.push({
        item_id: goodInfo.good_id,
        item_info: choosedSpecifications.value.filter(
          (item) => item.name !== "number"
        ),
        item_count: <number>(
          choosedSpecifications.value[
            choosedSpecifications.value.findIndex(
              (item) => item.name === "number"
            )
          ].value
        ),
      });
    } else {
      shoppingCart.value[index].item_info = choosedSpecifications.value.filter(
        (item) => item.name !== "number"
      );
      shoppingCart.value[index].item_count = <number>(
        choosedSpecifications.value[
          choosedSpecifications.value.findIndex(
            (item) => item.name === "number"
          )
        ].value
      );
    }
    msg.value?.show({ model: "success", text: "更新购物车成功" });
  }
  localShoppingCart.shoppingCart = shoppingCart.value;
};
const changeNumber = (action: number) => {
  const index = choosedSpecifications.value.findIndex(
    (item) => item.name === "number"
  );
  let originNumber = choosedSpecifications.value[index].value as number;
  if (action === 0) {
    choosedSpecifications.value[index].value = originNumber - 1;
    if (<number>choosedSpecifications.value[index].value <= 0) {
      choosedSpecifications.value[index].value = 0;
    }
  } else {
    choosedSpecifications.value[index].value = originNumber + 1;
  }
};

onMounted(() => {
  console.log(localShoppingCart);
  buttonInfo.value = uni.getStorageSync("MenuButton");
  goodInfo.good_specifications.forEach((item) => {
    goodSpecificationsColorList.value?.push(
      new Array(item.labels.length).fill("#333333")
    );
  });
});
</script>

<style scoped lang="less">
.head {
  position: absolute;
  top: 110rpx;
  width: 540rpx;
  z-index: 100;
  padding: 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 48rpx;
    height: 48rpx;
  }
}
.good-info {
  position: relative;
  margin: 15rpx auto 0;
}
.good-additional-info {
  position: relative;
  margin: 15rpx auto 0;
}
.good-specifications {
  position: relative;
  margin: 15rpx auto 0;
  .choosed-specifications {
    width: 680rpx;
    padding: 20rpx;
    height: 60rpx;
    background-color: #fff;
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 26rpx;
      font-weight: 290;
      color: #333333;
    }
    &-icon {
      width: 18rpx;
      height: 24rpx;
    }
  }
}
.specification-choices {
  width: 680rpx;
  margin: 0 auto;
  .label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20rpx;
    text {
      margin-bottom: 20rpx;
      font-family: Microsoft YaHei;
      font-size: 28rpx;
      font-weight: 290;
      color: #333333;
    }
    .label-list {
      display: flex;
      align-items: center;
      &-item {
        width: max-content;
        padding: 10rpx 20rpx;
        margin-right: 20rpx;
        border-radius: 16rpx;
        background: #f8f9fa;
        text {
          font-family: Microsoft YaHei;
          font-size: 28rpx;
          font-weight: 290;
        }
      }
    }
  }
}
.specification-info {
  position: relative;
  margin: 15rpx auto 200rpx;
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 690rpx;
  height: 100rpx;
  padding: 0 30rpx 30rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .little-button-list {
    display: flex;
    .little-button {
      margin-right: 30rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-icon {
        width: 48rpx;
        height: 42rpx;
      }
      text {
        font-family: Microsoft YaHei;
        font-size: 20rpx;
        font-weight: 290;
        color: #333333;
      }
    }
  }
  .button {
    width: 500rpx;
    height: 70rpx;
    border-radius: 1000rpx;
    background: #40ae36;
    display: flex;
    justify-content: center;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 26rpx;
      font-weight: 290;
      color: #ffffff;
    }
  }
}
</style>
