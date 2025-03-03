'use client';

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

const translations = {
  en: {
    title: "Something went wrong",
    message: "An unexpected error has occurred. Please try again later.",
    backToHome: "Go back to Home",
  },
  ar: {
    title: "حدث خطأ ما",
    message: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
    backToHome: "العودة إلى الصفحة الرئيسية",
  },
};

function ErrorPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold text-red-600">{t.title}</h1>
      <p className="text-gray-600 mt-4">{t.message}</p>
      <Link href="/" className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
        {t.backToHome}
      </Link>
    </div>
  );
}

export default ErrorPage;
