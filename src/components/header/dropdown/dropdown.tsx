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
    <div
      style={{ padding: "20px", display: "flex", cursor: "pointer" }}
      onClick={klik}
    >
      <img src={image} style={{ height: "20px", width: "20px" }} /> {inner}
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
    localStorage.removeItem("_basicInfo");
    dispatch({ type: "LOGIN_FAILED", payload: null });
  };
  console.log(isOpen, "opeen");
  return (
    <>
      <div style={style.container} onMouseLeave={close}>
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
              <Image image={icon.profile} inner="Profile" />
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

// export const DropDownSeller = ({
//   isOpen,
//   close,
// }: {
//   isOpen: boolean;
//   close: () => void;
// }) => {
//   return (
//     <>
//       {isOpen ? (
//         <div style={style.container} onMouseLeave={close}>
//           <div style={style.triangle}></div>
//           <Image image={add} inner="Add Product" />
//           <Image image={addTopping} inner="Add Topping" />
//           <Image image={logout} inner="Logout" klik={logoutAction} />
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

const style = {
  triangle: {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    right: "30px",
    position: "absolute",
    borderBottom: "20px solid white",
    top: "-15px",
    boxShadow: "0px 20px 4px rgba(0, 0, 0, 0), 4px 4px 20px rgba(0, 0, 0, 0)",
  } as CSSProperties,

  container: {
    position: "absolute",
    right: "90px",
    top: "70px",
    width: "170px",
    background: "#FFFFFF",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
  } as CSSProperties,
};
