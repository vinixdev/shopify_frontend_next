import React, { useState } from "react";
import {
  ProductAttributeGroup,
  ProductComment,
} from "../interface/productInterfaces";
import ProductAttributes from "./ProductAttributes";
import ProductShowComments from "./ProductShowComments";

interface ProductTabsProps {
  attributes: ProductAttributeGroup[];
  comments: ProductComment[];
}

export default function ProductTabs({
  attributes,
  comments,
}: ProductTabsProps) {
  const [preview, setPreview] = useState<"detail" | "comment">("detail");
  return (
    <>
      <div className="tabs flex gap-2">
        <button
          className={`font-medium text-sm w-20 py-3 ${
            preview === "detail"
              ? "bg-white border-2 rounded-sm border-t-white border-r-white"
              : ""
          }`}
          onClick={(e: React.MouseEvent) => setPreview("detail")}
        >
          مشخصات
        </button>
        <button
          className={`font-medium text-sm w-20 py-3 ${
            preview === "comment"
              ? "bg-white border-2 rounded-sm border-t-white border-r-white"
              : ""
          }`}
          onClick={(e: React.MouseEvent) => setPreview("comment")}
        >
          نظرات
        </button>
      </div>

      <div className="preview p-5">
        {preview === "detail" ? (
          <ProductAttributes attributes={attributes} />
        ) : (
          <ProductShowComments comments={comments} />
        )}
      </div>
    </>
  );
}
