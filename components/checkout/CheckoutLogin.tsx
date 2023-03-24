import Link from "next/link";
import React from "react";

export default function CheckoutLogin() {
  return (
    <div className="card-login bg-gray-200 p-3 text-gray-700 flex flex-col gap-5 md:flex-1 md:mt-9 md:h-fit">
      <h2 className=" font-bold text-base py-2">وارد شدن به حساب کاربری</h2>
      <p className="font-medium text-sm pb-1">
        برای ثبت سفارش از طریق لینک زیر وارد حساب کاربری خود شوید.
      </p>
      <Link
        className="py-3 px-5 text-center bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white"
        href={{ pathname: "/auth/login" }}
      >
        ورود
      </Link>
    </div>
  );
}
