"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import gsap from "gsap";
import { RootState } from "@/store/store";

const translations = {
  en: {
    title: "Contact Us",
    description: "Get in touch with us",
    name: "Your Name",
    email: "Your Email",
    message: "Message",
    send: "Send Message",
    address: "Address",
    phone: "Phone",
    emailUs: "Email Us",
  },
  ar: {
    title: "اتصل بنا",
    description: "تواصل معنا",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    message: "رسالتك",
    send: "إرسال الرسالة",
    address: "العنوان",
    phone: "الهاتف",
    emailUs: "راسلنا",
  },
};

const ContactPage = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const storeInfo = useSelector((state: RootState) => state.store.storeInfo) || {};
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    gsap.from(".contact-section", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{t.description}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="contact-section space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.address}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {storeInfo.address || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.phone}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {storeInfo.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">{t.emailUs}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {storeInfo.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-section bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm space-y-6">
          <div>
            <input
              type="text"
              placeholder={t.name}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={t.email}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <textarea
              placeholder={t.message}
              rows={5}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <Send size={20} />
            {t.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
