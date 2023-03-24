import { AddressInterface } from "../../../context/interfaces/interfaces";
import { OrderStatus } from "../OrderStatus";

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
  phone_number: string;
  total_order: number;
  wallet: number;
}

export interface UserResponse {
  status: string;
  user: UserData;
}

export interface OrderInterface {
  id: string;
  total_price: number;
  final_price: number;
  status: OrderStatus;
  address: AddressInterface;
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  status: string;
  orders: OrderInterface[];
}

export interface FavoritesProduct {
  id: string;
  title: string;
  price: number;
  specialPrice: number;
  thumbnailUrl: string;
}

export interface FavoritesResponse {
  favorites: FavoritesProduct[];
}
