import React from "react";

import { HistoryTransaction } from "../../types/transaction";
import { Confirm } from "../../components";
import { enumTransaction } from "../../types/roleEnum";
import { API } from "../../config/axios";

const VerifyAttachment = ({
  open,
  obj,
  update,
  close,
}: {
  image?: string;
  open: boolean;
  obj: HistoryTransaction;
  update: () => void;
  close: () => void;
}) => {
  const actionTransac = (status: string) => {
    const action = async () => {
      try {
        await API.patch("transactions", { id: obj.id, status: status });
        update();
        close();
      } catch (error) {
        console.log(error);
      }
    };
    action();
  };

  return (
    <>
      {open ? (
        <div className=" fixed mx-auto  flex z-20 h-screen w-screen items-center  bg-darkTransparent ">
          <div className={`bg-white py-10 flex flex-col px-12        mx-auto`}>
            <p className="text-center font-normal text-red-900">
              Check Attachment
            </p>
            <div className="p-16 ">
              <img
                className="w-48 h-48 object-cover"
                src={obj.attachment}
                alt="image"
              />

              <div
                className="flex-1w-full flex flex-col items-baseline  justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2
          "
              ></div>
            </div>

            <div className="mx-auto  flex justify-between w-44">
              <Confirm
                inner="Cancel"
                custom="bg-red-500 "
                klik={() => actionTransac(enumTransaction.CANCEL)}
              />
              <Confirm
                inner="Approve"
                custom="bg-green-500"
                klik={() => actionTransac(enumTransaction.OTW)}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default VerifyAttachment;
