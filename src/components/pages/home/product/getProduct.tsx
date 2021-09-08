import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../../../context/context";
import { getProduct, Product } from "../../../../services/product";
import convert from "../../../function/convertCurrency";

import Login from "../../../modal/auth/login";

const ProductCard = () => {
  const { state } = useContext(AuthContext);
  const { eventState, eventDispatch } = useContext(EventContext);
  const [listProduct, setProduct] = useState<Product[]>([]);
  const history = useHistory();

  const fetch = async () => {
    try {
      let data = await getProduct();
      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const close = () => {
    eventDispatch({ type: "MODAL_LOGIN", payload: false });
  };
  const switchModal = (field: string, to: string) => {
    eventDispatch({ type: field, payload: false });
    eventDispatch({ type: to, payload: true });
  };
  const clickProduct = (id: number, data: object) => {
    console.log(id);
    if (state.isLogin) {
      history.push({ pathname: "/product/" + id, state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  return (
    <>
      {listProduct.map((item) => {
        return (
          <div key={item.id}>
            <Login
              isOpen={eventState.klik}
              close={close}
              switchModal={() => switchModal("MODAL_SIGNIN", "MODAL_LOGIN")}
            />

            <div
              className=" bg-pink p-0"
              key={item.title}
              onClick={() => clickProduct(item.id, item)}
            >
              <img src={item.image} alt="" className="h-72 w-60 object-cover" />
              <div className="p-3">
                <div>
                  <p style={{ color: "#BD0707", fontSize: "1em" }}>
                    {item.title}
                  </p>
                  <p style={{ color: "#BD0707", fontSize: "0.9em" }}>
                    Rp.{convert(item.price.toString())}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ProductCard;
