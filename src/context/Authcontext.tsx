import {
  createContext,
  useState,
  ReactNode,
  FC,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL, postRequest } from "../utils/services";

interface User {
  name: string;
}

interface Register {
  name: string;
  email: string;
}

interface Login {
  email: string;
}

interface AuthContextType {
  user: User | null; // Allow user to be null initially
  register: Register;
  loginInfo: Login;
  updateRegisterInfo: (info: Register) => void;
  registerUser: () => void;
  registerError: null | any;
  isRegisterLoading: boolean; // Changed from `any` to `boolean`
  loginError: null | any;
  updateLoginInfo: (info: Login) => void;
  isLoginLoading: boolean; // Changed from `any` to `boolean`
  loginUser: () => void; // Added loginUser type
  logoutUser: () => void; // Added logoutUser type
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Initialize as null
  const [registerError, setRegisterError] = useState<null | any>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [register, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
  });

  const [loginInfo, setLoginInfo] = useState<Login>({
    email: "",
  });

  const [loginError, setLoginError] = useState<null | any>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info: Login) => {
    setLoginInfo(info);
  }, []);

  const registerUser = useCallback(async () => {
    setIsRegisterLoading(true);
    setRegisterError(null);
    const res = await postRequest(
      `${BASE_URL}/v1/user/signup`,
      JSON.stringify(register)
    );
    setIsRegisterLoading(false);
    if (res.error) {
      return setRegisterError(res);
    }
    localStorage.setItem("User", JSON.stringify(res));
    setUser(res);
  }, [register]);

  const loginUser = useCallback(async () => {
   
    setIsLoginLoading(true);
    setLoginError(null);
    const res = await postRequest(
      `${BASE_URL}/v1/user/signin`,
      JSON.stringify(loginInfo)
    );
    setIsLoginLoading(false);
    if (res.error) {
      return setLoginError(res);
    }
    localStorage.setItem("User", JSON.stringify(res));
    setUser(res);
  }, [loginInfo]);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser); // Set user if parsing is successful
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

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
