import React, { useContext, useState } from "react";
import Logo from "./header";
import Icon from "./micro/icon";
import AuthContext from "../../context/context";
import Button from "./micro/button";
import Login from "../modal/auth/login";
import Signup from "../modal/auth/signup";
import DropDown from "../pages/home/dropdown/dropdown";

const Header = () => {
  const { state } = useContext(AuthContext);
  const [isOpen, setOpen] = useState<{
    login: boolean;
    signup: boolean;
    logout: boolean;
  }>({
    login: false,
    signup: false,
    logout: false,
  });

  const action = (field: string, become: boolean) => {
    setOpen((prev) => ({ ...prev, [field]: become }));
  };

  const hideButton = () => {
    if (isOpen.login == true || isOpen.signup == true) {
      return true;
    }
    return false;
  };

  const switchModal = (fieldNow: string, fieldTo: string) => {
    action(fieldNow, false);
    action(fieldTo, true);
  };
  const toogle = () => {
    if (isOpen.logout == true) {
      setOpen((prev) => ({ ...prev, ["logout"]: false }));
    } else {
      setOpen((prev) => ({ ...prev, ["logout"]: true }));
    }
  };
  const darkContainer = () => {
    if (isOpen.login == true || isOpen.signup == true) {
      return style.pageDark;
    }
    return {};
  };

  return (
    <>
      <div style={darkContainer()}></div>
      <Login
        isOpen={isOpen.login}
        close={() => action("login", false)}
        switchModal={() => switchModal("login", "signup")}
      />
      <Signup
        isOpen={isOpen.signup}
        close={() => action("signup", false)}
        switchModal={() => switchModal("signup", "login")}
      />
      <div style={style.header}>
        <Logo />
        {state.isLogin ? (
          <div>
            <Icon toogle={toogle} />
            <DropDown
              isOpen={isOpen.logout}
              close={() => action("logout", false)}
            />
          </div>
        ) : (
          <div style={{ display: "flex", paddingRight: "70px" }}>
            <Button
              open={() => action("login", true)}
              isOpen={hideButton()}
              value="login"
              style={{
                ...style.button,
                ["background"]: "white",
                ["color"]: "black",
              }}
            />
            <Button
              open={() => action("signup", true)}
              isOpen={hideButton()}
              value="signup"
              style={style.button}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

const style = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  } as React.CSSProperties,

  pageDark: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
  } as React.CSSProperties,

  button: {
    background: "#BD0707",
    color: "white",
    boxSizing: "border-box",
    borderRadius: "5px",
    border: "2px solid #BD0707",
    padding: "10px",
    width: "90px",
  } as React.CSSProperties,
};
