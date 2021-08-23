import React from "react";
import logo from "./Vector.png";

const Logo = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px 60px" }}>
      <img
        src={logo}
        alt=""
        style={{ height: "55px", width: "55px", objectFit: "cover" }}
      />
    </div>
  );
};
export default Logo;
