import { CSSProperties } from "react";

export const style = {
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#FFFFFF",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), 4px 4px 20px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    zIndex: 1,
  } as CSSProperties,

  formInput: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    zIndex: 1,
  } as CSSProperties,

  close: {
    height: "20px",
    width: "20px",
    position: "absolute",
    top: "14px",
    right: "20px",
  } as CSSProperties,
};
