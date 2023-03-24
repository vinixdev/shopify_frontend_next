import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import HttpRequest from "../../services/api/HttpRequest";
import Alert from "../alert/Alert";
import GatewayRadioBtn from "./GatewayRadioBtn";

interface gateway {
  id: string;
  name: string;
  title: string;
  logo: string;
}

export default function OnlinePayment() {
  //
  const router = useRouter();

  const { state, dispatch } = useShopContext();
  const [gateways, setGateways] = useState<gateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<gateway | null>(null);
  const [btnText, setBtnText] = useState<string>("پرداخت آنلاین");
  const [alert, setAlert] = useState<{
    message: string;
    open: boolean;
    type: "success" | "error";
  }>({ message: "", open: false, type: "success" });

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (!state.user) {
      router.push("/auth/login");
      return;
    }

    if (state.basket.length === 0) {
      router.push("/basket");
      return;
    }

    if (state.paymentMethod !== "online" || !state.address) {
      router.push("/checkout");
      return;
    }

    const http = new HttpRequest();
    http
      .get<{ status: string; data: gateway[] }>("/api/v1/gateways", {
        headers: {
          authorization: state.user,
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setGateways([...res.data.data]);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const handleSelectGateway = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gateway = gateways.find((g) => g.id === e.target.value);
    if (gateway) {
      setSelectedGateway(gateway);
    }
    return;
  };

  const handleSubmitGatewayForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedGateway) {
      setAlert((prev) => ({
        ...prev,
        type: "error",
        message: "یک درگاه پرداخت انتخاب کنید.",
        open: true,
      }));
      return;
    }

    const http = new HttpRequest();
    setBtnText("در حال انتقال به درگاه ...");
    http
      .post<{ status: string; url: string }, {}>(
        "/api/v1/purchase",
        {
          items: state.basket,
          address: state.address,
          coupon: state.coupon.code ? state.coupon : undefined,
          method: state.paymentMethod,
          gateway: selectedGateway.name,
          // gateway: state.gateway,
        },
        { headers: { authorization: state.user } }
      )
      .then((res) => {
        if (res.data.status === "success") {
          router.replace(res.data.url);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmitGatewayForm}
      className="flex flex-col gap-3 px-3"
    >
      {state.user &&
      state.paymentMethod === "online" &&
      state.basket.length !== 0 &&
      state.address ? (
        <>
          <h2 className="font-bold text-lg text-gray-600">
            انتخاب درگاه پرداخت آنلاین
          </h2>
          <div className="form-group flex gap-3" onChange={handleSelectGateway}>
            {gateways.map((gateway) => {
              return <GatewayRadioBtn key={gateway.id} {...gateway} />;
            })}
          </div>
          <div>
            <button
              type="submit"
              className="text-center w-full py-3 bg-rose-400 hover:bg-rose-500 transition-colors duration-300 text-white my-2"
            >
              {btnText}
            </button>
          </div>

          <Alert
            type={alert.type}
            message={alert.message}
            open={alert.open}
            handleClose={handleCloseAlert}
          />
        </>
      ) : (
        <p>مراحل پرداخت شما تکمیل نشده است.</p>
      )}
    </form>
  );
}
