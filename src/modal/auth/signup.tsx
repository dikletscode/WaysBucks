import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Input, Submit, MessageValidation } from "../../components/atoms";
import { LoginProps } from "./login";
import { Wrapper } from "../../components/molecules";
import { API } from "../../config/axios";
import { ReactComponent as Eye } from "../../assets/images/eye.svg";

const Signup: FC<LoginProps> = ({ isOpen, switchModal }) => {
  const userInit = {
    email: "",
    password: "",
    fullname: "",
  };
  const [user, setUser] = useState(userInit);
  const [showPassword, setShowPassword] = useState(false);

  const eyeToggleClick = (e: MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setShowPassword(showPassword ? false : true);
  };

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
        if (error.response) {
          setMessageError((prev) => ({
            ...prev,
            server: error.response.data.message,
          }));
        }
      }
    };
    postData();
  };

  const clearState = () => {
    setMessageError(messageInit);
    setError(isErrorInit);
    setSuccess("");
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
              <MessageValidation
                message={messageError.fullname}
                error={error.fullname}
              />
            ) : (
              <MessageValidation
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

            <MessageValidation
              message={messageError.email}
              error={error.email}
            />

            <Input
              type="email"
              value={user.email}
              name="email"
              nameField="Email"
              notValid={error.email}
              change={handleChange}
              className="py-1"
            />
            <MessageValidation
              message={messageError.password}
              error={error.password}
            />
            <Input
              type={showPassword ? "text" : "password"}
              value={user.password}
              name="password"
              nameField="Password"
              notValid={error.password}
              pattern=".{6,}"
              change={handleChange}
              className="py-1 relative"
            >
              <Eye
                fill={showPassword ? "#BD0707" : "grey"}
                onClick={(e) => eyeToggleClick(e)}
                className="absolute right-3 top-1/3"
              />
            </Input>

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
