export type ProductTypes = {
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
