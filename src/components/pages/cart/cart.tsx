import {
  ChangeEvent,
  CSSProperties,
  useContext,
  useEffect,
  useState,
} from "react";

import Input from "../../custom/components/input";
import { gif, icon, image } from "../../assets/assetsRegister";
import useLocalStorage from "../../custom/hooks/setLocalStorage";
import { Redirect, useHistory } from "react-router-dom";
import { CartContext } from "../../../context/context";

const Cart = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
  });
  const [cart, setCart] = useState<any>(null);
  let jsonCart = localStorage.getItem("_cart");
  const history = useHistory();

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
              {cart.map((item: any) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex" }}>
                        <img src={item.image} alt="" style={style.imgProduct} />
                        <div>
                          <h5>{item.title}</h5>
                          <p style={{ fontSize: "0.8em" }}> Topping: COoklat</p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p>Rp.24.000</p>
                        <div style={{ alignSelf: "flex-end" }}>
                          <img src={icon.remove} alt="" style={style.iconR} />
                        </div>
                      </div>
                    </div>
                    <div style={style.priceQty}>
                      <div style={{ width: "60%" }}>
                        <hr />
                        <p>Sub Total : 20.000</p>
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
                  </>
                );
              })}
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
