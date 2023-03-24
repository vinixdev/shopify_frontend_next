import React from "react";
import CheckoutMain from "../components/checkout/CheckoutMain";
import Shop from "../components/layouts/Shop";

export default function Checkout() {
  return (
    <Shop title="بررسی پرداخت">
      <CheckoutMain />
    </Shop>
  );
}
