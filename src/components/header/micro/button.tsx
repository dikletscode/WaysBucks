import React from "react";

const buttonStyle = {
  padding: "20px",
} as React.CSSProperties;

const Button = ({
  open,
  isOpen,
  value,
  style,
}: {
  open: () => void;
  isOpen: boolean;
  value: string;
  style: {};
}) => {
  return (
    <div style={isOpen ? buttonStyle : { ...buttonStyle, zIndex: 0 }}>
      <button onClick={open} style={style}>
        {value}
      </button>
    </div>
  );
};

export default Button;
