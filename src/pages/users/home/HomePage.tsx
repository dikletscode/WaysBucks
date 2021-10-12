import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { image } from "../../../assets/assetsRegister";
import MainPage from "./Main";
import chat from "../../../assets/images/chat.jpg";
import Product from "./getProduct";
import { API } from "../../../config/axios";
import Footer from "./footer";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
  let query = useQuery();
  useEffect(() => {
    const test = async () => {
      await API.get("/count");
    };
    test();
  }, []);

  return (
    <>
      <>
        <div className="bg-white ">
          <main className="pt-32">
            <div className="container mx-auto lg:px-28  xs:px-3">
              <div className="w-full mx-auto sm:bg-mBanner relative overflow-hidden flex">
                <div className="bg-dBanner  w-11/12">
                  <div className="h-96 rounded-md  overflow-hidden bg-cover bg-center">
                    <div className="  flex items-center h-full">
                      <div className="px-24 max-w-3xl">
                        <h2 className="text-6xl text-white font-semibold mb-6">
                          WAYSBUCK
                        </h2>
                        <div className="text-white font-sans text-lg">
                          <p className="">
                            Things are changing, but we’re still here for you
                          </p>
                          <p className="mt-2 g">
                            We have temporarily closed our in-store cafes, but
                            select grocery and drive-thru locations remaining
                            open. Waysbucks Drivers is also available
                          </p>
                          <p className="mt-2 "> Lets... Order</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={image.eatingPicture}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2"
                  alt=""
                />
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
                      <button className="flex items-center mt-4  text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                        <span>Shop Now</span>
                      </button>
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
                      <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                        <span>Shop Now</span>
                      </button>
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
      <Link to="/chat">
        <div className="fixed flex bg-white py-3 px-7 shadow-md rounded-xl items-center justify-between right-10 bottom-0">
          <img src={chat} className="h-10 w-10 mr-3" />
          <p>Chat</p>
        </div>
      </Link>
    </>
  );
};
export default HomePage;

{
  /* <div style={style.fullPage}>
<div style={style.container}>
  <div style={style.banner}>
    <div style={style.bannerContainer}>
      <div style={style.textBanner}>
        <h1 style={{ paddingLeft: "50px", fontSize: "3em" }}>
          WAYSBUCKS
        </h1>
        <div
          style={{
            fontSize: "1.4em",
            fontFamily: "fantasy"
        <div style={style.bannerContainer}>
      <div style={style.textBanner}>
        <h1 style={{ paddingLeft: "50px", fontSize: "3em" }}>
          WAYSBUCKS
        </h1>   <p>
            Things are changing, but we're still here for you We have
            temporarily closed our in-store cafes, but select grocery
            and drive-thru locations remaining open. Waysbucks Drivers
            is also available
          </p>
        </div>
      </div>
      <div style={style.imageBanner}>
        <img
          src={image.eatingPicture}
          alt=""
          style={{ objectFit: "cover", height: "80%" }}
        />
      </div>
    </div>
  </div>
  <p style={style.order}>Let's Order</p>
  <div style={style.productContainer}>
    <Product />
  </div>
</div>
</div> */
}
