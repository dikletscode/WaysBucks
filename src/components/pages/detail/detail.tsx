import { useMemo } from "react";
import { useCallback } from "react";
import {
  CSSProperties,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import { CartContext } from "../../../context/context";
import { addToCart, getCart, updateCart } from "../../../services/cart";
import { getTopping, ToppingTypes } from "../../../services/topping";
import { Submit } from "../../custom/components/input";

import convert from "../../function/convertCurrency";
import getToppingId from "../../function/getTopping";

const calculate = (arr: number[], arr2: number[]) => {
  let a = 0;
  arr.map((item, index) => {
    a += item * arr2[index];
  });
  return a;
};
const equalsIgnoreOrder = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

const Detail = () => {
  const item: any = useLocation().state;
  const [toppings, setToppings] = useState<ToppingTypes[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [klik, setKlik] = useState<boolean[]>([]);
  const [count, setCount] = useState<number[]>([]);
  const [amount, setAmount] = useState(1);
  const [isExist, setExist] = useState<boolean>(false);
  const { increment } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const [idExist, setIdExist] = useState<number | null>(null);

  const fetch = async () => {
    try {
      let data = await getTopping();
      if (data) {
        setToppings(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toppingSelected = useMemo(() => {
    return getToppingId(klik, toppings);
  }, [klik, toppings]);

  const getProductCart = async () => {
    try {
      let data = await getCart();

      if (data) {
        data.map((topping) => {
          if (topping.products.id == parseInt(id)) {
            let idStr = topping.toppings.map((toppingId) => toppingId.id);
            if (equalsIgnoreOrder(idStr, toppingSelected)) {
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
  }, [toppingSelected]);

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

  const select = (index: number) => {
    const arr = [...klik];
    const counts = [...count];
    if (arr[index] == true) {
      arr[index] = false;
      counts[index] = 0;
    } else {
      counts[index] = amount;
      arr[index] = true;
    }
    setCount(counts);
    setKlik(arr);
  };

  const counter = {
    increment: () => setAmount((prev) => prev + 1),
    decrement: () => setAmount((prev) => (prev > 1 ? prev - 1 : prev)),
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toCart = async () => {
      try {
        console.log(idExist);
        if (idExist) {
          await updateCart(idExist, {
            qty: amount,
            price: totalCalculate,
          });
        } else {
          await addToCart({
            id: parseInt(id),
            qty: amount,
            toppings: toppingSelected,
            price: totalCalculate,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    toCart();
  };

  return (
    <div className="flex justify-between pt-40 px-28">
      <div style={style.left}>
        <img src={item.image} alt="" style={style.image} />
      </div>
      {console.log("render 1")}
      <div style={style.right}>
        <h1 className="text-base font-semibold text-3xl">{item.title}</h1>
        <small className="text-base text-sm">
          Rp. {convert(item.price.toString())}
        </small>
        <div className="pt-2">
          <p>Toping</p>
          <div style={style.containerTopping}>
            {toppings.length ? (
              toppings.map((item, index) => {
                return (
                  <>
                    <div
                      style={{ padding: "0 20px" }}
                      key={item.id}
                      onClick={() => select(index)}
                    >
                      <img
                        src={item.image}
                        alt=""
                        style={
                          klik[index]
                            ? {
                                ...style.imageTopping,
                                ["border"]: "1px solid red",
                              }
                            : style.imageTopping
                        }
                      />
                      <p style={{ textAlign: "center" }}>
                        {item.title} <br />
                        <small style={{ color: "red" }}>
                          +Rp.{convert(item.price.toString())}
                        </small>
                      </p>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <p>amount</p>
        <div className="flex w-24 justify-between ">
          <p onClick={counter.decrement} className="cursor-pointer">
            -
          </p>
          <p>{amount}</p>
          <p onClick={counter.increment} className="cursor-pointer">
            +
          </p>
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
  );
};
export default Detail;

const style = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 100px",
    height: "80vh",
  } as CSSProperties,
  left: {
    width: "50%",
    display: "block",
    height: "80%",
  } as CSSProperties,
  image: {
    width: "400px",
    height: "500px",
    objectFit: "cover",
  } as CSSProperties,
  toping: {
    display: "flex",
  } as CSSProperties,
  right: {
    padding: "0 0px",
    display: "block",
    width: "70%",
  } as CSSProperties,

  containerTopping: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: "flex-start",
    height: "340px",
    padding: "10px",
    overflowY: "auto",
    width: "700px",
  } as CSSProperties,
  imageTopping: {
    height: "100px",
    objectFit: "cover",
    width: "100px",
  } as CSSProperties,
};
