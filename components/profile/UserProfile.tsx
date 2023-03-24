import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";
import Alert from "../alert/Alert";
import { UserData, UserResponse } from "./interfaces/interfaces";

export default function UserProfile() {
  const containerStyles = `w-full h-full`;
  const formStyles = `p-5 flex flex-col gap-10`;
  const headerStyles = `font-bold text-xl text-gray-700 text-center md:text-right`;
  const labelStyles = `w-20 font-bold text-xs text-gray-700`;
  const inputStyles = `bg-gray-200 px-3 py-2 text-gray-700 font-medium rounded-sm shadow`;
  const btnStyles = `text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2 cursor-pointer`;

  const [user, setUser] = useState<Partial<UserData> | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    open: boolean;
    type: "success" | "error";
  }>({ message: "", open: false, type: "success" });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const http = new HttpRequest();
        const res = await http.get<UserResponse>("/api/v1/me", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.status === "success") {
          setUser({
            first_name: res.data.user.first_name || "",
            last_name: res.data.user.last_name || "",
            email: res.data.user.email || "",
            phone_number: res.data.user.phone_number || "",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleOnChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      if (prev) {
        return { ...prev, [e.target.id]: e.target.value };
      }
      return prev;
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!user.phone_number || !user.email) {
      // handle alert
      setAlert((prev) => ({
        ...prev,
        type: "error",
        message: "شماره تلفن و ایمیل الزامی است.",
        open: true,
      }));
      return;
    }

    const http = new HttpRequest();
    http
      .patch<{ status: string }, Partial<UserData>>(
        "/api/v1/me",
        { ...user },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          setAlert({
            type: "success",
            open: true,
            message: "تغییرات با موفقیت انجام شد.",
          });
          return;
        }

        setAlert({
          type: "error",
          open: true,
          message: "خطایی در سمت سرور رخ داده است لطفا بعدا تلاش کنید.",
        });
        return;
      })
      .catch((err) => {
        setAlert({
          type: "error",
          open: true,
          message: err.response.data.message,
        });
        return;
      });
  };

  return (
    <div className={containerStyles}>
      {user ? (
        <>
          <form onSubmit={handleSubmitForm} className={formStyles}>
            <h2 className={headerStyles}>اطلاعات شما</h2>
            <div className="form-group flex flex-col md:flex-row gap-5 items-center justify-between">
              <div className="flex items-center">
                <label className={labelStyles} htmlFor="first_name">
                  نام
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="نام"
                  value={user.first_name}
                  onChange={handleOnChangeInputs}
                />
              </div>
              <div className="flex items-center">
                <label className={labelStyles} htmlFor="first_name">
                  نام خانوادگی
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="نام خانوادگی"
                  value={user.last_name}
                  onChange={handleOnChangeInputs}
                />
              </div>
            </div>
            <div className="form-group flex flex-col md:flex-row gap-5 items-center justify-between">
              <div className="flex items-center">
                <label className={labelStyles} htmlFor="first_name">
                  ایمیل
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="ایمیل"
                  value={user.email}
                  onChange={handleOnChangeInputs}
                />
              </div>
              <div className="flex items-center">
                <label className={labelStyles} htmlFor="first_name">
                  شماره تلفن
                </label>
                <input
                  className={inputStyles}
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  placeholder="شماره تلفن"
                  value={user.phone_number}
                  onChange={handleOnChangeInputs}
                />
              </div>
            </div>
            <div className="form-group w-full">
              <button type="submit" className={btnStyles}>
                تغییر اطلاعات
              </button>
            </div>
          </form>
        </>
      ) : null}

      <Alert
        type={alert.type}
        message={alert.message}
        open={alert.open}
        handleClose={handleCloseAlert}
      />
    </div>
  );
}
