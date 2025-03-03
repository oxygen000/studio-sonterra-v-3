"use client";

import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const translations = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 2025",
    introduction:
      "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.",
    sections: [
      {
        heading: "Information We Collect",
        content:
          "We collect information you provide directly, such as your name, email, and any messages you send us.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use your information to improve our services, communicate with you, and comply with legal obligations.",
      },
      {
        heading: "Security of Your Information",
        content:
          "We take security seriously and implement measures to protect your personal information from unauthorized access.",
      },
      {
        heading: "Your Rights",
        content:
          "You have the right to access, update, or delete your information. Contact us if you have any concerns.",
      },
    ],
    contact:
      "If you have any questions about this Privacy Policy, please contact us at support@example.com.",
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: فبراير 2025",
    introduction:
      "خصوصيتك مهمة بالنسبة لنا. توضح سياسة الخصوصية هذه كيف نقوم بجمع معلوماتك واستخدامها وحمايتها.",
    sections: [
      {
        heading: "المعلومات التي نقوم بجمعها",
        content:
          "نجمع المعلومات التي تقدمها مباشرة، مثل اسمك، بريدك الإلكتروني، وأي رسائل ترسلها إلينا.",
      },
      {
        heading: "كيف نستخدم معلوماتك",
        content:
          "نستخدم معلوماتك لتحسين خدماتنا، والتواصل معك، والامتثال للالتزامات القانونية.",
      },
      {
        heading: "أمان معلوماتك",
        content:
          "نأخذ الأمان على محمل الجد ونتخذ التدابير اللازمة لحماية معلوماتك الشخصية من الوصول غير المصرح به.",
      },
      {
        heading: "حقوقك",
        content:
          "لديك الحق في الوصول إلى معلوماتك أو تحديثها أو حذفها. تواصل معنا إذا كانت لديك أي استفسارات.",
      },
    ],
    contact:
      "إذا كان لديك أي استفسارات حول سياسة الخصوصية هذه، يرجى الاتصال بنا على support@example.com.",
  },
};

export default function PrivacyPolicy() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = gsap.utils.toArray(".terms-section");
    gsap.fromTo(
      sections,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-yellow-500 text-center">{t.title}</h1>
      <p className="text-yellow-400 text-sm text-center">{t.lastUpdated}</p>
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-center">{t.introduction}</p>

      {t.sections.map((section, index) => (
        <div key={index} className="terms-section mb-8 opacity-0">
          <h2 className="text-xl font-semibold mb-4 text-yellow-500">{section.heading}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
        </div>
      ))}

      <p className="mt-6 text-gray-700 dark:text-gray-300 text-center">{t.contact}</p>
    </div>
  );
}
