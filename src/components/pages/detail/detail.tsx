import {
  CSSProperties,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../../context/context";
import { Submit } from "../../custom/components/input";
import useLocalStorage from "../../custom/hooks/setLocalStorage";

import convert from "../../function/convertCurrency";
import getTopping from "../../function/getTopping";
import { ProductTypes } from "../../types/interface";

const calculate = (arr: number[], arr2: number[]) => {
  let a = 0;
  arr.map((item, index) => {
    a += item * arr2[index];
  });
  return a;
};

const Detail = () => {
  const item: any = useLocation().state;
  let getJson = localStorage.getItem("_topping");
  const [value, setValue] = useState<ProductTypes[]>([]);
  const [price, setPrice] = useState<number[]>([]);
  const [klik, setKlik] = useState<boolean[]>([]);
  const [count, setCount] = useState<number[]>([]);
  const [cart, sendToCart] = useLocalStorage("_cart", []);
  const [topping, sendTopping] = useState<any[]>([]);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendToCart((prev: any) => [...prev, { ...item, ...topping, total }]);
  };

  useEffect(() => {
    if (getJson) {
      let topping = JSON.parse(getJson);
      if (topping) {
        setValue(topping);
      }
    }
  }, [getJson, value.length]);

  useEffect(() => {
    localStorage.setItem("_cart", JSON.stringify(cart));
  }, [cart, topping, item]);

  useEffect(() => {
    setKlik([...new Array(value.length).fill(false)]);
    setCount([...new Array(value.length).fill(0)]);
    value.forEach((item) => {
      setPrice((prev) => [...prev, item.price]);
    });
  }, [value.length]);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (price.length != 0 && count.length != 0) {
      setTotal(calculate(count, price) + item.price);
    }
  }, [price, count]);

  useEffect(() => {
    sendTopping(getTopping(klik, value));
  }, [klik, value]);

  const select = (index: number) => {
    const arr = [...klik];
    const counts = [...count];
    if (arr[index] == true) {
      arr[index] = false;
      counts[index] = 0;
    } else {
      counts[index] = 1;
      arr[index] = true;
    }

    setCount(counts);
    setKlik(arr);
  };
  const { cartState, increment } = useContext(CartContext);
  console.log(topping);
  return (
    <div style={style.container}>
      <p onClick={() => increment()}>Review Your Order </p>
      <div style={style.left}>
        <img src={item.image} alt="" style={style.image} />
      </div>
      <div style={style.right}>
        <h1>{item.title}</h1>
        <small>{item.price}</small>
        <p>Toping</p>
        <div style={style.containerTopping}>
          {value.length ? (
            value.map((item, index) => {
              return (
                <>
                  <div
                    style={{ padding: "0 20px" }}
                    key={item.id}
                    onClick={() => select(value.indexOf(item))}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p> Total Pembayaran: </p>
          <p> Rp.{convert((total + item.price).toString())} </p>
        </div>
        <div>
          <form action="" onSubmit={submit}>
            <Submit
              value="Add Cart"
              styles={{ width: "100%", paddingTop: "40px" }}
            />
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
    padding: "40px 40px 0 40px",
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
    height: "120px",
    objectFit: "cover",
    width: "120px",
  } as CSSProperties,
};
