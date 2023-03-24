import React from "react";

export default function Hero() {
  return (
    <div className="hero grid grid-cols-2 grid-rows-2 h-1/2">
      <img
        className="w-full h-full object-cover rounded-2xl col-start-1 col-end-3 row-start-1 row-end-3"
        src="/static/img/hero5.png"
        alt="Shopify Hero"
      />
      <ul className="socials w-fit px-2 py-3 flex md:flex-col gap-4 col-start-1 col-end-2 row-start-1 row-end-2">
        <li className="socials__item">
          <a href="#" className="social__link">
            <svg className="transition-colors duration-200 w-5 h-5 md:w-7 md:h-7 fill-gray-700 hover:fill-rose-400">
              <use href="/static/img/sprite.svg#icon-instagram" />
            </svg>
          </a>
        </li>
        <li className="socials__item">
          <a href="#" className="social__link">
            <svg className="transition-colors duration-200 w-5 h-5 md:w-7 md:h-7 fill-gray-700 hover:fill-rose-400">
              <use href="/static/img/sprite.svg#icon-facebook" />
            </svg>
          </a>
        </li>
        <li className="socials__item">
          <a href="#" className="social__link">
            <svg className="transition-colors duration-200 w-5 h-5 md:w-7 md:h-7 fill-gray-700 hover:fill-rose-400">
              <use href="/static/img/sprite.svg#icon-twitter" />
            </svg>
          </a>
        </li>
      </ul>
      <h2 className="col-start-2 col-end-3 row-start-1 row-end-2 justify-self-center self-center md:text-3xl text-xl font-bold leading-relaxed text-center px-5">
        جنس خوب رو در خونه‌ تحویل بگیر
      </h2>
      <form
        action="."
        className="search-form md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 col-start-1 col-end-3 row-start-2 row-end-3 flex self-center md:self-start items-center md:px-8 px-3 w-full"
      >
        <input
          type="text"
          id="search"
          name="search"
          className="search-form__input px-12 py-2 rounded-3xl w-full focus:outline-0 focus:border-none font-bold focus-visible:outline-0
      focus-visible:outline-transparent
      focus-visible:border-none
      text-gray-800 placeholder:text-gray-400 placeholder:opacity-100"
          placeholder="یه چی بزن ببینم پیدا میشه"
        />
        <label htmlFor="search" className="-mr-10 cursor-pointer">
          <svg className="-rotate-90 w-5 h-5 fill-gray-600 hover:fill-rose-400 transition-colors duration-200">
            <use href="/static/img/sprite.svg#icon-search" />
          </svg>
        </label>
      </form>
    </div>
  );
}
