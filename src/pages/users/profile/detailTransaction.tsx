import React, { FC, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { HistoryTransaction, Transaction } from "../../../services/transaction";
import { gif, image } from "../../../assets/assetsRegister";
import convert from "../../../components/function/convertCurrency";
import StatusTransac from "./statusColor";
import { API } from "../../../config/axios";

const DetailTransaction: FC<{ open: boolean; id: number; close: () => void }> =
  ({ open, id, close }) => {
    const [data, setData] = useState<HistoryTransaction | null>(null);
    const fetchTransaction = async () => {
      try {
        let res = await API.get("orders/" + id);
        let data = res.data;
        setData(data.transaction);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      if (open) {
        fetchTransaction();
      }
      return () => setData(null);
    }, [id, open]);

    return (
      <>
        {open ? (
          <>
            <div className=" fixed mx-auto  flex z-20 h-screen w-screen items-center  bg-darkTransparent ">
              <div
                onMouseLeave={close}
                className="bg-white  pt-10 flex flex-col justify-start items-center h-5/6 overflow-y-scroll  w-2/3 mx-auto"
              >
                {data ? (
                  <>
                    <div className="py- mx-auto ">
                      <QRCode
                        value={JSON.stringify({
                          transactionId: data.id,
                          totalPrice: data.totalPrice,
                          userOrder: data.orderUser.address,
                        })}
                        bgColor="rgba(254, 202, 202,0.2)"
                      />
                    </div>
                    <div
                      className={`bg-white flex flex-wrap justify-around  pt-10  mx-auto`}
                    >
                      {data.history ? (
                        data.history.map((item2, index) => {
                          return (
                            <div className=" mx-auto bg-whiteshadow-md h-96  my-5 rounded-3xl flex flex-col justify-between  items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96">
                              <img
                                className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
                                src={item2.product.image}
                                alt="image"
                              />

                              <div
                                className="flex-1w-full flex flex-col items-baseline  justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2
                  "
                              >
                                <div className="flex flex-col justify-start items-baseline">
                                  <h1 className="text-lg font-normal mb-0 text-gray-600 font-sans">
                                    {item2.product.title}
                                  </h1>
                                  <span className="text-xs text-indigo-300 mt-0">
                                    by supplier
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 w-4/5">
                                  {item2.toppings.map((topping, index) => {
                                    return (
                                      topping.title +
                                      `${
                                        index != item2.toppings.length - 1
                                          ? ", "
                                          : ""
                                      }`
                                    );
                                  })}
                                </p>
                                <div className="w-full flex justify-between items-center">
                                  <h1 className="font-bold text-gray-500">
                                    Rp.{convert(item2.price.toString())}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <img src={gif.loading} alt="" />
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };
export default DetailTransaction;
