import { ChangeEvent, FC } from "react";
import "./input.css";

interface InputInterface {
  name?: string;
  value: string;
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  nameField?: string;
}

const Input: FC<InputInterface> = (props) => {
  return (
    <div className="input-wrapper">
      <input
        name={props.name}
        value={props.value}
        onChange={props.change}
        type={props.type}
        className="input-field"
        placeholder={props.nameField}
      />
    </div>
  );
};

export const Submit = ({ value }: { value: string }) => {
  return (
    <div className="input-wrapper">
      <input
        value={value}
        type="submit"
        className="submit"
        style={{
          backgroundColor: "#bd0707",
          fontSize: "1em",
          padding: "12px",
          width: "100%",
          margin: "0 auto",
          border: "none",
          borderRadius: "6px",
          boxSizing: "border-box",
          color: "white",
          fontWeight: 900,
          lineHeight: "25px",
        }}
      />
    </div>
  );
};
export default Input;
