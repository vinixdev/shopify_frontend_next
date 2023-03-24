import React, { useState } from "react";
import { useShopContext } from "../../../context/ShopContext";

interface ProductCountProps {
  productID: string;
  stock: number;
  showTrash?: boolean;
}

export default function ProductCount({
  productID,
  stock,
  showTrash = true,
}: ProductCountProps) {
  const { dispatch, state } = useShopContext();
  const [counter, setCounter] = useState<number>(
    state.basket.find((item) => item.id === productID)?.count || 1
  );

  const handleAddBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (counter + 1 > stock) {
      setCounter(stock);
      return;
    }
    dispatch({
      type: "@shop/increment_product",
      payload: productID,
    });
    setCounter((prev) => prev + 1);
  };
  const handleMinusBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    if (counter - 1 < 1) {
      setCounter(1);
      return;
    }
    dispatch({
      type: "@shop/decrement_product",
      payload: productID,
    });
    setCounter((prev) => prev - 1);
  };

  const handleDeleteItemBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "@shop/basket_delete_item",
      payload: productID,
    });
  };

  return (
    <div className="flex gap-3 items-center justify-center">
      <div className="flex gap-3 items-center">
        <span onClick={handleAddBtn}>
          <svg className="w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300 cursor-pointer">
            <use href="/static/img/sprite.svg#icon-add"></use>
          </svg>
        </span>
        <span className="font-bold text-base text-gray-600">{counter}</span>
        <span onClick={handleMinusBtn}>
          <svg className="w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300 cursor-pointer">
            <use href="/static/img/sprite.svg#icon-minus"></use>
          </svg>
        </span>
      </div>
      {showTrash ? (
        <button onClick={handleDeleteItemBtn}>
          <svg className="w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300 cursor-pointer">
            <use href="/static/img/sprite.svg#icon-trash"></use>
          </svg>
        </button>
      ) : null}
    </div>
  );
}
