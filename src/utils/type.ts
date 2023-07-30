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
  item_count: number;
  item_price: number;
  item_origin_price: number;
  item_info: ShoppingCartItemInfo[];
}
