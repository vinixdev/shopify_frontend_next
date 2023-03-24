import React from "react";
import { ProductItem } from "../../components/products/interface/productInterfaces";
import { ShopActionType } from "../ShopReducer";

export interface BasketItem extends ProductItem {
  count: number;
}

export interface ShopStateInterface {
  basket: BasketItem[];
  user: null | string;
  address: AddressInterface | null;
  coupon: { code: string; amount: number };
  paymentMethod: "online" | "cash";
}

export interface AddressInterface {
  title: string;
  city: string;
  state: string;
  address: string;
  zip_code: string;
  full_name: string;
  mobile: string;
  _id: string;
}

export interface ShopContextInterface {
  state: ShopStateInterface;
  dispatch: React.Dispatch<ShopActionType>;
}
