import React, { FC, useReducer } from "react";
import AuthContext from "./context";
import reducer from "./reducer/reducer";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    isAdmin: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
