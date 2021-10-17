import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ErrorFallback, Input, Submit } from "../../../components";
import { gif, icon, image } from "../../../assets/assetsRegister";
import { SuccessPayment } from "../../../modal";
import convert from "../../../utils/convertCurrency";
import { Wrapper } from "../../../components";
import { CartContext } from "../../../context/context";
import { useHistory } from "react-router";
import { API } from "../../../config/axios";
import { ProductTopping } from "../../../types/product";
import { withErrorBoundary, useErrorHandler } from "react-error-boundary";
import { error } from "console";

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
  const { cartState } = useContext(CartContext);
  const [open, setOpen] = useState<boolean[]>(
    new Array(cart?.length).fill(false)
  );
  const [openMobile, setMobile] = useState(false);

  const history = useHistory();
  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    letsTransaction();
  };

  const getProductCart = async () => {
    try {
      setIsLoading(true);
      let res = await API.get("transaction");
      const data = res.data.product;
      setIsLoading(false);
      data && setCart(data);
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
  let handleError = useErrorHandler();
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
      (window as any).snap.pay(token, {
        onSuccess: (result: any) => {
          if (attach && result) {
            Object.entries(buyyer).forEach(([key, value]) => {
              form.set(key, value);
            });
            form.set("id", result.transaction_id);
            form.set("totalPrice", totalPrice.toString());
            form.set("image", attach);
            setDisable(false);
          }
          const postTransact = async () => {
            try {
              attach &&
                (await API.post("transaction", form, {
                  headers: { "content-type": "multipart/form-data" },
                }));
              history.replace("profile");
            } catch (error) {
              handleError(error);
              console.log(error);
            }
          };
          postTransact();
        },
        onPending: function (result: any) {},
        onError: function (result: any) {
          console.log("error");
          console.log(result);
        },
        onClose: function () {},
      });
    } catch (error) {
      setPopUp(false);
      console.log(error);
    }
  };

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
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  useErrorHandler(() => {});

  if (isLoading) {
    return <img src={gif.loading} alt="" />;
  }
  return (
    <>
      <div className="container mb-10 lg:px-20 mx-auto pt-32">
        <div className="pl-16">
          <h1 className="text-2xl pb-4 text-base ">My Cart</h1>
          <p>Review Your Order</p>
        </div>
        {cart.length ? (
          <div className="flex justify-evenly  flex-wrap  ">
            <div className="lg:w-1/2 text-base flex flex-col ">
              <hr className="border-base w-full" />

              <div className="h-96 overflow-y-auto pr-3 lg:px-10 scrol">
                {cart.map((item, index) => {
                  return (
                    <div>
                      <div className="flex  justify-between items-center">
                        <div className="flex pt-6 items-center ">
                          <img
                            src={item.products.image}
                            alt=""
                            className="h-24 w-24 object-cover"
                          />
                          <div className="pl-3">
                            <h3>{item.products.title}</h3>

                            {item.toppings.length ? (
                              <p className="font-light w-20 lg:w-full  ">
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
                          <div className="self-end">
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

              <hr className="border-base lg:pb-10 lg:w-full " />
              <div
                className="mx-auto lg:hidden pb-10 pt-7"
                onClick={() => setMobile(true)}
              >
                <button className="py-2 px-6 bg-base text-white">pay</button>
              </div>

              <Wrapper style={`lg:hidden ${openMobile ? "" : "hidden"}`}>
                <div className="pb-10 lg:hidden   mx-auto text-center e">
                  <div className=" ">
                    <form action="" onSubmit={formSubmit}>
                      <img
                        src={image.cancel}
                        className="h-7 w-7 object-cover absolute right-3 top-3"
                        alt=""
                        onClick={() => setMobile(false)}
                      />
                      <div className="flex flex-row-reverse ">
                        <div className="w-full">
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
                              onChange={(
                                e: ChangeEvent<HTMLTextAreaElement>
                              ) => {
                                setBuyyer((prev) => ({
                                  ...prev,
                                  address: e.target.value,
                                }));
                              }}
                            ></textarea>
                            <div className="bg-cream mx-auto  w-48  mt-4 border-2 border-base">
                              <div className="py-3 center mx-auto">
                                <div className="bg-cream px-4 py-5 rounded-lg shadow-lg text-center w-48">
                                  <div className="mb-4">
                                    <img
                                      className=" mx-auto rounded-full object-cover h-16 w-16 lg:h-40 lg:w-40 object-center"
                                      src={
                                        attach
                                          ? URL.createObjectURL(attach)
                                          : icon.attach
                                      }
                                      alt="Avatar Upload"
                                    />
                                  </div>
                                  <label className="cursor-pointer mt-6">
                                    <span className="mt-2 leading-normal px-4 py-2 bg-base text-white text-sm rounded-full">
                                      Attachment
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={handleImage}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div onClick={() => setMobile(false)}>
                        <Submit value="submit" disabled={disable} />
                      </div>
                    </form>
                  </div>
                </div>
              </Wrapper>

              <div className="flex justify-between items-center">
                <div className="w-full lg:w-6/12 ">
                  {Hr}
                  <div className="py-4">
                    <p>Sub Total : {convert(totalPrice.toString())}</p>
                    <p>Qty : {cartState}</p>
                  </div>
                  {Hr}
                  <p> Total : {convert(totalPrice.toString())}</p>
                </div>

                <div className="bg-cream hidden lg:block  w-48   border-2 border-base">
                  <div className=" w-full h-28 flex items-center justify-center">
                    <label htmlFor="">
                      <input
                        type="file"
                        onChange={handleImage}
                        className="opacity-0 absolute z-0"
                      />
                      <img
                        src={attach ? URL.createObjectURL(attach) : icon.attach}
                        className="h-16 w-14 object-cover"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-5/12 hidden lg:block">
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
        ) : (
          <div className="flex items-center justify-center pt-10 mx-auto">
            <img src={image.emptyCart} className="w-1/2" alt="" />
          </div>
        )}
      </div>
    </>
  );
};

const Hr = <hr style={{ border: "1px solid  #BD0707" }} />;

const TransactionWithErrorBoundary = withErrorBoundary(Cart, {
  FallbackComponent: ErrorFallback,
  onError(error, info) {
    console.log(error, info);
  },
});
export default TransactionWithErrorBoundary;
