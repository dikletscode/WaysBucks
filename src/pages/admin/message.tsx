import React, { useContext } from "react";
import { icon } from "../../assets/assetsRegister";
import AuthContext from "../../context/context";

const Message = ({
  message,
  name,
  imgReceiver,
}: {
  message: string;
  name: string;
  imgReceiver: string;
}) => {
  let isSentByCurrentUser = false;

  const { state } = useContext(AuthContext);
  if (name === state.data.id) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={`flex items-end `}>
      <div
        className={`flex flex-col space-y-2 text-xs max-w-xs mx-2  order-2 items-start  }  `}
      >
        <div>
          <span
            className={`px-4 py-2 rounded-lg inline-block rounded-bl-none text-gray-600 `}
          >
            {message}
          </span>
        </div>
      </div>
      <img
        src={
          state.data?.profile?.image
            ? state.data?.profile?.image
            : icon.defaultProfile
        }
        alt="My profile"
        className="w-6 h-6 rounded-full order-1"
      />
    </div>
  ) : (
    <div className={`flex items-end  justify-end`}>
      <div
        className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end `}
      >
        <div>
          <span
            className={`px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white`}
          >
            {message}
          </span>
        </div>
      </div>
      <img
        src={imgReceiver}
        alt="My profile"
        className="w-6 h-6 rounded-full order-1"
      />
    </div>
  );
};

export default Message;
