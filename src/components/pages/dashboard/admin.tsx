import React, { useEffect, useState } from "react";
import { gif } from "../../assets/assetsRegister";
import { Transaction } from "../../types/interface";
import { enumTransaction } from "../../types/roleEnum";

const Dashboard = () => {
  const getTransaction = localStorage.getItem("_transaction");
  const [state, setState] = useState<Transaction[]>([]);

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
          {state.map((row) => {
            return (
              <tr>
                <Row children={row.paymentCode} />
                <Row children={row.buyyer.name} />
                <Row children={row.buyyer.address} />
                <Row children={row.buyyer.posCode} />
                <Row children={row.total.toString()} />
                <Row children={row.status} />
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {}
                  <Button
                    inner="Cancel"
                    style={{ backgroundColor: "#FF0742" }}
                  />
                  <Button
                    inner="Approve"
                    style={{ backgroundColor: "#0ACF83" }}
                  />
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
}: {
  inner: string;
  style?: React.CSSProperties;
}) => {
  return (
    <button
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
