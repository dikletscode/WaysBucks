import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Input, { Submit } from "../../custom/components/input";
import { icon } from "../../assets/assetsRegister";
import { LoginProps } from "../../types/loginProps";
import AuthWrapper from "../wrapper";
import { RegisInput, register } from "../../../services/auth";
import { EventContext } from "../../../context/context";
import InputValidation from "../../custom/components/inputValidation";

const Signup: FC<LoginProps> = ({ isOpen, close, switchModal }) => {
  const userInit = {
    email: "",
    password: "",
    fullname: "",
  };
  const [user, setUser] = useState(userInit);

  const isErrorInit = {
    fullname: false,
    server: false,
    email: false,
    password: false,
  };

  const messageInit = {
    fullname: "",
    server: "",
    email: "",
    password: "",
  };

  const clearState = () => {
    setMessageError(messageInit);
    setError(isErrorInit);
    setSuccess("");
  };

  const [error, setError] = useState(isErrorInit);
  const [messageError, setMessageError] = useState(messageInit);
  const [success, setSuccess] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.validity.valid) {
      setError((prev) => ({ ...prev, [e.target.name]: true }));
      setMessageError((prev) => ({
        ...prev,
        [e.target.name]: "Please enter a valid " + e.target.name,
      }));
    } else {
      setError((prev) => ({ ...prev, [e.target.name]: false }));
      setMessageError((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }

    setUser((prevInput: typeof user) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length == 0) {
      clearState();
    }
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      try {
        await register(user);

        setSuccess("account created successfully");
        setUser(userInit);
      } catch (error) {
        console.log(error, "err");
        setError((prev) => ({ ...prev, server: true }));
        setMessageError((prev) => ({
          ...prev,
          server: error,
        }));
      }
    };
    postData();
  };
  useEffect(() => {
    if (!isOpen) {
      clearState();
      setUser(userInit);
    }
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <AuthWrapper style="h-3/5">
          <img
            src={icon.close}
            alt="close"
            className="h-6 w-6 fixed top-48 right-99"
            onClick={close}
          />

          <h1 className="text-base pl-5 font-semibold text-3xl">Register</h1>
          <form action="" className="pt-5" onSubmit={submit}>
            {messageError.fullname ? (
              <InputValidation
                message={messageError.fullname}
                error={error.fullname}
              />
            ) : (
              <InputValidation
                message={messageError.server}
                error={error.server}
              />
            )}
            {success}

            <Input
              type="text"
              value={user.fullname}
              name="fullname"
              nameField="Full Name"
              notValid={error.fullname}
              change={handleChange}
            />

            <InputValidation message={messageError.email} error={error.email} />

            <Input
              type="email"
              value={user.email}
              name="email"
              nameField="Email"
              notValid={error.email}
              change={handleChange}
            />
            <InputValidation
              message={messageError.password}
              error={error.password}
            />
            <Input
              type="password"
              value={user.password}
              name="password"
              nameField="Password"
              notValid={error.password}
              pattern=".{6,}"
              change={handleChange}
            />

            <Submit
              value="Register"
              disabled={error.email || error.password ? true : false}
            />
          </form>
          <p className="text-center">
            Already have an account ? Klik{" "}
            <span className="cursor-pointer" onClick={switchModal}>
              Here
            </span>
          </p>
        </AuthWrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default Signup;
