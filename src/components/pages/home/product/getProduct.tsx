import React, { useEffect, useState } from "react";

import { image } from "../../../assets/assetsRegister";

const Product = () => {
  const [isKlik, setKlik] = useState(false);
  const [listProduct, setProduct] = useState([]);
  const toogle = () => {
    if (isKlik == true) {
      setKlik(false);
    } else {
      setKlik(true);
    }
  };

  return (
    <>
      <div style={style.product}>
        <div style={{ backgroundColor: "#F7DADA" }} onClick={() => toogle()}>
          <img
            src={image.product}
            alt=""
            style={
              isKlik
                ? { ...style.productImage, ["opacity"]: 0.5 }
                : style.productImage
            }
          />
          <div style={style.desc}>
            <div style={{ padding: "0 0 6px 6px" }}>
              <p style={{ color: "#BD0707", fontSize: "1em" }}>
                Coffee Grean Tea
              </p>
              <p style={{ color: "#BD0707", fontSize: "0.9em" }}>Rp.25.000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;

const style = {
  product: {
    height: "300px",
    width: "190px",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    lineHeight: "4px",

    padding: "0 50px 40px 0",
  } as React.CSSProperties,
  productImage: {
    width: "190px",
    height: "250px",
    borderRadius: "10px 10px 0 0",
  } as React.CSSProperties,
  desc: {
    width: "100%",
    height: "20%",
    borderRadius: "0 0 10px 10px",
  } as React.CSSProperties,
};
