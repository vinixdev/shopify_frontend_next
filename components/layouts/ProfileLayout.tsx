import React, { useEffect, useState } from "react";
import Shop from "./Shop";
import Image from "next/image";
import Link from "next/link";
import { useShopContext } from "../../context/ShopContext";
import { useRouter } from "next/router";
import { checkAuthentication, logout } from "../../services/auth/authService";
import HttpRequest from "../../services/api/HttpRequest";
import { UserData, UserResponse } from "../profile/interfaces/interfaces";

export default function ProfileLayout({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<UserData | null>(null);

  const { dispatch } = useShopContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const isAuthenticated = await checkAuthentication();

        if (!isAuthenticated) {
          router.push("/auth/login");
          return;
        }

        const http = new HttpRequest();
        const res = await http.get<UserResponse>("/api/v1/me", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (res.data.status === "success") {
          setUser(res.data.user);
        }
      } catch (error) {
        return;
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    dispatch({
      type: "@shop/logout_user",
      payload: null,
    });
    router.push("/");
  };

  return (
    <Shop title="پروفایل">
      <main className="min-h-screen w-full flex flex-col gap-3 md:gap-0 md:grid md:grid-cols-3 py-10">
        <ul className="flex flex-col gap-5 p-5 col-start-1 col-end-2 bg-gray-100 shadow">
          {/* user info */}
          <li className="flex items-center gap-5 border-b border-gray-200 pb-5">
            <Image
              className="rounded-full"
              width={50}
              height={50}
              src="/static/img/user.jpg"
              alt={`${user?.email} profile`}
            />
            <div className="flex flex-col">
              {user?.first_name && user.last_name ? (
                <>
                  <h3 className="font-medium text-gray-700 text-base">
                    {user?.first_name} {user?.last_name}
                  </h3>
                </>
              ) : null}
              <h4 className="font-medium text-gray-700 text-xs">
                {user?.email}
              </h4>
            </div>
          </li>
          {/* profile */}
          <li className="border-b border-rose-300 pb-5 text-gray-700 font-medium text-xs">
            <Link
              href={{ pathname: "/profile" }}
              className={`flex items-center rounded-sm gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer ${
                router.pathname === "/profile" ? "bg-red-500 text-white" : ""
              }`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "/profile"
                      ? "fill-white"
                      : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-user"></use>
                </svg>
              </span>
              <span>مشخصات فردی</span>
            </Link>
          </li>
          {/* addresses */}
          <li className="border-b border-rose-300 pb-5 text-gray-700 font-medium text-xs">
            <Link
              href={{ pathname: "/profile/addresses" }}
              className={`flex items-center rounded-sm  gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer ${
                router.pathname === "/profile/addresses"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "/profile/addresses"
                      ? "fill-white"
                      : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-map"></use>
                </svg>
              </span>
              <span>لیست آدرس ها</span>
            </Link>
          </li>
          {/* add new address */}
          <li className="border-b border-rose-300 pb-5 text-gray-700 font-medium text-xs">
            <Link
              href={{ pathname: "/profile/new-address" }}
              className={`flex items-center rounded-sm  gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer ${
                router.pathname === "/profile/new-address"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "/profile/new-address"
                      ? "fill-white"
                      : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-plus-circle"></use>
                </svg>
              </span>
              <span>اضافه کردن آدرس جدید</span>
            </Link>
          </li>
          {/* orders */}
          <li className="border-b border-rose-300 pb-5 text-gray-700 font-medium text-xs">
            <Link
              href={{ pathname: "/profile/orders" }}
              className={`flex items-center rounded-sm  gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer ${
                router.pathname === "/profile/orders"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "/profile/orders"
                      ? "fill-white"
                      : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-list"></use>
                </svg>
              </span>
              <span>سفارش ها</span>
            </Link>
          </li>

          {/* favorites */}
          <li className="border-b border-rose-300 pb-5 text-gray-700 font-medium text-xs">
            <Link
              href={{ pathname: "/profile/favorites" }}
              className={`flex items-center rounded-sm  gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer ${
                router.pathname === "/profile/favorites"
                  ? "bg-red-500 text-white"
                  : ""
              }`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "/profile/favorites"
                      ? "fill-white"
                      : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-heart"></use>
                </svg>
              </span>
              <span>لیست علاقه مندی ها</span>
            </Link>
          </li>
          {/* logout */}
          <li className="pb-5 text-gray-700 font-medium text-xs">
            <Link
              href="#"
              onClick={handleLogout}
              className={`flex items-center rounded-sm gap-3 w-full p-3 hover:bg-rose-400 hover:text-white transition-colors duration-300 cursor-pointer`}
            >
              <span>
                <svg
                  className={`w-5 h-5 ${
                    router.pathname === "#" ? "fill-white" : "fill-gray-700"
                  }`}
                >
                  <use href="/static/img/sprite.svg#icon-logout"></use>
                </svg>
              </span>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
        <div className="cols-start-2 col-span-2">{children}</div>
      </main>
    </Shop>
  );
}
