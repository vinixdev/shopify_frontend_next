import React from "react";
import { useShopContext } from "../../context/ShopContext";
import BasketCheckout from "./BasketCheckout";
import BasketCoupon from "./BasketCoupon";
import BasketItem from "./BasketItem";

export default function BasketMain() {
  const { state, dispatch } = useShopContext();
  return (
    <main className="main min-h-screen flex flex-col gap-5 px-2">
      <section className="items mt-5 flex flex-col gap-3">
        {state.basket.length ? (
          state.basket.map((item) => {
            return (
              <BasketItem
                key={item.id}
                title={item.title}
                thumbnail={item.thumbnail}
                productID={item.id}
                count={item.count}
                stock={item.stock}
                price={item.price}
                specialPrice={item.specialPrice}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center gap-3">
            <svg className="fill-rose-400 w-10 h-10">
              <use href="/static/img/sprite.svg#icon-shop-bag"></use>
            </svg>
            <h4 className="font-bold text-gray-600 text-lg text-center">
              سبد خرید شما خالی است.
            </h4>
          </div>
        )}
      </section>
      {state.basket.length ? (
        <section className="summary bg-gray-100 py-3 px-1 flex flex-col md:flex-row gap-3 mb-5">
          <BasketCoupon />
          <BasketCheckout />
        </section>
      ) : null}
    </main>
  );
}
