import React from "react";

const AuthWrapper = ({
  children,
  style = "h-1/2",
}: {
  children: React.ReactNode;
  style?: string;
}) => {
  return (
    <div className="flex fixed z-10  h-screen w-screen  bg-darkTransparent ">
      <div
        className={`bg-white flex flex-col justify-center ${style}   p-7 w-1/3 m-auto`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
