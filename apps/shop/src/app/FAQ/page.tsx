"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days within the country."
      },
      {
        question: "What is your return policy?",
        answer: "We offer free returns within 30 days of purchase."
      }
    ]
  },
  ar: {
    title: "الأسئلة الشائعة",
    faqs: [
      {
        question: "كم تستغرق عملية الشحن؟",
        answer: "يستغرق الشحن القياسي 3-5 أيام عمل داخل البلاد."
      },
      {
        question: "ما هي سياسة الإرجاع؟",
        answer: "نقدم إرجاع مجاني خلال 30 يوماً من الشراء."
      }
    ]
  }
};

export default function FAQPage() {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.from(".faq-item", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-12 text-center dark:text-white">
        {t.title}
      </h1>
      <div className="space-y-4">
        {t.faqs.map((faq, index) => (
          <div key={index} className="faq-item bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium dark:text-white">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <div
              className={`px-6 pb-4 transition-all duration-300 ${
                openIndex === index ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}