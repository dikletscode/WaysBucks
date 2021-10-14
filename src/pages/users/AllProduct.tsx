import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext, { EventContext } from "../../context/context";
import { ProductTypes, BestProduct } from "../../types/product";
import convert from "../../function/convertCurrency";
import { API } from "../../config/axios";

const AllProducts = () => {
  const { state } = useContext(AuthContext);
  const { eventState, eventDispatch } = useContext(EventContext);
  const [listProduct, setProduct] = useState<ProductTypes[]>([]);
  const [bestProduct, setBestProduct] = useState<number[]>([]);
  const history = useHistory();

  const coubt = async () => {
    try {
      let res = await API.get("products");
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(bestProduct, listProduct);

  useEffect(() => {
    coubt();
  }, [bestProduct]);

  const clickProduct = (id: number, data: object) => {
    console.log(id);
    if (state.isLogin) {
      history.push({ pathname: "/product/" + id, state: data });
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  return (
    <div className="pt-28 mx-24">
      <section className="mt-6  grid mb-9 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
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
    </div>
  );
};
export default AllProducts;
