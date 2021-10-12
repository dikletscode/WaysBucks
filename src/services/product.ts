import { AxiosResponse } from "axios";
import { API } from "../config/axios";

// export const getProduct = (): Promise<Product[] | null> => {
//   return new Promise((resolve, reject) => {
//     API.get("products")
//       .then((res: AxiosResponse<{ product: Product[] }>) => {
//         resolve(res.data.product);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };

export interface AddProductType {
  title: string;
  price: string;
  image: Blob | null | string;
}
