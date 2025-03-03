"\"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsContent() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("settings")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("generalSettings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>General settings content here</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("accountSettings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Account settings content here</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("notificationSettings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Notification settings content here</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("securitySettings")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Security settings content here</p>
        </CardContent>
      </Card>
    </div>
  )
}

