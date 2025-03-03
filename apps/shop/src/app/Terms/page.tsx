"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Terms of Use",
    sections: [
      { title: "Agreement to Terms", content: "By accessing our website, you agree to these terms of use..." },
      { title: "Privacy Policy", content: "Your privacy is important to us. Please review our Privacy Policy..." },
      { title: "User Accounts", content: "When you create an account with us, you guarantee that the information..." },
    ],
  },
  ar: {
    title: "شروط الاستخدام",
    sections: [
      { title: "الموافقة على الشروط", content: "بالوصول إلى موقعنا، فإنك توافق على شروط الاستخدام هذه..." },
      { title: "سياسة الخصوصية", content: "خصوصيتك مهمة بالنسبة لنا. يرجى مراجعة سياسة الخصوصية..." },
      { title: "حسابات المستخدمين", content: "عند إنشاء حساب معنا، فإنك تضمن أن المعلومات..." },
    ],
  },
};

const TermsPage = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.from(".terms-section", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">{t.title}</h1>
      {t.sections.map((section, index) => (
        <div key={index} className="terms-section mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">{section.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsPage;
