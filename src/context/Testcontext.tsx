import { createContext } from "react";

export const TestContext = createContext<any>(undefined);

export const TestContextProvider = ({ children }: any) => {
  const abc = 10;
  return (
    <TestContext.Provider value={{ abc }}>{children}</TestContext.Provider>
  );
};
