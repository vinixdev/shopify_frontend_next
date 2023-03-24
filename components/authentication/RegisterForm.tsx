import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";

export default function LoginForm() {
  const [fields, setFields] = useState<{
    email: string;
    password: string;
    passwordConfirm: string;
    phone_number: string;
  }>({
    email: "",
    password: "",
    passwordConfirm: "",
    phone_number: "",
  });
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const { dispatch } = useShopContext();

  const handleFormFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "email") {
      setFields((prev) => ({ ...prev, email: e.target.value }));
    } else if (e.target.id === "password") {
      setFields((prev) => ({ ...prev, password: e.target.value }));
    } else if (e.target.id === "password2") {
      setFields((prev) => ({ ...prev, passwordConfirm: e.target.value }));
    } else if (e.target.id === "phone") {
      setFields((prev) => ({ ...prev, phone_number: e.target.value }));
    }
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !fields.email ||
      !fields.password ||
      !fields.passwordConfirm ||
      !fields.phone_number
    ) {
      setError("لطفا فیلد ها را پر کنید.");
      return;
    }

    if (fields.password !== fields.passwordConfirm) {
      setError("پسوورد ها یکسان نیستند.");
      return;
    }

    const http = new HttpRequest();
    http
      .post<
        { status: string; token: string },
        {
          email: string;
          password: string;
          passwordConfirm: string;
          phone_number: string;
        }
      >("/api/v1/auth/register", fields)
      .then((res) => {
        const { status, token }: { status: string; token: string } = res.data;
        if (status !== "success") {
          setError(
            "خطایی در هنگام ثبت نام رخ داده است لطفا بعدا مجددا تلاش کنید."
          );
          return;
        }
        // dispatch user
        dispatch({
          type: "@shop/set_user",
          payload: token,
        });
        // go to profile page and complete other info.
        localStorage.setItem("token", res.data.token);
        router.push("/profile");
        setError("");
        return;
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <main className="min-h-screen px-5 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full h-full md:w-1/2 lg:w-1/3 flex flex-col gap-5 bg-rose-200 p-5 rounded-md"
      >
        <h2 className="text-center font-bold text-gray-700 text-lg">
          ورود به حساب کاربری
        </h2>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          placeholder="ایمیل"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={handleFormFields}
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          autoComplete="off"
          placeholder="شماره تلفن"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={handleFormFields}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="رمز عبور"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={handleFormFields}
        />
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder="تایید رمز عبور"
          className="px-2 py-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-md w-full placeholder:text-gray-400"
          onChange={handleFormFields}
        />
        <div className="form__error">
          {error ? (
            <p className="font-medium text-xs text-red-600">{error}</p>
          ) : null}
        </div>
        <div className="form-group flex flex-col gap-2 md:flex-row">
          <div>
            <Link
              href={{ pathname: "/auth/login" }}
              className="font-medium text-gray-700 text-sm hover:text-rose-400 transition-colors duration-300"
            >
              ورود به حساب کاربری
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="text-center py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
        >
          ثبت نام
        </button>
      </form>
    </main>
  );
}
