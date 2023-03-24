import Image from "next/image";
import React from "react";
import { ProductComment } from "../interface/productInterfaces";

interface ProductCommentCardProps {
  comment: ProductComment;
}

export default function ProductCommentCard({
  comment,
}: ProductCommentCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      <Image
        width={100}
        height={100}
        src={"/static/img/user.jpg"}
        alt={`${comment.user.first_name} ${comment.user.last_name} - ${comment.title}`}
        className={`rounded-full`}
      />
      <div className="content font-medium text-center flex flex-col gap-3 md:text-right">
        <h3 className="font-bold text-base md:mt-3">
          {comment.user.first_name} {comment.user.last_name} می‌گوید :
        </h3>
        <h4 className="text-sm">{comment.title}</h4>
        <p className="font-normal md:text-xs">{comment.body}</p>
      </div>
    </div>
  );
}
