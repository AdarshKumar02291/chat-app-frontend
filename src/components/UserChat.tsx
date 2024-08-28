import { useFetchRecipient } from "../hooks/useFetchRecipient";

function UserChat({ chat, user }: any) {
  const { recipientUser } = useFetchRecipient(chat, user);
  console.log(recipientUser);

  return (
    <>
      <div className="flex items-center gap-x-3 p-2 bg-[#f6f6f6] h-[90px] px-2 py-2 ">
        <div className="bg-red-500 h-[40px] w-[40px] rounded-full"></div>
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
