import React, { useEffect, useState } from "react";
import { FC } from "react";
import {
  allTransaction,
  HistoryTransaction,
  updateTransaction,
} from "../../../services/transaction";
import { gif, icon, image } from "../../assets/assetsRegister";
import { enumTransaction } from "../../types/roleEnum";

const Dashboard = () => {
  // const [state, setState] = useState<HistoryTransaction[]>([]);
  const [transac, setTransac] = useState<HistoryTransaction[]>([]);

  const actionTransac = (id: number, status: string) => {
    const action = async () => {
      try {
        await updateTransaction(id, status);
      } catch (error) {
        console.log(error);
      }
    };
    action();
  };

  const getTransac = async () => {
    try {
      let data = await allTransaction();
      if (data) {
        setTransac(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransac();
  }, []);
  if (!transac.length) {
    return <img src={gif.loading} alt="" />;
  }

  return (
    <div className="pt-32  container mx-auto">
      <div className="px-16 mx-auto ">
        <h1 className="font-light text-base text-2xl">Income Transaction</h1>
        <table className="text-center w-full ">
          <thead style={{ backgroundColor: "whitesmoke" }}>
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
          <tbody>
            {transac.map((row, index) => {
              return (
                <tr>
                  <Row children={index + 1} />
                  <Row children={row.orderUser.fullname} />
                  <Row children={row.orderUser.address} />
                  <Row children={row.orderUser.postCode} />
                  <Row children={row.totalPrice} />
                  <Row>
                    {" "}
                    <StatusTransac status={row.status} />
                  </Row>

                  <Row custom="flex justify-between w-34 ">
                    {row.status == enumTransaction.WAIT ? (
                      <>
                        <Button
                          inner="Cancel"
                          custom="bg-red-500 "
                          klik={() =>
                            actionTransac(row.id, enumTransaction.CANCEL)
                          }
                        />
                        <Button
                          inner="Approve"
                          custom="bg-green-500"
                          klik={() =>
                            actionTransac(row.id, enumTransaction.OTW)
                          }
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

const Button = ({
  inner,
  custom,
  klik,
}: {
  inner: string;
  custom: string;
  klik?: () => void;
}) => {
  return (
    <button
      onClick={klik}
      // style={{
      //   padding: "5px 15px",
      //   color: "white",
      //   borderRadius: "5px",
      //   border: "none",
      //   ...style,
      // }}
      className={`h-7 w-20 ${custom} text-white `}
    >
      {inner}
    </button>
  );
};

export default Dashboard;
