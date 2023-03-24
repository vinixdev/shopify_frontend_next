import Cookies from "js-cookie";
import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { decryptData } from "../../services/encryptionService";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import Hero from "../partials/Hero";
import Loading from "../partials/Loading";
import MainContent from "../home/HomeContent";

interface ShopProps {
  children: React.ReactNode;
  title: string;
}

const Shop = ({ children, title = "شاپیفای" }: ShopProps) => {
  const { state, dispatch } = useShopContext();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (Cookies.get("info")) {
      const info = Cookies.get("info");
      const data = decryptData(info as string);
      if (data) {
        dispatch({
          type: "@shop/set_initial_state",
          payload: JSON.parse(data),
        });
      }
    }
  }, []);

  // useEffect(() => {
  //   // if (localStorage.getItem("info")) {
  //   //   const info = localStorage.getItem("info");
  //   //   const data = decryptData(info as string);
  //   //   if (data) {
  //   //     dispatch({
  //   //       type: "@shop/set_initial_state",
  //   //       payload: JSON.parse(data),
  //   //     });
  //   //   }
  //   // }
  //   if (Cookies.get("info")) {
  //     const info = Cookies.get("info");
  //     const data = decryptData(info as string);
  //     if (data) {
  //       dispatch({
  //         type: "@shop/set_initial_state",
  //         payload: JSON.parse(data),
  //       });
  //     }
  //   }
  // }, []);

  return (
    <>
      <div className="container mx-auto md:px-5 lg:px-10 xl:px-28">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/img/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/img/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/img/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/img/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/static/img/safari-pinned-tab.svg"
            color="#fb7185"
          />
          <link rel="shortcut icon" href="/static/img/favicon.ico" />
          <meta name="msapplication-TileColor" content="#fb7185" />
          <meta
            name="msapplication-config"
            content="/static/img/browserconfig.xml"
          />
          <meta name="theme-color" content="#fb7185" />
          <title>{title}</title>
        </Head>
        <Header />

        {!isLoading ? <>{children}</> : <Loading />}
      </div>
      <Footer />
      {/* <script src="/static/js/script.js"></script> */}
    </>
  );
};

export default Shop;
