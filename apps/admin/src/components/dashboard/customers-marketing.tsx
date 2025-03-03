import BlankPage from "@/components/dashboard/blank-page"
import { useLanguage } from "@/context/language-context"

export default function CustomersMarketingPage() {
  const { t } = useLanguage()

  return <BlankPage title={t("customersAndMarketing")} description={t("customersAndMarketingDescription")} />
}

