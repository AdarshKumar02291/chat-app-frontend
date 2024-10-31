import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";
import UserChat from "../components/UserChat";
import { useFetchRecipient } from "../hooks/useFetchRecipient";
import { formatDate } from "../utils/services";
import Header from "../components/Header";
import { MessageCircle, Search, Send, Users } from "lucide-react";

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
    onlineUsers,
  } = chatContext;

  //@ts-ignore
  const { recipientUser } = useFetchRecipient(currentChat, user);

  const isUserOnline = onlineUsers?.some(
    (user: any) => user?.userId === recipientUser?.id
  );
  const [textMessage, setTextMessage] = useState("");

  return (
    <>
      <div className="flex  flex-col justify-center items-center justify-center bg-gray-50">
        <Header user={user} />
        <div className="w-screen max-w-7xl h-auto grid grid-cols-12  mt-4">
          <div className="col-span-4 flex flex-col  gap-y-4 border-r">
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
              <div className="rounded-full border-[0.25px] border-[#e4e6ea] px-2 py-1 text-[12px] bg-indigo-600 text-white">
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
          <div className="col-span-8 flex flex-col h-[650px]">
            <div className="w-full bg-[#f6f6f6] h-[80px] flex gap-x-4 px-4 py-2 items-center">
              
                {recipientUser && (
                  <div className="p-4 border-b bg-white flex items-center space-x-4 w-full rounded-lg">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {recipientUser?.firstName?.[0]}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-medium text-gray-900">
                        {recipientUser?.firstName}
                      </h2>
                      {onlineUsers.find(
                        (user: any) => user.userId === recipientUser?.id
                      ) && (
                        <span className="text-xs text-green-500">● Online</span>
                      )}
                    </div>
                  </div>
                )}
            
            </div>

            <div className="flex-grow overflow-y-auto p-2">
              {messages !== null && (
                <div className="w-full flex flex-col gap-y-4">
                  {messages.map((item: any, index: any) => (
                    <div
                      key={index}
                      className={`${
                        item.senderId === user?.id.toString()
                          ? "bg-indigo-600"
                          : "bg-slate-500 self-end"
                      } w-fit rounded-md px-4 py-2 text-white`}
                    >
                      {item.text}
                      <div className="text-[10px]">{formatDate(item.time)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={textMessage}
                  onChange={(e) => setTextMessage(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center space-x-2"
                  onClick={() =>
                    sendTextMessage(
                      textMessage,
                      //@ts-ignore
                      user?.id,
                      //@ts-ignore
                      currentChat?.id,
                      setTextMessage
                    )
                  }
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
