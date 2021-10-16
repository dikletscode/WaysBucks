import React, { useContext, useEffect, useState } from "react";
import { ProductTypes } from "../../../types/product";
import convert from "../../../utils/convertCurrency";

const Card: React.FC<{
  handleKlik: (id: number, product: ProductTypes) => void;
  item: ProductTypes;
  key: number;
}> = ({ handleKlik, item, key }) => {
  return (
    <article
      key={key}
      onClick={() => handleKlik(item.id, item)}
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
};
export default Card;
