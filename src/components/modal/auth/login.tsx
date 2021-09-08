import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import Input, { Submit } from "../../custom/components/input";
import { gif, icon, image } from "../../assets/assetsRegister";
import AuthContext from "../../../context/context";
import { role } from "../../types/roleEnum";
import { Redirect } from "react-router-dom";
import { LoginProps } from "../../types/loginProps";
import Congrats from "../another/congrats";
import AuthWrapper from "../wrapper";
import { login } from "../../../services/auth";
import { useEffect } from "react";
import InputValidation from "../../custom/components/inputValidation";

const Login: FC<LoginProps> = ({ isOpen, close, switchModal }) => {
  const userInit = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInit);

  const isErrorInit = {
    server: false,
    email: false,
    password: false,
  };

  const messageInit = {
    server: "",
    email: "",
    password: "",
  };

  const clearState = () => {
    setMessageError(messageInit);
    setError(isErrorInit);
  };

  const [error, setError] = useState(isErrorInit);
  const [messageError, setMessageError] = useState(messageInit);
  const { state, dispatch } = useContext(AuthContext);

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

    const mockFetch = async () => {
      try {
        let data = await login(user);
        if (data.role == role.SELLER) {
          dispatch({ type: "ADMIN_LOGIN_SUCCESS", payload: data.images });
        }
        if (data.role == role.BUYYER) {
          dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: data.images });
        }
        setMessageError(messageInit);
        setUser(userInit);
      } catch (error) {
        setError((prev) => ({ ...prev, server: true }));
        setMessageError((prev) => ({
          ...prev,
          server: error.message,
        }));
      }
    };
    mockFetch();
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
        <>
          {state.isLogin ? (
            state.isAdmin ? (
              <>
                <Congrats />
                <Redirect to="/dashboard" />
              </>
            ) : (
              <Congrats />
            )
          ) : (
            <>
              <AuthWrapper style="h-1/2">
                <img
                  src={icon.close}
                  alt="close"
                  className="h-6 w-6 fixed top-56 right-99"
                  onClick={close}
                />
                <h1 className="text-base pl-1 pb-3 font-semibold text-3xl">
                  Login
                </h1>
                <form className="pt-1" onSubmit={submit} autoComplete="off">
                  {messageError.email ? (
                    <InputValidation
                      message={messageError.email}
                      error={error.email}
                    />
                  ) : (
                    <InputValidation
                      message={messageError.server}
                      error={error.server}
                    />
                  )}

                  {console.log("render")}
                  <Input
                    type="email"
                    value={user.email}
                    name="email"
                    nameField="Email"
                    change={handleChange}
                    notValid={error.email}
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
                    change={handleChange}
                    pattern=".{6,}"
                    notValid={error.password}
                  />
                  <Submit
                    value="Login"
                    disabled={error.email || error.password ? true : false}
                  />
                </form>
                <p className="text-center">
                  Already have an account ? Klik{" "}
                  <span className="cursor-pointer" onClick={switchModal}>
                    Here
                  </span>
                </p>{" "}
              </AuthWrapper>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Login;
