import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HttpRequest from "../../services/api/HttpRequest";
import { ProductItem } from "../products/interface/productInterfaces";
import Categories from "./Categories";
import { HomePageProps, ProductsList } from "./interfaces/interface";
import Offer from "./Offer";
import ProductSection from "./ProductSection";

const http = new HttpRequest();

export default function HomeContent({
  newest,
  special,
  categories,
}: HomePageProps) {
  const router = useRouter();

  const [category, setCategory] = useState<string>(
    categories.find(
      (category) => category.slug === (router.query.category as string)
    )?.id || "show-all"
  );
  const [productsList, setProductsList] = useState<ProductsList>({
    newest,
    special,
  });

  const handleSelectCategory = (categoryId: string) => {
    setCategory(categoryId);
  };

  useEffect(() => {
    // if (category === "show-all") return;
    http
      .get<ProductsList>(
        `/api/v1/home/${category !== "show-all" ? category : ""}`
      )
      .then((res) => {
        setProductsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  return (
    <main className="main mt-7 min-h-screen">
      <Categories
        categories={categories}
        selected={category}
        selectHandler={handleSelectCategory}
      />
      {/* Section newest */}
      {productsList.newest.length ? (
        <ProductSection
          tagTitle="جدید"
          tagPosition="right"
          products={productsList.newest}
        />
      ) : null}
      {/* Section Special */}
      {productsList.special.length ? (
        <ProductSection
          tagTitle="ویژه"
          tagPosition="left"
          products={productsList.special}
        />
      ) : null}
      <Offer />
    </main>
  );
}
