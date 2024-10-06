import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";
import UserChat from "../components/UserChat";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { formatDate } from "../utils/services";

function Chat() {
  const authContext = useContext(AuthContext);

  // Handle case where context is undefined
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }

  const { user } = authContext;

  const chatContext = useContext(ChatContext);

  // Handle case where ChatContext is undefined
  if (!chatContext) {
    return <div>Error: ChatContext is not available.</div>;
  }

  const {
    userChats,
    isUserChatsLoading,
    userChatsError,
    updateCurrentChat,
    messages,
    currentChat,
    sendTextMessage,
  } = chatContext;

  //@ts-ignore
  const { recipientUser } = useFetchRecipient(currentChat, user);

  const [textMessage, setTextMessage] = useState("");
  console.log(chatContext);

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-screen max-w-[1440px] h-screen grid grid-cols-12">
          <div className="col-span-4 flex flex-col gap-y-4 border-r">
            <div className="mt-4 w-full">
              <div className="w-10/12 h-[50px] border border-[1px] border-[#d2d2d2] rounded-lg bg-[#f6f6f6] flex items-center ">
                <input
                  type="text"
                  placeholder="Search"
                  className=" px-4 bg-inherit focus:outline-none focus:border-transparent"
                />
              </div>
            </div>
            <div className="w-10/12 flex gap-x-2 mt-4">
              <div className="rounded-full border-[0.25px] border-[#e4e6ea] px-2 py-1 text-[12px] bg-[#ef6144] text-white">
                All
              </div>
              <div className="rounded-full border-[0.25px] border-[#e4e6ea] px-2 py-1 text-[12px]">
                Unread
              </div>
              <div className="rounded-full border-[0.25px] border-[#e4e6ea] px-2 py-1 text-[12px]">
                Archived
              </div>
              <div className="rounded-full border-[0.25px] border-[#e4e6ea] px-2 py-1 text-[12px]">
                Blocked
              </div>
            </div>
            <div className="">
              {/* <div className="flex items-center gap-x-3 p-2 bg-[#f6f6f6] h-[90px] px-2 py-2 ">
                <div className="bg-red-500 h-[40px] w-[70px] rounded-full"></div>
                <div>
                  <div className="flex items-center gap-x-2 text-[12px]">
                    <div className="">Parikh</div>{" "}
                    <div className="p-1 rounded-full h-1 w-1 bg-black"></div>
                    <div>11 days</div>
                  </div>
                  <div className="text-[14px]">
                    <div>
                      Parikh: third hello i wanted to know about the frontend
                      position that is open in your company i believe i have the
                      relevant skill{" "}
                    </div>
                  </div>
                </div>
                
              </div> */}
              <div>
                {isUserChatsLoading ? (
                  <>
                    <div>Loading chats ....</div>
                  </>
                ) : (
                  <div>
                    {userChats?.map((item: any, index: any) => {
                      return (
                        <div
                          onClick={() => updateCurrentChat(item)}
                          key={index}
                        >
                          <UserChat chat={item} user={user}></UserChat>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-8 flex flex-col h-[700px]">
            <div className="w-full bg-[#f6f6f6] h-[80px] flex gap-x-4 px-4 py-2 items-center">
              <div className="bg-red-500 h-[50px] w-[50px] rounded-full"></div>
              <div>
                <div>{recipientUser?.firstName}</div>
                <div className="text-[12px]">Typing...</div>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-2">
              {messages !== null && (
                <div className="w-full flex flex-col gap-y-4">
                  {messages.map((item: any, index: any) => (
                    <div
                      key={index}
                      className={`${
                        (item.senderId) === user?.id
                          ? "bg-blue-500"
                          : "bg-green-500 self-end"
                      } w-fit rounded-md px-4 py-2`}
                    >
                      {item.text}
                      <div className="text-[10px]">{formatDate(item.time)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-fit flex-shrink-0">
              <input
                type="text"
                placeholder="Type a message"
                className="w-full border-t border-gray-300 p-2"
                value={textMessage}
                onChange={(e) => {
                  const { value } = e.target;
                  setTextMessage(value);
                }}
              />
              <button
                className="bg-slate-600 px-2 py-1 rounded-md mt-2 text-white"
                onClick={() =>
                  sendTextMessage(
                    textMessage,
                    //@ts-ignore
                    user?.id, //@ts-ignore
                    currentChat?.id,
                    setTextMessage
                  )
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
