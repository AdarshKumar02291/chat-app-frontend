import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL, getRequest } from "../utils/services";

// Define types for the context value
interface ChatContextType {
  userChats: any;
  isUserChatsLoading: boolean;
  userChatsError: boolean | any;
  updateCurrentChat: (chat: any) => void;
  messages : any,
  isMessagesLoading:any
  messagesError:any
  currentChat:any
}

// Define props for the provider component
interface ChatContextProviderProps {
  children: ReactNode;
  user: any; // Replace `any` with a specific type for `user` if you have one
}

// Create the context with a default value
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  children,
  user,
}) => {
  const [userChats, setUserChats] = useState<any>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<boolean | any>(false);

  const [currentChat, setCurrentChat] = useState<any>(null);

  const [messages, setMessages] = useState<any>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
  const [messagesError, setMessagesError] = useState<boolean | any>(null);

  console.log("messages",messages)

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        setIsUserChatsLoading(true);
        setUserChatsError(false);
        try {
          const response = await getRequest(
            `${BASE_URL}/v1/chat/all_chat/${user.id}`
          );
          setIsUserChatsLoading(false);
          if (response.error) {
            setUserChatsError(response.error);
          } else {
            setUserChats(response);
          }
        } catch (error) {
          setIsUserChatsLoading(false);
          setUserChatsError(error);
        }
      }
    };
    getUserChats();
  }, [user]);

  const updateCurrentChat = useCallback((chat: any) => {
    setCurrentChat(chat);
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return; // Exit early if currentChat is null
  
      setIsMessagesLoading(true);
      setMessagesError(null);
  
      try {
        const response = await getRequest(
          `${BASE_URL}/v1/message/get_message/${currentChat.id}`
        );
  
        console.log("Message API response:", response); // Log the response for debugging
  
        setIsMessagesLoading(false);
  
        if (response.error) {
          setMessagesError(response.error);
        } else {
          setMessages(response); // Assuming response is an array or object containing messages
        }
      } catch (error) {
        setIsMessagesLoading(false);
        setMessagesError(error);
      }
    };
  
    getMessages();
  }, [currentChat]);
  
  console.log("currentChat:", currentChat);
  console.log("messages:", messages); // Add this log to track messages state changes
  

  console.log("currentChat:", currentChat);

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
        messagesError
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
