import React, {
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { gif, icon, image } from "../../../assets/assetsRegister";
import { io, Socket } from "socket.io-client";
import AuthContext from "../../../context/context";
import { Message } from "../../../components";
import { API } from "../../../config/axios";

export interface ListUser {
  id: string;
  email: string;
  profile: {
    fullname: string;
    image: string;
  };
  role: number;
}

let socket: Socket;
export const URL = "https://waysbuck.herokuapp.com";

const Chat = () => {
  const [data, setData] = useState<ListUser[]>([]);
  const { state, dispatch } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUser, setOnlineUser] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<ListUser>();
  const messagesEndRef = useRef<any>(null);
  const fetchTransaction = async () => {
    try {
      let res = await API.get("users");
      let data: ListUser[] = res.data.users;
      if (state.isAdmin) {
        setData(data.filter((item) => item.id !== state.data.id));
      } else {
        setData(data.filter((item) => item.role === 1));
      }
    } catch (error) {
      console.log(error, "sss");
    }
  };

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchTransaction();
  }, [state.isAdmin]);

  useEffect(() => {
    if (!state.isAdmin && data.length) {
      setCurrentChat(data[0]);
    }
  }, [data, state.isAdmin]);

  useEffect(() => {
    socket = io(URL);
    socket.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [URL]);

  useEffect(() => {
    socket.emit("addUsers", state.data.id);
    socket.on("getUsers", (users) => {
      users.map((item: any) => {
        console.log(item);
        setOnlineUser((prev) => [...prev, item.userId]);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [state.data.id]);

  const sendMessage = (
    event: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    if (currentChat) {
      let msg = {
        senderId: state.data.id,
        receiverId: currentChat.id,
        text: message,
        room: state.isAdmin ? currentChat.id : state.data.id,
      };
      if (
        onlineUser.includes(currentChat?.id) &&
        onlineUser.includes(state.data.id)
      ) {
        socket.emit("sendMessage", msg);
      } else {
        setMessages((prev) => [...prev, msg]);
        console.log("offline");
      }
    }

    setMessage("");
  };
  const joinRoom = (item: ListUser) => {
    // setName(item.id);
    setCurrentChat(item);
  };
  useEffect(() => {
    if (messages.length) {
      saveToDb();
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveToDb = async () => {
    try {
      await API.patch("/chat", {
        room: state.isAdmin ? currentChat?.id : state.data.id,
        chat: JSON.stringify(messages),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getTChatFromDb = async () => {
    try {
      let res = await API.get("/chat", {
        params: {
          room: state.isAdmin ? currentChat?.id : state.data.id,
        },
      });
      if (res.data.data) {
        let arr = res.data.data;
        setMessages(arr && JSON.parse(arr.message));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentChat) {
      getTChatFromDb();
    }
  }, [state, currentChat]);
  console.log(onlineUser, "oml");
  return (
    <>
      {data && onlineUser.length && state.data ? (
        <div
          className={`container mx-auto shadow-lg rounded-lg ${
            state.isAdmin ? "pt-10" : "pt-32"
          }`}
        >
          <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">{users}</div>
            <div className="w-1/2">
              <input
                type="text"
                name=""
                id=""
                placeholder="search IRL"
                className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
              />
            </div>
            <div className="flex items-center">
              <p className="font-semibold pr-7">
                {currentChat?.profile.fullname}
              </p>
              <img
                src={
                  (currentChat && currentChat?.profile.image) ||
                  icon.defaultProfile
                }
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-row justify-between bg-white">
            <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
              <div className="border-b-2 py-4 px-2">
                <input
                  type="text"
                  placeholder="search chatting"
                  className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                />
              </div>
              <div className="overflow-y-auto flex flex-col-reverse  h-96">
                {data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex  flex-row py-4 px-2 cursor-pointer  items-center border-b-2"
                      onClick={() => joinRoom(item)}
                    >
                      <div className="w-1/4">
                        <img
                          src={item.profile?.image || icon.defaultProfile}
                          className="object-cover h-12 w-12 rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="w-full">
                        <div className="text-lg font-semibold flex">
                          <div
                            className={`rounded-full ${
                              onlineUser.includes(item.id)
                                ? "bg-green-500"
                                : "bg-red-500"
                            }  h-3 w-3`}
                          ></div>
                          {item.profile?.fullname}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full h-99 px-5 flex flex-col justify-between">
              <div
                id="messages"
                className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              >
                {currentChat && messages.length ? (
                  messages.map((item: any, index: number) => {
                    return (item.room === currentChat.id && state.isAdmin) ||
                      !state.isAdmin ? (
                      <div key={index}>
                        <Message
                          message={item.text}
                          name={item.senderId}
                          imgReceiver={
                            currentChat?.profile.image || icon.defaultProfile
                          }
                        />
                        <div ref={messagesEndRef} />
                      </div>
                    ) : (
                      <></>
                    );
                  })
                ) : (
                  <div>not chat selected</div>
                )}
              </div>

              <div className="py-5 ">
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                  <div className="relative flex">
                    <span className="absolute inset-y-0 flex items-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <input
                      type="text"
                      placeholder="Write Something"
                      className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(event) =>
                        event.key === "Enter" ? sendMessage(event) : null
                      }
                    />
                    <div
                      onClick={sendMessage}
                      className="absolute right-0 items-center   flex"
                    >
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-6 w-6 transform rotate-90"
                        >
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <img src={gif.loading} alt="" />
      )}
    </>
  );
};
export default Chat;
