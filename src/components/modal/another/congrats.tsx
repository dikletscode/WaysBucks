import { useContext } from "react";

import { EventContext } from "../../../context/context";
import { gif } from "../../assets/assetsRegister";
import AuthWrapper from "../wrapper";

const Congrats = () => {
  const { eventDispatch } = useContext(EventContext);

  setTimeout(
    () => eventDispatch({ type: "MODAL_LOGIN", payload: false }),
    2400
  );
  return (
    <AuthWrapper style="h-full w-full text-center">
      <img src={gif.loading} alt="" style={{ objectFit: "cover" }} />
    </AuthWrapper>
  );
};

export default Congrats;
