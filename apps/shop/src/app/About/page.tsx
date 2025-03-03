"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Heart, Users, Globe2, Truck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RootState } from "@/store/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const translations = {
  en: {
    title: "About CHIC",
    missionText: "To provide high-quality fashion that empowers women to express their unique style.",
    quality: "Quality First",
    sustainability: "Sustainability",
    community: "Community",
    service: "Service"
  },
  ar: {
    title: "عن CHIC",
    missionText: "تقديم أزياء عالية الجودة تمكن النساء من التعبير عن أسلوبهن الفريد.",
    quality: "الجودة أولاً",
    sustainability: "الاستدامة",
    community: "المجتمع",
    service: "الخدمة"
  }
};

const AboutPage = () => {
  const language = useSelector((state: RootState) => state.language.current);
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.from(".about-header", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".value-card", {
        scrollTrigger: {
          trigger: ".values-section",
          start: "top center"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="about-header text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">{t.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.missionText}
        </p>
      </div>
      <div className="values-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="value-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
          <Heart className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2 dark:text-white">{t.quality}</h3>
        </div>
        <div className="value-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
          <Globe2 className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2 dark:text-white">
            {t.sustainability}
          </h3>
        </div>
        <div className="value-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
          <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2 dark:text-white">{t.community}</h3>
        </div>
        <div className="value-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
          <Truck className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="font-semibold mb-2 dark:text-white">{t.service}</h3>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
