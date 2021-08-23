import React from "react";
import { image } from "../assets/assetsRegister";
import logo from "./Vector.png";

const Logo = () => {
  return (
    <div style={{ textAlign: "center", padding: "30px 60px" }}>
      <img
        src={image.logo}
        alt=""
        style={{ height: "55px", width: "55px", objectFit: "cover" }}
      />
    </div>
  );
};
export default Logo;
