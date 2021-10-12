export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};
export interface BestProduct extends Product {
  totalSold?: number;
}
