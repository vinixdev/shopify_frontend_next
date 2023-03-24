import Link from "next/link";
import React from "react";
import { Category } from "../home/interfaces/interface";

interface Props {
  categories: Category[];
}

export default function CategoriesBox({ categories }: Props) {
  return (
    <ul className="w-full flex-wrap md:w-5/12 bg-gray-200 h-fit shadow rounded-sm p-3 flex md:flex-col gap-5">
      {categories.map((category) => {
        return (
          <li
            className="border-b last-of-type:border-none border-gray-100"
            key={category.id}
          >
            <Link
              className="font-medium text-gray-700 text-base hover:text-white hover:bg-rose-300 transition-colors duration-300 py-3 px-5 rounded-md hover:shadow-sm block w-full"
              href={{ pathname: `/products/category/${category.slug}` }}
            >
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
