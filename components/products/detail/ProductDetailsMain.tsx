import React, { useState } from "react";
import { ProductDetailItem } from "../interface/productInterfaces";
import ProductAttributes from "./ProductAttributes";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductGallery from "./ProductGallery";
import ProductTabs from "./ProductTabs";

interface ProductDetailsMainProps {
  product: ProductDetailItem;
}

export default function ProductDetailsMain({
  product,
}: ProductDetailsMainProps) {
  return (
    <main className="main my-7 min-h-screen p-5">
      <section className="w-full flex flex-col md:flex-row gap-10">
        <ProductGallery
          thumbnail={product.thumbnail}
          gallery={product.gallery}
          alt={product.title}
        />
        <ProductDetailInfo
          id={product.id}
          title={product.title}
          price={product.price}
          specialPrice={product.specialPrice}
          stock={product.stock}
          category={product.category.title}
          thumbnail={product.thumbnail}
          variants={product.variants}
          priceVariants={product.variantsPrice}
        />
      </section>
      <section className="my-5 md:my-10 bg-gray-200">
        <ProductTabs
          attributes={product.attributes}
          comments={product.comments}
        />
      </section>
    </main>
  );
}
