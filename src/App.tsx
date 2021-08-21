import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./components/header/fullHeader";
import Cart from "./components/pages/cart/cart";
import HomePage from "./components/pages/home/HomePage";
import { role } from "./components/types/roleEnum";
import AuthContext from "./context/context";
import PrivateRoute from "./router/private";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const loginUser = localStorage.getItem("_basicInfo");
  useEffect(() => {
    if (loginUser) {
      const user = JSON.parse(loginUser);
      if (role.SELLER == user.role) {
        dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: user.detail.avatar });
      } else if (role.BUYYER == user.role) {
        dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: user.detail.avatar });
      }
    } else {
      dispatch({ type: "LOGIN_FAILED", payload: null });
    }
  }, [loginUser]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute component={Cart} path="/cart" exact />
        <Route component={HomePage} path="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
