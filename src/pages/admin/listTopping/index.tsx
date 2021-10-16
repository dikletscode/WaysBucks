import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../config/axios";
import { ProductTypes } from "../../../types/product";
import { ToppingTypes } from "../../../types/transaction";

const ListTopping = () => {
  const [topping, setTopping] = useState<ProductTypes[]>([]);

  const fetch = async () => {
    try {
      let res = await API.get("toppings");
      let topping: ToppingTypes[] = res.data.product;
      if (res.data) {
        setTopping(topping);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" flex  flex-col mt-24   mx md:flex-row h-99 overflow-y-auto justify-items-start  mx-auto pl-6  flex-wrap gap-0 ">
      {topping.map((item) => (
        <div className="p-10 w-96 " key={item.id}>
          <div className="bg-white max-w-xs  flex items-center flex-col shadow-lg h-72  mx-auto border-b-4 border-base rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
            <div className="bg-base w-5/12 text-center  flex h-10  items-center ">
              <p className=" text-white uppercase mx-auto">{item.title}</p>
            </div>
            <div className="mx-auto">
              <img src={item.image} alt="" className="h-44 w-44 object-cover" />

              <div className="flex justify-center px-5 mb-2 text-sm ">
                <Link
                  to={{
                    pathname: "/admin/topping/" + item.id,
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

export default ListTopping;
