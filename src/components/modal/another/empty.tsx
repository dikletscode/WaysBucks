import { useHistory } from "react-router-dom";
import { gif } from "../../assets/assetsRegister";
import AuthWrapper from "../wrapper";

const EmptyCart = () => {
  let history = useHistory();

  setTimeout(() => {
    return history.push("/");
  }, 3000);

  return (
    <>
      <AuthWrapper>
        <img src={gif.empty} alt="" />
        your cart is empty please check our product
      </AuthWrapper>
    </>
  );
};
export default EmptyCart;
