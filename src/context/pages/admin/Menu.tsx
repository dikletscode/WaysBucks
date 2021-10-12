import React from "react";
import Dashboard from "../../../pages/admin/admin";

import { Link } from "react-router-dom";

const MenuAdmin = () => {
  return (
    <div className=" flex  flex-col pt-36  md:flex-row justify-center w-11/12 mx-auto  flex-wrap gap-3  ">
      <div className="p-10 w-96 ">
        <div className="bg-white max-w-xs shadow-lg h-64   mx-auto border-b-4 border-red-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-red-500  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              1
            </h1>
            <p className="ml-4 text-white uppercase">Edit product here</p>
          </div>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            List Product
          </p>
          <Link to="/listproduct">
            <div className="flex justify-center px-5 mb-2 text-sm ">
              <button
                type="button"
                className="border border-red-500 text-red-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Open
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="p-10 w-96">
        <div className="bg-white max-w-xs shadow-lg h-64   mx-auto border-b-4 border-indigo-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-indigo-500  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              2
            </h1>
            <p className="ml-4 text-white uppercase">
              check attachment and confirm payment
            </p>
          </div>

          <p className="py-6 px-6 text-lg tracking-wide text-center">
            List Transaction
          </p>

          <Link to="/dashboard">
            <div className="flex justify-center px-5 mb-2 text-sm ">
              <button
                type="button"
                className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Open
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="p-10 w-96">
        <div className="bg-white max-w-xs shadow-lg h-64   mx-auto border-b-4 border-yellow-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-yellow-500  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              3
            </h1>
            <p className="ml-4 text-white uppercase">Edit Topping</p>
          </div>

          <p className="py-6 px-6 text-lg tracking-wide text-center">
            List Toppings
          </p>
          <Link to="/listtopping">
            <div className="flex justify-center px-5 mb-2 text-sm ">
              <button
                type="button"
                className="border border-yellow-500 text-yellow-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
              >
                Open
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="p-10 w-96">
        <div className="bg-white max-w-xs shadow-lg h-64   mx-auto border-b-4 border-purple-500 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-purple-500  flex h-20  items-center">
            <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
              3
            </h1>
            <p className="ml-4 text-white uppercase">view all users</p>
          </div>

          <p className="py-6 px-6 text-lg tracking-wide text-center">
            List Users
          </p>
          <Link to="/admin/users">
            <div className="flex justify-center px-5 mb-2 text-sm ">
              <button
                type="button"
                className="border border-purple-500 text-purple-500 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-pink-600 focus:outline-none focus:shadow-outline"
              >
                Open
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MenuAdmin;
