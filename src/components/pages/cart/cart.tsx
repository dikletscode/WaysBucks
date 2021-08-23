import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Input from "../../custom/components/input";
import { gif, icon } from "../../assets/assetsRegister";
import SuccessPayment from "../../modal/another/success";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import convert from "../../function/convertCurrency";
import useLocalStorage from "../../custom/hooks/setLocalStorage";
import EmptyCart from "../../modal/another/empty";
import { enumTransaction } from "../../types/roleEnum";
import { CartContext } from "../../../context/context";

interface Topping {
  id: string;
  image: string;
  price: number;
  title?: string;
}

interface CartTypes {
  id: string;
  image: string;
  price: number;
  title: string;
  total: number;
  topping?: Topping[];
}
const calculate = (arr: number[], arr2: number[]) => {
  let a = 0;
  arr.map((item, index) => {
    a += item * arr2[index];
  });
  return a;
};

const Cart = () => {
  const [buyyer, setBuyyer] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
  });
  const [popup, setPopUp] = useState(false);
  const history = useHistory();
  const [cart, setCart] = useState<CartTypes[] | null>(null);
  const [price, setPrice] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState<number[]>([]);
  const [value, setValue] = useLocalStorage("_transaction", []);

  let jsonCart = localStorage.getItem("_cart");

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValue((prev: any) => [
      ...prev,

      {
        buyyer,
        cart,
        ["paymentCode"]: uuidv4(),
        ["orderDate"]: new Date(),
        total,
        status: enumTransaction.WAIT,
      },
    ]);

    setPopUp(true);
  };
  useEffect(() => {
    localStorage.setItem("_transaction", JSON.stringify(value));
  }, [value, total, count, buyyer]);

  useEffect(() => {
    if (jsonCart) {
      const data = JSON.parse(jsonCart);
      setCart(data);
    }
  }, [jsonCart]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyyer((prevInput: typeof buyyer) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (cart != null) {
      setCount([...new Array(cart.length).fill(1)]);
      cart.map((item, index) => {
        setPrice((prev) => [...prev, item.total]);
      });
    }
  }, [cart]);

  useEffect(() => {
    if (price.length != 0 && count.length != 0) {
      setTotal(calculate(count, price));
    }
  }, [price, count]);

  const remove = (index: number) => {
    if (cart != null) {
      const copy = [...cart];
      copy.splice(index, 1);
      setCart(copy);
      localStorage.setItem("_cart", JSON.stringify(copy));
    }
  };

  if (cart == null) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }

  return (
    <>
      <SuccessPayment paymentCode={value["paymentCode"]} open={popup} />;
      {cart.length ? (
        <div style={style.container}>
          <div style={style.myCart}>
            <div>
              <h1>My Cart</h1>

              <hr />
            </div>
            <div style={style.myProduct}>
              {cart.map((item: CartTypes, index) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 10px",
                      }}
                    >
                      <div style={{ display: "flex", padding: "20px" }}>
                        <img src={item.image} alt="" style={style.imgProduct} />
                        <div style={{ paddingLeft: "20px" }}>
                          <h5>{item.title}</h5>
                          <p style={{ fontSize: "0.8em" }}>
                            {" "}
                            Topping:{" "}
                            {item.topping ? (
                              item.topping.map((item) => {
                                return <small>{item.title}</small>;
                              })
                            ) : (
                              <p> tidak ada</p>
                            )}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p>Rp.{convert(item.total.toString())}</p>
                        <div style={{ alignSelf: "flex-end" }}>
                          <img
                            src={icon.remove}
                            alt=""
                            style={style.iconR}
                            onClick={() => remove(index)}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div style={style.priceQty}>
              <div style={{ width: "60%" }}>
                <hr />
                <p>
                  Sub Total :{" "}
                  {price.length
                    ? convert(price[price.length - 1].toString())
                    : convert(total.toString())}
                </p>
                <p>Qty : {cart.length}</p>
                <hr />
                <p> Total : {convert(total.toString())}</p>
              </div>
              <div style={{ width: "40%" }}>
                <div
                  style={{
                    backgroundColor: "#E0C8C840",
                    textAlign: "center",
                  }}
                >
                  <img src={icon.attach} />
                </div>
              </div>
            </div>
          </div>
          <div style={style.form}>
            <form action="" onSubmit={formSubmit}>
              <Input
                name="name"
                type="text"
                value={buyyer.name}
                nameField="Name"
                change={handleChange}
              />
              <Input
                name="email"
                type="text"
                value={buyyer.email}
                nameField="Email"
                change={handleChange}
              />
              <Input
                name="phone"
                type="text"
                value={buyyer.phone}
                nameField="phone"
                change={handleChange}
              />
              <Input
                name="posCode"
                type="number"
                value={buyyer.posCode}
                nameField="Pos Code"
                change={handleChange}
              />
              <div className="input-wrapper">
                <textarea
                  name="address"
                  className="input-field"
                  id=""
                  cols={40}
                  rows={5}
                  value={buyyer.address}
                  placeholder="address"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setBuyyer((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                ></textarea>
              </div>
              <Input
                name="submit-order"
                type="submit"
                value="submit"
                change={handleChange}
              />
            </form>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const style = {
  container: {
    display: "flex",
    padding: "0px 50px",
  } as CSSProperties,
  imgProduct: {
    height: "140px",
    width: "100px",
    objectFit: "cover",
  } as CSSProperties,

  myCart: {
    width: "53%",
    padding: "0 95px",
    overflowX: "auto",
  } as CSSProperties,

  form: {
    width: "30%",
    padding: "68px 40px 0 0",
  } as CSSProperties,
  priceQty: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as CSSProperties,
  iconR: {
    objectFit: "contain",
    height: "20px",
    paddingRight: 0,
  } as CSSProperties,

  fitScreen: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "fixed",
    width: "100%",
    height: "100%",
  } as CSSProperties,
  myProduct: {
    overflowY: "scroll",
    height: "440px",
    width: "100%",
  } as CSSProperties,
};
export default Cart;
