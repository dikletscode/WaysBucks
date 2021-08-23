import { ChangeEvent, CSSProperties, useEffect, useState } from "react";

import Input from "../../custom/components/input";
import { gif, icon } from "../../assets/assetsRegister";

import { useHistory } from "react-router-dom";

import convert from "../../function/convertCurrency";

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

const Cart = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
  });
  const history = useHistory();
  const [cart, setCart] = useState<CartTypes[] | null>(null);
  let jsonCart = localStorage.getItem("_cart");

  useEffect(() => {
    if (jsonCart) {
      const data = JSON.parse(jsonCart);
      setCart(data);
    }
  }, [jsonCart]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput: typeof input) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const PopUp = () => {
    setTimeout(() => {
      return history.push("/");
    }, 3000);
    return (
      <div style={style.fitScreen}>
        your cart is empty please check our product
      </div>
    );
  };
  if (cart == null) {
    return <img src={gif.loading} alt="" />;
  }
  console.log(cart, "cart");

  return (
    <>
      {cart.length ? (
        <div style={style.container}>
          <div style={style.myCart}>
            <div>
              <h1>My Cart</h1>

              <hr />
            </div>
            <div>
              {cart.map((item: CartTypes) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                        <p>
                          Rp.{convert((item.price + item.total).toString())}
                        </p>
                        <div style={{ alignSelf: "flex-end" }}>
                          <img src={icon.remove} alt="" style={style.iconR} />
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
                <p>Sub Total : </p>
                <p>Qty : 2</p>
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
            <form action="">
              <Input
                name="name"
                type="text"
                value={input.name}
                nameField="Name"
              />
              <Input
                name="email"
                type="text"
                value={input.email}
                nameField="Email"
                change={handleChange}
              />
              <Input
                name="phone"
                type="text"
                value={input.phone}
                nameField="phone"
                change={handleChange}
              />
              <Input
                name="poscode"
                type="number"
                value={input.posCode}
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
                  value={input.address}
                  placeholder="address"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                    setInput((prev) => ({
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
        <PopUp />
      )}
    </>
  );
};

const style = {
  container: {
    display: "flex",
    padding: "30px 50px",
  } as CSSProperties,
  imgProduct: {
    height: "140px",
    width: "100px",
  } as CSSProperties,

  myCart: {
    width: "53%",
    padding: "0 95px",
  } as CSSProperties,

  form: {
    width: "30%",
    padding: "30px 40px 0 0",
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
};
export default Cart;
