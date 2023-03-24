import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCount from "../products/detail/ProductCount";
import { useShopContext } from "../../context/ShopContext";
import { toPersianCurrency } from "../../services/beautifulNumbersService";

interface BasketItemProps {
  productID: string;
  thumbnail: string;
  title: string;
  count: number;
  stock: number;
  price: number;
  specialPrice: number;
}

export default function BasketItem({
  productID,
  thumbnail,
  title,
  count,
  stock,
  price,
  specialPrice,
}: BasketItemProps) {
  const { dispatch } = useShopContext();

  const handleDeleteItemBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "@shop/basket_delete_item",
      payload: productID,
    });
  };

  return (
    <div className="item w-full bg-gray-100 rounded-md flex items-center justify-around py-3">
      <div className="item__pic">
        <Image
          src={thumbnail}
          width={80}
          height={80}
          alt={`${title}`}
          className="bg-gray-200 rounded-md"
        />
      </div>
      <div className="item__content w-40 truncate">
        <Link
          className="font-medium text-xs text-gray-700 hover:text-rose-400 transition-colors duration-300"
          href={{ pathname: `/products/${productID}` }}
        >
          {title}
        </Link>
        <p className="text-xs text-gray-500">
          {specialPrice
            ? toPersianCurrency(specialPrice)
            : toPersianCurrency(price)}{" "}
          تومان
        </p>
      </div>
      <div className="item__count w-fit">
        {/* <input
          type="number"
          name="item_count"
          id="item_count"
          min={1}
          max={stock}
          value={count}
          defaultValue={1}
          className="w-10"
        /> */}
        <ProductCount showTrash={false} productID={productID} stock={stock} />
      </div>
      <button onClick={handleDeleteItemBtn} className="item__delete">
        <svg className="item__delete_icon w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300">
          <use href="/static/img/sprite.svg#icon-cancell" />
        </svg>
      </button>
    </div>
  );
}
