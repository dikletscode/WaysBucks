import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { gif } from "./assets/assetsRegister";
import { Header } from "./components";

import {
  AddProduct,
  AddTopping,
  Dashboard,
  EditProduct,
  EditTopping,
  MenuAdmin,
  Chat,
  AllProducts,
  HomePage,
  ProfileWithErrorBoundary,
  Cart,
  Detail,
} from "./pages";
import { role } from "./types/roleEnum";
import AuthContext from "./context/context";
import PrivateRoute from "./router/private";
import { API, setAuthToken } from "./config/axios";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      let res = await API.get("user");
      let data = res.data.users;

      if (role.SELLER === data.role) {
        dispatch({
          type: "ADMIN",
          payload: data,
        });
      } else if (role.BUYYER === data.role) {
        dispatch({
          type: "BUYYER",
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = localStorage.getItem("_user");

  useEffect(() => {
    if (loginUser) {
      const data = JSON.parse(loginUser);
      setAuthToken(data.token);
      getProfile();
    } else {
      setAuthToken(null);
      dispatch({ type: "INVALID_USER", payload: null });
    }
  }, [loginUser]);

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
        <PrivateRoute component={AllProducts} path="/allproducts" exact />
        <PrivateRoute
          component={AddTopping}
          path="/admin/topping"
          exact
          restricted
        />

        <PrivateRoute
          component={EditProduct}
          path="/admin/product/:id"
          exact
          restricted
        />
        <PrivateRoute component={Chat} path="/chat" exact />

        <PrivateRoute
          component={EditTopping}
          path="/admin/topping/:id"
          exact
          restricted
        />
        <PrivateRoute
          component={AddProduct}
          path="/admin/product"
          exact
          restricted
        />

        <PrivateRoute component={ProfileWithErrorBoundary} path="/profile" />
        <PrivateRoute component={MenuAdmin} path="/menu" exact restricted />
        <PrivateRoute
          component={Dashboard}
          path="/dashboard"
          exact
          restricted
        />
      </Switch>
    </Router>
  );
}

export default App;

const OurFallbackComponent = ({ error }: { error: any }) => {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
    </div>
  );
};
