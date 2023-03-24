import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HttpRequest from "../../../services/api/HttpRequest";
import { routerQueryToString } from "../../../services/QueryService";
import {
  ProductCategory,
  ProductDetailItem,
  ProductItem,
} from "../interface/productInterfaces";
import ProductCard from "../ProductCard";
import FilterBox from "./FilterBox";

interface ProductsProps {
  products: ProductDetailItem[];
  category: ProductCategory;
}

export default function CategoriesProducts({
  products,
  category,
}: ProductsProps) {
  //// store products in state. and pass state to children. we need it in useEffect

  const [categoryProducts, setCategoryProducts] =
    useState<ProductDetailItem[]>(products);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      /// we extract query params and filter products with params of query or we can send request to server and get filtered products it's secure way and better and once time we want to add pagination we don't have any problem.

      const http = new HttpRequest();
      try {
        const query = decodeURIComponent(routerQueryToString(router.query));
        const res = await http.get<{ products: ProductDetailItem[] }>(
          `/api/v1/products/filter?${query}`
        );

        setCategoryProducts(res.data.products);

        // setCategoryProducts(res.data);
      } catch (error) {}
    };

    fetchProducts();
    // console.log(routerQueryToString(router.query, "slug"));
  }, [router.query]);

  return (
    <main className="mt-7 mb-16 min-h-screen">
      <section className="products flex flex-col md:flex-row gap-10 py-1 px-5 md:p-0">
        {categoryProducts.length ? (
          <FilterBox category={category} products={products} />
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {categoryProducts.length ? (
            categoryProducts.map((product: ProductItem) => {
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
