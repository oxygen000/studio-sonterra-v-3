import BlankPage from "@/components/dashboard/blank-page"
import { useLanguage } from "@/context/language-context"

export default function SettingsPage() {
  const { t } = useLanguage()

  return <BlankPage title={t("settings")} description={t("settingsDescription")} />
}

