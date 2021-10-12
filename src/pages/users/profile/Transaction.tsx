import React from "react";
import { gif, image } from "../../../assets/assetsRegister";
import convert from "../../../components/function/convertCurrency";
import { HistoryTransaction } from "../../../services/transaction";
import QRCode from "qrcode.react";
import StatusTransac from "./statusColor";

const Transaction: React.FC<{
  transaction: HistoryTransaction[];
  confirmModal: (id: number) => void;
  openDetail: (id: number) => void;
}> = ({ transaction, confirmModal, openDetail }) => {
  let date = (db: Date) => {
    let dt = new Date(db);
    return (
      dt.toLocaleDateString() + " " + dt.getHours() + "." + dt.getSeconds()
    );
  };
  console.log(transaction, "tessssssssssst");
  return (
    <>
      {transaction.length ? (
        transaction.map((item, index) => {
          return (
            <div key={index} className=" pb-8">
              <div className="bg-red-200 w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between">
                  <div className="w-7/12 flex flex-col items-center content-center ">
                    {item.history.map((item2, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full items-center justify-around p-6  "
                        >
                          <img
                            src={item2.product?.image}
                            alt=""
                            className="h-28 w-32 object-cover rounded-lg"
                          />

                          <div
                            className="w-9/12 pl-6"
                            style={{
                              color: "#BD0707",
                              fontFamily: "'Josefin Sans', sans-serif",
                            }}
                          >
                            <h2 className="text-base font-bold">
                              {item2.product?.title || ""}
                            </h2>
                            <p>{date(item2.createdAt)}</p>
                            <p>
                              Topping:
                              {item2.toppings?.map((item3) => {
                                return " " + item3.title + ",";
                              })}
                            </p>
                            <p>Rp.{convert(item2.price.toString())}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center  py-10 pr-5">
                    <div className="flex flex-col items-center">
                      <img
                        src={image.logo}
                        alt=""
                        className="h-14 w-14 object-cover "
                      />
                      <div className="py-7">
                        <QRCode
                          value={JSON.stringify({
                            transactionId: item.id,
                            totalPrice: item.totalPrice,
                            userOrder: item.orderUser.address,
                          })}
                          bgColor="rgba(254, 202, 202,0.2)"
                        />
                      </div>
                      <div onClick={() => confirmModal(item.id)}>
                        <StatusTransac status={item.status} />
                      </div>
                      <p className="text-xs">
                        {" "}
                        SubTotal : Rp.
                        {convert(item.totalPrice.toString())}
                      </p>
                    </div>
                  </div>
                </div>
                {item.history.length > 1 ? (
                  <div
                    className="self-start ml-7 p-2 cursor-pointer text-base border-2 border-red-400 bg-red-100 rounded-3xl mb-6"
                    onClick={() => openDetail(item.id)}
                  >
                    other purchased products
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className=" pt-7">
          <p>no purchase transaction history</p>
        </div>
      )}
    </>
  );
};
export default Transaction;
