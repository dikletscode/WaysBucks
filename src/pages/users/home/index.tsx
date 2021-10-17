import React, { useContext, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { image } from "../../../assets/assetsRegister";
import chat from "../../../assets/images/chat.jpg";
import Product from "./getProduct";
import { API } from "../../../config/axios";
import { Footer } from "../../../components";
import AuthContext, { EventContext } from "../../../context/context";

const HomePage = () => {
  const { state } = useContext(AuthContext);
  const { eventState, eventDispatch } = useContext(EventContext);
  const history = useHistory();
  useEffect(() => {
    const test = async () => {
      await API.get("/count");
    };
    test();
  }, []);
  const clickChat = () => {
    if (state.isLogin) {
      history.push("/chat");
    } else {
      eventDispatch({ type: "MODAL_LOGIN", payload: true });
    }
  };

  return (
    <>
      <>
        <div className="bg-white ">
          <main className="pt-20 lg:pt-28">
            <div className="container px-4  mx-auto lg:px-20  ">
              <div className="w-full lg:relative overflow-hidden ">
                <div className=" flex flex-wrap">
                  <div className=" w-full flex   lg:block lg:bg-dBanner bg-no-repeat pt-14 justify-center  items-center lg:h-96 mx-auto  lg:my-0">
                    <div
                      id="profile"
                      className="  flex  bg-mBanner bg-repeat-y w-full lg:bg-none text-center lg:text-left  text-white rounded-lg lg:rounded-l-lg lg:rounded-r-none    lg:mx-0"
                    >
                      <div className="p-4  w-full text-center lg:text-left">
                        <div className="block lg:hidden  rounded-full  mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
                          <img
                            src={image.eatingPicture}
                            className="  shadow-2xl block  rounded-full h-48 w-48 object-cover lg:hidden"
                          />
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold pt-7  lg:px-9">
                          WAYSBUCK
                        </h1>

                        <div className="mx-auto lg:mx-0 w-4/5  border-b-2 border-green-500 opacity-25"></div>
                        <div className="w-full ">
                          <div className="lg:w-6/12 ">
                            <p className="pt-8 px-3 lg:px-9 text-xl font-sans">
                              <p className="">
                                Things are changing, but we’re still here for
                                you
                              </p>
                              <p className="mt-2 ">
                                We have temporarily closed our in-store cafes,
                                but select grocery and drive-thru locations
                                remaining open. Waysbucks Drivers is also
                                available
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <img
                      src={image.eatingPicture}
                      className="absolute top-1/2 right-0 transform -translate-y-1/2   shadow-2xl h-72 w-96  object-cover hidden lg:block"
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex mt-8 md:-mx-4 ">
                <div className="w-full h-64 md:mx-4 rounded-md bg-ourCooffe overflow-hidden bg-cover bg-center md:w-1/2">
                  <div className="bg-gray-900 bg-opacity-60 flex items-center h-full">
                    <div className="px-10 text-white max-w-xl">
                      <h2 className="text-2xl  font-semibold">Our Coffee</h2>
                      <p className="mt-2 ">
                        "We are a specialty coffee roaster based in Bandung. We
                        would like to deliver quality coffee beans and tasty to
                        you."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-64 mt-8 md:mx-4 rounded-md bg-ourCooffe2 overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2">
                  <div className="bg-gray-900 bg-opacity-60 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                      <h2 className="text-2xl text-white font-semibold">
                        The Way Forward
                      </h2>

                      <p className="mt-2 text-white">
                        Obsessed with reinventing the way people drink coffee
                        and the experience around coffee, we designed modern
                        contemporary store environments;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <p className="text-base font-semibold text-2xl">Best Seller</p>
                <Product />
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
      <></>

      <div
        onClick={clickChat}
        className="fixed flex bg-white px-3 py-1 lg:py-3 lg:px-7 shadow-md rounded-xl items-center justify-between right-0 bottom-0"
      >
        <img src={chat} className="h-10 w-10 mr-3" />
        <p>Chat</p>
      </div>
    </>
  );
};
export default HomePage;
