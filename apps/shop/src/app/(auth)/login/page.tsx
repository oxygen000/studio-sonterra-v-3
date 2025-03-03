"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import { RootState } from "@/store/store";

const translations = {
  en: {
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Full Name",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    submit: "Submit",
    switchToRegister: "Need an account?",
    switchToLogin: "Already have an account?"
  },
  ar: {
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم الكامل",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    submit: "تأكيد",
    switchToRegister: "تحتاج إلى حساب؟",
    switchToLogin: "لديك حساب بالفعل؟"
  }
};

export default function AuthPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const [isLogin, setIsLogin] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    gsap.from(".auth-form", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rememberMe });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 dark:text-white text-center">
            {isLogin ? t.login : t.register}
          </h2>
          <form onSubmit={handleSubmit} className="auth-form space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t.name}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder={t.email}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder={t.password}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} />
                  {t.rememberMe}
                </label>
                <Link href="/forgot-password" className="text-blue-500 hover:underline">
                  {t.forgotPassword}
                </Link>
              </div>
            )}
            <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
              {t.submit}
              <ArrowRight size={20} />
            </button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center mt-4 text-gray-600 dark:text-gray-400 hover:text-yellow-500">
            {isLogin ? t.switchToRegister : t.switchToLogin}
          </button>
        </div>
      </div>
    </div>
  );
}
