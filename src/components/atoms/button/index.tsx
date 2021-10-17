import React from "react";

const Button = ({
  open,
  value,
  style = "bg-white text-base  ",
}: {
  open: () => void;
  style?: string;
  value: string;
}) => {
  return (
    <div className="  w-24 lg:w-32 h-14  flex items-center justify-center">
      <div
        className={`w-28 ${style} border-2 border-base text-white h-9 flex items-center justify-center`}
      >
        <button onClick={open} className="p-5  ">
          {value}
        </button>
      </div>
    </div>
  );
};

export default Button;
