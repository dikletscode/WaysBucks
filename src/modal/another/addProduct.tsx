import { CSSProperties, FC } from "react";
import { useHistory } from "react-router-dom";

import { gif } from "../../assets/assetsRegister";

const SuccessCreate = ({
  open,
  isLoading,
  close,
  inner,
}: {
  open: boolean;
  isLoading: boolean;
  close: () => void;
  inner?: string;
}) => {
  setTimeout(() => {
    if (open && !isLoading) {
      close();
    }
  }, 3000);

  return (
    <>
      {open ? (
        <div style={style.container}>
          <>
            {isLoading ? (
              <img src={gif.loading} alt="" />
            ) : (
              <>
                <img src={gif.success} alt="" />
                <h1>{"Product added successfully" || inner} </h1>
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
export default SuccessCreate;

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
