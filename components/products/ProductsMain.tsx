import Link from "next/link";
import React from "react";
import Categories from "../home/Categories";
import { Category } from "../home/interfaces/interface";
import CategoriesBox from "./CategoriesBox";
import { ProductItem } from "./interface/productInterfaces";
import ProductCard from "./ProductCard";

interface ProductsMainProps {
  productsList: ProductItem[];
  categories: Category[];
}

export default function ProductsMain({
  productsList,
  categories,
}: ProductsMainProps) {
  return (
    <main className="main mt-7 mb-16 min-h-screen">
      <section className="products flex flex-col md:flex-row gap-10 py-1 px-5 md:p-0">
        <CategoriesBox categories={categories} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {productsList.length ? (
            productsList.map((product: ProductItem) => {
              return <ProductCard key={product.id} {...product} />;
            })
          ) : (
            <p>محصولی اضافه نشده است.</p>
          )}
        </div>
      </section>
    </main>
  );
}
