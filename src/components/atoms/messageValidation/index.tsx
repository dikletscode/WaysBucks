import React, { FC } from "react";

const MessageValidation: FC<{ error: boolean; message: string }> = ({
  error,
  message,
}) => {
  return (
    <>
      {error ? (
        <p className="px-1 mx-auto text-red-700">{message}</p>
      ) : (
        <span> &nbsp; </span>
      )}
    </>
  );
};
export default MessageValidation;
