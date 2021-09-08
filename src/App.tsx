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
import Dashboard from "./components/pages/dashboard/admin";
import { setAuthToken } from "./config/axios";
import Footer from "./components/header/footer";
import MenuAdmin from "./components/pages/dashboard/Menu";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const loginUser = localStorage.getItem("_user");

  useEffect(() => {
    const data = JSON.parse(loginUser || "{}");
    if (loginUser) {
      setAuthToken(data.token);
      if (role.SELLER === data.user.role) {
        dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: null });
      } else if (role.BUYYER === data.user.role) {
        dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: null });
      }
    } else {
      dispatch({ type: "LOGIN_FAILED", payload: null });
    }
  }, [loginUser, dispatch]);

  if (state === null) {
    return <img src={gif.loading} alt="" />;
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route component={HomePage} path="/" exact />
        <PrivateRoute component={Cart} path="/cart" exact />
        <PrivateRoute component={Detail} path="/product/:id" exact />
        <PrivateRoute
          component={AddTopping}
          path="/add/topping"
          exact
          restricted
        />
        <PrivateRoute
          component={AddProduct}
          path="/add/product"
          exact
          restricted
        />
        <PrivateRoute component={UserProfile} path="/profile" />
        <PrivateRoute component={MenuAdmin} path="/menu" exact />
        <PrivateRoute
          component={Dashboard}
          path="/dashboard"
          exact
          restricted
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
