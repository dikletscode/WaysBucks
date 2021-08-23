import { ChangeEvent, CSSProperties, FC } from "react";

import "./input.css";

interface InputInterface {
  name?: string;
  value?: string | number;
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  nameField?: string;
  style?: CSSProperties;
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

export const Submit = ({
  value,
  styles,
}: {
  value: string;
  styles?: CSSProperties;
}) => {
  return (
    <div className="input-wrapper" style={styles}>
      <input
        value={value}
        type="submit"
        className="submit"
        style={style.submit}
      />
    </div>
  );
};
export default Input;

const style = {
  submit: {
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
  } as CSSProperties,
};
