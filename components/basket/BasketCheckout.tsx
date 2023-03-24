import Link from "next/link";
import React from "react";
import { useShopContext } from "../../context/ShopContext";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import {
  calculateDiscountedPrice,
  calculateRemainPriceWithDiscount,
} from "../../services/calculateDiscountService";

export default function BasketCheckout() {
  const { state } = useShopContext();
  const totalPrice = state.basket.reduce((total, item) => {
    return (
      total + (item.specialPrice ? item.specialPrice : item.price) * item.count
    );
  }, 0);

  return (
    <div className="font-bold p-3 flex flex-col gap-3 md:gap-5 md:mt-3 md:flex-1 md:px-10">
      <p className="flex">
        <span>هزینه کل : </span>
        <span className="mr-auto md:ml-16">
          {toPersianCurrency(totalPrice)} تومان
        </span>
      </p>
      {state.coupon && state.coupon.amount ? (
        <p className="flex">
          <span>تخفیف اعمال شده ({state.coupon.amount}٪) : </span>
          <span className="mr-auto md:ml-16">
            {toPersianCurrency(
              calculateDiscountedPrice(totalPrice, state.coupon.amount)
            )}{" "}
            تومان
          </span>
        </p>
      ) : null}
      {/* <p className="flex">
        <span>هزینه حمل و نقل : </span>
        <span className="mr-auto md:ml-16"> ۱۵۰۰۰ تومان</span>
      </p> */}
      <p className="flex">
        <span>هزینه نهایی : </span>
        <span className="mr-auto md:ml-16">
          {toPersianCurrency(
            calculateRemainPriceWithDiscount(totalPrice, state.coupon.amount)
          )}{" "}
          تومان
        </span>
      </p>
      <Link
        href={{ pathname: "/checkout" }}
        className="px-1 py-3 mt-5 text-white text-center bg-rose-500 hover:bg-rose-600 transition-colors text-sm duration-300 md:self-center md:w-64"
      >
        بررسی سفارش
      </Link>
    </div>
  );
}
