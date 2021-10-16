import React from "react";
import { image } from "../../../assets/assetsRegister";
import convert from "../../../utils/convertCurrency";
import { HistoryTransaction } from "../../../types/transaction";
import QRCode from "qrcode.react";
import { StatusTransac } from "../../../components";
import { enumTransaction } from "../../../types/roleEnum";

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

  return (
    <>
      {transaction.length ? (
        transaction.map((item, index) => {
          return (
            <div key={index} className=" pb-8">
              <div className="bg-red-200 w-full flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between">
                  <div className=" flex flex-col items-center ">
                    {item.history.map((item2, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full items-center  p-6  "
                        >
                          <img
                            src={item2.product?.image}
                            alt=""
                            className=" w-24 h-36 object-cover rounded-lg"
                          />

                          <div
                            className=" pl-6 hidden lg:block"
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
                  <div className="flex items-center flex-wrap py-10 pr-5">
                    <div className="flex flex-col  items-center">
                      <img
                        src={image.logo}
                        alt=""
                        className="h-14 w-14 object-cover "
                      />
                      <div className="py-7 object-contain">
                        <QRCode
                          value={JSON.stringify({
                            transactionId: item.id,
                            totalPrice: item.totalPrice,
                            userOrder: item.orderUser.address,
                          })}
                          bgColor="rgba(254, 202, 202,0.2)"
                        />
                      </div>
                      <div
                        onClick={
                          item.status === enumTransaction.OTW
                            ? () => confirmModal(item.id)
                            : undefined
                        }
                      >
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
                <div
                  className="  mx-auto  p-2 cursor-pointer text-base  "
                  onClick={() => openDetail(item.id)}
                >
                  detail
                </div>
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
