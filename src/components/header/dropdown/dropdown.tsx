import React, { CSSProperties, useContext, useState } from "react";
import { icon } from "../../assets/assetsRegister";

import AuthContext from "../../../context/context";
import { Link } from "react-router-dom";

const Image = ({
  image,
  inner,
  klik,
}: {
  image: string;
  inner: string;
  klik?: () => void;
}) => {
  return (
    <div className="flex items-center p-4 cursor-pointer" onClick={klik}>
      <img src={image} className="h-5" /> <p className="pl-3">{inner}</p>
    </div>
  );
};

const DropDown = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const { state, dispatch } = useContext(AuthContext);

  const logoutAction = () => {
    close();
    localStorage.removeItem("_user");
    dispatch({ type: "LOGIN_FAILED", payload: null });
  };
  console.log(state);
  return (
    <>
      <div
        className="absolute bg-white shadow-main w-40 right-16 "
        onMouseLeave={close}
      >
        {state.isAdmin ? (
          isOpen ? (
            <>
              <div style={style.triangle}></div>
              <Link to="/add/product">
                <Image image={icon.addProduct} inner="Add Product" />
              </Link>
              <Link to="/add/topping">
                <Image image={icon.topping} inner="Add Topping" />
              </Link>

              <Image image={icon.logout} inner="Logout" klik={logoutAction} />
            </>
          ) : (
            <></>
          )
        ) : isOpen ? (
          <>
            <div style={style.triangle}></div>
            <Link to="/profile">
              <Image
                image={state.avatar ? state.avatar : icon.profile}
                inner="Profile"
              />
            </Link>
            <Image image={icon.logout} inner="Logout" klik={logoutAction} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default DropDown;

const style = {
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    right: "6px",
    position: "absolute",
    borderBottom: "20px solid white",
    top: "-15px",
    boxShadow: "0px 20px 4px rgba(0, 0, 0, 0), 4px 4px 20px rgba(0, 0, 0, 0)",
  } as CSSProperties,
};
