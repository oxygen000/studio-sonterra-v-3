"use client"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { fetchProducts } from "@/redux/features/products/productsSlice"
import { fetchOrders } from "@/redux/features/orders/ordersSlice"
import { fetchCustomers } from "@/redux/features/customers/customersSlice"
import { fetchSalesData, fetchSalesEvents } from "@/redux/features/sales/salesSlice"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import DashboardContent from "@/components/dashboard/dashboard-content"
import ProductsContent from "@/components/dashboard/products-content"
import OrdersContent from "@/components/dashboard/orders-content"
import CustomersContent from "@/components/dashboard/customers-content"
import MarketingContent from "@/components/dashboard/marketing-content"
import ReportsContent from "@/components/dashboard/reports-content"
import ReviewsContent from "@/components/dashboard/reviews-content"
import StaffContent from "@/components/dashboard/staff-content"
import SupportContent from "@/components/dashboard/support-content"
import SettingsContent from "@/components/dashboard/settings-content"
import { useLanguage } from "@/context/language-context"
import { login } from "@/redux/features/auth/authSlice"
import LoginForm from "@/components/dashboard/login-form"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("dashboard")
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const { theme, setTheme } = useTheme()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts())
      dispatch(fetchOrders())
      dispatch(fetchCustomers())
      dispatch(fetchSalesData())
      dispatch(fetchSalesEvents())
    }
  }, [dispatch, isAuthenticated])

  // Auto login for demo purposes
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(login({ email: "admin@example.com", password: "password" }))
    }
  }, [dispatch, isAuthenticated])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!isAuthenticated) {
    return <LoginForm />
  }

  const renderContent = () => {
    const contentComponents = {
      dashboard: DashboardContent,
      products: ProductsContent,
      orders: OrdersContent,
      customers: CustomersContent,
      marketing: MarketingContent,
      reports: ReportsContent,
      reviews: ReviewsContent,
      staff: StaffContent,
      support: SupportContent,
      settings: SettingsContent,
    }

    const ContentComponent = contentComponents[activeSection as keyof typeof contentComponents] || DashboardContent

    return <ContentComponent />
  }

  return (
    <div className="flex h-screen bg-background transition-colors duration-300">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={t(activeSection)} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-y-auto p-4" ref={contentRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

