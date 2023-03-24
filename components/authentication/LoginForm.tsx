import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { dispatch } = useShopContext();
  const router = useRouter();

  const handleLoginBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("لطفا ایمیل و پسوورد را وارد کنید.");
      return;
    }

    const http = new HttpRequest();
    http
      .post<
        { success: string; token: string },
        { email: string; password: string }
      >("/api/v1/auth/login", {
        email,
        password,
      })
      .then((res) => {
        // dispatch user
        dispatch({
          type: "@shop/set_user",
          payload: res.data.token,
        });
        // check if remember me checked, store token in sessionStorage or Cookie
        // check for redirect to previous page
        window.localStorage.setItem("token", res.data.token);

        if (router.isReady) {
          router.back();
        }
        setError("");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <main className="min-h-screen px-5 flex items-center justify-center">
      <form
        onSubmit={handleLoginBtn}
        className="w-full h-full md:w-1/2 lg:w-1/3 flex flex-col gap-5 bg-rose-200 p-5 rounded-md"
      >
        <h2 className="text-center font-bold text-gray-700 text-lg">
          ورود به حساب کاربری
        </h2>
        <input
          type="email"
          name="email"
          autoComplete="off"
          id="email"
          placeholder="ایمیل"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="رمز عبور"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className="form__error">
          {error ? (
            <p className="font-medium text-xs text-red-600">{error}</p>
          ) : null}
        </div>
        <div className="form-group flex flex-col gap-2 md:flex-row">
          <div className="flex items-center gap-3 flex-1">
            <input type="checkbox" name="save" id="save" />
            <label htmlFor="save" className="text-gray-700 font-medium">
              مرا به خاطر بسپار
            </label>
          </div>
          <div>
            <Link
              href={{ pathname: "/auth/register" }}
              className="font-medium text-gray-700 text-sm hover:text-rose-400 transition-colors duration-300"
            >
              ایجاد حساب کاربری
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="text-center py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
        >
          ورود
        </button>
      </form>
    </main>
  );
}
