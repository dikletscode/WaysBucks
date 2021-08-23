import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { gif } from "./components/assets/assetsRegister";
import Header from "./components/header/header";
import Cart from "./components/pages/cart/cart";
import Detail from "./components/pages/detail/detail";
import HomePage from "./components/pages/home/HomePage";
import AddProduct from "./components/pages/home/product/addProduct";
import UserProfile from "./components/pages/profile/user";
import AddTopping from "./components/pages/topping/addTopping";
import { role } from "./components/types/roleEnum";
import AuthContext from "./context/context";
import PrivateRoute from "./router/private";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const loginUser = localStorage.getItem("_basicInfo");
  useEffect(() => {
    const user = JSON.parse(loginUser || "{}");
    if (loginUser) {
      if (role.SELLER == user.role) {
        dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: user.detail.avatar });
      } else if (role.BUYYER == user.role) {
        dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: user.detail.avatar });
      }
    } else {
      dispatch({ type: "LOGIN_FAILED", payload: null });
    }
  }, [loginUser]);
  if (state == null) {
    return <img src={gif.loading} alt="" />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <PrivateRoute component={Cart} path="/cart" exact />
        <PrivateRoute component={Detail} path="/product/:id" exact />
        <PrivateRoute component={AddTopping} path="/add/topping" exact />
        <PrivateRoute component={AddProduct} path="/add/product" exact />
        <PrivateRoute component={UserProfile} path="/profile" exact />
      </Switch>
    </Router>
  );
}

export default App;
