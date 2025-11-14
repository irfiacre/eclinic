"use client";
import React, { useState } from "react";
import LogoComponent from "@/src/components/logo/LogoComponent";
import { useRouter } from "next/navigation";
import LoginForm from "../forms/LoginForm";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const router = useRouter()

  const handleLoginBtn = async (email: string, password: string) => {
    setLoading(true);
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (result.status !== 200) {
      setLoginError("Invalid Credentials");
    }else{
      router.replace("/cases");
    }
    setLoading(false);
  };
  return (
    <main className="flex flex-row">
      <div className="w-full flex flex-col items-center gap-2">
        <div className="mt-28">
          <LogoComponent />
        </div>
        <div>
          <p className="text-textDarkColor text-2xl font-semibold">
            Login to Dashboard
          </p>
          <p className="py-2 text-textLightColor text-sm text-center">
            Complete details to sign in
          </p>
        </div>
        <div className="w-full flex justify-center">
          <LoginForm
            handleLoginBtn={handleLoginBtn}
            loading={loading}
            loginError={loginError}
          />
        </div>
      </div>
      <div className="max-sm:hidden w-full bg-taxiMeter h-lvh bg-cover bg-no-repeat bg-center brightness-50"></div>
    </main>
  );
};

export default LoginPage;
