import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ShopProvider } from "../context/ShopContext";
import ProtectedRoute from "../components/authentication/ProtectedRoute";
import { useEffect, useState } from "react";
import Loading from "../components/partials/Loading";
import { Router } from "next/router";

export default function App({ Component, pageProps, router }: AppProps) {
  const [progress, setProgress] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
    //function will fired when route change started
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
    //function will fired when route change ended
  });

  return (
    <ShopProvider>
      <Component {...pageProps} />
    </ShopProvider>
  );
}
