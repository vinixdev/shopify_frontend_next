import React from "react";
import {
  ProductAttribute,
  ProductAttributeGroup,
} from "../interface/productInterfaces";
import ProductAttributeItem from "./ProductAttributeItem";

interface ProductGroupAttributeProps {
  title: string;
  attributes: ProductAttribute[];
}

export default function ProductGroupAttribute({
  title,
  attributes,
}: ProductGroupAttributeProps) {
  return (
    <div>
      <h3 className="font-bold text-lg py-3">{title}</h3>
      <ul className="attrs">
        {attributes.length
          ? attributes.map((attr) => {
              return (
                <ProductAttributeItem
                  key={attr._id}
                  title={attr.title}
                  value={attr.value}
                />
              );
            })
          : null}
      </ul>
    </div>
  );
}
