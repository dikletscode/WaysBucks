import React, { useContext, useState } from "react";
import Logo from "./logo";
import Icon from "./micro/icon";
import AuthContext, { EventContext } from "../../context/context";
import Button from "./micro/button";
import Login from "../modal/auth/login";
import Signup from "../modal/auth/signup";
import DropDown from "./dropdown/dropdown";

const Header = () => {
  const { state } = useContext(AuthContext);
  const { eventState, eventDispatch } = useContext(EventContext);
  const [isLogout, setLogout] = useState(false);

  const switchModal = (fieldNow: string, fieldTo: string) => {
    eventDispatch({ type: fieldNow, payload: false });
    eventDispatch({ type: fieldTo, payload: true });
  };
  const toogle = () => {
    if (isLogout) {
      setLogout(false);
    } else {
      setLogout(true);
    }
  };

  return (
    <>
      <Login
        isOpen={eventState.login && !eventState.signin}
        close={() => eventDispatch({ type: "MODAL_LOGIN", payload: false })}
        switchModal={() => switchModal("MODAL_LOGIN", "MODAL_SIGNIN")}
      />

      <Signup
        isOpen={eventState.signin && !eventState.login}
        close={() => eventDispatch({ type: "MODAL_SIGNIN", payload: false })}
        switchModal={() => switchModal("MODAL_SIGNIN", "MODAL_LOGIN")}
      />

      <div style={style.header}>
        <Logo />
        {state.isLogin ? (
          <div style={{ display: "flex", paddingRight: "70px" }}>
            <Icon toogle={toogle} />
            <DropDown isOpen={isLogout} close={() => setLogout(false)} />
          </div>
        ) : (
          <div style={{ display: "flex", paddingRight: "70px" }}>
            <Button
              open={() => eventDispatch({ type: "MODAL_LOGIN", payload: true })}
              value="login"
              style={{
                ...style.button,
                ["background"]: "white",
                ["color"]: "black",
              }}
            />
            <Button
              open={() =>
                eventDispatch({ type: "MODAL_SIGNIN", payload: true })
              }
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
