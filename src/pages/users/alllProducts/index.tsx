import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../../context/context";
import { ProductTypes } from "../../../types/product";
import { API } from "../../../config/axios";
import { Card, CardWrapper } from "../../../components";

const AllProducts = () => {
  const { state } = useContext(AuthContext);
  const { eventDispatch } = useContext(EventContext);
  const [listProduct, setProduct] = useState<ProductTypes[]>([]);

  const history = useHistory();

  const fetchProduct = async () => {
    try {
      let res = await API.get("products");
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const clickProduct = (id: number, data: object) => {
    console.log(id);
    if (state.isLogin) {
      history.push({ pathname: "/product/" + id, state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  return (
    <div className="pt-28 px-8">
      <CardWrapper>
        {listProduct.map((item, index) => {
          return (
            <Card
              key={index}
              item={item}
              handleKlik={() => clickProduct(item.id, item)}
            />
          );
        })}
      </CardWrapper>
    </div>
  );
};
export default AllProducts;
