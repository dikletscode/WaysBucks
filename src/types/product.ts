export type ProductTypes = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export interface ProductTopping {
  id: number;
  qty: number;
  products: ProductTypes;
  toppings: ProductTypes[];
  price: number;
  users: {
    fullname: string;
    email: string;
  };
}
export type ToppingTypes = {
  id: number;
  title: string;
  price: number;
  image: string;
};
export interface AddProductType {
  title: string;
  price: string;
  image: Blob | null | string;
}
export interface BestProduct extends ProductTypes {
  totalSold?: number;
}
