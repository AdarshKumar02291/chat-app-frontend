import {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
  useContext,
} from "react";
import { BASE_URL, getRequest, postRequest } from "../utils/services";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "./Authcontext";

interface Chat {
  id: string;
  members: string[];
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  time: string;
}

interface ChatContextType {
  userChats: Chat[] | null;
  isUserChatsLoading: boolean;
  userChatsError: string | null;
  currentChat: Chat | null;
  updateCurrentChat: (chat: Chat) => void;
  messages: Message[] | null;
  isMessagesLoading: boolean;
  messagesError: string | null;
  sendTextMessage: (
    textMessage: string,
    sender: string,
    currentChatId: string,
    setTextMessage: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  onlineUsers: any;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("ChatContext must be used within AuthContextProvider");
  }
  const { user } = authContext;

  const [userChats, setUserChats] = useState<Chat[] | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState<string | null>(null);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Initialize socket connection
  useEffect(() => {
    if (!user?.id) return;
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.id]);

  useEffect(() => {
    if (socket === null) return;
    socket?.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => setOnlineUsers(res));

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    
    const recipientId = currentChat?.members?.find(
      (id) => id !== user?.id.toString()
    );
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  useEffect(() => {
    
    socket?.on("getMessage", (res) => {
      setMessages((prev: any) => [...prev, res]);
    });
    console.log(messages);
    return () => {
      socket?.off("getMessage");
    };
  }, [socket, currentChat, newMessage]);

  // Fetch user chats
  useEffect(() => {
    const getUserChats = async () => {
      if (!user?.id) return;

      setIsUserChatsLoading(true);
      setUserChatsError(null);

      try {
        const response = await getRequest(
          `${BASE_URL}/v1/chat/all_chat/${user.id}`
        );

        if (response.error) {
          setUserChatsError(response.error);
        } else {
          setUserChats(response);
        }
      } catch (error) {
        setUserChatsError(String(error));
      } finally {
        setIsUserChatsLoading(false);
      }
    };

    getUserChats();
  }, [user?.id]);

  // Fetch messages when current chat changes
  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat?.id) return;

      setIsMessagesLoading(true);
      setMessagesError(null);

      try {
        const response = await getRequest(
          `${BASE_URL}/v1/message/get_message/${currentChat.id}`
        );

        if (response.error) {
          setMessagesError(response.error);
        } else {
          setMessages(response);
        }
      } catch (error) {
        setMessagesError(String(error));
      } finally {
        setIsMessagesLoading(false);
      }
    };

    getMessages();
  }, [currentChat?.id]);

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
      if (!textMessage.trim()) {
        console.log("Message cannot be empty");
        return;
      }

      try {
        const response = await postRequest(
          `${BASE_URL}/v1/message/create`,
          JSON.stringify({
            chatId: currentChatId,
            senderId: sender.toString(),
            text: textMessage.trim(),
          })
        );

        if (response.error) {
          console.error("Error sending message:", response.error);
          return;
        }

        setNewMessage(response);
        setMessages((prev) => (prev ? [...prev, response] : [response]));
        setTextMessage("");

        // Emit socket event for real-time updates
        if (socket) {
          socket.emit("sendMessage", response);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [socket]
  );

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
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
