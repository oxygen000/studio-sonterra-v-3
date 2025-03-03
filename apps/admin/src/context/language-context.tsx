"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  language: "en" | "ar"
  setLanguage: (lang: "en" | "ar") => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})

  useEffect(() => {
    // Load translations
    const loadTranslations = async () => {
      const enTranslations = await import("@/locales/en.json")
      const arTranslations = await import("@/locales/ar.json")

      setTranslations({
        en: enTranslations.default,
        ar: arTranslations.default,
      })
    }

    loadTranslations()
  }, [])

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  const changeLanguage = (lang: "en" | "ar") => {
    setLanguage(lang)
    router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

