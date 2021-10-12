import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Input, { Submit } from "../../components/custom/components/input";
import { LoginProps } from "./login";
import Wrapper from "../../components/custom/components/wrapper";

import InputValidation from "../../components/custom/components/inputValidation";
import { API } from "../../config/axios";

const Signup: FC<LoginProps> = ({ isOpen, switchModal }) => {
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
        await API.post("register", user);

        setSuccess("account created successfully");
        setUser(userInit);
      } catch (error: any) {
        setError((prev) => ({ ...prev, server: true }));
        if (error.response && error.response.status == 409) {
          setMessageError((prev) => ({
            ...prev,
            server: "Email has been used",
          }));
        } else {
          setMessageError((prev) => ({
            ...prev,
            server: "an error occured!",
          }));
        }
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
        <Wrapper style="h-3/5">
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
              className="py-1"
            />

            <InputValidation message={messageError.email} error={error.email} />

            <Input
              type="email"
              value={user.email}
              name="email"
              nameField="Email"
              notValid={error.email}
              change={handleChange}
              className="py-1"
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
              className="py-1"
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
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default Signup;
