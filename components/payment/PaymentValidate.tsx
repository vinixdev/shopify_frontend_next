import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";

export default function PaymentValidate() {
  const router = useRouter();

  const { state, dispatch } = useShopContext();

  const [verification, setVerification] = useState<{
    status: "pending" | "success" | "fail";
    message: string;
  }>({
    status: "pending",
    message: "در حال بررسی پرداخت ...",
  });

  useEffect(() => {
    // do security stuff and check permission.
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

    const url = new URL(location.href);
    let authority = url.searchParams.get("Authority");
    // const status = url.searchParams.get("Status");
    authority = state.paymentMethod === "cash" ? "1" : authority;
    const reserve = url.pathname.split("/")[3];
    if (!authority || !reserve) {
      return;
    }
    const http = new HttpRequest();
    http
      .post<
        { status: "success" | "fail"; verify: boolean; refId: number },
        { authority: string; reserve: string }
      >(
        "/api/v1/purchase/verify",
        {
          authority: authority as string,
          reserve,
        },
        { headers: { authorization: state.user } }
      )
      .then((res) => {
        setVerification({
          status: res.data.status,
          message: "پرداخت با موفقیت انجام شد.",
        });
        dispatch({
          type: "@shop/reset_state",
          payload: null,
        });
      })
      .catch((err) => {
        // if (err.response.status === 400) {
        //   setVerification({
        //     status: "success",
        //     message: "پرداخت با موفقیت انجام شد.",
        //   });
        // } else {
        //   setVerification({
        //     status: "fail",
        //     message: "پرداخت ناموفق بود.",
        //   });
        //   dispatch({
        //     type: "@shop/reset_state",
        //     payload: null,
        //   });
        // }

        setVerification({
          status: "fail",
          message: "پرداخت ناموفق بود.",
        });
        dispatch({
          type: "@shop/reset_state",
          payload: null,
        });
      });
  }, []);

  return (
    <div className="bg-gray-300 w-full md:w-1/2 md:mx-auto p-5 flex flex-col gap-10">
      {state.user ? (
        <>
          <h2 className="text-lg font-medium text-gray-600">وضعیت پرداخت</h2>
          <p className="text-base font-medium">{verification.message}</p>
          <button
            className="text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
            disabled={verification.status === "pending"}
            onClick={() => router.push("/")}
          >
            پیگیری سفارش
          </button>
        </>
      ) : (
        <p>خطایی رخ داده است.</p>
      )}
    </div>
  );
}
