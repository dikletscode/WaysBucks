import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../../context/context";
import { BestProduct, ProductTypes } from "../../../types/product";
import convert from "../../../function/convertCurrency";
import { API } from "../../../config/axios";

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
  const coubt = async () => {
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
    coubt();
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
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 mb-10 lg:grid-cols-2 xl:grid-cols-4">
        {listProduct.map((item, index) => {
          return (
            <article
              key={index}
              onClick={() => clickProduct(item.id, item)}
              className="bg-pink group relative rounded-lg o hover:shadow-sm transition duration-500 transform hover:scale-105 cursor-pointer"
            >
              <div className="relative w-full mx-auto rounded-lg h-72 md:h-56 lg:h-80">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full rounded-lg   object-cover"
                />
              </div>
              <div className="p-3">
                <div>
                  <p className="text-base font-semibold">{item.title}</p>
                  <p style={{ color: "#BD0707", fontSize: "0.9em" }}>
                    Rp.{convert(item.price.toString())}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

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
