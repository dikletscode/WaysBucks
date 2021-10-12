import { FC } from "react";

import { enumTransaction } from "../../../components/types/roleEnum";

export const StatusTransac: FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case enumTransaction.WAIT:
      return (
        <div className="border-2 cursor-pointer text-center border-yellow-400   w-40">
          <p className="text-yellow-400 font-bold">{status}</p>
        </div>
      );
    case enumTransaction.SUCCESS:
      return (
        <div className="border-2 cursor-pointer text-center border-green-400   w-40">
          <p className="text-green-400 font-bold">{status}</p>
        </div>
      );
    case enumTransaction.OTW:
      return (
        <div
          id="statusTxt"
          className="border-2 cursor-pointer  text-center border-blue-400 text-sm w-40"
        >
          <p className="text-blue-400  font-bold">{status}</p>
        </div>
      );
    case enumTransaction.CANCEL:
      return (
        <div className="border-2 cursor-pointer text-center border-red-400   w-40">
          <p className="text-red-400 font-bold">{status}</p>
        </div>
      );
    default:
      return (
        <div className="border-2 cursor-pointer text-center border-red-400   w-40">
          <p className="text-red-400 font-bold">{status}</p>
        </div>
      );
  }
};

export default StatusTransac;
