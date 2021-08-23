import { useContext } from "react";
import { style } from "../auth/form.style";

import { EventContext } from "../../../context/context";

const Congrats = ({ animation }: { animation: string }) => {
  const { eventDispatch } = useContext(EventContext);

  setTimeout(
    () => eventDispatch({ type: "MODAL_LOGIN", payload: false }),
    3400
  );
  return (
    <div style={style.container}>
      <img src={animation} alt="" style={{ objectFit: "cover" }} />
      <p>Login Success, Enjoy Your Coffee</p>
    </div>
  );
};

export default Congrats;
