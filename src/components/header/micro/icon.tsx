import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext, { CartContext } from "../../../context/context";
import { icon, image } from "../../assets/assetsRegister";
import Notification from "../../modal/notification/notif";

const Icon = ({ toogle }: { toogle: () => void }) => {
  const { state } = useContext(AuthContext);
  const { cartState } = useContext(CartContext);
  const [klik, setKlik] = useState(true);
  return (
    <div className="flex items-center">
      {state.isAdmin ? (
        <div className="pr-5 flex items-center ">
          <Link to="/dashboard">
            <img src={image.dasboard} alt="" className="h-9 w-9" />
          </Link>
        </div>
      ) : (
        <>
          <div className="pr-5 flex items-center ">
            <img src={image.notif} alt="" className="h-9 w-9" />
            <Notification isOpen={klik} />
          </div>
          <div className="pr-5 flex items-center ">
            <Link to="/cart">
              {cartState == 0 ? (
                <></>
              ) : (
                <div
                  style={{ background: "#F13F3F" }}
                  className="rounded-full h-5 w-5 text-center  absolute  text-white"
                >
                  {cartState}
                </div>
              )}
              <img src={icon.cart} alt="" className="object-cover h-8 w-8" />
            </Link>
          </div>
        </>
      )}
      <div>
        <img
          src={state.avatar != null ? state.avatar : icon.defaultProfile}
          className="h-10 w-10 rounded-full object-cover"
          onClick={toogle}
        />
      </div>
    </div>
  );
};
export default Icon;
