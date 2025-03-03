"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Forgot Password",
    message: "Enter your email address to receive a reset link.",
    placeholder: "Enter your email",
    submit: "Send Reset Link",
  },
  ar: {
    title: "استعادة كلمة المرور",
    message: "أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين.",
    placeholder: "أدخل بريدك الإلكتروني",
    submit: "إرسال رابط الاستعادة",
  }
};

export default function ForgotPassword() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password link sent to:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{t.message}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder={t.placeholder}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
            {t.submit}
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
