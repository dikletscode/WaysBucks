import { CSSProperties, FC } from "react";
import { useHistory } from "react-router-dom";

import { gif, icon, image } from "../../assets/assetsRegister";

const FailedRequest = ({
  open,
  error,
  close,
  image,
}: {
  open: boolean;
  error: string;
  close: () => void;
  image?: string;
}) => {
  if (open) {
    setTimeout(close, 3000);
  }
  return (
    <>
      {open ? (
        <div style={style.container}>
          <img src={image || icon.warning} alt="" />

          <h1>{error}</h1>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default FailedRequest;

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
    color: "red",
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
