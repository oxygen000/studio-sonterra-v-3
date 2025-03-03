"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Lock, ArrowRight } from "lucide-react";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Reset Password",
    message: "Enter your new password below.",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    submit: "Reset Password",
  },
  ar: {
    title: "إعادة تعيين كلمة المرور",
    message: "أدخل كلمة المرور الجديدة أدناه.",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    submit: "إعادة تعيين",
  }
};

export default function ResetPasswordPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password Reset:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{t.message}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder={t.newPassword}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder={t.confirmPassword}
              className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
            {t.submit}
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
