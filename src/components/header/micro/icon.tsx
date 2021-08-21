import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../context/context";
import cart from "./cart.png";

const Icon = ({ toogle }: { toogle: () => void }) => {
  const { state } = useContext(AuthContext);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Link to="/cart">
          <img src={cart} alt="" style={{ padding: "10px" }} />
        </Link>
      </div>
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
