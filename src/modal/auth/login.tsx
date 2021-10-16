import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useState,
  useEffect,
} from "react";
import { Input, Submit, MessageValidation } from "../../components/atoms";
import AuthContext from "../../context/context";
import { role } from "../../types/roleEnum";
import { Redirect } from "react-router-dom";
import Congrats from "../alert/congrats";
import { Wrapper } from "../../components/molecules";
import { API } from "../../config/axios";

export interface LoginProps {
  isOpen: boolean;
  close: () => void;
  switchModal: () => void;
}

const Login: FC<LoginProps> = ({ isOpen, switchModal }) => {
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
        let res = await API.post("login", user);
        localStorage.setItem("_user", JSON.stringify(res.data));
        if (res.data.user.role == role.SELLER) {
          dispatch({ type: "ADMIN", payload: res.data.user });
        }
        if (res.data.user.role == role.BUYYER) {
          dispatch({ type: "BUYYER", payload: res.data.user });
        }
        setMessageError(messageInit);
        setUser(userInit);
      } catch (err: any) {
        if (err.response && err.response.status == 401) {
          setError((prev) => ({ ...prev, ["server"]: true }));
          setMessageError((prev) => ({
            ...prev,
            server: "email or password is wrong!",
          }));
        } else {
          setError((prev) => ({ ...prev, ["server"]: true }));
          setMessageError((prev) => ({
            ...prev,
            server: "an error occured!",
          }));
        }
      }
    };
    mockFetch();
  };
  console.log(state);

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
          {state && state.isLogin ? (
            state.isAdmin ? (
              <>
                <Congrats />
                <Redirect to="/menu" />
              </>
            ) : (
              <Congrats />
            )
          ) : (
            <>
              <Wrapper style="h-1/2">
                <h1 className="text-base pl-1 pb-3 font-semibold text-3xl">
                  Login
                </h1>
                <form className="pt-1" onSubmit={submit} autoComplete="off">
                  <MessageValidation
                    message={messageError.server}
                    error={error.server}
                  />

                  <Input
                    type="email"
                    value={user.email}
                    name="email"
                    nameField="Email"
                    change={handleChange}
                    notValid={error.email}
                    className="py-1"
                  />
                  <MessageValidation
                    message={messageError.email}
                    error={error.email}
                  />

                  <Input
                    type="password"
                    value={user.password}
                    name="password"
                    nameField="Password"
                    change={handleChange}
                    pattern=".{6,}"
                    notValid={error.password}
                    className="py-1"
                  />
                  <MessageValidation
                    message={messageError.password}
                    error={error.password}
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
              </Wrapper>
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
