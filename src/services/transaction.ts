import { AxiosResponse } from "axios";
import { API } from "../config/axios";
import { Product } from "./product";
import { ToppingTypes } from "./topping";

export type Transaction = {
  id: number;
  product: Product;
  toppings: ToppingTypes[];
  createdAt: Date;
};
export type HistoryTransaction = {
  id: number;
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

export const getTransaction = (): Promise<HistoryTransaction[] | null> => {
  return new Promise((resolve, reject) => {
    API.get("orders")
      .then((res: AxiosResponse<HistoryTransaction[]>) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(() => {
        reject(null);
      });
  });
};

export const createTransaction = (obj: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.post("transaction", obj, {
      headers: { "content-type": "multipart/form-data" },
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(() => {
        reject(null);
      });
  });
};
export const allTransaction = (): Promise<HistoryTransaction[] | null> => {
  return new Promise((resolve, reject) => {
    API.get("transactions")
      .then((res: AxiosResponse<HistoryTransaction[]>) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(() => {
        reject(null);
      });
  });
};
export const updateTransaction = (id: number, status: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.patch("transactions", { id: id, status: status })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(() => {
        reject(null);
      });
  });
};
