'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const translations = {
  en: {
    title: "Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    backHome: "Go to Home"
  },
  ar: {
    title: "الصفحة غير موجودة",
    description: "عذرًا، الصفحة التي تبحث عنها غير موجودة.",
    backHome: "العودة إلى الرئيسية"
  }
};

function NotFound() {
  const router = useRouter();
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-4xl text-yellow-500 font-bold mb-4">404 - {t.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{t.description}</p>
      <button
        onClick={() => router.push('/')}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg"
      >
        {t.backHome}
      </button>
    </div>
  );
}

export default NotFound;
