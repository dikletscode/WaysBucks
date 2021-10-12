import { AxiosResponse } from "axios";
import { API } from "../config/axios";
import { Product } from "../types/product";
export type ToppingTypes = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export type Transaction = {
  id: number;
  product: Product;
  toppings: ToppingTypes[];
  createdAt: Date;
  price: number;
};
export type HistoryTransaction = {
  id: number;
  userId: string;
  status: string;
  attachment: string;
  history: Transaction[];
  orderUser: UserOrder;
  totalPrice: number;
};

export interface UserOrder {
  fullname: string;
  email: string;
  phone: string;
  postCode: number;
  address: string;
}

export interface Transact extends UserOrder {
  totalPrice?: string;
  attachment?: Blob;
}
