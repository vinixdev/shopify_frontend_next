import { GetStaticProps } from "next";
import React from "react";
import {
  Category,
  CategoryResponse,
} from "../../components/home/interfaces/interface";
import Shop from "../../components/layouts/Shop";
import Hero from "../../components/partials/Hero";
import {
  ProductItem,
  ProductsResponse,
} from "../../components/products/interface/productInterfaces";
import ProductsMain from "../../components/products/ProductsMain";
import HttpRequest from "../../services/api/HttpRequest";

interface ProductsProps {
  products: ProductItem[];
  categories: Category[];
}

export default function Products({ products, categories }: ProductsProps) {
  return (
    <Shop title={"شاپیفای - لیست محصولات"}>
      <Hero />
      <ProductsMain productsList={products} categories={categories} />
    </Shop>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const http = new HttpRequest();
  const { data } = await http.get<ProductsResponse>("/api/v1/products");
  const categories = await http.get<CategoryResponse>("/api/v1/categories");

  return {
    props: {
      products: data.products,
      categories: categories.data.categories,
    },
    revalidate: 60000,
  };
};
