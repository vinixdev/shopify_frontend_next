import React, { useState } from "react";
import Alert from "../alert/Alert";
import { AddressFormInterface } from "./interface/interface";
import cities from "../../data/cities.json";
import provinces from "../../data/provinces.json";
import HttpRequest from "../../services/api/HttpRequest";
import { useShopContext } from "../../context/ShopContext";
import { AddressInterface } from "../../context/interfaces/interfaces";

export default function CheckoutForm() {
  // for email and other stuff we must extends the AddressInterface and set initial value for our form
  const { state, dispatch } = useShopContext();
  const [form, setForm] = useState<AddressFormInterface>({
    title: "",
    full_name: "",
    state: "",
    city: "",
    mobile: "",
    address: "",
    zip_code: "",
    email: "",
    province_id: -1,
    city_id: -1,
  });
  const [alert, setAlert] = useState<{
    message: string;
    open: boolean;
    type: "success" | "error";
  }>({ message: "", open: false, type: "success" });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleFormInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFormSelects = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "city") {
      setForm((prev) => ({
        ...prev,
        [e.target.id]: cities.find((c) => c.id === +e.target.value)?.name,
        city_id: +e.target.value,
      }));
    } else if (e.target.id === "state") {
      setForm((prev) => ({
        ...prev,
        [e.target.id]: provinces.find((p) => p.id === +e.target.value)?.name,
        province_id: +e.target.value,
      }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    for (const key in form) {
      if (key !== "email" && form[key as keyof AddressFormInterface] === "") {
        setAlert({
          message: "لطفا فرم را کامل کنید.",
          open: true,
          type: "error",
        });
        return;
      }
    }

    if (Number.isNaN(form.zip_code) || form.zip_code.length < 10) {
      setAlert({
        message: "کد پستی ده رقم است و باید عدد باشد.",
        open: true,
        type: "error",
      });
      return;
    }

    if (Number.isNaN(form.mobile) || form.mobile.length < 11) {
      setAlert({
        message: "شماره موبایل یازده رقم است و باید عدد باشد.",
        open: true,
        type: "error",
      });
      return;
    }

    const http = new HttpRequest();
    http
      .post<
        { address: AddressInterface },
        { address: Partial<AddressFormInterface> }
      >(
        "/api/v1/me/addresses",
        {
          address: { ...form },
        },
        {
          headers: {
            authorization: `Bearer ${state.user}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "@shop/add_address",
          payload: {
            title: form.title,
            full_name: form.full_name,
            address: form.address,
            zip_code: form.zip_code,
            city: form.city,
            state: form.state,
            mobile: form.mobile,
            _id: res.data.address._id,
          },
        });

        setForm({
          title: "",
          full_name: "",
          state: "",
          city: "",
          mobile: "",
          address: "",
          zip_code: "",
          email: "",
          province_id: -1,
          city_id: -1,
        });

        setAlert({
          type: "success",
          open: true,
          message: "عملیات با موفقیت انجام شد.",
        });
      })
      .catch((err) => {
        setAlert({
          type: "error",
          open: true,
          message: err.response.data.message,
        });
      });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col gap-3 px-3 md:flex-1"
    >
      <h3 className="font-medium text-gray-700 text-base">آدرس ارسال</h3>
      <div className="fullname flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="عنوان"
          className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
          onChange={handleFormInputs}
          value={form.title}
        />
        <input
          type="text"
          name="full_name"
          id="full_name"
          placeholder="نام کامل"
          className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
          onChange={handleFormInputs}
          value={form.full_name}
        />
      </div>
      <input
        type="tel"
        name="mobile"
        id="mobile"
        placeholder="شماره تلفن"
        className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full text-right"
        onChange={handleFormInputs}
        value={form.mobile}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="ایمیل (اختیاری)"
        className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
        onChange={handleFormInputs}
        value={form.email}
      />
      <input
        type="text"
        name="address"
        id="address"
        placeholder="آدرس"
        className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
        onChange={handleFormInputs}
        value={form.address}
      />
      <div className="info flex flex-col gap-3 md:flex-row">
        <select
          name="state"
          id="state"
          placeholder="استان"
          className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full font-iransans"
          onChange={handleFormSelects}
          value={`${form.province_id}`}
        >
          <option className="text-gray-400" value="-1" disabled>
            استان
          </option>
          {provinces.map((province, i) => {
            return (
              <option
                className="text-gray-600 font-iransans"
                key={province.id}
                value={province.id}
              >
                {province.name}
              </option>
            );
          })}
        </select>
        <select
          name="city"
          id="city"
          placeholder="شهر"
          className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
          onChange={handleFormSelects}
          value={`${form.city_id}`}
        >
          <option className="text-gray-400" value="-1" disabled>
            شهر
          </option>
          {cities
            .filter((c) => c.province_id === form.province_id)
            .map((c, i) => {
              return (
                <option
                  className="text-gray-600 font-iransans"
                  key={c.id}
                  value={c.id}
                >
                  {c.name}
                </option>
              );
            })}
        </select>
        <input
          type="text"
          name="zip_code"
          id="zip_code"
          placeholder="کد پستی"
          className="px-2 py-3 bg-gray-200 text-sm font-medium text-gray-700 rounded-md w-full"
          onChange={handleFormInputs}
          value={form.zip_code}
        />
      </div>

      <div>
        <button
          type="submit"
          className="text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
        >
          ثبت آدرس
        </button>
      </div>

      <Alert
        type={alert.type}
        message={alert.message}
        open={alert.open}
        handleClose={handleCloseAlert}
      />
    </form>
  );
}
