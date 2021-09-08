import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Input, { Submit } from "../../custom/components/input";
import { gif, icon, image } from "../../assets/assetsRegister";
import SuccessPayment from "../../modal/another/success";
import convert from "../../function/convertCurrency";
import EmptyCart from "../../modal/another/empty";
import {
  deleteProductCart,
  getCart,
  ProductTopping,
} from "../../../services/cart";
import { createTransaction, UserOrder } from "../../../services/transaction";

const Cart = () => {
  const [buyyer, setBuyyer] = useState({
    fullname: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
  });
  const [attach, setAttach] = useState<null | Blob>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [cart, setCart] = useState<ProductTopping[]>([]);
  const [disable, setDisable] = useState(true);
  const [open, setOpen] = useState<boolean[]>(
    new Array(cart?.length).fill(false)
  );
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    letsTransaction();
  };
  const getProductCart = async () => {
    try {
      let data = await getCart();
      if (data) {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await deleteProductCart(id);
      let data = await getCart();
      if (data) {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductCart();
  }, []);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      let imgs = e.target.files[0];
      setAttach(imgs);
      setDisable(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBuyyer((prevInput: typeof buyyer) => ({
      ...prevInput,
      [e.target.name]:
        e.target.type == "number" ? e.target.valueAsNumber : e.target.value,
    }));
  };

  const totalPrice = useMemo(() => {
    let arr: number[] = [];
    cart?.map((item) => {
      arr.push(item.price);
    });
    return arr.reduce((a, b) => a + b, 0);
  }, [cart]);
  let form = new FormData();

  const letsTransaction = async () => {
    try {
      let a: keyof UserOrder;
      setPopUp(true);
      setIsLoading(true);
      if (attach) {
        for (a in buyyer) {
          form.set(a, buyyer[a]);
        }
        form.set("totalPrice", totalPrice.toString());
        form.set("image", attach);
      }
      await createTransaction(form);

      setIsLoading(false);
    } catch (error) {
      setPopUp(false);
      console.log(error);
    }
  };

  console.log(cart);

  useEffect(() => {
    setOpen([...new Array(cart?.length).fill(false)]);
  }, [cart?.length]);

  const klik = (index: number) => {
    if (open) {
      if (open[index]) {
        setOpen((prev) => [...prev, (prev[index] = false)]);
      } else {
        setOpen([...new Array(cart?.length).fill(false)]);
        setOpen((prev) => [...prev, (prev[index] = true)]);
      }
    }
  };

  return (
    <>
      <SuccessPayment open={popup} isLoading={isLoading} />

      {cart ? (
        <div className="container  px-20 mx-auto pt-32">
          <div className="pl-16">
            <h1 className="text-2xl pb-4 ">My Cart</h1>
            <p>Review Your Order</p>
          </div>
          {console.log("render")}
          <div className="flex justify-evenly  ">
            <div className="w-1/2 text-base flex flex-col ">
              <hr className="border-base w-full" />
              {cart.length ? (
                <div className="h-96 overflow-y-auto px-10 scrol">
                  {cart.map((item: ProductTopping, index: number) => {
                    return (
                      <div>
                        <div className="flex justify-between items-center">
                          <div className="flex pt-6 items-center">
                            <img
                              src={item.products.image}
                              alt=""
                              className="h-24 w-24 object-cover"
                            />
                            <div style={{ paddingLeft: "20px" }}>
                              <h3>{item.products.title}</h3>
                              <p className="font-light">
                                Topping:
                                {item.toppings ? (
                                  item.toppings.map((item: any) => {
                                    return <span>{" " + item.title}</span>;
                                  })
                                ) : (
                                  <p> tidak ada</p>
                                )}
                                <p>qty : {item.qty}</p>
                              </p>
                            </div>
                          </div>
                          <div className="flex pt-6 flex-col items-center">
                            <p>Rp.{convert(item.price.toString())}</p>
                            <div style={{ alignSelf: "flex-end" }}>
                              <img
                                src={icon.remove}
                                alt=""
                                style={style.iconR}
                                onClick={() => klik(index)}
                              />
                            </div>
                          </div>
                          {open[index] ? (
                            <div className="   ">
                              <p className="p-2">delete?</p>
                              <div className="flex justify-around ">
                                <img
                                  src={image.check}
                                  alt=""
                                  onClick={() => deleteProduct(item.id)}
                                />
                                <img src={image.cancel} alt="" />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <img src={gif.loading} alt="" />
              )}
              <hr className="border-base w-full pb-10" />
              <div className="flex justify-between items-center">
                <div className="w-7/12 ">
                  {Hr}
                  <div className="py-4">
                    <p>Sub Total : {convert(totalPrice.toString())}</p>
                    <p>Qty : {cart.length}</p>
                  </div>
                  {Hr}
                  <p> Total : {convert(totalPrice.toString())}</p>
                </div>
              </div>
            </div>
            <div className="w-5/12">
              <form action="" onSubmit={formSubmit}>
                <div className="flex flex-row-reverse ">
                  <div className="w-full">
                    <Input
                      name="fullname"
                      type="text"
                      value={buyyer.fullname}
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
                      name="postCode"
                      type="number"
                      value={buyyer.postCode}
                      nameField="Post Code"
                      change={handleChange}
                    />
                    <div className="p-1 ">
                      <textarea
                        name="address"
                        className="py-3 px-2 bg-cream border-2  w-full h-28 border-base focus:outline-none focus:ring-2"
                        id=""
                        value={buyyer.address}
                        placeholder="address"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                          setBuyyer((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }));
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-cream absolute  w-48 left-2/5 bottom-1/6  border-2 border-base">
                    <div className=" w-full h-28 flex items-center justify-center">
                      <label htmlFor="">
                        <input
                          type="file"
                          onChange={handleImage}
                          className="opacity-0 absolute z-0"
                        />
                        <img src={icon.attach} />
                      </label>
                    </div>
                  </div>
                </div>
                <Submit value="submit" />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const Hr = <hr style={{ border: "1px solid  #BD0707" }} />;

const style = {
  container: {
    display: "flex",
    padding: "0px 50px",
  } as CSSProperties,
  imgProduct: {
    height: "140px",
    width: "110px",
    objectFit: "cover",
    borderRadius: "8px",
  } as CSSProperties,

  form: {
    width: "30%",
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
