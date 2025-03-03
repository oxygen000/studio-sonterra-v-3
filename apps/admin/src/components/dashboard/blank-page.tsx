"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface BlankPageProps {
  title: string
  description?: string
}

export default function BlankPage({ title, description }: BlankPageProps) {
  const { t } = useLanguage()

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">{description || t("thisPageIsEmpty")}</p>
          <Button>{t("createContent")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

