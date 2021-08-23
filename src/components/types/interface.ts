export interface UserSignIn {
  email: string;
  password: string;
}

export interface AuthTypes {
  isLogin: boolean;
  isSignin: boolean;
  isSignout: boolean;
}

export interface ProductTypes {
  id: string;
  image: string;
  price: number;
  title: string;
}
export interface ProfileTypes {
  id: string;
  email: number;
  detail: {
    avatar: string;
    fullname: string;
  };
}
interface Topping {
  title?: string;
}

interface Product {
  image: string;
  title: string;
  topping: Topping[];
  total: number;
}

export interface Transaction {
  buyyer: {
    address: string;
    email: string;
    name: string;
    phone: string;
    posCode: string;
  };
  cart: Product[];
  orderDate: string;
  paymentCode: string;
  total: number;
}
