import React, { useContext, useEffect, useState } from "react";
import { BestProduct } from "../../../types/product";

const CardWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-2 mb-10 lg:grid-cols-2 xl:grid-cols-4">
        {children}
      </section>
    </>
  );
};
export default CardWrapper;
