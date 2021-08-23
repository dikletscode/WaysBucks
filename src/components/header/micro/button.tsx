import React from "react";

const buttonStyle = {
  padding: "20px",
} as React.CSSProperties;

const Button = ({
  open,
  value,
  style,
}: {
  open: () => void;

  value: string;
  style: {};
}) => {
  return (
    <div style={buttonStyle}>
      <button onClick={open} style={style}>
        {value}
      </button>
    </div>
  );
};

export default Button;
