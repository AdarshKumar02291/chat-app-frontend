import { createContext, useState, ReactNode, FC, useCallback } from "react";

interface User {
  name: string;
}
interface Register {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User;
  register: Register;
  updateRegisterInfo: (info: Register) => void;
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
  const [user, setUser] = useState<User>({ name: "Charles" });
  const [register, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
  });

  const updateRegisterInfo = useCallback((info:any)=>{
    setRegisterInfo(info);

  },[])

  console.log("registerInfo", register)

  return (
    <AuthContext.Provider value={{ user, register,updateRegisterInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
