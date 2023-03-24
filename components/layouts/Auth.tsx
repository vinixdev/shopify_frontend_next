import Head from "next/head";
import React from "react";

interface AuthProps {
  children: React.ReactNode;
  title: string;
}

/*
Once you receive a jwt token, you can set an "expiry time" for your jwt token. For example, if I receive a token with id: "abc_token_123", I will create an object inside sessionstorage, localstorage, or even cookies with a key called expireTime (for example). And I will use a useEffect hook on the main file (App.js) to watch for the time, if the time exceeds the expiry time, log the user out, otherwise, if the expiry key is present inside your storage, keep the user logged in.
*/

export default function Auth({ children, title }: AuthProps) {
  return (
    <>
      <div className="">
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
        {children}
      </div>

      {/* <script src="/static/js/script.js"></script> */}
    </>
  );
}
