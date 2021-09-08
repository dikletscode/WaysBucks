import { AxiosResponse } from "axios";
import { API } from "../config/axios";

export type ToppingTypes = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export const getTopping = (): Promise<ToppingTypes[] | null> => {
  return new Promise((resolve, reject) => {
    API.get("toppings")
      .then((res: AxiosResponse<{ product: ToppingTypes[] }>) => {
        resolve(res.data.product);
      })
      .catch(() => {
        reject(null);
      });
  });
};

export interface AddProductType {
  title: string;
  price: string;
  image: Blob | null;
}

export const addTopping = (obj: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.post("topping", obj, {
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
