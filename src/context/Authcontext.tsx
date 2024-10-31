import {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL, postRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  firstName?: string;
  email: string;
}

interface Register {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  register: Register;
  loginInfo: Login;
  updateRegisterInfo: (info: Register) => void;
  registerUser: () => Promise<void>;
  registerError: string | null;
  isRegisterLoading: boolean;
  loginError: string | null;
  updateLoginInfo: (info: Login) => void;
  isLoginLoading: boolean;
  loginUser: () => Promise<void>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [register, setRegisterInfo] = useState<Register>({
    firstName: "",
    email: "",
    lastName: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState<Login>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedData = JSON.parse(storedUser);
        const userData = parsedData.user || parsedData;
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("User");
      }
    }
  }, []);

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info: Login) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async () => {
    setIsRegisterLoading(true);
    setRegisterError(null);
    
    try {
      const response = await postRequest(
        `${BASE_URL}/v1/user/signup`,
        JSON.stringify(register)
      );

      if (response.error) {
        setRegisterError(response.error);
        return;
      }

      const userData = response.user || response;
      localStorage.setItem("User", JSON.stringify({ user: userData }));
      setUser(userData);
      navigate("/chat");
    } catch (error) {
      setRegisterError(String(error));
    } finally {
      setIsRegisterLoading(false);
    }
  }, [register, navigate]);

  const loginUser = useCallback(async () => {
    setIsLoginLoading(true);
    setLoginError(null);
    
    try {
      const response = await postRequest(
        `${BASE_URL}/v1/user/login`,
        JSON.stringify(loginInfo)
      );

      if (response.error) {
        setLoginError(response.error);
        
        return;
      }

      const userData = response.user || response;
      localStorage.setItem("User", JSON.stringify({ user: userData }));
      setUser(userData);
      navigate("/chat");
    } catch (error) {
      setLoginError(String(error));
    } finally {
      setIsLoginLoading(false);
    }
  }, [loginInfo, navigate]);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        loginInfo,
        loginError,
        updateLoginInfo,
        isLoginLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};