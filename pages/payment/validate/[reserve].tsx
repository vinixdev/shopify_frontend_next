import React from "react";
import Shop from "../../../components/layouts/Shop";
import PaymentValidate from "../../../components/payment/PaymentValidate";

export default function PaymentValidation() {
  return (
    <Shop title="نتیجه پرداخت سفارش">
      <main className="main min-h-screen py-5">
        <PaymentValidate />
      </main>
    </Shop>
  );
}
