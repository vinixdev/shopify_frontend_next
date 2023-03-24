import { BasketItem, ShopStateInterface } from "./interfaces/interfaces";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "../services/encryptionService";

export const initialState: ShopStateInterface = {
  basket: [],
  user: null,
  coupon: { code: "", amount: 0 },
  address: null,
  paymentMethod: "online",
};

export type ShopActionType = {
  type: string;
  payload: any;
};

export const ShopReducer = (
  state: ShopStateInterface = initialState,
  action: ShopActionType
): ShopStateInterface => {
  let newState = state;

  switch (action.type) {
    case "@shop/set_initial_state":
      newState = action.payload;
      break;
    case "@shop/add_item_to_basket":
      newState = {
        ...state,
        basket: [...state.basket, action.payload],
      };
      break;

    case "@shop/increment_product":
      newState = {
        ...state,
        basket: state.basket.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      };
      break;

    case "@shop/decrement_product":
      newState = {
        ...state,
        basket: state.basket.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              count: item.count - 1,
            };
          }
          return item;
        }),
      };
      break;

    case "@shop/basket_delete_item":
      newState = {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.payload),
      };
      break;

    case "@shop/set_coupon":
      newState = {
        ...state,
        coupon: { code: action.payload.code, amount: action.payload.amount },
      };
      break;

    case "@shop/set_user":
      newState = {
        ...state,
        user: action.payload,
      };
      break;
    case "@shop/add_address":
      newState = {
        ...state,
        address: action.payload,
      };
      break;
    case "@shop/change_payment_method":
      newState = {
        ...state,
        paymentMethod: action.payload,
      };
      break;
    case "@shop/reset_state":
      newState = {
        ...state,
        basket: [],
        coupon: { code: "", amount: 0 },
        address: null,
        paymentMethod: "online",
      };
      break;

    case "@shop/logout_user":
      newState = {
        ...state,
        user: null,
      };
      break;

    default:
      break;
  }

  Cookies.set("info", encryptData(JSON.stringify(newState)), {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    secure: true,
  });

  // localStorage.setItem("info", encryptData(JSON.stringify(newState)));

  return newState;
};
