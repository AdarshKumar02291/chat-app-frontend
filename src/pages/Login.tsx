import React, { useState, useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { User, Mail, Lock, LogIn, UserPlus } from "lucide-react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const authContext = useContext(AuthContext);

  // Handle case where context is undefined
  if (!authContext) {
    return <div>Error: AuthContext not available.</div>;
  }

  const {
    // Login-related context values
    loginInfo,
    updateLoginInfo,
    loginUser,
    loginError,
    isLoginLoading,

    // Register-related context values
    register,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = authContext;

  // Render login card
  const renderLoginCard = () => (
    <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center">Login</h2>
      
      {loginError && (
        <div className="bg-red-500/20 text-red-500 px-4 py-3 rounded-lg mt-4 text-center">
          {loginError}
        </div>
      )}

      <div className="space-y-4 mt-6">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            type="email"
            placeholder="Email"
            value={loginInfo.email || ''}
            onChange={(e) => {
              updateLoginInfo({...loginInfo, email: e.target.value });
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            type="password"
            placeholder="Password"
            value={loginInfo.password || ''}
            onChange={(e) => {
              updateLoginInfo({...loginInfo, password: e.target.value });
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <button 
          onClick={loginUser}
          disabled={isLoginLoading}
          className="w-full bg-white text-indigo-600 py-3 rounded-lg hover:bg-white/90 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isLoginLoading ? (
            <span>Logging in...</span>
          ) : (
            <>
              <LogIn className="mr-2" />
              <span>Login</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-white/70">
          Don't have an account?{' '}
          <button 
            onClick={() => setIsLogin(false)}
            className="text-white underline hover:text-white/80 transition"
          >
            Register
          </button>
        </p>
      </div>

      <div className="text-center mt-4">
        <a href="#" className="text-white/70 hover:text-white transition text-sm">
          Forgot Password?
        </a>
      </div>
    </div>
  );

  // Render registration card
  const renderRegisterCard = () => (
    <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center">Create Account</h2>
      
      {registerError?.error && (
        <div className="bg-red-500/20 text-red-500 px-4 py-3 rounded-lg mt-4 text-center">
          {registerError.error}
        </div>
      )}

      <div className="space-y-4 mt-6">
        <div className="flex space-x-4">
          <div className="relative w-1/2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="First Name"
              value={register.firstName || ''}
              onChange={(e) => {
                updateRegisterInfo({ ...register, firstName: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div className="relative w-1/2">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              placeholder="Last Name"
              value={register.lastName || ''}
              onChange={(e) => {
                updateRegisterInfo({ ...register, lastName: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            type="email"
            placeholder="Email"
            value={register.email || ''}
            onChange={(e) => {
              updateRegisterInfo({ ...register, email: e.target.value });
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
          <input
            type="password"
            placeholder="Password"
            value={register.password || ''}
            onChange={(e) => {
              updateRegisterInfo({ ...register, password: e.target.value });
            }}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <button 
          onClick={registerUser}
          disabled={isRegisterLoading}
          className="w-full bg-white text-indigo-600 py-3 rounded-lg hover:bg-white/90 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isRegisterLoading ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <UserPlus className="mr-2" />
              <span>Register</span>
            </>
          )}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-white/70">
          Already have an account?{' '}
          <button 
            onClick={() => setIsLogin(true)}
            className="text-white underline hover:text-white/80 transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Information Panel */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center relative overflow-hidden">
        <div className="text-white text-center z-10 px-8">
          <h1 className="text-4xl font-bold mb-4">
            {isLogin ? "Welcome Back!" : "Get Started"}
          </h1>
          <p className="text-xl mb-8">
            {isLogin 
              ? "Connect with your favorite people" 
              : "Create your account and start connecting"
            }
          </p>
        </div>
        
        {/* Illustration SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 400 300" 
          className="absolute opacity-20 -right-20 -bottom-20 w-[600px] h-[600px]"
        >
          {isLogin ? (
            // Chat-like illustration for login
            <>
              <path 
                d="M50 100 Q200 50, 350 100 T650 100" 
                fill="none" 
                stroke="white" 
                strokeWidth="4"
              />
              <rect x="100" y="120" width="200" height="100" rx="10" fill="rgba(255,255,255,0.1)" />
              <circle cx="130" cy="170" r="20" fill="rgba(255,255,255,0.2)" />
              <rect x="160" y="150" width="120" height="40" rx="5" fill="rgba(255,255,255,0.1)" />
            </>
          ) : (
            // Network-like illustration for register
            <>
              <circle cx="200" cy="150" r="100" fill="rgba(255,255,255,0.1)" />
              <line x1="100" y1="150" x2="300" y2="150" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
              <circle cx="100" cy="150" r="20" fill="rgba(255,255,255,0.2)" />
              <circle cx="300" cy="150" r="20" fill="rgba(255,255,255,0.2)" />
              <path 
                d="M150 100 Q200 50, 250 100 T350 100" 
                fill="none" 
                stroke="white" 
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </>
          )}
        </svg>
      </div>

      {/* Right Side - Authentication Form */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6">
          {isLogin ? renderLoginCard() : renderRegisterCard()}
          
          {!isLogin && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                By registering, you agree to our{' '}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;