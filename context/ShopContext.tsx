import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { decryptData } from "../services/encryptionService";
import { ShopContextInterface } from "./interfaces/interfaces";
import { initialState, ShopReducer } from "./ShopReducer";

const ShopContext = createContext<ShopContextInterface | null>(null);

export const ShopProvider = ({ children }: React.PropsWithChildren) => {
  let [state, dispatch] = useReducer(ShopReducer, initialState);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = (): ShopContextInterface => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShopContext inside Provider !");
  }

  return { ...context };
};
