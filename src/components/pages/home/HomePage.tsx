import React from "react";
import { useLocation } from "react-router-dom";
import { image } from "../../assets/assetsRegister";
import MainPage from "./Main";

import Product from "./product/getProduct";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
  let query = useQuery();

  return (
    <>
      <section className="container w-10/12 p-10 pt-36  mx-auto items-center ">
        <MainPage />
      </section>
    </>
  );
};
export default HomePage;

{
  /* <div style={style.fullPage}>
<div style={style.container}>
  <div style={style.banner}>
    <div style={style.bannerContainer}>
      <div style={style.textBanner}>
        <h1 style={{ paddingLeft: "50px", fontSize: "3em" }}>
          WAYSBUCKS
        </h1>
        <div
          style={{
            fontSize: "1.4em",
            fontFamily: "fantasy"
        <div style={style.bannerContainer}>
      <div style={style.textBanner}>
        <h1 style={{ paddingLeft: "50px", fontSize: "3em" }}>
          WAYSBUCKS
        </h1>   <p>
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
</div> */
}
