import React, { useContext, useState } from "react";
import { image } from "../../assets/assetsRegister";
import style from "./inline";
import Product from "./product/getProduct";

import AuthContext from "../../../context/context";

const HomePage = () => {
  return (
    <>
      <div style={style.fullPage}>
        <div style={style.container}>
          <div style={style.banner}>
            <div style={style.bannerContainer}>
              <div style={style.textBanner}>
                <h1 style={{ paddingLeft: "50px", fontSize: "3em" }}>
                  WAYSBUCKS
                </h1>
                <div
                  style={{
                    fontSize: "1.4vw",
                    fontFamily: " 'Klee One', cursive",
                    fontStyle: "normal",
                    fontWeight: 300,
                    lineHeight: "20px",
                  }}
                >
                  <p>Things are changing,but we're still here for you</p>
                  <p>
                    Things are changing, but we're still here for you We have
                    temporarily closed our in-store cafes, but select grocery
                    and drive-thru locations remaining open. Waysbucks Drivers
                    is also available
                  </p>
                </div>
              </div>
              <div style={style.imageBanner}>
                <img
                  src={image.eatingPicture}
                  alt=""
                  style={{ objectFit: "cover", height: "80%" }}
                />
              </div>
            </div>
          </div>
          <p style={style.order}>Let's Order</p>
          <div style={style.productContainer}>
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
