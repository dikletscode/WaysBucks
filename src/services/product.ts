import { AxiosResponse } from "axios";
import { API } from "../config/axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const getProduct = (): Promise<Product[] | null> => {
  return new Promise((resolve, reject) => {
    API.get("products")
      .then((res: AxiosResponse<{ product: Product[] }>) => {
        resolve(res.data.product);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export interface AddProductType {
  title: string;
  price: string;
  image: Blob | null;
}

export const addProduct = (obj: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.post("product", obj, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log(err);
        reject(null);
      });
  });
};
