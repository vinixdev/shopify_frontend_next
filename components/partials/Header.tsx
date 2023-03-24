import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { checkAuthentication } from "../../services/auth/authService";

export default function Header() {
  const [open, setOpen] = useState<boolean>(false);

  // const openMenuHandler = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpen(true);
  // };

  // const closeMenuHandler = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpen(false);
  // };

  const handleOpeningMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     const isAuthenticated = await checkAuthentication();

  //     if (isAuthenticated) {
  //       setIsLoggedIn(true);
  //     }
  //   };

  //   checkLoggedIn();
  // }, []);

  const { state } = useShopContext();

  return (
    <>
      <header className="h-1/12 md:block">
        <nav className="py-5 flex items-center justify-between">
          <Link href={{ pathname: "/" }} className="logo mr-5 md:mr-0">
            <Image
              className="w-10 rounded-full bg-gray-600 hover:bg-rose-400 transition-colors duration-200"
              src="/static/img/logo.png"
              width={50}
              height={50}
              alt={"شاپیفای"}
            />
          </Link>
          <div
            className={`menu fixed md:static p-10 md:p-0 flex flex-col md:flex-row md:flex md:flex-1 bg-gray-300 md:bg-transparent items-center gap-10 md:gap-0 md:items-baseline top-0 ${
              open ? "right-0" : "-right-full"
            } bottom-0 z-50 transition-all duration-500`}
          >
            <button
              onClick={handleOpeningMenu}
              className="menu__close md:hidden self-start"
            >
              <svg className="transition-colors duration-200 w-5 h-5 fill-gray-800 hover:fill-rose-400">
                <use href="/static/img/sprite.svg#icon-close" />
              </svg>
            </button>
            <ul className="links justify-self-center md:mx-auto md:flex items-center gap-5 md:gap-20 lg:gap-32 text-center flex flex-col md:flex-row">
              <li className="links__item">
                <Link
                  href={{ pathname: "/" }}
                  className="links__link font-bold text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  خانه
                </Link>
              </li>
              <li className="links__item">
                <Link
                  href={{ pathname: "/products" }}
                  className="links__link font-bold text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  محصولات
                </Link>
              </li>
              <li className="links__item">
                <a
                  href="#"
                  className="links__link font-bold text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  سرویس ها
                </a>
              </li>
              <li className="links__item">
                <a
                  href="#"
                  className="links__link font-bold text-gray-600 hover:text-rose-400 transition-colors duration-300"
                >
                  ارتباط با ما
                </a>
              </li>
            </ul>
            <ul className="actions flex items-center gap-10 lg:gap-16 md:mr-auto">
              <li className="actions__item order-3">
                <Link
                  href={{ pathname: state.user ? "/profile" : "/auth/login" }}
                  className="action__link"
                >
                  <svg className="transition-colors duration-200 w-5 h-5 fill-gray-600 hover:fill-rose-400">
                    {state.user ? (
                      <use href="/static/img/sprite.svg#icon-user" />
                    ) : (
                      <use href="/static/img/sprite.svg#icon-login" />
                    )}
                  </svg>
                </Link>
              </li>
              <li className="actions__item order-2">
                <Link
                  href={{
                    pathname: state.user ? "/profile/favorites" : "/auth/login",
                  }}
                  className="action__link"
                >
                  <svg className="w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-200">
                    <use href="/static/img/sprite.svg#icon-heart" />
                  </svg>
                </Link>
              </li>
              <li className="actions__item action__item--badge cursor-pointer flex order-1">
                {state.basket.length ? (
                  <div className="badge -ml-2 relative z-50 flex rounded-full items-center justify-center w-4 h-4 text-white bg-red-500 -mt-1 p-2 text-xs">
                    {state.basket.length}
                  </div>
                ) : null}
                <Link href={{ pathname: "/basket" }} className="action__link">
                  <svg className="w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-200">
                    <use href="/static/img/sprite.svg#icon-shop" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
          <button onClick={handleOpeningMenu} className="md:hidden ml-5 burger">
            <svg className="transition-colors duration-200 w-5 h-5 fill-gray-800 hover:fill-rose-400">
              <use href="/static/img/sprite.svg#icon-menu" />
            </svg>
          </button>
        </nav>
      </header>
    </>
  );
}
