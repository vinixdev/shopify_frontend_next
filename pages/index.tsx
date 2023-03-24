import Shop from "../components/layouts/Shop";
import Hero from "../components/partials/Hero";
import HomeContent from "../components/home/HomeContent";
import { GetStaticProps } from "next";
import HttpRequest from "../services/api/HttpRequest";
import {
  CategoryResponse,
  HomePageProps,
  ProductsList,
} from "../components/home/interfaces/interface";

export default function Home({ newest, special, categories }: HomePageProps) {
  return (
    <Shop title="شاپیفای">
      <Hero />
      <HomeContent newest={newest} special={special} categories={categories} />
    </Shop>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const http = new HttpRequest();
  const products = await http.get<ProductsList>("/api/v1/home");
  const categories = await http.get<CategoryResponse>("/api/v1/categories");

  return {
    props: {
      newest: products.data.newest,
      special: products.data.special,
      categories: categories.data.categories,
    },
    revalidate: 60000,
  };
};
