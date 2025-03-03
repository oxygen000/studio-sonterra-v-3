import { Suspense } from "react"
import { Providers } from "@/redux/provider"
import Dashboard from "@/components/dashboard/dashboard"
import Loading from "@/components/ui/loading"

export default function Home() {
  return (
    <Providers>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </Providers>
  )
}

