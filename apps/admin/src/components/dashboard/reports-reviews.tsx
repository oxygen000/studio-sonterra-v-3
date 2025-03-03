import BlankPage from "@/components/dashboard/blank-page"
import { useLanguage } from "@/context/language-context"

export default function ReportsReviewsPage() {
  const { t } = useLanguage()

  return <BlankPage title={t("reportsAndReviews")} description={t("reportsAndReviewsDescription")} />
}

