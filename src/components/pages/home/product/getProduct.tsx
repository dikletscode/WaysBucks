import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../../../context/context";

import { image } from "../../../assets/assetsRegister";
import Login from "../../../modal/auth/login";
import { ProductTypes } from "../../../types/interface";

const Product = () => {
  const [isKlik, setKlik] = useState(false);
  const { state } = useContext(AuthContext);
  const { eventState, eventDispatch } = useContext(EventContext);
  const [listProduct, setProduct] = useState<ProductTypes[]>([]);
  const history = useHistory();
  const [img, setImg] = useState<any>();

  let productList = localStorage.getItem("_product");
  useEffect(() => {
    if (productList) {
      setProduct(JSON.parse(productList));
    }
  }, [productList, listProduct.length]);

  const close = () => {
    eventDispatch({ type: "MODAL_LOGIN", payload: false });
  };
  const switchModal = (field: string, to: string) => {
    eventDispatch({ type: field, payload: false });
    eventDispatch({ type: to, payload: true });
  };
  const clickProduct = (id: string, data: object) => {
    if (state.isLogin) {
      history.push({ pathname: "/product/" + id, state: data });
      setKlik(true);
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  if (!listProduct.length) {
    return <></>;
  } else {
    return (
      <>
        {listProduct.map((item) => {
          return (
            <>
              <Login
                isOpen={eventState.klik}
                close={close}
                switchModal={() => switchModal("MODAL_SIGNIN", "MODAL_LOGIN")}
              />
              <div
                style={style.product}
                key={item.id}
                onClick={() => clickProduct(item.id, item)}
              >
                <div style={{ backgroundColor: "#F7DADA" }}>
                  <img src={item.image} alt="" style={style.productImage} />
                  <div style={style.desc}>
                    <div style={{ padding: "0 0 6px 6px" }}>
                      <p style={{ color: "#BD0707", fontSize: "1em" }}>
                        {item.title}
                      </p>
                      <p style={{ color: "#BD0707", fontSize: "0.9em" }}>
                        Rp.{item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  }
};
export default Product;

const style = {
  product: {
    height: "300px",
    width: "200px",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    lineHeight: "4px",
    padding: "18px 40px 40px 40px",
  } as React.CSSProperties,
  productImage: {
    width: "220px",
    height: "270px",
    borderRadius: "10px 10px 0 0",
    objectFit: "cover",
  } as React.CSSProperties,
  desc: {
    width: "100%",
    height: "20%",
    borderRadius: "0 0 10px 10px",
  } as React.CSSProperties,
};
