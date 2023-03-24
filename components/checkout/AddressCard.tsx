import React, { useState } from "react";

interface AddressCardProps {
  title: string;
  city: string;
  state: string;
  address: string;
  zip_code: string;
  full_name: string;
  mobile: string;
  selected?: boolean;
}

export default function AddressCard({
  title,
  full_name,
  city,
  state,
  zip_code,
  address,
  mobile,
  selected = false,
}: AddressCardProps) {
  return (
    <div
      className={`w-full flex flex-col p-3 bg-gray-200 rounded-t-sm gap-2 text-gray-700 font-medium text-xs border-2 ${
        selected ? "border-rose-400" : ""
      }`}
    >
      <h2 className="font-bold text-base text-gray-700">{title}</h2>
      <p>نام و نام خانوادگی : {full_name}</p>
      <p>استان : {state}</p>
      <p>شهر : {city}</p>
      <p>
        آدرس : {address} - کدپستی {zip_code} - شماره تلفن {mobile}
      </p>
    </div>
  );
}
