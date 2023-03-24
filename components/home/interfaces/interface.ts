import { ProductItem } from "../../products/interface/productInterfaces";

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface ProductsList {
  newest: ProductItem[];
  special: ProductItem[];
}

export interface HomePageProps {
  newest: ProductItem[];
  special: ProductItem[];
  categories: Category[];
}
