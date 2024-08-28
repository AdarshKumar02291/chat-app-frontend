import React, {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL, postRequest, getRequest } from "../utils/services";
import { json } from "react-router";

// Define types for the context value
interface ChatContextType {
  userChats: any;
  isUserChatsLoading: boolean;
  userChatsError: boolean;
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
  const [userChatsError, setUserChatsError] = useState<boolean>(false);

  useEffect(() => {

    
    const getUserChats = async () => {
      if (user?.id) {
        
        setIsUserChatsLoading(true);
        setUserChatsError(false);
        const response = await getRequest(
          `${BASE_URL}/v1/chat/all_chat/${user.id}`
        );
        console.log(response);
        setIsUserChatsLoading(false);
        if (response.error) return setUserChatsError(response);
        setUserChats(response);
      }
      
    };
    getUserChats();
  }, [user]);

  return (
    <ChatContext.Provider
      value={{ userChats, isUserChatsLoading, userChatsError }}
    >
      {children}
    </ChatContext.Provider>
  );
};
