import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Category, CategoryResponse } from "./interfaces/interface";

interface CategoriesProps {
  categories: Category[];
  selected: string;
  selectHandler: (categoryId: string) => void;
}

export default function Categories({
  categories,
  selected,
  selectHandler,
}: CategoriesProps) {
  const router = useRouter();
  const [index, setIndex] = useState<number>(
    categories.findIndex((category) => category.id === selected) || -2
  );

  function prevCategory(e: React.MouseEvent) {
    if (index === -2) {
      handleSelectedCategory(
        e,
        categories[categories.length - 1].id,
        categories[categories.length - 1].slug,
        categories.length - 1
      );
      return;
    }
    if (index - 1 === -1) {
      handleSelectedCategory(e, "show-all", "show-all", -2);
      return;
    }
    handleSelectedCategory(
      e,
      categories[index - 1].id,
      categories[index - 1].slug,
      index - 1
    );
  }

  function nextCategory(e: React.MouseEvent) {
    if (index === -2) {
      handleSelectedCategory(e, categories[0].id, categories[0].slug, 0);
      return;
    }
    if (categories.length === index + 1) {
      handleSelectedCategory(e, "show-all", "show-all", -2);
      return;
    }
    handleSelectedCategory(
      e,
      categories[index + 1].id,
      categories[index + 1].slug,
      index + 1
    );
  }

  function handleSelectedCategory(
    e: React.MouseEvent,
    categoryId: string,
    categorySlug: string,
    i: number
  ) {
    e.preventDefault();
    console.log(i);

    selectHandler(categoryId);
    setIndex(i);
    if (categorySlug === "show-all") {
      router.push({
        query: {},
      });
      return;
    }
    router.replace({
      query: { category: categorySlug },
    });
  }

  return (
    <div className="tabs flex md:flex-row flex-col-reverse items-center gap-5 mb-10">
      <ul className="categories font-bold text-gray-600 flex-1 flex md:flex-row gap-5 text-xs md:text-sm flex-col items-center md:items-baseline">
        {categories.map((category, i) => {
          return (
            <li
              key={category.id}
              className={`categories__item hover:text-rose-400 transition-colors duration-200 ${
                selected === category.id ? "text-rose-400" : ""
              }`}
            >
              <Link
                href={{ pathname: category.slug }}
                className="categories__link"
                onClick={(e) =>
                  handleSelectedCategory(e, category.id, category.slug, i)
                }
              >
                {category.title}
              </Link>
            </li>
          );
        })}

        <li
          className={`categories__item hover:text-rose-400 transition-colors duration-200 ${
            selected === "show-all" ? "text-rose-400" : ""
          }`}
        >
          <Link
            href="/"
            className="categories__link"
            onClick={(e) =>
              handleSelectedCategory(e, "show-all", "show-all", -2)
            }
          >
            نمایش همه
          </Link>
        </li>
      </ul>
      <div className="switches hidden md:flex flex-row gap-5">
        <svg
          onClick={prevCategory}
          className="cursor-pointer w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-200"
        >
          <use href="/static/img/sprite.svg#icon-arrow-right" />
        </svg>
        <svg
          onClick={nextCategory}
          className="w-5 h-5 cursor-pointer fill-gray-600 hover:fill-rose-400 transition-colors duration-200"
        >
          <use href="/static/img/sprite.svg#icon-arrow-left" />
        </svg>
      </div>
    </div>
  );
}
