import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="flex items-center justify-center w-28 h-28 rounded-md bg-gray-200 fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <svg className="w-16 h-16 animate-bounce fill-rose-400">
          <use href="/static/img/sprite.svg#icon-store"></use>
        </svg>
      </div>
    </main>
  );
}
