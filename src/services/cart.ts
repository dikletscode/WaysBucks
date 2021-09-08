import { API } from "../config/axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface ProductTopping {
  id: number;
  qty: number;
  products: Product;
  toppings: Product[];
  price: number;
}

export interface ProductSelected {
  id: number;
  qty: number;
  toppings: number[];
  price: number;
}

export const addToCart = (product: ProductSelected): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.post("cart", product)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject(null);
      });
  });
};

interface UpdateCart {
  qty: number;
  price: number;
}
export const updateCart = (id: number, obj: UpdateCart): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.patch("transaction/" + id, obj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCart = (): Promise<ProductTopping[] | null> => {
  return new Promise((resolve, reject) => {
    API.get("transaction")
      .then((res) => {
        resolve(res.data.product);
      })
      .catch(() => {
        reject(null);
      });
  });
};

export const deleteProductCart = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    API.delete("transaction", { data: { id: id } })
      .then((res) => {
        console.log(res.data, "asss");
        resolve(res.data.product);
      })
      .catch(() => {
        reject(null);
      });
  });
};
