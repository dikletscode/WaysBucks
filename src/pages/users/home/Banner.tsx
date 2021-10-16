import { image } from "../../../assets/assetsRegister";
import React from "react";

import Product from "./getProduct";

const Banner = () => {
  return (
    <>
      <div className="bg-dBanner   h-99 flex p-14 justify-between  bg-no-repeat items-center   border-2  ">
        <div className="text-left  w-6/12 text-white ">
          <p className="text-6xl font-sans ">WAYSBUCK</p>
          <p className="pt-6 pb-6">
            Things are changing, but we’re still here for you
          </p>
          <p className=" xs:text-xs">
            We have temporarily closed our in-store cafes, but select grocery
            and drive-thru locations remaining open. Waysbucks Drivers is also
            available
          </p>
          <p className="pt-3">
            Things are changing, but we’re still here for you
          </p>
        </div>
      </div>

      <h3 className="py-5 text-3xl text-base">Let's Order</h3>
      <div className="w-full">
        <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-10 ">
          <Product />
        </div>
      </div>
    </>
  );
};
export default Banner;
