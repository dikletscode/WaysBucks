import { ComponentType, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../context/context";

export type ProtectedRouteProps = {
  path: string;
  exact?: boolean;
  component: ComponentType<any>;
  restricted?: boolean;
};

const PrivateRoute = ({
  component: Component,
  restricted,
  ...rest
}: ProtectedRouteProps) => {
  const { state } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isAdmin && restricted ? (
          <Component {...props} />
        ) : state.isLogin && !restricted ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default PrivateRoute;
