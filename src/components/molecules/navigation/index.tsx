import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext, { CartContext } from "../../../context/context";
import { icon, image } from "../../../assets/assetsRegister";
import { API } from "../../../config/axios";
import { ProductTopping } from "../../../pages/users/detailProduct";

const Navigation = ({
  toogle,
  close,
  open,
}: {
  toogle: () => void;
  close: () => void;
  open: () => void;
}) => {
  const { state } = useContext(AuthContext);
  const { increment, cartState } = useContext(CartContext);

  useEffect(() => {
    const getProductCart = async () => {
      try {
        let res = await API.get("transaction");
        const data: ProductTopping[] = res.data.product;
        if (data) {
          const qty = data.reduce((item, item2) => item + item2.qty, 0);
          increment(qty);
        }
      } catch (error) {
        console.log(error, "909090909");
      }
    };
    getProductCart();
  }, []);

  return (
    <div className="flex items-center">
      {state.isAdmin ? (
        <div className="pr-5 flex items-center " onMouseLeave={close}>
          <Link to="/menu">
            <img src={image.dasboard} alt="" className="h-9 w-9" />
          </Link>
        </div>
      ) : (
        <>
          <div className="pr-5 flex items-center ">
            <Link to="/cart">
              {cartState == 0 ? (
                <></>
              ) : (
                <div
                  style={{
                    background: "#F13F3F",
                    right: "7.3rem",
                    textAlign: "center",
                  }}
                  className="rounded-full flex items-center h-5 w-5 text-center  absolute  text-white"
                >
                  <p className="mx-auto text-sm font-semibold">{cartState}</p>
                </div>
              )}
              <img src={icon.cart} alt="" className="object-cover h-8 w-8" />
            </Link>
          </div>
        </>
      )}
      <div>
        <img
          src={
            state.data?.profile?.image != null
              ? state.data?.profile?.image
              : icon.defaultProfile
          }
          className="h-10 w-10 rounded-full object-cover"
          onClick={toogle}
          onMouseEnter={open}
        />
      </div>
    </div>
  );
};
export default Navigation;
