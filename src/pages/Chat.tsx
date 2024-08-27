import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { ChatContext } from "../context/Chatcontext";

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

  const { userChats, isUserChatsLoading, userChatsError } = chatContext;
  
  console.log(userChats)

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
              <div className="flex items-center gap-x-3 p-2 bg-[#f6f6f6] h-[90px] px-2 py-2 ">
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
              </div>
            </div>
          </div>
          <div className="col-span-8 ">
            <div className="w-full bg-[#f6f6f6] h-[80px] flex gap-x-4 px-4 py-2 items-center">
              <div className="bg-red-500 h-[50px] w-[50px] rounded-full"></div>
              <div>
                <div>Parikh</div>
                <div className="text-[12px]">Typing...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
