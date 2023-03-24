import React from "react";
import {
  ProductAttributeGroup,
  ProductCategory,
  ProductDetailItem,
} from "../interface/productInterfaces";
import FilterAttribute from "./FilterAttribute";

interface Props {
  category: ProductCategory;
  products: ProductDetailItem[];
}

export default function FilterBox({ category, products }: Props) {
  const productGroups = products.map((product) => product.attributes).flat();
  // console.log(productAttrs);

  return (
    <ul className="w-full flex-wrap md:w-5/12 bg-gray-200 h-fit shadow rounded-sm flex md:flex-col gap-5">
      {category.groups.map((group) => {
        return (
          <FilterAttribute
            group={group}
            key={group.id}
            productsGroup={productGroups.filter((g) => g._id === group.id)}
            categoryName={category.slug}
          />
        );
      })}
    </ul>
  );
}

// [{atteributes: [{id, atter: []}]}]
