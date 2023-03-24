import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductItem } from "./interface/productInterfaces";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import { checkAuthentication } from "../../services/auth/authService";
import { useRouter } from "next/router";
import HttpRequest from "../../services/api/HttpRequest";

export default function ProductCard({
  id,
  title,
  thumbnail,
  price,
  specialPrice,
}: ProductItem) {
  // w-[calc(80vw-16rem)]

  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  //// for checking favorites, use useEffect and check authentication if authenticated send a request to server to check is favorites or not . and store it in state.

  useEffect(() => {
    const checkIsFavorites = async () => {
      try {
        const isAuthenticated = await checkAuthentication();

        if (!isAuthenticated) {
          return;
        }

        const http = new HttpRequest();
        const res = await http.post<
          { isFavorites: boolean },
          { productId: string }
        >(
          "/api/v1/me/favorites/check",
          { productId: id },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.data.isFavorites) {
          return;
        }
        setIsFavorites(true);
      } catch (error) {}
    };

    checkIsFavorites();
  }, []);

  //// in server if product in favorites we delete that product !

  const router = useRouter();

  const addToFavorites = async (productId: string) => {
    try {
      const isAuthenticated = await checkAuthentication();

      if (!isAuthenticated) {
        router.push("/auth/login");
        return;
      }

      const http = new HttpRequest();

      const res = await http.post<{ added: boolean }, { productId: string }>(
        "/api/v1/me/favorites",
        { productId },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!res.data.added) {
        setIsFavorites(false);
        return;
      }
      setIsFavorites(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFavorites = (e: React.MouseEvent) => {
    e.preventDefault();
    addToFavorites(id);
    /// toggle isFavorites state
  };

  return (
    <div className="card w-full overflow-hidden">
      <div className="card__cover rounded-md overflow-hidden bg-gray-200">
        <Image
          width={400}
          height={400}
          src={thumbnail}
          alt="title of product"
          className="card__pic w-full"
        />
      </div>
      <div className="card__content bg-transparent flex mt-3">
        <div className="flex-1 w-fit">
          <h4 className="card__title font-bold text-gray-600 hover:text-rose-400 text-xs md:text-xs lg:text-sm transition-colors duration-300">
            <Link href={{ pathname: `/products/${id}` }}>{title}</Link>
          </h4>
          <p className="card__price flex gap-2 font-bold mt-1 text-gray-800 text-xs">
            {specialPrice ? (
              <>
                <span className="line-through text-gray-600 text-xs">
                  {toPersianCurrency(price)} تومان
                </span>
                <span>{toPersianCurrency(specialPrice)} تومان</span>
              </>
            ) : (
              `${toPersianCurrency(price)} تومان`
            )}
          </p>
        </div>
        <div>
          <svg
            onClick={handleAddFavorites}
            className={`transition-colors duration-200 cursor-pointer w-5 h-5  hover:fill-rose-400 ${
              isFavorites ? "fill-rose-400" : "fill-gray-700"
            }`}
          >
            <use href="/static/img/sprite.svg#icon-heart" />
          </svg>
        </div>
      </div>
    </div>
  );
}
