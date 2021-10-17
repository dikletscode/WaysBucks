import React from "react";
import { useHistory } from "react-router";
import { icon } from "../../assets/assetsRegister";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="absolute z-40 h-screen w-screen bg-white">
      <div className="fixed z-50 flex pt-32 flex-col  items-center mx-auto w-screen h-screen bg-white ">
        <p>Internal Server Error</p>
        <img src={icon.error} className="h-1/2 " />
        <p>Please wait a moment</p>
        <div className="bg-base py-3 px-10 text-white">
          <button onClick={() => history.goBack()}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
