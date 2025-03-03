"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/050ca8212800553.673b850c83162-Sui7DApBMvpGKcNwPVKno7fQsOUes3.png"
            alt="404 Illustration"
            className="w-64 h-auto"
          />
        </div>
        <h1 className="text-6xl font-bold text-muted-foreground mb-2">404</h1>
        <p className="text-xl mb-6">{t("sorryNothingFound")}</p>
        <Button>
          <Home className="mr-2 h-4 w-4" />
          {t("goToHome")}
        </Button>
      </div>
    </div>
  )
}

