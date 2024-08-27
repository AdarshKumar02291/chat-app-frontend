import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

function Register() {
  const authContext = useContext(AuthContext);

  // Handle case where context is undefined
  if (!authContext) {
    return <div>Error: AuthContext is not available.</div>;
  }

  const {
    register,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = authContext;
  return (
    <>
      <div className="w-screen h-screen bg-blue-500 overflow-hidden flex flex-col items-center justify-center">
        <div>Login</div>
        <div className="flex flex-col gap-y-4 w-[400px] items-center">
          <input
            type="text"
            className="w-full"
            placeholder="first Name"
            onChange={(e) => {
              updateRegisterInfo({ ...register, firstName: e.target.value });
            }}
          />
          <input
            type="text"
            className="w-full"
            placeholder="Last Name"
            onChange={(e) => {
              updateRegisterInfo({ ...register, lastName: e.target.value });
            }}
          />
          <input
            type="text"
            className="w-full"
            onChange={(e) => {
              updateRegisterInfo({ ...register, email: e.target.value });
            }}
          />
          <input
            type="text"
            className="w-full"
            placeholder="password"
            onChange={(e) => {
              updateRegisterInfo({ ...register, password: e.target.value });
            }}
          />
          <button className="bg-yellow-500 w-fit p-2" onClick={registerUser}>
            {isRegisterLoading ? "Loading" : "Register"}
          </button>
          {registerError?.error && (
            <>
              <div>An error occured</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
