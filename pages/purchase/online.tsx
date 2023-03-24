import React from "react";
import Shop from "../../components/layouts/Shop";
import OnlinePayment from "../../components/payment/OnlinePayment";

export default function online() {
  return (
    <Shop title="پرداخت آنلاین سفارش">
      <main className="main min-h-screen py-5">
        <OnlinePayment />
      </main>
    </Shop>
  );
}
