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
