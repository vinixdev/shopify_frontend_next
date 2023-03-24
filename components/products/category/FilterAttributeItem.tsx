import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  addQueryParams,
  removeQueryParams,
} from "../../../services/QueryService";
import { ProductAttribute } from "../interface/productInterfaces";

interface Props {
  categoryName: string;
  attribute: ProductAttribute;
  attributeValues: { [key: string]: Set<string> };
}

export default function FilterAttributeItem({
  categoryName,
  attribute,
  attributeValues,
}: Props) {
  const [show, setShow] = useState(false);

  const handleShowValues = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow((prev) => !prev);
  };

  const router = useRouter();

  const handleFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    value: string
  ) => {
    let query = router.query;
    let queryParams: string;
    if (e.target.checked) {
      queryParams = addQueryParams(query, key, value);
    } else {
      queryParams = removeQueryParams(query, key, value);
    }

    router.push(
      {
        pathname: router.pathname,
        query: decodeURIComponent(`slug=${categoryName}&${queryParams}`),
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <li className="p-2 w-full block">
      <a
        href="#"
        className="font-bold justify-between text-gray-700 text-lg flex items-center hover:bg-gray-100 py-1 px-3 rounded-sm w-full"
        onClick={handleShowValues}
      >
        {attribute.title}
        <svg className={`w-7 h-7 fill-gray-700 ${show ? "-rotate-90" : ""}`}>
          <use href="/static/img/sprite.svg#icon-left"></use>
        </svg>
      </a>
      <form className={`mt-1 p-3`}>
        {Object.keys(attributeValues).map((a, i) => {
          if (a === attribute._id) {
            return Array.from(attributeValues[a]).map((el, i) => {
              return (
                <div
                  key={i}
                  className={`flex w-full items-center gap-3 my-3 ${
                    show ? "block" : "hidden"
                  }`}
                >
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFilter(e, attribute.slug, el as string)
                    }
                    id="3"
                    type="checkbox"
                  />
                  <label htmlFor="3" className="font-medium text-gray-700">
                    {el as string}
                  </label>
                </div>
              );
            });
          }
        })}
      </form>
    </li>
  );
}
