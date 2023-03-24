import React from "react";

export default function Offer() {
  return (
    <div className="offer w-full bg-gray-200 flex md:flex-row gap-5 md:gap-0 flex-col mb-20 mt-36 md:p-12 p-8">
      <div className="offer__pic -mt-24 md:-mt-28 md:w-1/2 w-full">
        <img className="w-full" src="/static/img/shoe.png" alt="offer" />
      </div>
      <div className="offer__content flex flex-col gap-5 w-full md:w-1/2 items-center md:items-end md:self-center">
        <h4 className="offer__title font-bold text-lg md:text-4xl text-gray-800">
          آخرین مدل های کفش
        </h4>
        <p className="offer__text text-gray-800 md:text-base text-sm font-medium">
          کالکشن ۲۰۲۲ کفش مردانه
        </p>
        <a
          href="#"
          className="bg-rose-500 text-center w-20 px-2 py-2 text-white font-medium"
        >
          نمایش همه
        </a>
      </div>
    </div>
  );
}
