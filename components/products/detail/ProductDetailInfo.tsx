import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../../../context/ShopContext";
import { toPersianCurrency } from "../../../services/beautifulNumbersService";
import {
  PriceVariantItem,
  ProductPriceVariant,
  ProductVariant,
} from "../interface/productInterfaces";
import ProductCount from "./ProductCount";

interface ProductDetailInfoProps {
  id: string;
  title: string;
  price: number;
  specialPrice: number;
  stock: number;
  category: string;
  thumbnail: string;
  variants: ProductVariant[];
  priceVariants: ProductPriceVariant[];
}

export default function ProductDetailInfo({
  id,
  title,
  price,
  specialPrice,
  stock,
  category,
  thumbnail,
  variants,
  priceVariants,
}: ProductDetailInfoProps) {
  const { state, dispatch } = useShopContext();

  const [productPrice, setProductPrice] = useState<number>(price);

  const [productSpecialPrice, setProductSpecialPrice] =
    useState<number>(specialPrice);

  const [selectedColorItem, setSelectedColorItem] = useState<string>("");
  const [selectedDropdownItem, setSelectedDropdownItem] = useState<string>("");

  const [variations, setVariations] = useState<PriceVariantItem[]>([]);

  useEffect(() => {
    const checkPriceVariations = () => {
      if (variations.length > variants.length) {
        setVariations([]);
      }

      console.log(variations);

      const priceVariantsClean = priceVariants.map((pv) => {
        return {
          ...pv,
          variants: pv.variants.map((v) => ({
            item: v.item,
            variant: v.variant,
          })),
        };
      });

      const founded = priceVariantsClean.find((priceVariant) => {
        return _(priceVariant.variants)
          .xorWith(variations, _.isEqual)
          .isEmpty();
      });

      if (founded) {
        setProductPrice(founded.price / 10);
        setProductSpecialPrice(0);
        setVariations([]);
        setSelectedColorItem("");
        setSelectedDropdownItem("");
      }
    };

    checkPriceVariations();
  }, [variations]);

  const handleAddToBasket = (e: React.MouseEvent) => {
    dispatch({
      type: "@shop/add_item_to_basket",
      payload: {
        id,
        title,
        price: productPrice,
        specialPrice: productSpecialPrice,
        thumbnail,
        stock,
        count: 1,
      },
    });
  };

  const handleSetVariantions = (variantHash: string, itemHash: string) => {
    setVariations((prev) => [
      ...prev,
      { item: itemHash, variant: variantHash },
    ]);
  };

  return (
    <div className="bg-gray-200 rounded-md w-full p-2 flex flex-col md:h-fit md:p-5 gap-5">
      <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
      <ul className="text-base w-full font-medium flex flex-col gap-2 md:gap-4">
        <li>دسته بندی : {category}</li>
        <li>تعداد موجود : {stock}</li>
        <li className="flex flex-row gap-2 items-center">
          قیمت :
          {productSpecialPrice ? (
            <>
              <span className="line-through text-gray-600 text-xs">
                {toPersianCurrency(productPrice)} تومان
              </span>
              <span>{toPersianCurrency(productSpecialPrice)} تومان</span>
            </>
          ) : (
            <span>{toPersianCurrency(productPrice)} تومان</span>
          )}
        </li>
      </ul>
      <form className="flex flex-col gap-5">
        {variants.map((v) => {
          if (v.type === "color") {
            return (
              <div key={v.hash} className={"flex flex-col gap-3"}>
                <h3 className="font-medium text-gray-700 text-base">
                  انتخاب {v.title} :
                </h3>
                <div className="flex gap-5 flex-wrap justify-center md:justify-start">
                  {v.items.map((item) => {
                    return (
                      <div
                        className={`w-6 h-6 border-2 rounded-full cursor-pointer hover:opacity-70 transition-opacity duration-300 ${
                          item.hash === selectedColorItem
                            ? "border-gray-900"
                            : ""
                        }`}
                        style={{ backgroundColor: item.value }}
                        key={item.hash}
                        title={item.title}
                        onClick={(e) => {
                          handleSetVariantions(v.hash, item.hash);
                          setSelectedColorItem(item.hash);
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return (
            <div key={v.hash} className="flex items-center gap-3">
              <label
                htmlFor={v.slug}
                className="font-medium text-gray-700 text-base"
              >
                {v.title}
              </label>
              <select
                value={selectedDropdownItem}
                className="px-2 py-1 font-medium w-full md:w-1/3"
                name={v.slug}
                id={v.slug}
                onChange={(e) => {
                  handleSetVariantions(v.hash, e.target.value);
                  setSelectedDropdownItem(e.target.value);
                }}
              >
                <option value="" disabled>
                  انتخاب {`${v.title}`}
                </option>
                {v.items.map((item) => {
                  return (
                    <option key={item.hash} value={item.hash}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
      </form>
      {state.basket.find((item) => item.id === id) ? (
        <ProductCount productID={id} stock={stock} />
      ) : (
        <button
          onClick={handleAddToBasket}
          className="bg-rose-500 py-3 md:mt-12 font-medium text-white hover:bg-rose-700 duration-300 transition-colors self-center px-5"
        >
          اضافه کردن به سبد خرید
        </button>
      )}
    </div>
  );
}
