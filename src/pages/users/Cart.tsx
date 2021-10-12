import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import Input, { Submit } from "../../components/custom/components/input";
import { icon, image } from "../../assets/assetsRegister";
import SuccessPayment from "../../modal/another/success";
import convert from "../../components/function/convertCurrency";

import { UserOrder } from "../../services/transaction";
import { CartContext } from "../../context/context";
import { useHistory } from "react-router";
import { API } from "../../config/axios";
import { ProductTopping } from "./detail/detail";

const Cart = () => {
  const getLS = localStorage.getItem("_user");

  const [buyyer, setBuyyer] = useState({
    fullname: getLS ? JSON.parse(getLS).user?.profile?.fullname : "",
    email: getLS ? JSON.parse(getLS).user?.email : "",
    phone: "",
    postCode: "",
    address: "",
  });
  const [attach, setAttach] = useState<null | Blob>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [cart, setCart] = useState<ProductTopping[]>([]);
  const [disable, setDisable] = useState(true);
  const { increment } = useContext(CartContext);
  const [open, setOpen] = useState<boolean[]>(
    new Array(cart?.length).fill(false)
  );
  const [qty, setQty] = useState<number>(0);
  const history = useHistory();
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    letsTransaction();
  };

  const getProductCart = async () => {
    try {
      let res = await API.get("transaction");
      const data: ProductTopping[] = res.data.product;
      if (data) {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await API.delete("transaction", { data: { id: id } });
      setCart(cart.filter((item) => item.id != id));
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

  const letsTransaction = async () => {
    try {
      let res = await API.post("midtrans", {
        fullname: buyyer.fullname,
        email: buyyer.email,
        phon: buyyer.phone,
        totalPrice: totalPrice,
      });
      const token = res.data.payment.token;
      let form = new FormData();
      await (window as any).snap.pay(token, {
        onSuccess: async (result: any) => {
          if (attach) {
            Object.entries(buyyer).forEach(([key, value]) => {
              form.set(key, value);
            });

            form.set("totalPrice", totalPrice.toString());
            form.set("image", attach);
            setDisable(false);
          }
          setIsLoading(true);
          await API.post("transaction", form, {
            headers: { "content-type": "multipart/form-data" },
          });
          setIsLoading(false);
          history.push("/profile");
        },
        onPending: function (result: any) {},
        onError: function (result: any) {
          console.log("error");
          console.log(result);
        },
        onClose: function () {
          console.log(
            "customer closed the popup without finishing the payment"
          );
        },
      });
    } catch (error) {
      setPopUp(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setOpen([...new Array(cart?.length).fill(false)]);
    const qty = cart.reduce((item, item2) => item + item2.qty, 0);
    increment(qty);
    setQty(qty);
    return () => {
      increment(0);
    };
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
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "your-client-key-goes-here";
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  return (
    <>
      <SuccessPayment open={popup} isLoading={isLoading} />

      <div className="container mb-10 px-20 mx-auto pt-32">
        <div className="pl-16">
          <h1 className="text-2xl pb-4 text-base ">My Cart</h1>
          <p>Review Your Order</p>
        </div>
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

                            {item.toppings.length ? (
                              <p className="font-light">
                                <div>
                                  Topping:
                                  {item.toppings.map((item: any) => {
                                    return <span>{" " + item.title}</span>;
                                  })}
                                </div>
                              </p>
                            ) : (
                              <p> </p>
                            )}
                            <p>qty: {item.qty}</p>
                          </div>
                        </div>
                        <div className="flex pt-6 flex-col items-center">
                          <p>Rp.{convert(item.price.toString())}</p>
                          <div style={{ alignSelf: "flex-end" }}>
                            <img
                              src={icon.remove}
                              alt=""
                              className="h-6 w-full object-cover"
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
              <div className="text-center flex items-center mx-auto h-96">
                <p>Empty Cart</p>
              </div>
            )}
            <hr className="border-base w-full pb-10" />
            <div className="flex justify-between items-center">
              <div className="w-7/12 ">
                {Hr}
                <div className="py-4">
                  <p>Sub Total : {convert(totalPrice.toString())}</p>
                  <p>Qty : {qty}</p>
                </div>
                {Hr}
                <p> Total : {convert(totalPrice.toString())}</p>
              </div>

              <div className="bg-cream  w-48   border-2 border-base">
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
          </div>
          <div className="w-5/12">
            <form action="" onSubmit={formSubmit}>
              <div className="flex flex-row-reverse ">
                <div className="w-full">
                  <Input
                    name="fullname"
                    type="text"
                    nameField="Name"
                    disabled={true}
                    value={buyyer.fullname}
                  />
                  <Input
                    name="email"
                    type="text"
                    nameField="Email"
                    change={handleChange}
                    value={buyyer.email}
                    disabled={true}
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
              </div>
              <Submit value="submit" disabled={disable} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Hr = <hr style={{ border: "1px solid  #BD0707" }} />;

export default Cart;
