import { CSSProperties, FC } from "react";
import { useHistory } from "react-router-dom";

import { gif, icon, image } from "../../assets/assetsRegister";
import Wrapper from "../../components/wrapper";

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
        <Wrapper>
          <div className="flex flex-col items-center">
            <img src={image || icon.warning} alt="" />

            <h1>{error}</h1>
          </div>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};
export default FailedRequest;
