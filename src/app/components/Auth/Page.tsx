"use client";

import { useState } from "react";
import { AuthLayout } from "./components/AuthLayout";
import { AuthTabs } from "./components/AuthTabs";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout>
      <AuthTabs isLogin={isLogin} onChange={setIsLogin} />
      <div className="p-8 relative min-h-[300px]">
        <LoginForm visible={isLogin} />
        <RegisterForm visible={!isLogin} onSuccess={() => setIsLogin(true)} />
      </div>
    </AuthLayout>
  );
}
