import { CSSProperties, FC } from "react";
import { useHistory } from "react-router-dom";

import { gif } from "../../assets/assetsRegister";

const SuccessPayment = ({
  open,
  isLoading,
}: {
  open: boolean;
  isLoading: boolean;
}) => {
  let history = useHistory();
  if (open && isLoading == false) {
    setTimeout(() => history.replace("/profile"), 4000);
  }
  return (
    <>
      {open ? (
        <div style={style.container}>
          <>
            {isLoading ? (
              <img src={gif.loading} alt="" />
            ) : (
              <>
                <h1>THANK YOU</h1>
                <img src={gif.success} alt="" />
                <h1>Your Payment was successful</h1>
              </>
            )}
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default SuccessPayment;

const style = {
  container: {
    padding: "45px",
    height: "45%",
    display: "flex",
    width: "30%",
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "green",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    zIndex: 1,
  } as CSSProperties,
};
