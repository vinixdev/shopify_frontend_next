import React from "react";
import { ProductItem } from "../products/interface/productInterfaces";
import ProductCard from "../products/ProductCard";

interface SectionProps {
  products: ProductItem[];
  tagTitle: string;
  tagPosition: "right" | "left";
}

export default function ProductSection({
  products,
  tagPosition,
  tagTitle,
}: SectionProps) {
  return (
    <section className="new-products my-10 first-of-type:mb-20 flex flex-col gap-7 items-start justify-start p-0">
      <h3
        className={`new-products__title bg-rose-500 w-20 text-center px-5 py-2 uppercase text-white font-light tracking-widest -rotate-90 h-fit mt-5 ${
          tagPosition === "right" ? "ml-auto -mr-5" : "mr-auto self-end -ml-5"
        }`}
      >
        {tagTitle}
      </h3>
      {/* Product list */}
      <div className="products flex-col md:flex-row items-center md:items-baseline md:flex-nowrap -mt-20 w-full px-5 flex gap-10 md:gap-5">
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
}
