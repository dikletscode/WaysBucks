import React from "react";
import { FC } from "react";
import { image } from "../../assets/assetsRegister";
import { io } from "socket.io-client";
import { useEffect } from "react";
export const URL_BACKEND = "http://localhost:2021";

let token = localStorage.getItem("_user");

const socket = io(URL_BACKEND, {
  auth: {
    token: JSON.parse(token || "{}").token,
  },
});

const Notification: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  console.log(token);
  useEffect(() => {
    socket.on("joinNotifications", (err: any) => {
      console.log(err);
    });
    socket.on("sendNotifications", (err: any) => {
      console.log(err);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      {isOpen ? (
        <div className="absolute border-2 border-yellow-200 overflow-y-auto w-72 h-96 bg-white right-36 top-16">
          <div className="p-7">
            <div className="border-l-2 border-base py-4 flex justify-around">
              <img
                src={image.check}
                className="pl-5 object-cover  w-11"
                alt=""
              />
              <div>
                <p>hello apa kabar</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Notification;
