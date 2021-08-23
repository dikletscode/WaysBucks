import { createContext, Dispatch } from "react";

const AuthContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => undefined });

export const EventContext = createContext<{
  eventState: any;
  eventDispatch: Dispatch<any>;
}>({ eventState: {}, eventDispatch: () => undefined });

export const CartContext = createContext<{
  cartState: number;
  increment: (state: number) => void;
}>({ cartState: 0, increment: () => undefined });

export default AuthContext;
