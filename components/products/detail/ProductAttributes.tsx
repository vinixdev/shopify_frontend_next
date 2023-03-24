import React from "react";
import { ProductAttributeGroup } from "../interface/productInterfaces";
import ProductGroupAttribute from "./ProductGroupAttribute";

interface ProductAttributesProps {
  attributes: ProductAttributeGroup[];
}

export default function ProductAttributes({
  attributes,
}: ProductAttributesProps) {
  return (
    <div>
      {attributes.length
        ? attributes.map((attr) => {
            return (
              <ProductGroupAttribute
                key={attr._id}
                title={attr.title}
                attributes={attr.attributes}
              />
            );
          })
        : null}
    </div>
  );
}
