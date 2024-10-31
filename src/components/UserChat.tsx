import { useFetchRecipient } from "../hooks/useFetchRecipient";

function UserChat({ chat, user }: any) {
  const { recipientUser } = useFetchRecipient(chat, user);
  

  return (
    <>
      <div className="flex items-center gap-x-3 p-2 bg-[#f6f6f6] h-[90px] px-2 py-2 border-b">
        
        <div className="w-[40px] h-[40px] bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {recipientUser?.firstName?.[0]}
                      </span>
                    </div>
        <div className="max-w-[400px]">
          <div className="flex items-center gap-x-2 text-[12px]">
            <div className="">{recipientUser?.firstName}</div>{" "}
            <div className="p-1 rounded-full h-1 w-1 bg-black"></div>
            <div>11 days</div>
          </div>
          <div className="text-[14px]">
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserChat;
