import React, { useContext, useEffect, useState } from "react";
import { BestProduct } from "../../../types/product";

const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 mb-10  xl:grid-cols-4 lg:px-10">
        {children}
      </section>
    </>
  );
};
export default CardWrapper;
