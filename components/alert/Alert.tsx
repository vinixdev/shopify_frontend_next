import React, { useEffect, useState } from "react";

interface AlertProps {
  open: boolean;
  type: "success" | "error";
  message: string;
  handleClose: () => void;
}

export default function Alert({
  type,
  message,
  open,
  handleClose,
}: AlertProps) {
  useEffect(() => {
    const disappearAlert = setTimeout(() => {
      handleClose();
    }, 1500);
    return () => clearTimeout(disappearAlert);
  }, [open]);

  return (
    <div
      className={`fixed top-20 z-50 shadow-md left-1/2 -translate-x-1/2 w-60 md:w-1/3 p-5 font-medium text-center text-sm rounded-md transition-opacity duration-500 ${
        type === "success"
          ? "bg-green-500 text-white"
          : "bg-rose-500 text-white"
      } ${open ? "opacity-100" : "opacity-0"}`}
    >
      {message}
    </div>
  );
}
