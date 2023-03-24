import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import { calculateRemainPriceWithDiscount } from "../../services/calculateDiscountService";

export default function CODPayment() {
  const router = useRouter();
  const { state, dispatch } = useShopContext();
  const totalPrice = state.basket.reduce((total, item) => {
    return (
      total + (item.specialPrice ? item.specialPrice : item.price) * item.count
    );
  }, 0);

  useEffect(() => {
    if (!state.user) {
      router.push("/auth/login");
      return;
    }

    if (state.basket.length === 0) {
      router.push("/basket");
      return;
    }

    if (!state.address) {
      router.push("/checkout");
      return;
    }
  }, []);

  const handleSubmitCODPayment = (e: React.MouseEvent) => {
    const http = new HttpRequest();
    console.log(state.paymentMethod);

    http
      .post<{ status: string; url: string }, {}>(
        "/api/v1/purchase",
        {
          items: state.basket,
          address: state.address,
          coupon: state.coupon.code ? state.coupon : undefined,
          method: state.paymentMethod,
          gateway: undefined,
        },
        { headers: { authorization: state.user } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          router.replace(res.data.url);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      {state.user && state.address && state.basket.length ? (
        <>
          <h2 className="font-bold text-lg text-gray-600">تایید سفارش</h2>
          <p className="font-medium text-gray-600">
            سفارش خود را به راحتی درب منزل پرداخت کنید.
          </p>
          <p>نام گیرنده :‌ {state.address.full_name}</p>
          <address className="not-italic">
            آدرس : {state.address.state}، {state.address.city}،{" "}
            {state.address.address}
          </address>
          <p>شماره تماس : {state.address.mobile}</p>
          <p>
            مبلغ نهایی :{" "}
            {toPersianCurrency(
              calculateRemainPriceWithDiscount(
                totalPrice,
                state.coupon.amount || 0
              )
            )}{" "}
            تومان
          </p>
          <button
            onClick={handleSubmitCODPayment}
            className="text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
          >
            تایید سفارش
          </button>
        </>
      ) : null}
    </div>
  );
}
