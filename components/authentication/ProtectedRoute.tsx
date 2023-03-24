import { Router } from "next/router";
import React from "react";
import { useShopContext } from "../../context/ShopContext";

interface ProtectedRouteProps {
  router: Router;
  children: React.ReactElement;
}

const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoute({
  router,
  children,
}: ProtectedRouteProps) {
  const { state } = useShopContext();
  const isLoggedIn = state.user ? true : false;

  let unprotectedRoute = [
    "/",
    "/auth/login",
    "/auth/register",
    "/products",
    "/basket",
  ];

  let pathIsProtected = unprotectedRoute.indexOf(router.pathname) === -1;

  if (isBrowser() && !isLoggedIn && pathIsProtected) {
    router.push("/auth/login");
  }

  return children;
}
