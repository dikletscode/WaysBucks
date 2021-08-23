import React, { FC, useReducer } from "react";
import AuthContext, { CartContext } from "./context";
import reducer from "./reducer/reducer";
import { EventContext } from "./context";
import eventReducer from "./reducer/eventReducer";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null);
  const [eventState, eventDispatch] = useReducer(eventReducer, {
    login: false,
    signin: false,
  });
  const [cartState, setCartState] = React.useState(0);

  const increment = (state: number) => setCartState(state);

  return (
    <EventContext.Provider value={{ eventState, eventDispatch }}>
      <AuthContext.Provider value={{ state, dispatch }}>
        <CartContext.Provider value={{ cartState, increment }}>
          {children}
        </CartContext.Provider>
      </AuthContext.Provider>
    </EventContext.Provider>
  );
};

export default Provider;
