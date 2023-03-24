import React, { useEffect, useState } from "react";
import HttpRequest from "../../services/api/HttpRequest";
import { toPersianCurrency } from "../../services/beautifulNumbersService";
import { OrderInterface, OrdersResponse } from "./interfaces/interfaces";
import OrderStatusLabel from "./OrderStatusLabel";

export default function UserOrders() {
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const http = new HttpRequest();
        const res = await http.get<OrdersResponse>("/api/v1/orders", {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (res.data.status === "success") {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <div className="p-3 flex flex-col gap-5 w-full min-h-full overflow-hidden">
      <h2 className="font-bold text-lg text-gray-700">سفارش های شما</h2>
      {orders.length ? (
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                سفارش
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                وضعیت
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                مبلغ کل
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                مبلغ نهایی
              </th>

              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                تاریخ ثبت
              </th>
              <th
                scope="col"
                className="text-xs font-medium text-gray-900 px-6 py-4 text-right"
              >
                تغییر در
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900 text-right">
                    {order.id
                      .slice(order.id.length - 4, order.id.length)
                      .toUpperCase()}
                  </td>
                  <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    <OrderStatusLabel status={order.status} />
                  </td>
                  <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    {toPersianCurrency(order.total_price)} تومان
                  </td>
                  <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    {toPersianCurrency(order.final_price)} تومان
                  </td>
                  <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    {order.created_at.split(" ")[0]}
                  </td>
                  <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">
                    {order.updated_at.split(" ")[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
