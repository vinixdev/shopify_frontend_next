import React from "react";
import { OrderStatus } from "./OrderStatus";

interface OrderStatusLabelProps {
  status: OrderStatus;
}

export default function OrderStatusLabel({ status }: OrderStatusLabelProps) {
  let text = "";

  if (status === OrderStatus.INIT) {
    text = "ثبت شده";
  } else if (status === OrderStatus.PAID) {
    text = "پرداخت شده";
  } else if (status === OrderStatus.CONFIRMED) {
    text = "تایید شده";
  } else if (status === OrderStatus.DELIVERED) {
    text = "تحویل داده شده";
  } else if (status === OrderStatus.CANCELED) {
    text = "لغو شده";
  } else if (status === OrderStatus.INVENTORY) {
    text = "در انبار";
  } else if (status === OrderStatus.READY) {
    text = "آماده شده";
  } else if (status === OrderStatus.REFUNDED) {
    text = "مرجوع شده";
  } else if (status === OrderStatus.SENT) {
    text = "ارسال شده";
  }

  return <>{text}</>;
}
