import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AddressInterface } from "../../context/interfaces/interfaces";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";
import Alert from "../alert/Alert";
import AddressCard from "./AddressCard";
import CheckoutForm from "./CheckoutForm";
import {
  AddressesResponse,
  SelectedAddressInterface,
} from "./interface/interface";
import PaymentForm from "./PaymentForm";

export default function CheckoutAddress() {
  const router = useRouter();
  const { state, dispatch } = useShopContext();
  const [userAddresses, setUserAddresses] = useState<AddressInterface[]>([]);
  const [selectedAddress, setSelectedAddress] =
    useState<SelectedAddressInterface>(
      state.address
        ? { input: state.address._id, checked: true }
        : { input: "", checked: false }
    );

  useEffect(() => {
    if (!state.basket.length) {
      if (router.isReady) {
        router.replace("/basket");
      }
    }
    if (state.user) {
      // send ajax to server and get user addresses and set it on userAddresses state

      const http = new HttpRequest();
      http
        .get<AddressesResponse>("/api/v1/me/addresses", {
          headers: {
            authorization: `Bearer ${state.user}`,
          },
        })
        .then((res) => {
          setUserAddresses(res.data.addresses);
          // setUserAddresses([]);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          // setUserAddresses([]);
        });
    }
  }, []);

  const handleSelectAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddress({
      input: e.target.id,
      checked: e.target.checked,
    });
    dispatch({
      type: "@shop/add_address",
      payload: userAddresses.find((address) => address._id === e.target.id),
    });
  };

  return (
    <div className="flex-1">
      {userAddresses.length && state.basket.length ? (
        <>
          <h2 className="font-bold text-lg text-gray-600">انتخاب آدرس</h2>
          <form>
            {userAddresses.map((address) => {
              return (
                <div
                  key={address._id}
                  className="form-address first-of-type:mt-2 mt-5"
                >
                  <input
                    className="hidden"
                    onChange={handleSelectAddress}
                    type="radio"
                    name="address"
                    id={`${address._id}`}
                  />
                  <label htmlFor={`${address._id}`}>
                    <AddressCard
                      selected={selectedAddress.input === `${address._id}`}
                      key={address._id}
                      {...address}
                    />
                  </label>
                </div>
              );
            })}

            <a
              href="#"
              className="mt-3 block font-bold text-gray-600 hover:text-rose-400 duration-300 transition-colors"
            >
              ثبت آدرس جدید
            </a>
          </form>
        </>
      ) : (
        <>{state.basket.length ? <CheckoutForm /> : null}</>
      )}
      <PaymentForm />
    </div>
  );
}
