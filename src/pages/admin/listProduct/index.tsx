import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../config/axios";
import { ProductTypes } from "../../../types/product";

const ListProduct = () => {
  const [product, setProduct] = useState<ProductTypes[]>([]);

  const fetch = async () => {
    try {
      let res = await API.get("products");
      if (res.data) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" flex h-full  flex-col mt-5 md:flex-row  overflow-y-auto   o pl-6  flex-wrap  ">
      {product.map((item) => (
        <div className="p-10 w-80  " key={item.id}>
          <div className="bg-white max-w-xs  flex items-center flex-col shadow-lg h-72  mx-auto border-b-4 border-base rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
            <div className="bg-base w-5/12 text-center  flex h-10  items-center ">
              <p className=" text-white uppercase mx-auto">{item.title}</p>
            </div>
            <div className="mx-auto">
              <img src={item.image} alt="" className="h-44 w-44 object-cover" />

              <div className="flex justify-center px-5 mb-2 text-sm ">
                <Link
                  to={{
                    pathname: "/admin/product/" + item.id,
                    state: item,
                  }}
                >
                  <button
                    type="button"
                    className="border border-base text-base
                     00 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                  >
                    Edit Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
