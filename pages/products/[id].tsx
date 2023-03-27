import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import Shop from "../../components/layouts/Shop";
import {
  ProductDetailItem,
  ProductsResponse,
} from "../../components/products/interface/productInterfaces";
import ProductDetailsMain from "../../components/products/detail/ProductDetailsMain";
import HttpRequest from "../../services/api/HttpRequest";

interface ProductDetailProp {
  product: ProductDetailItem;
}

export default function ProductDetail({ product }: ProductDetailProp) {
  const {
    query: { id },
  } = useRouter();
  return (
    <Shop title={`جزییات محصول ${product.title}`}>
      <ProductDetailsMain product={product} />
    </Shop>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const http = new HttpRequest();
  try {
    const { data: product } = await http.get<ProductDetailItem>(
      `/api/v1/products/${params?.id}`
    );

    return {
      props: {
        product,
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const http = new HttpRequest();
  const { data } = await http.get<ProductsResponse>("/api/v1/products");
  const paths = data.products.map((product) => ({
    params: { id: product.id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
