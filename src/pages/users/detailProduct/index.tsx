import { useMemo } from "react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CartContext } from "../../../context/context";

import { Submit } from "../../../components/atoms";
import { FailedRequest } from "../../../modal";
import calculate from "../../../utils/calculateArr";
import convert from "../../../utils/convertCurrency";
import getSelected from "../../../utils/getSelected";
import {
  ProductTopping,
  ProductTypes,
  ToppingTypes,
} from "../../../types/product";
import checkIsExist from "../../../utils/checkIsExist";
import { API } from "../../../config/axios";

const Detail = () => {
  const item: ProductTypes = useLocation<ProductTypes>().state;
  const [toppings, setToppings] = useState<ToppingTypes[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [klik, setKlik] = useState<boolean[]>([]);
  const [count, setCount] = useState<number[]>([]);
  const [amount, setAmount] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [idExist, setIdExist] = useState<number | null>(null);
  const { cartState, increment } = useContext(CartContext);
  const [isUpdateQty, setUpdateQty] = useState(false);
  const [popUP, setPopUP] = useState(false);
  const fetch = async () => {
    try {
      let res = await API.get("toppings");
      let data = res.data.product;
      if (data) {
        setToppings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toppingSelected = useMemo(() => {
    return getSelected(klik, toppings);
  }, [klik, toppings]);

  const getProductCart = async () => {
    try {
      let res = await API.get("transaction");
      let data: ProductTopping[] = res.data.product;

      if (data) {
        increment(data?.length);
        data.map((topping) => {
          if (topping.products.id === parseInt(id)) {
            let idStr = topping.toppings.map((toppingId) => toppingId.id);
            console.log(idStr, toppingSelected, "s");
            if (checkIsExist(idStr, toppingSelected)) {
              setIdExist(topping.id);
            } else {
              setIdExist(null);
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    getProductCart();
  }, [toppingSelected, isUpdateQty]);

  useEffect(() => {
    setKlik([...new Array(toppings.length).fill(false)]);
    setCount([...new Array(toppings.length).fill(0)]);
    toppings.forEach((item) => {
      setPrice((prev) => [...prev, item.price]);
    });
  }, [toppings.length]);

  const totalCalculate = useMemo(() => {
    return calculate(count, price) + item.price * amount;
  }, [price, count, amount]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toCart = async () => {
      try {
        if (idExist) {
          await API.patch("transaction/" + idExist, {
            price: totalCalculate,
            qty: amount,
          });
        } else {
          await API.post("cart", {
            id: parseInt(id),
            qty: amount,
            toppings: toppingSelected,
            price: totalCalculate,
          });

          setUpdateQty(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    toCart();
  };

  const counter = {
    increment: () => setAmount((item) => item + 1),
    decrement: () => setAmount((item) => (item > 1 ? item - 1 : item)),
  };

  const handleCheck = (index: number) => {
    const arr = [...klik];
    const counts = [...count];
    if (arr[index] === true) {
      arr[index] = false;
      counts[index] = 0;
    } else {
      counts[index] = amount;
      arr[index] = true;
    }
    setCount(counts);
    setKlik(arr);
  };

  return (
    <>
      <FailedRequest
        error="product is available in cart"
        open={popUP}
        close={() => setPopUP(false)}
        image={item.image}
      />
      <section className="text-gray-700 body-font pt-3 overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full mx-auto object-center">
              <img
                alt="ecommerce"
                className="  object-cover lg:mx-0 mx-auto rounded border  lg:w-9/12 border-gray-200"
                src={item.image}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-0 mt-6 lg:mt-0">
              <h1 className="text-base text-3xl title-font font-medium mb-1">
                {item.title}
              </h1>
              <small className="text-base  font-light text-lg">
                Rp. {convert(item.price.toString())}
              </small>
              <div className="pt-9">
                <p className="text-base pb-2  ">Toping</p>
                <div className="flex h-80 w-96 items-center  lg:w-full overflow-y-auto  flex-wrap">
                  {toppings.length ? (
                    toppings.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={`relative flex lg:items-start items-center w-28 mx-auto rounded-lg h-5 md:h-56 lg:h-80`}
                        >
                          <label htmlFor="">
                            <input
                              className="px-7 py-1 w-5 h-5 absolute  "
                              type="checkbox"
                              key={item.id}
                              onChange={() => handleCheck(index)}
                            />
                            <img src={item.image} alt="" className="h-24 p-1" />
                            <p style={{ textAlign: "center" }}>
                              {item.title} <br />
                              <small style={{ color: "red" }}>
                                +Rp.{convert(item.price.toString())}
                              </small>
                            </p>
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div>
                <p>amount</p>
                <div className="flex justify-between w-14">
                  <p className="cursor-pointer" onClick={counter.decrement}>
                    -
                  </p>
                  <p>{amount}</p>
                  <p className="cursor-pointer" onClick={counter.increment}>
                    +
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p> Total Pembayaran: </p>
                <p> Rp.{convert(totalCalculate.toString())} </p>
              </div>
              <div>
                <form action="" onSubmit={onSubmit}>
                  <Submit value="Add To Cart" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="flex justify-between pt-40 px-28">
        <div style={style.left}>
          <img src={item.image} alt="" style={style.image} />
        </div>
        {console.log("render 1")}
        <div className="">
          <h1 className="text-base pb-3 font-semibold text-3xl">
            {item.title}
          </h1>
          <small className="text-base  text-lg">
            Rp. {convert(item.price.toString())}
          </small>
          <div className="pt-9">
            <p className="text-base pb-2  ">Toping</p>
            <div
              className="flex h-80 overflow-y-auto  flex-wrap"
              style={{ width: "40rem" }}
            >
              {toppings.length ? (
                toppings.map((item, index) => {
                  return (
                    <div key={index} className={`px-7`}>
                      <label htmlFor="">
                        <input
                          className="px-7 py-1 w-5 h-5 absolute  "
                          type="checkbox"
                          key={item.id}
                          onChange={() => handleCheck(index)}
                        />
                        <img src={item.image} alt="" className="h-24 p-1" />
                        <p style={{ textAlign: "center" }}>
                          {item.title} <br />
                          <small style={{ color: "red" }}>
                            +Rp.{convert(item.price.toString())}
                          </small>
                        </p>
                      </label>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <p>amount</p>
            <div className="flex justify-between w-14">
              <p className="cursor-pointer" onClick={counter.decrement}>
                -
              </p>
              <p>{amount}</p>
              <p className="cursor-pointer" onClick={counter.increment}>
                +
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p> Total Pembayaran: </p>
            <p> Rp.{convert(totalCalculate.toString())} </p>
          </div>
          <div>
            <form action="" onSubmit={onSubmit}>
              <Submit value="Add To Cart" />
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Detail;
