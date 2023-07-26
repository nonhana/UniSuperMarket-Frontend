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
    <PictureSlides />
    <view class="good-info">
      <GoodInfo />
    </view>
    <view class="good-additional-info">
      <GoodAdditionalInfo :additional-info="goodAdditionalInfo" />
    </view>
    <view @click="showWin = !showWin" class="good-specifications">
      <view class="choosed-specifications">
        <text v-if="choosedSpecifications.length === 0">
          请选择该商品对应的规格
        </text>
        <text v-else>
          已选
          <text v-for="(item, index) in choosedSpecifications" :key="index"
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
      
    </view>
    <tm-drawer ref="calendarView" :placement="pos" v-model:show="showWin">
      <view class="specification-choices">
        <view
          v-for="(item, index) in goodSpecifications"
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
      </view>
    </tm-drawer>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PictureSlides from "@/components/goodsDetail/PictureSlides.vue";
import GoodInfo from "@/components/goodsDetail/GoodInfo.vue";
import GoodAdditionalInfo from "@/components/goodsDetail/GoodAdditionalInfo.vue";
import tmCalendarView from "@/tmui/components/tm-calendar-view/tm-calendar-view.vue";
const calendarView = ref<InstanceType<typeof tmCalendarView> | null>(null);
const showWin = ref(false);
const pos = ref("bottom");

interface ButtonInfo {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}
interface AdditionalInfo {
  distribution: string;
  service: string;
  offers: string;
}
interface GoodSpecificationsInfo {
  name: string;
  labels: Array<string | number>;
}
interface ChoosedSpecificationsInfo {
  name: string;
  value: string | number;
}

const goodAdditionalInfo: AdditionalInfo = {
  distribution:
    "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
  service: "内容内容内容内容内容内容内容内容内容内容内容",
  offers: "内容内容内容内容内容内容内容内容内容内容内容",
};
const goodSpecifications: GoodSpecificationsInfo[] = [
  {
    name: "specification1",
    labels: ["选项1", "选项2", "选项3"],
  },
  {
    name: "specification2",
    labels: ["选项1", "选项2", "选项3"],
  },
];

let buttonInfo = ref<ButtonInfo>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
});
let choosedSpecifications = ref<ChoosedSpecificationsInfo[]>([]);
let goodSpecificationsColorList = ref<string[][]>([]);

const back = () => {
  uni.navigateBack({
    delta: -1,
  });
};
const chooseSpecification = (index: number, labelIndex: number) => {
  const specification = goodSpecifications[index];
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

onMounted(() => {
  buttonInfo.value = uni.getStorageSync("MenuButton");
  goodSpecifications.forEach((item) => {
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
</style>
