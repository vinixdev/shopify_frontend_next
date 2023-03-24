import React from "react";
import BasketMain from "../components/basket/BasketMain";
import Shop from "../components/layouts/Shop";

export default function basket() {
  return (
    <Shop title="سبد خرید">
      <BasketMain />
    </Shop>
  );
}
