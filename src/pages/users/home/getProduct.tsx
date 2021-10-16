import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../../context/context";
import { BestProduct, ProductTypes } from "../../../types/product";
import convert from "../../../utils/convertCurrency";
import { API } from "../../../config/axios";
import { Card, CardWrapper } from "../../../components";

const ProductCard = () => {
  const { state } = useContext(AuthContext);
  const { eventDispatch } = useContext(EventContext);
  const [listProduct, setProduct] = useState<BestProduct[]>([]);
  const [bestProduct, setBestProduct] = useState<number[]>([]);
  const history = useHistory();

  const fetch = async () => {
    try {
      let transact = await API.get("/count");
      console.log();
      let arr: any[] = [];
      if (transact.data) {
        transact.data.product.map((item: any) => {
          arr.push(item.productId);
        });
      }
      setBestProduct(arr);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProduct = async () => {
    try {
      let res = await API.get("products");
      setProduct(
        res.data.product.filter((item: BestProduct) =>
          bestProduct.includes(item.id)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
    return () => setBestProduct([]);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [bestProduct]);

  const clickProduct = (id: number, data: object) => {
    if (state.isLogin) {
      history.push({ pathname: "/product/" + id, state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };
  const toAllProduct = () => {
    if (state.isLogin) {
      history.push({ pathname: "/allproducts" });
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  return (
    <>
      <CardWrapper>
        {listProduct.map((item, index) => {
          return (
            <Card
              key={item.id}
              handleKlik={() => clickProduct(item.id, item)}
              item={item}
            />
          );
        })}
      </CardWrapper>

      <div className="text-center">
        <button
          onClick={toAllProduct}
          className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-red-800 border-red-900 text-white"
        >
          see all products
        </button>
      </div>
    </>
  );
};
export default ProductCard;
