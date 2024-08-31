import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL, getRequest, postRequest } from "../utils/services";

// Define types for the context value
interface Chat {
  id: string;
  members: Array<string>; // Example type, replace with your actual Chat properties
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  time: string; // Adjust this to `Date` if your API returns a date object
}

interface User {
  id: string;
  firstName: string;
  // Add other user properties here
}

interface ChatContextType {
  userChats: Chat[] | null;
  isUserChatsLoading: boolean;
  userChatsError: boolean | string | null;
  currentChat: Chat | null;
  updateCurrentChat: (chat: Chat) => void;
  messages: Message[] | null;
  isMessagesLoading: boolean;
  messagesError: boolean | string | null;
  sendTextMessage: (
    textMessage: string,
    sender: string,
    currentChatId: string,
    setTextMessage: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
}

interface ChatContextProviderProps {
  children: ReactNode;
  user: User | null; // Adjusted to `User | null` to handle initial null state
}

// Create the context with a default value
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  children,
  user,
}) => {
  const [userChats, setUserChats] = useState<Chat[] | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<boolean | string | null>(null);

  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
  const [messagesError, setMessagesError] = useState<boolean | string | null>(null);

  const [sendMessageError, setSendMessageError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState<Message | null>(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        try {
          const response = await getRequest(
            `${BASE_URL}/v1/chat/all_chat/${user.id}`
          );
          setIsUserChatsLoading(false);
          if (response.error) {
            setUserChatsError(response.error);
          } else {
            setUserChats(response as Chat[]); // Cast the response to Chat[]
          }
        } catch (error) {
          setIsUserChatsLoading(false);
          setUserChatsError(String(error));
        }
      }
    };
    getUserChats();
  }, [user]);

  const updateCurrentChat = useCallback((chat: Chat) => {
    setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(
    async (
      textMessage: string,
      sender: string,
      currentChatId: string,
      setTextMessage: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (!textMessage) return console.log("enter message");

      try {
        const res = await postRequest(
          `${BASE_URL}/v1/message/create`,
          JSON.stringify({
            chatId: currentChatId,
            senderId: sender,
            text: textMessage,
          })
        );

        if (res.error) {
          setSendMessageError(res.error);
          return;
        }
        setNewMessage(res as Message);
        setTextMessage("");
        setMessages((prev) => prev ? [...prev, res as Message] : [res as Message]);
      } catch (error) {
        setSendMessageError(String(error));
      }
    },
    []
  );

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return; // Exit early if currentChat is null

      setIsMessagesLoading(true);
      setMessagesError(null);

      try {
        const response = await getRequest(
          `${BASE_URL}/v1/message/get_message/${currentChat.id}`
        );

        setIsMessagesLoading(false);

        if (response.error) {
          setMessagesError(response.error);
        } else {
          setMessages(response as Message[]); // Assuming response is an array of messages
        }
      } catch (error) {
        setIsMessagesLoading(false);
        setMessagesError(String(error));
      }
    };

    getMessages();
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
