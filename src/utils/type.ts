// 商品主要信息
export interface MainInfo {
  good_name: string;
  good_labels: string[];
  good_current_price: number;
  good_origin_price: number;
  good_hallmarks: string[];
  good_classifier: string;
}
// 商品附加信息
export interface AdditionalInfo {
  distribution: string;
  service: string;
  offers: string;
}
// 商品特征
export interface Specifications {
  name: string;
  labels: Array<string | number>;
}
// 商品附加特征
export interface SpecificationInfo {
  name: string;
  info: string;
}
// 商品总信息
export interface GoodDetailInfo {
  good_id: number;
  good_img_list: string[];
  good_main_info: MainInfo;
  good_additional_info: AdditionalInfo;
  good_specifications: Specifications[];
  good_specification_info: SpecificationInfo[];
}
// 按钮信息
export interface ButtonInfo {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
}
// 购物车item内部的info信息
interface ShoppingCartItemInfo {
  name: string;
  value: string | number;
}
// 购物车item信息
export interface ShoppingCartInfo {
  item_choose: boolean;
  item_id: number;
  item_name: string;
  item_img: string;
  item_labels: string[];
  item_specification: string[];
  item_count: number;
  item_price: number;
  item_origin_price: number;
  item_info: ShoppingCartItemInfo[];
}
// 确认订单时的商品信息
export interface DealGoodInfo {
  good_id: number;
  good_name: string;
  good_img: string;
  good_count: number;
  good_price: number;
  good_specification: string;
}

// 付款信息
export interface DealInfo {
  deal_price: number;
  deal_time: string;
  deal_payment_method: string;
}
// 促销商品信息
export interface OnSaleItemInfo {
  item_id: number;
  item_img: string;
  item_name: string;
  item_price: number;
}
// 首页侧边栏商品信息
export interface SideInfo {
  title: string;
  second_title: string;
  good_list: {
    good_id: number;
    good_img: string;
  }[];
}
// 用户信息
export interface UserInfo {
  user_id: number;
  user_name: string;
  user_avatar: string;
  user_phone: string;
}
