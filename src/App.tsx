import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { gif } from "./assets/assetsRegister";
import Header from "./components/header/header";
import Cart from "./pages/users/Cart";
import Detail from "./pages/users/detail/detail";
import HomePage from "./pages/users/home/HomePage";
import AddProduct from "./pages/admin/addProduct";
import UserProfile from "./pages/users/profile/user";
import AddTopping from "./pages/admin/addTopping";
import { role } from "./components/types/roleEnum";
import AuthContext from "./context/context";
import PrivateRoute from "./router/private";
import Dashboard from "./pages/admin/admin";
import { setAuthToken } from "./config/axios";
import Footer from "./components/header/footer";
import MenuAdmin from "./pages/admin/Menu";
import ListProduct from "./pages/admin/ListProduct";
import EditProduct from "./pages/admin/editProduct";
import ListTopping from "./pages/admin/ListTopping";
import EditTopping from "./pages/admin/EditTopping";
import GetAllUser from "./pages/admin/ListUsers";
import ProfileWithErrorBoundary from "./pages/users/profile/user";
import AllProducts from "./pages/users/AllProduct";

function App() {
  const { state, dispatch } = useContext(AuthContext);

  const loginUser = localStorage.getItem("_user");

  useEffect(() => {
    if (loginUser) {
      const data = JSON.parse(loginUser);
      setAuthToken(data.token);
      console.log(data, "dataaaa");
      if (role.SELLER === data.user.role) {
        dispatch({
          type: "ADMIN_LOGIN_SUCCESS",
          payload: data?.user,
        });
      } else if (role.BUYYER === data.user.role) {
        dispatch({
          type: "BUYYER_LOGIN_SUCCESS",
          payload: data?.user,
        });
      }
    } else {
      setAuthToken(null);
      dispatch({ type: "LOGIN_FAILED", payload: null });
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
          component={ListProduct}
          path="/listproduct"
          exact
          restricted
        />
        <PrivateRoute
          component={ListTopping}
          path="/listtopping"
          exact
          restricted
        />
        <PrivateRoute
          component={EditProduct}
          path="/admin/product/:id"
          exact
          restricted
        />
        <PrivateRoute component={GetAllUser} path="/chat" exact />
        {/* <PrivateRoute
          component={GetAllUser}
          path="/admin/users"
          exact
          restricted
        /> */}
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
      {/* <Footer /> */}
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
