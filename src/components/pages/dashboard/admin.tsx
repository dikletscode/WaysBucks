import React, { useEffect, useState } from "react";
import { gif, icon, image } from "../../assets/assetsRegister";
import { Transaction } from "../../types/interface";
import { enumTransaction } from "../../types/roleEnum";

const Dashboard = () => {
  const getTransaction = localStorage.getItem("_transaction");
  const [state, setState] = useState<Transaction[]>([]);
  const sucess = (index: number) => {
    let copy: any = [...state];
    copy[index].status = enumTransaction.SUCCESS;
    setState(copy);
    localStorage.setItem("_transaction", JSON.stringify(copy));
  };
  const cancel = (index: number) => {
    let copy: any = [...state];
    copy[index].status = enumTransaction.CANCEL;
    setState(copy);
    localStorage.setItem("_transaction", JSON.stringify(copy));
  };
  useEffect(() => {
    if (getTransaction) {
      setState(JSON.parse(getTransaction));
    }
  }, [getTransaction]);
  if (state.length == 0) {
    return <img src={gif.loading} alt="" />;
  }

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Income Transaction</h1>
      <table
        style={{
          width: "90%",
          textAlign: "center",
          border: "1px solid #828282",
          borderRadius: "0px 1px 0px 0px;",
          fontFamily: "sans-serif",
          color: "#232323",
          borderCollapse: "collapse",
        }}
      >
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
          {state.map((row, index) => {
            return (
              <tr>
                <Row children={row.paymentCode} />
                <Row children={row.buyyer.name} />
                <Row children={row.buyyer.address} />
                <Row children={row.buyyer.posCode} />
                <Row children={row.total.toString()} />
                <Row children={row.status || "Cancel"} />
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {row.status == enumTransaction.WAIT ? (
                    <>
                      <Button
                        inner="Cancel"
                        style={{ backgroundColor: "#FF0742" }}
                        klik={() => cancel(index)}
                      />
                      <Button
                        inner="Approve"
                        style={{ backgroundColor: "#0ACF83" }}
                        klik={() => sucess(index)}
                      />
                    </>
                  ) : row.status == enumTransaction.SUCCESS ? (
                    <img src={image.check} alt="" />
                  ) : (
                    <img src={image.cancel} alt="" />
                  )}
                </Row>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Row = ({
  children,
  style,
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return <td style={{ padding: "20px", ...style }}>{children}</td>;
};

const Button = ({
  inner,
  style,
  klik,
}: {
  inner: string;
  style?: React.CSSProperties;
  klik?: () => void;
}) => {
  return (
    <button
      onClick={klik}
      style={{
        padding: "5px 15px",
        color: "white",
        borderRadius: "5px",
        border: "none",
        ...style,
      }}
    >
      {inner}
    </button>
  );
};

export default Dashboard;
