"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Enter OTP Code",
    message: "We've sent a verification code to your email.",
    placeholder: "Enter OTP",
    submit: "Verify",
    resend: "Resend Code",
  },
  ar: {
    title: "أدخل رمز التحقق",
    message: "لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني.",
    placeholder: "أدخل رمز التحقق",
    submit: "تحقق",
    resend: "إعادة إرسال الرمز",
  }
};

export default function OTPPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP Submitted:", otp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white text-center">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{t.message}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t.placeholder}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center text-xl"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg">
            {t.submit}
          </button>
        </form>
        <button className="w-full text-center mt-4 text-gray-600 dark:text-gray-400 hover:text-yellow-500">
          {t.resend}
        </button>
      </div>
    </div>
  );
}
