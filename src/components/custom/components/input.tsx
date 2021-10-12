import { ChangeEvent, FC } from "react";

interface InputInterface {
  name?: string;
  value?: string | number;
  change?: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  nameField?: string;
  className?: string;
  pattern?: string;
  notValid?: boolean;
  disabled?: boolean;
  display?: string;
}

const Input: FC<InputInterface> = (props) => {
  return (
    <div className={`"    ${props.className || "py-3"} "`}>
      <input
        name={props.name}
        value={props.value}
        onChange={props.change}
        type={props.type}
        disabled={props.disabled}
        placeholder={props.nameField}
        pattern={props.pattern}
        className={`py-3 px-2 border-2 ${
          props.display
        } border-base focus:outline-none focus:ring-2 focus:border-green-600    ${
          props.notValid ? "bg-red-200 " : "bg-cream"
        } rounded-md w-full`}
        required
      />
    </div>
  );
};

export const Submit = ({
  value,
  disabled,
}: {
  value: string;
  disabled?: boolean;
}) => {
  return (
    <div className="p-1 pt-8 ">
      <input
        value={value}
        type="submit"
        disabled={disabled}
        className=" py-3 px-2 w-full border-2 bg-base border-base rounded-md text-white"
      />
    </div>
  );
};
export default Input;
