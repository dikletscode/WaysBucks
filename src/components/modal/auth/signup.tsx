import { ChangeEvent, FC, useState } from "react";
import Input, { Submit } from "../../custom/components/input";
import { style } from "./form.style";
import { icon } from "../../assets/assetsRegister";
import { LoginProps } from "../../types/loginProps";

const Signup: FC<LoginProps> = ({ isOpen, close, switchModal }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevInput: typeof user) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {isOpen ? (
        <div style={style.fitScreen}>
          <div style={style.container}>
            <img
              src={icon.close}
              alt="close"
              style={style.close}
              onClick={close}
            />
            <h1 style={style.title}>Signup</h1>
            <form action="" style={style.formInput}>
              <Input
                type="email"
                value={user.email}
                name="email"
                nameField="Email"
                change={handleChange}
              />
              <Input
                type="password"
                value={user.password}
                name="password"
                nameField="Password"
                change={handleChange}
              />
              <Input
                type="text"
                value={user.fullName}
                name="fullName"
                nameField="Full Name"
                change={handleChange}
              />
              <Submit value="Signin" />
            </form>
            <p>
              Already have an account ? Klik{" "}
              <span style={{ cursor: "pointer" }} onClick={switchModal}>
                Here
              </span>
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Signup;
