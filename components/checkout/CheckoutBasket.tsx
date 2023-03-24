import React from "react";
import { useShopContext } from "../../context/ShopContext";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import { calculateRemainPriceWithDiscount } from "../../services/calculateDiscountService";

export default function CheckoutBasket() {
  const { state } = useShopContext();
  const totalPrice = state.basket.length
    ? state.basket.reduce((total, item) => {
        return (
          total +
          (item.specialPrice ? item.specialPrice : item.price) * item.count
        );
      }, 0)
    : 0;
  return (
    <div className="basket-summary w-full bg-gray-200 p-3 flex flex-col gap-3 md:h-fit fit md:w-1/3 md:mt-9 rounded-sm">
      <h4 className="font-bold text-base flex text-gray-500">
        <span className="flex-1">سبد خرید شما</span>
        <span className="ml-3 w-6 h-6 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs">
          {state.basket.length}
        </span>
      </h4>
      <ul className="items my-5 flex flex-col gap-3">
        {state.basket.length
          ? state.basket.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex border-b-2 border-b-white last-of-type:border-b-transparent py-1"
                >
                  <div className="content flex-1 text-gray-700">
                    <h5 className="font-medium text-gray-700 w-32 truncate">
                      {item.title}
                    </h5>
                    <p className="mt-2 font-medium">{item.count} عدد</p>
                  </div>
                  <p className="price font-bold text-xs text-gray-800">
                    {toPersianCurrency(
                      item.specialPrice ? item.specialPrice : item.price
                    )}{" "}
                    تومان
                  </p>
                </li>
              );
            })
          : null}

        {state.basket.length ? (
          <li className="flex border-b-2 border-b-white last-of-type:border-b-transparent py-3">
            <div className="content flex-1 text-gray-700">
              <h5 className="font-medium text-gray-700">مجموع هزینه ها</h5>
            </div>
            <p className="price ml-3 font-bold text-xs text-gray-800">
              {toPersianCurrency(
                calculateRemainPriceWithDiscount(
                  totalPrice,
                  state.coupon.amount || 0
                )
              )}{" "}
              تومان
            </p>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
