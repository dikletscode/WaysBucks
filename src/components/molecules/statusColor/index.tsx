import { FC } from "react";

import { enumTransaction } from "../../../types/roleEnum";

const Status: FC<{ borderColor: string; textColor: string; status: string }> =
  ({ borderColor, textColor, status }) => {
    return (
      <div
        className={`border-2 cursor-pointer text-center ${borderColor}   w-40`}
      >
        <p className={`${textColor} font-bold`}>{status}</p>
      </div>
    );
  };

export const StatusTransac: FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case enumTransaction.WAIT:
      return (
        <Status
          borderColor="border-yellow-400"
          status={status}
          textColor="text-yellow-400"
        />
      );
    case enumTransaction.SUCCESS:
      return (
        <Status
          borderColor="border-green-400"
          status={status}
          textColor="text-green-400"
        />
      );
    case enumTransaction.OTW:
      return (
        <Status
          borderColor="border-blue-400"
          status={status}
          textColor="text-blue-400"
        />
      );
    case enumTransaction.CANCEL:
      return (
        <Status
          borderColor="border-red-400"
          status={status}
          textColor="text-red-400"
        />
      );
    default:
      return (
        <Status
          borderColor="border-red-400"
          status={status}
          textColor="text-red-400"
        />
      );
  }
};

export default StatusTransac;
