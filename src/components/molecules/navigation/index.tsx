import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext, { CartContext } from "../../../context/context";
import { icon, image } from "../../../assets/assetsRegister";
import { API } from "../../../config/axios";
import { ProductTopping } from "../../../types/product";

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
          increment(data.length);
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
        <div className="w-10 h-10 relative mr-4 flex items-center ">
          {cartState == 0 ? (
            <></>
          ) : (
            <div className="rounded-full top-0  right-0 bg-red-500 flex items-center h-5 w-5 text-center  absolute  text-white">
              <p className="mx-auto text-sm font-semibold">{cartState}</p>
            </div>
          )}
          <Link to="/cart">
            <img src={icon.cart} alt="" className=" h-10  w-10 object-cover " />
          </Link>
        </div>
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
