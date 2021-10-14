import { useContext } from "react";

import { EventContext } from "../../context/context";
import { gif } from "../../assets/assetsRegister";
import Wrapper from "../../components/wrapper";

const Congrats = () => {
  const { eventDispatch } = useContext(EventContext);

  setTimeout(
    () => eventDispatch({ type: "MODAL_LOGIN", payload: false }),
    2400
  );
  return (
    <Wrapper style="h-full w-full text-center">
      <img src={gif.loading} alt="" style={{ objectFit: "cover" }} />
    </Wrapper>
  );
};

export default Congrats;
