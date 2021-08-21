import { ChangeEvent, CSSProperties, useEffect, useState } from "react";

import Input from "../../custom/components/input";
import { icon, image } from "../../assets/assetsRegister";

const Cart = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
  });

  useEffect(() => {});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prevInput: typeof input) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div style={style.container}>
      <div style={style.myCart}>
        <div>
          <h1>My Cart</h1>
          <p>Review Your Order </p>
          <hr />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <img src={image.product} alt="" />
              <div>
                <h5>Ice Coffe Palm Sugar</h5>
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
                style={{ backgroundColor: "#E0C8C840", textAlign: "center" }}
              >
                <img src={icon.attach} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={style.form}>
        <form action="">
          <Input name="name" type="text" value={input.name} nameField="Name" />
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
  );
};

const style = {
  container: {
    display: "flex",
    padding: "30px 50px",
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
};
export default Cart;
