import { CSSProperties, FC } from "react";
import { useHistory } from "react-router-dom";
import { gif } from "../../assets/assetsRegister";

const EmptyCart = () => {
  let history = useHistory();

  setTimeout(() => {
    return history.push("/");
  }, 3000);

  return (
    <>
      <div style={style.container}>
        <img src={gif.empty} alt="" />
        your cart is empty please check our product
      </div>
    </>
  );
};
export default EmptyCart;

const style = {
  container: {
    fontSize: "2em",
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
