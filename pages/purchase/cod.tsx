import React from "react";
import Shop from "../../components/layouts/Shop";
import CODPayment from "../../components/payment/CODPayment";

export default function cod() {
  return (
    <Shop title="پرداخت درب منزل">
      <main className="main min-h-screen py-5">
        <CODPayment />
      </main>
    </Shop>
  );
}
