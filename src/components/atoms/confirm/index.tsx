import React from "react";

const Confirm = ({
  inner,
  custom,
  klik,
}: {
  inner: string;
  custom: string;
  klik?: () => void;
}) => {
  return (
    <button onClick={klik} className={`h-7 w-20 ${custom} text-white `}>
      {inner}
    </button>
  );
};
export default Confirm;
