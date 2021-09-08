import React, {
  ChangeEvent,
  CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getTransaction,
  HistoryTransaction,
} from "../../../services/transaction";
import { gif, image } from "../../assets/assetsRegister";
import { useLocation } from "react-router-dom";

import convert from "../../function/convertCurrency";

import StatusTransac from "./statusColor";
import { editProfile, profile, ProfileType } from "../../../services/auth";
import Input from "../../custom/components/input";
import AuthContext from "../../../context/context";

const UserProfile = () => {
  const [transaction, setTransaction] = useState<HistoryTransaction[] | null>(
    null
  );
  const { state, dispatch } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState<ProfileType | null>(null);
  const [isEditing, setEditing] = useState({
    fullname: false,
  });

  const toogle = (field: string) => {
    setEditing((prev) => ({ ...prev, [field]: true }));
  };
  const fetchTransaction = async () => {
    try {
      let data = await getTransaction();
      setTransaction(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProfile = async () => {
    try {
      let data = await profile();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
    if (update) {
      getProfile();
      dispatch({ type: "BUYYER_LOGIN_SUCCESS", payload: user?.profile.image });
    }
  }, [update]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const formData = new FormData();
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const img = e.target.files[0];
      formData.set("image", img);
    }
    const upload = async () => {
      try {
        await editProfile(formData);
        setUpdate(true);
      } catch (error) {
        console.log(error);
      }
    };

    upload();
  };

  let date = (db: Date) => {
    let dt = new Date(db);

    return (
      dt.toLocaleDateString() + " " + dt.getHours() + "." + dt.getSeconds()
    );
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const ref = useRef<any>();

  useEffect(() => {
    ref.current.scrollIntoView();
  }, []);

  console.log(transaction, "ts");
  return (
    <div className="container flex pt-40  mx-auto justify-between py-20 ">
      {user ? (
        <div className="w-1/2">
          <h2>My Profile</h2>
          <div className="flex">
            <label className="border-2  inline-block px-3 py-6 cursor-pointer ">
              <img
                alt=""
                src={user?.profile.image ? user?.profile.image : image.product}
                className="object-cover h-48 w-48"
              />

              <input
                type="file"
                id="fullname"
                className="h-10 w-10 absolute opacity-0"
                onChange={handleImage}
              />
            </label>

            <div style={{ padding: "0 40px" }}>
              <div style={{ padding: "20px 0" }}>
                <h4>Full Name</h4>
                {isEditing.fullname ? (
                  <form action="">
                    <div
                      className={`border-2 flex ${
                        isEditing.fullname ? "border-red-500" : ""
                      }`}
                    >
                      <input
                        type="text"
                        id="fullname"
                        value={user.profile?.fullname}
                      />
                      <input type="submit" />
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between">
                    <p>{user.profile?.fullname}</p>
                    <button onClick={() => toogle("fullname")}>edit</button>
                  </div>
                )}
              </div>
              <div>
                <h4>Email</h4>
                <h4>{user.email}</h4>
              </div>
              <div>
                <h2>Password</h2>
                <h2>*********</h2>
                <h2>Change Password?</h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>s</div>
      )}

      <div className=" block ">
        <h2></h2>

        <div
          ref={ref}
          className=" flex min-h-0 max-h-97  flex-col-reverse overflow-y-auto  "
        >
          {transaction ? (
            transaction.map((item, index) => {
              return (
                <div key={index} className=" p-7  r ">
                  <div className="bg-red-200 w-full flex items-center justify-between">
                    <div
                      style={{
                        width: "60%",
                        display: "flex",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      {item.history.map((item2) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              padding: "20px",
                              width: "100%",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <img
                                src={item2.product?.image}
                                alt=""
                                style={{
                                  height: "120px",
                                  width: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                padding: "0 10px",
                                color: "#BD0707",
                                fontFamily: "'Josefin Sans', sans-serif",
                              }}
                            >
                              <h3>{item2.product?.title || ""}</h3>
                              <p>{date(item2.createdAt)}</p>
                              <p>
                                Topping:
                                {item2.toppings?.map((item3) => {
                                  return " " + item3.title + ",";
                                })}
                              </p>

                              {/* <p>Price: {convert(item2.price.toString())}</p> */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center p-10">
                      <div className="flex flex-col items-center">
                        <img
                          src={image.logo}
                          alt=""
                          className="h-14 w-14 object-cover "
                        />
                        <img src={image.barcode} alt="" className="p-6" />
                        <StatusTransac status={item.status} />
                        <p className="text-xs">
                          {" "}
                          SubTotal : Rp.{convert(item.totalPrice.toString())}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <img src={gif.loading} alt="" />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
