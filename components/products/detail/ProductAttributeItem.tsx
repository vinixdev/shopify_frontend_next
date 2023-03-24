import React from "react";

interface ProductAttributeProps {
  title: string;
  value: string;
}

export default function ProductAttributeItem({
  title,
  value,
}: ProductAttributeProps) {
  return (
    <li className="font-normal px-2 py-3 text-sm">
      {title} : {value}
    </li>
  );
}
