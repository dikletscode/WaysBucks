import React, { useContext } from "react";
import { EventContext } from "../context/context";

const Wrapper = ({
  children,
  style = "h-1/2",
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  const { eventDispatch } = useContext(EventContext);
  return (
    <div
      className={`min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-40 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${style}`}
      id="modal-id"
    >
      <div
        className="absolute bg-black opacity-60 inset-0 z-0"
        onClick={() => eventDispatch({ type: "CLOSE_MODAL", payload: false })}
      ></div>
      <div className="w-full  max-w-sm p-10 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        {children}
      </div>
    </div>
    // <div className="flex fixed z-20  h-screen w-screen  bg-darkTransparent ">
    //   <div
    //     className={`bg-white flex flex-col justify-center ${style}   p-7 w-1/3 m-auto`}
    //   >
    //     {children}
    //   </div>
    // </div>
  );
};

export default Wrapper;
