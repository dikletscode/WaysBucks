import React, { useEffect, useState } from "react";
import { FC } from "react";
import { VerifyAttachment } from "../../../modal";
import { Confirm } from "../../../components";
import { HistoryTransaction } from "../../../types/transaction";
import { gif, icon, image } from "../../../assets/assetsRegister";
import convert from "../../../utils/convertCurrency";
import { enumTransaction } from "../../../types/roleEnum";
import { API } from "../../../config/axios";

const Dashboard = () => {
  // const [state, setState] = useState<HistoryTransaction[]>([]);
  const [transac, setTransac] = useState<HistoryTransaction[]>([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [attach, setAttach] = useState<HistoryTransaction | null>(null);
  const [user, setUser] = useState<any>([]);
  const getTransac = async () => {
    try {
      let res = await API.get("transactions");
      let data = res.data;
      if (data) {
        setTransac(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransac();
    return () => setUpdate(false);
  }, [update]);

  if (!transac.length) {
    return <img src={gif.loading} alt="" />;
  }
  const openModal = (obj: HistoryTransaction) => {
    setOpen(true);
    setAttach(obj);
  };

  return (
    <>
      {attach ? (
        <VerifyAttachment
          obj={attach}
          close={() => setOpen(false)}
          open={open}
          update={() => setUpdate(true)}
        />
      ) : (
        <></>
      )}
      <div className="pt-24  container mx-auto">
        <div className="px-7 mx-auto ">
          <h1 className="font-light text-base text-2xl">Income Transaction</h1>
          <div className=" h-99  overflow-y-auto">
            <table className="text-center w-full">
              <thead className="bg-gray-200">
                <tr>
                  <Row children="No" />
                  <Row children="Name" />
                  <Row children="Address" />
                  <Row children="Post Code" />
                  <Row children="Income" />
                  <Row children="Status" />

                  <Row children="Action" />
                </tr>
              </thead>
              <tbody className="">
                {transac.map((row, index) => {
                  return (
                    <tr key={index}>
                      <Row children={index + 1} />
                      <Row children={row.orderUser.fullname} />
                      <Row children={row.orderUser.address} />
                      <Row children={row.orderUser.postCode} />
                      <Row
                        children={`Rp.${convert(row.totalPrice.toString())}`}
                      />
                      <Row>
                        <StatusTransac status={row.status} />
                      </Row>

                      <Row>
                        {row.status == enumTransaction.WAIT ? (
                          <>
                            <Confirm
                              inner="Check Attachment"
                              custom="bg-yellow-400"
                              klik={() => openModal(row)}
                            />
                          </>
                        ) : row.status === enumTransaction.SUCCESS ||
                          row.status === enumTransaction.OTW ? (
                          <img src={image.check} alt="" className="mx-auto" />
                        ) : (
                          <img src={image.cancel} alt="" className="mx-auto" />
                        )}
                      </Row>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const StatusTransac: FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case enumTransaction.WAIT:
      return <p className="text-yellow-400">{status}</p>;
    case enumTransaction.SUCCESS:
      return <p className="text-green-500">{status}</p>;
    case enumTransaction.OTW:
      return <p className="text-blue-400">{status}</p>;
    case enumTransaction.CANCEL:
      return <p className="text-red-500">{status}</p>;
    default:
      return <p className="text-red-500">Cancel</p>;
  }
};

const Row = ({
  children,
  style,
  custom,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  custom?: string;
}) => {
  return (
    <td className={custom} style={{ padding: "20px", ...style }}>
      {children}
    </td>
  );
};

export default Dashboard;

// <Button
// inner="Cancel"
// custom="bg-red-500 "
// klik={() =>
//   actionTransac(row.id, enumTransaction.CANCEL)
// }
// />
// <Button
// inner="Approve"
// custom="bg-green-500"
// klik={() =>
//   actionTransac(row.id, enumTransaction.OTW)
// }
// />
