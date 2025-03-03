"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Account Verified!",
    message: "Your email has been successfully verified.",
    home: "Go to Home",
  },
  ar: {
    title: "تم التحقق من الحساب!",
    message: "تم التحقق من بريدك الإلكتروني بنجاح.",
    home: "الذهاب إلى الصفحة الرئيسية",
  }
};

export default function AccountConfirmationPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{t.title}</h2>
        <p className="text-lg dark:text-gray-300 mb-6">{t.message}</p>
        <Link href="/" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-md">
          {t.home}
        </Link>
      </div>
    </div>
  );
}
