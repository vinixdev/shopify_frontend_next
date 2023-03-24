import React, { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";
import { CouponValidationResponseInterface } from "./interfaces/interface";

export default function BasketCoupon() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; msg: string }>({
    type: "",
    msg: "",
  });

  const { dispatch } = useShopContext();

  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!couponCode) {
      setMessage({
        type: "error",
        msg: "یک کد تخفیف وارد کنید.",
      });
      return;
    }

    const http = new HttpRequest();
    http
      .post<CouponValidationResponseInterface, { couponCode: string }>(
        "/api/v1/coupons/validation",
        {
          couponCode,
        }
      )
      .then((res) => {
        const { data } = res;
        if (data.status === "success") {
          setMessage({
            type: "success",
            msg: "کد تخفیف اعمال شد.",
          });
          dispatch({
            type: "@shop/set_coupon",
            payload: {
              code: data.coupon,
              amount: data.percent,
            },
          });
        }
      })
      .catch((err) => {
        setMessage({
          type: "error",
          msg: err.response.data.message || "کد تخفیف نامعتبر است.",
        });
      });
  };

  return (
    <form className="flex gap-3 items-center md:flex-col md:gap-10 md:p-5">
      <div className="form_group flex flex-col gap-1">
        <input
          className="px-3 py-2 font-medium text-sm bg-gray-200 rounded-3xl flex-1 md:flex-none md:w-64 md:mt-8"
          type="text"
          name="coupon"
          id="coupon"
          placeholder="کد تخفیف"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {message && message.msg && message.type ? (
          <label
            className={`font-medium text-xs ${
              message.type === "error" ? "text-red-500" : "text-green-500"
            }`}
            htmlFor="coupon"
          >
            {message.msg}
          </label>
        ) : null}
      </div>
      <button
        className="px-1 py-3 text-white text-center bg-rose-500 hover:bg-rose-600 transition-colors text-xs duration-300 md:ml-5 md:mt-auto"
        type="submit"
        onClick={handleCouponValidation}
      >
        اعمال کد تخفیف
      </button>
    </form>
  );
}
