import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Shop from "../../../components/layouts/Shop";
import {
  ProductCategory,
  ProductDetailItem,
  ProductsResponse,
} from "../../../components/products/interface/productInterfaces";
import HttpRequest from "../../../services/api/HttpRequest";
import { CategoryResponse } from "../../../components/home/interfaces/interface";
import Hero from "../../../components/partials/Hero";
import CategoriesProducts from "../../../components/products/category/CategoriesProducts";

interface Porps {
  products: ProductDetailItem[];
  category: ProductCategory;
}

export default function cateogrySlug({ products, category }: Porps) {
  const {
    query: { slug },
  } = useRouter();
  return (
    <Shop title={`محصولات دسته بندی ${category.title}`}>
      <Hero />
      <CategoriesProducts products={products} category={category} />
    </Shop>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const http = new HttpRequest();
  try {
    const { data } = await http.get<{
      products: ProductDetailItem[];
      category: ProductCategory;
    }>(`/api/v1/categories/${params?.slug}/products`);

    return {
      props: {
        products: data.products,
        category: data.category,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const http = new HttpRequest();
  const { data } = await http.get<CategoryResponse>("/api/v1/categories");
  const paths = data.categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
