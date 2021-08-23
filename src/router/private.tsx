import { ComponentType, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/context";

export type ProtectedRouteProps = {
  path: string;
  exact?: boolean;
  component: ComponentType<any>;
};

const PrivateRoute = ({
  component: Component,
  ...rest
}: ProtectedRouteProps) => {
  // const jsonValue = JSON.parse(localStorage.getItem("_basicInfo") || "{}");
  // const isLogin = jsonValue.token != undefined ? true : false;
  const { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLogin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
export default PrivateRoute;
