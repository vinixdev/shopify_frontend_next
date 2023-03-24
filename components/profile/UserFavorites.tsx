import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import HttpRequest from "../../services/api/HttpRequest";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import { FavoritesProduct, FavoritesResponse } from "./interfaces/interfaces";

export default function UserFavorites() {
  const [favorites, setFavorites] = useState<FavoritesProduct[]>([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const http = new HttpRequest();
        const res = await http.get<FavoritesResponse>("/api/v1/me/favorites", {
          headers: { authorization: localStorage.getItem("token") },
        });

        if (res.data.favorites.length) {
          setFavorites(res.data.favorites);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserFavorites();
  }, []);

  const handleDeleteFavoritesProduct = async (productId: string) => {
    const http = new HttpRequest();
    try {
      const res = await http.delete<{ status: string }>(
        `/api/v1/me/favorites/${productId}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.status !== "success") return;

      setFavorites((prev) =>
        prev.filter((product: FavoritesProduct) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full w-full p-5 flex flex-col gap-5 overflow-hidden">
      <h2 className="font-bold text-lg text-gray-700">علاقه‌مندی های شما</h2>
      {favorites.length ? (
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                تصویر
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                عنوان
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                قیمت
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                قیمت ويژه
              </th>

              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((product: FavoritesProduct) => {
              return (
                <tr key={product.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    <Image
                      src={product.thumbnailUrl}
                      width={100}
                      height={100}
                      alt={product.title}
                      className="rounded-sm shadow"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    <Link
                      className="hover:text-rose-400 transition-colors duration-300 text-gray-700"
                      href={{ pathname: `/products/${product.id}` }}
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    {toPersianCurrency(product.price)} تومان
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    {product.specialPrice
                      ? toPersianCurrency(product.specialPrice)
                      : "-"}{" "}
                    تومان
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    <svg
                      onClick={() => handleDeleteFavoritesProduct(product.id)}
                      className="item__delete_icon cursor-pointer w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300"
                    >
                      <use href="/static/img/sprite.svg#icon-cancell" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>لیست علاقه مندی های شما خالی است.</h4>
      )}
    </div>
  );
}

// https://www.youtube.com/watch?v=Ea0JUYJcDa4
