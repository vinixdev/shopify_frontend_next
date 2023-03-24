import { useRouter } from "next/router";
import React, { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import Alert from "../alert/Alert";

export default function PaymentForm() {
  const router = useRouter();

  const { dispatch, state } = useShopContext();

  const [alert, setAlert] = useState<{
    message: string;
    open: boolean;
    type: "success" | "error";
  }>({ message: "", open: false, type: "success" });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleOnChangePaymentMethod = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "@shop/change_payment_method",
      payload: e.target.value,
    });
  };

  const submitPaymentForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.address) {
      setAlert((prev) => ({
        ...prev,
        open: true,
        type: "error",
        message: "لطفا آدرس خود را انتخاب کنید.",
      }));
      return;
    }
    if (router.isReady) {
      if (state.paymentMethod === "online") {
        router.push("/purchase/online");
        return;
      } else if (state.paymentMethod === "cash") {
        router.push("/purchase/cod");
        return;
      } else {
        return;
      }
    }
  };

  return (
    <form onSubmit={submitPaymentForm} className="flex flex-col gap-3">
      <h3 className="font-medium text-gray-700 text-lg pt-3">پرداخت</h3>
      <div
        onChange={handleOnChangePaymentMethod}
        className="checkboxs flex flex-col gap-2"
      >
        <div>
          <input
            type="radio"
            id="online"
            name="payment"
            value="online"
            defaultChecked={state.paymentMethod === "online"}
          />
          <label className="px-2" htmlFor="online">
            آنلاین
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="cash"
            name="payment"
            value="cash"
            defaultChecked={state.paymentMethod === "cash"}
          />
          <label className="px-2" htmlFor="cash">
            نقدی
          </label>
        </div>
      </div>
      {/* <div className="checkboxs flex items-center gap-3">
        <input
          type="checkbox"
          name="address_checkout"
          id="address_checkout"
          defaultChecked
        />
        <label htmlFor="address_checkout">
          آدرس حمل و نقل همان آدرس صورتحساب است.
        </label>
      </div> */}
      <div>
        <button
          type="submit"
          className="text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
        >
          ادامه پرداخت
        </button>
      </div>
      <Alert
        type={alert.type}
        message={alert.message}
        open={alert.open}
        handleClose={handleCloseAlert}
      />
    </form>
  );
}
