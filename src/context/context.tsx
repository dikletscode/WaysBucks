import { createContext, Dispatch } from "react";

const AuthContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => undefined });

export default AuthContext;
