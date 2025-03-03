import BlankPage from "@/components/dashboard/blank-page"
import { useLanguage } from "@/context/language-context"

export default function StaffSupportPage() {
  const { t } = useLanguage()

  return <BlankPage title={t("staffAndSupport")} description={t("staffAndSupportDescription")} />
}

