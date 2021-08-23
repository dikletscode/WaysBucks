import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext, { CartContext } from "../../../context/context";
import cart from "./cart.png";

const Icon = ({ toogle }: { toogle: () => void }) => {
  const { state } = useContext(AuthContext);
  const { cartState } = useContext(CartContext);

  return (
    <div style={{ display: "flex" }}>
      {state.isAdmin ? (
        <></>
      ) : (
        <div>
          <Link to="/cart">
            {cartState == 0 ? (
              <></>
            ) : (
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#F13F3F",
                  height: "20px",
                  width: "20px",
                  position: "absolute",
                  right: "145px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {cartState}
              </div>
            )}
            <img src={cart} alt="" style={{ padding: "10px" }} />
          </Link>
        </div>
      )}
      <div>
        <img
          src={state.avatar != null ? state.avatar : ""}
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            padding: "10px 15px",
            objectFit: "cover",
          }}
          onClick={toogle}
        />
      </div>
    </div>
  );
};
export default Icon;
