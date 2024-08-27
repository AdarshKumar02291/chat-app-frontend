import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

function Login() {
  const authContext = useContext(AuthContext);

  // Handle case where context is undefined
  if (!authContext) {
    return <div>Error: AuthContext not provided!</div>;
  }

  const {
    loginInfo,
    loginError,
    updateLoginInfo,
    isLoginLoading,
    loginUser,
    logoutUser,
  } = authContext;

  return (
    <div className="w-screen h-screen bg-blue-500 overflow-hidden flex flex-col items-center justify-center">
      <div className="flex flex-col gap-y-4 w-[400px] items-center">
        <input
          type="text"
          className="w-full"
          placeholder="Email"
          onChange={(e) => {
            updateLoginInfo({...loginInfo, email: e.target.value });
          }}
        />
         <input
          type="text"
          className="w-full"
          placeholder="Password"
          onChange={(e) => {
            updateLoginInfo({...loginInfo, password: e.target.value });
          }}
        />
        <button className="bg-yellow-500 w-fit p-2" onClick={loginUser}>{isLoginLoading?"Loading" : "Login"}</button>
      </div>
    </div>
  );
}

export default Login;
