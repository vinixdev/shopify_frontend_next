import AdviseToBuy from "../status/AdviceToBuy";

export interface ProductItem {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  specialPrice: number;
  stock: number;
}

export interface ProductsResponse {
  products: ProductItem[];
  perPage: number;
  totalProducts: number;
}

export interface ProductAttribute {
  _id: string;
  title: string;
  slug: string;
  value: string;
  filterable: boolean;
  hasPrice: boolean;
}

export interface ProductAttributeGroup {
  id: string;
  _id: string;
  title: string;
  slug: string;
  attributes: ProductAttribute[];
}

export interface GroupAtteributes {
  id: string;
  slug: string;
  title: string;
  attributes: ProductAttribute[];
}

export interface ProductCategory {
  id: string;
  title: string;
  slug: string;
  groups: GroupAtteributes[];
}

export interface UserComment {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ProductComment {
  id: string;
  user: UserComment;
  title: string;
  body: string;
  isBuyer: boolean;
  adviceToBuy: AdviseToBuy;
  // avatar: string;
}

export interface VariantItem {
  hash: string;
  title: string;
  value: string;
}

export interface ProductVariant {
  hash: string;
  title: string;
  slug: string;
  type: string;
  items: VariantItem[];
}

export interface PriceVariantItem {
  variant: string;
  item: string;
}

export interface ProductPriceVariant {
  hash: string;
  price: number;
  inventory: number;
  variants: PriceVariantItem[];
}

export interface ProductDetailItem {
  id: string;
  title: string;
  price: number;
  specialPrice: number;
  stock: number;
  attributes: ProductAttributeGroup[];
  thumbnail: string;
  gallery: string[];
  category: ProductCategory;
  variants: ProductVariant[];
  variantsPrice: ProductPriceVariant[];
  comments: ProductComment[];
}
