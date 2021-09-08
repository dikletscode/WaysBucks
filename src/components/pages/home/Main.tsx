import { image } from "../../assets/assetsRegister";
import React from "react";

import Product from "./product/getProduct";

const MainPage = () => {
  return (
    <>
      <div className="bg-banner w-full flex bg-cover justify-between  bg-no-repeat items-center  border-2  ">
        <div className="text-left md:text-left p-16 w-6/12 text-white ">
          <p className="text-6xl  ">WAYSBUCK</p>
          <p className="pt-6 pb-6">
            Things are changing, but we’re still here for you
          </p>
          <p>
            We have temporarily closed our in-store cafes, but select grocery
            and drive-thru locations remaining open. Waysbucks Drivers is also
            available
          </p>
        </div>
        <div>
          <img src={image.eatingPicture} className="h-64" />
        </div>
      </div>

      <h3 className="py-5 text-3xl">Let's Order</h3>
      <div className="w-full">
        <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-10 ">
          <Product />
        </div>
      </div>
    </>
  );
};
export default MainPage;
