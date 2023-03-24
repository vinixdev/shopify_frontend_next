import React from "react";
import { ProductComment } from "../interface/productInterfaces";
import ProductCommentCard from "./ProductCommentCard";

interface ProductCommentsProps {
  comments: ProductComment[];
}

export default function ProductShowComments({
  comments,
}: ProductCommentsProps) {
  return (
    <div>
      {comments.length ? (
        comments.map((comment) => {
          return <ProductCommentCard key={comment.id} comment={comment} />;
        })
      ) : (
        <p>نظری برای این کالا ثبت نشده است.</p>
      )}
    </div>
  );
}
