import React from "react";
import Logo from "../components/logo";
import LoginForm from "../components/loginForm";
import { useLogin } from "../hooks/useLogin";

const LoginPage: React.FC = () => {
  const { email, setEmail, password, setPassword, isLoading, handleLogin } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center w-full">
          <Logo />
        </div>
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLoading={isLoading}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
