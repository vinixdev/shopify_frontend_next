import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useShopContext } from "../../context/ShopContext";
import Loading from "../partials/Loading";
import CheckoutBasket from "./CheckoutBasket";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutLogin from "./CheckoutLogin";

export default function CheckoutSection() {
  const { state } = useShopContext();
  const router = useRouter();

  return (
    <section className="info flex flex-col-reverse gap-5 md:flex-row w-full">
      {state.user ? <CheckoutAddress /> : <CheckoutLogin />}
      {state.basket.length ? <CheckoutBasket /> : null}
    </section>
  );
}
