"use client"

import { useLanguage } from "@/context/language-context"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/redux/store"
import { logout } from "@/redux/features/auth/authSlice"
import {
  BarChart3,
  ChevronDown,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Users,
  Megaphone,
  FileText,
  UserPlus,
  HeadphonesIcon,
  Bell,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const { t } = useLanguage()
  const dispatch = useDispatch<AppDispatch>()
  const [isExpanded, setIsExpanded] = useState(true)

  const handleLogout = () => {
    dispatch(logout())
  }

  const menuItems = [
    { id: "dashboard", icon: <BarChart3 className="h-5 w-5" />, label: t("dashboard"), href: "/" },
    { id: "products", icon: <Package className="h-5 w-5" />, label: t("products"), href: "/products" },
    { id: "orders", icon: <ShoppingCart className="h-5 w-5" />, label: t("orders"), href: "/orders" },
    { id: "customers", icon: <Users className="h-5 w-5" />, label: t("customers"), href: "/customers" },
    { id: "marketing", icon: <Megaphone className="h-5 w-5" />, label: t("marketing"), href: "/marketing" },
    { id: "reports", icon: <FileText className="h-5 w-5" />, label: t("reports"), href: "/reports" },
    { id: "reviews", icon: <Star className="h-5 w-5" />, label: t("reviews"), href: "/reviews" },
    { id: "staff", icon: <UserPlus className="h-5 w-5" />, label: t("staff"), href: "/staff" },
    { id: "support", icon: <HeadphonesIcon className="h-5 w-5" />, label: t("support"), href: "/support" },
    { id: "settings", icon: <Settings className="h-5 w-5" />, label: t("settings"), href: "/settings" },
  ]

  const sidebarVariants = {
    expanded: { width: 250 },
    collapsed: { width: 80 },
  }

  const toggleAnimation = {
    rotate: isExpanded ? 180 : 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  }

  const textVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "auto" },
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.aside
      className="sidebar bg-[#006D5B] text-white flex flex-col h-full"
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4 flex items-center justify-between border-b border-[#008a73]">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={textVariants}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-2xl font-bold">{t("appName")}</h1>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="text-white hover:bg-[#008a73]"
        >
          <motion.div animate={toggleAnimation}>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <motion.li key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-[#008a73] hover:text-white",
                  activeSection === item.id && "bg-[#008a73]"
                )}
                onClick={() => handleSectionClick(item.id)}
              >
                {item.icon}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      className="ml-3"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={textVariants}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-[#008a73]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#008a73] hover:text-white">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/avatars/01.png" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={textVariants}
                    transition={{ duration: 0.2 }}
                  >
                    {t("userProfile")}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("accountSettings")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>{t("notifications")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>{t("help")}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  )
}
