<template>
  <tm-app color="#f8f9fa">
    <view class="head">
      <img @click="back" class="icon" src="../../static/svg/Back.svg" />
      <text>确认订单</text>
    </view>
    <view class="goods-list">
      <DealGoodItem
        v-for="(item, index) in choosedItemList"
        :key="index"
        :deal-good-item="item"
      />
    </view>
    <view class="payment-methods">
      <view class="payment-methods-item">
        <view>
          <img
            class="payment-methods-icon"
            src="../../static/svg/PaymentOfWechat.svg"
          />
          <text>微信支付</text>
        </view>
        <tm-checkbox
          @click="changePaymentMethod(0)"
          :round="10"
          color="orange"
          v-model="selectPaymentWechat"
        ></tm-checkbox>
      </view>
      <view class="payment-methods-item">
        <view>
          <img
            class="payment-methods-icon"
            src="../../static/svg/PaymentOfAliPay.svg"
          />
          <text>支付宝支付</text>
        </view>
        <tm-checkbox
          @click="changePaymentMethod(1)"
          :round="10"
          color="orange"
          v-model="selectPaymentAliPay"
        ></tm-checkbox>
      </view>
    </view>
    <view class="bottom">
      <text style="margin-right: 30rpx">
        共{{ choosedItemList.length }}件，合计：
        <text style="color: #f55726">
          ￥
          <text style="font-size: 32rpx">
            {{
              choosedItemList.reduce(
                (pre, cur) => pre + cur.good_price * cur.good_count,
                0
              )
            }}
          </text>
        </text>
      </text>
      <view @click="showPaymentWin = !showPaymentWin" class="button">
        <text>提交订单</text>
      </view>
    </view>
    <tm-drawer hide-header placement="bottom" v-model:show="showPaymentWin">
      <view class="payment-window">
        <text class="title">确认付款</text>
        <text class="price">
          ￥
          <text style="font-size: 60rpx">
            {{
              choosedItemList.reduce(
                (pre, cur) => pre + cur.good_price * cur.good_count,
                0
              )
            }}
          </text>
        </text>
        <view class="payment">
          <text style="color: #999999">付款方式</text>
          <text>{{ selectPaymentWechat ? "微信支付" : "支付宝支付" }}</text>
        </view>
        <view @click="toPageSuccess" class="pay-button">
          <text>立即付款</text>
        </view>
      </view>
    </tm-drawer>
  </tm-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { DealGoodInfo, DealInfo } from "@/utils/type";
import { onLoad } from "@dcloudio/uni-app";
import { useStore } from "@/store";
import { getCurrentDateTime } from "@/utils/common/getCurrentTime";
import DealGoodItem from "@/little/DealGoodItem.vue";

const localShoppingCart = useStore();

let choosedItemList = ref<DealGoodInfo[]>([]);
let selectPaymentWechat = ref<boolean>(false);
let selectPaymentAliPay = ref<boolean>(false);
let showPaymentWin = ref<boolean>(false);

const back = () => {
  uni.navigateBack({
    delta: -1,
  });
};
const changePaymentMethod = (index: number) => {
  if (index === 0) {
    selectPaymentWechat.value = true;
    selectPaymentAliPay.value = false;
  } else {
    selectPaymentWechat.value = false;
    selectPaymentAliPay.value = true;
  }
};
const toPageSuccess = () => {
  const dealInfo: DealInfo = {
    deal_price: choosedItemList.value.reduce(
      (pre, cur) => pre + cur.good_price * cur.good_count,
      0
    ),
    deal_time: getCurrentDateTime(),
    deal_payment_method: selectPaymentWechat.value ? "微信支付" : "支付宝支付",
  };

  uni.navigateTo({
    url: `/pages/shoppingCart/dealSuccess?dealInfo=${JSON.stringify(dealInfo)}`,
  });
};

onLoad((options) => {
  console.log(options);
  const goods_id = options!.goods_id.split(",");
  goods_id.forEach((item: number) => {
    const index = localShoppingCart.shoppingCart.findIndex(
      (good) => good.item_id === Number(item)
    );
    choosedItemList.value.push({
      good_id: localShoppingCart.shoppingCart[index].item_id,
      good_name: localShoppingCart.shoppingCart[index].item_name,
      good_img: localShoppingCart.shoppingCart[index].item_img,
      good_specification:
        localShoppingCart.shoppingCart[index].item_specification.join("；"),
      good_price: localShoppingCart.shoppingCart[index].item_price,
      good_count: localShoppingCart.shoppingCart[index].item_count,
    });
  });
});
</script>

<style scoped lang="less">
.head {
  position: relative;
  width: 750rpx;
  height: 200rpx;
  background-color: #ffffff;
  .icon {
    position: absolute;
    left: 20rpx;
    bottom: 20rpx;
    width: 50rpx;
    height: 50rpx;
  }
  text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20rpx;
    font-family: Microsoft YaHei;
    font-size: 36rpx;
    font-weight: 290;
    color: #01000d;
  }
}
.goods-list {
  position: relative;
  width: 650rpx;
  margin: 30rpx auto 0;
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
}
.payment-methods {
  position: relative;
  width: 650rpx;
  margin: 30rpx auto 0;
  padding: 20rpx;
  border-radius: 20rpx;
  background-color: #ffffff;
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    view {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text {
        margin-left: 20rpx;
        font-family: Microsoft YaHei;
        font-size: 30rpx;
        font-weight: 290;
        color: #333333;
      }
    }
  }
  &-icon {
    width: 50rpx;
    height: 50rpx;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 710rpx;
  height: 100rpx;
  padding: 0 20rpx;
  background: #ffffff;
  text {
    font-family: Microsoft YaHei;
    font-size: 24rpx;
    font-weight: 290;
    color: #333333;
  }
  .button {
    width: 180rpx;
    height: 70rpx;
    border-radius: 100rpx;
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
.payment-window {
  width: 630rpx;
  height: 400rpx;
  margin: 50rpx auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .title {
    font-family: Microsoft YaHei;
    font-size: 32rpx;
    font-weight: 290;
    color: #333333;
  }
  .price {
    font-family: Microsoft YaHei;
    font-size: 26rpx;
    font-weight: 290;
    color: #333333;
  }
  .payment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80rpx;
    border-top: 2rpx #e5e5e5 solid;
    border-bottom: 2rpx #e5e5e5 solid;
    text {
      font-family: Microsoft YaHei;
      font-size: 26rpx;
      font-weight: 290;
      color: #333333;
    }
  }
  .pay-button {
    width: 630rpx;
    height: 90rpx;
    border-radius: 1000rpx;
    background: #40ae36;
    display: flex;
    justify-content: center;
    align-items: center;
    text {
      font-family: Microsoft YaHei;
      font-size: 30rpx;
      font-weight: 290;
      color: #ffffff;
    }
  }
}
</style>
