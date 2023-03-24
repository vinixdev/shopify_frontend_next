import React, { useEffect, useState } from "react";
import { AddressInterface } from "../../context/interfaces/interfaces";
import HttpRequest from "../../services/api/HttpRequest";
import { AddressesResponse } from "../checkout/interface/interface";

export default function UserAddresses() {
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      const http = new HttpRequest();
      try {
        const res = await http.get<AddressesResponse>("/api/v1/me/addresses", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.status !== "success") return;

        setAddresses(res.data.addresses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAddresses();
  }, []);

  const handleDeleteAddress = async (addressId: string): Promise<void> => {
    try {
      const http = new HttpRequest();
      const res = await http.delete<{ status: string }>(
        `/api/v1/me/addresses/${addressId}`,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.data.status !== "success") return;
      setAddresses((prev) =>
        prev.filter((address) => address._id !== addressId)
      );
    } catch (error) {}
  };

  return (
    <div className="min-h-full w-full p-5 flex flex-col gap-5 overflow-hidden">
      <h2 className="font-bold text-lg text-gray-700">آدرس های شما</h2>
      {addresses.length ? (
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-center"
              >
                عنوان
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-center"
              >
                گیرنده
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-center"
              >
                آدرس
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4"
              >
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => {
              return (
                <tr key={address._id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-center">
                    {address.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-center">
                    {address.full_name}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-900 text-center leading-relaxed">
                    {`${address.state}، ${address.city}، ${address.address}، کدپستی : ${address.zip_code}، شماره تلفن : ${address.mobile}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-center">
                    <svg
                      onClick={() => {
                        handleDeleteAddress(address._id);
                      }}
                      className="item__delete_icon cursor-pointer w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-300 mx-auto"
                    >
                      <use href="/static/img/sprite.svg#icon-cancell" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h4>هنوز آدرسی ثبت نکرده اید.</h4>
      )}
    </div>
  );
}
