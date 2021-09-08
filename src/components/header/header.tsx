import React, { useContext, useState } from "react";
import Logo from "./logo";
import Icon from "./micro/icon";
import AuthContext, { EventContext } from "../../context/context";
import Button from "./micro/button";
import Login from "../modal/auth/login";
import Signup from "../modal/auth/signup";
import DropDown from "./dropdown/dropdown";
import { Link } from "react-router-dom";

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

      <div className="flex justify-between fixed bg-white w-full items-center px-16 py-7">
        <Logo />

        {state.isLogin ? (
          <div>
            <Icon toogle={toogle} />
            <DropDown isOpen={isLogout} close={() => setLogout(false)} />
          </div>
        ) : (
          <div className="flex">
            <Button
              open={() => eventDispatch({ type: "MODAL_LOGIN", payload: true })}
              value="login"
            />
            <Button
              open={() =>
                eventDispatch({ type: "MODAL_SIGNIN", payload: true })
              }
              style="bg-base text-white"
              value="register"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
