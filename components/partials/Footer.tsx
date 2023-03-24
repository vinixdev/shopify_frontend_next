import React from "react";

export default function Footer() {
  return (
    <footer className="footer flex md:flex-row flex-col-reverse w-full p-14 gap-7 bg-zinc-700">
      <ul className="items text-center md:text-right text-white flex md:flex-row flex-col items-center md:items-baseline md:gap-28 gap-10">
        <li className="items__item">
          <h6 className="items__title text-sm font-bold my-3">فروشگاه</h6>
          <ul className="shortcuts flex flex-col gap-2">
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 hover:text-rose-300 transition-colors duration-300 font-medium"
              >
                درباره ما
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                ارتباط با ما
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                آدرس
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                سوالات متداول
              </a>
            </li>
          </ul>
        </li>
        <li className="items__item">
          <h6 className="items__title text-sm font-bold my-3">پیوند ها</h6>
          <ul className="shortcuts flex flex-col gap-2">
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 hover:text-rose-300 transition-colors duration-300 font-medium"
              >
                لوازم الکترونیکی
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                تابستانه
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                کتاب
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                لوازم آرایشی
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                مبلمان
              </a>
            </li>
          </ul>
        </li>
        <li className="items__item">
          <h6 className="items__title text-sm font-bold my-3">ارتباط با ها</h6>
          <ul className="shortcuts flex flex-col gap-2">
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 hover:text-rose-300 transition-colors duration-300 font-medium"
              >
                +۲ ۳۶ ۱۲۵ ۴۵۳
              </a>
            </li>
            <li className="shortcuts__item">
              <a
                href="#"
                className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300"
              >
                shopify@gmail.com
              </a>
            </li>
            <li className="shortcuts__item">
              <address className="shortcuts__link text-gray-300 font-medium hover:text-rose-300 transition-colors duration-300 cursor-pointer">
                ایران، بوشهر، ماهینی
              </address>
            </li>
          </ul>
        </li>
      </ul>
      <div className="flex-1 justify-center flex md:justify-center lg:justify-end">
        <div className="brand flex items-center flex-col gap-5 self-center md:items-end">
          <img
            src="/static/img/logo.png"
            className="w-24 bg-rose-500 rounded-full"
            alt=""
          />
          <ul className="socials-media flex gap-5 flex-row-reverse">
            <li className="socials-media__item">
              <a href="#" className="socials-medai___link">
                <svg className="w-5 h-5 fill-white hover:fill-rose-400 transition-colors duration-200">
                  <use href="/static/img/sprite.svg#icon-facebook-1" />
                </svg>
              </a>
            </li>
            <li className="socials-media__item">
              <a href="#" className="socials-medai___link">
                <svg className="w-5 h-5 fill-white hover:fill-rose-400 transition-colors duration-200">
                  <use href="/static/img/sprite.svg#icon-twitter-1" />
                </svg>
              </a>
            </li>
            <li className="socials-media__item">
              <a href="#" className="socials-medai___link">
                <svg className="w-5 h-5 fill-white hover:fill-rose-400 transition-colors duration-200">
                  <use href="/static/img/sprite.svg#icon-instagram-1" />
                </svg>
              </a>
            </li>
          </ul>
          <p className="brand__copyright text-center text-white">
            پیاده سازی شده توسط Vinix
          </p>
        </div>
      </div>
    </footer>
  );
}
