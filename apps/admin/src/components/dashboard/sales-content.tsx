"use client"

import { cn } from "@/lib/utils"

import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarView } from "@/components/dashboard/calendar/calendar-view"
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts"
import { Search, CalendarIcon, Bell, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function SalesContent() {
  const { t } = useLanguage()
  const { salesData, salesEvents } = useSelector((state: RootState) => state.sales)

  // Format events for calendar
  const calendarEvents = salesEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    color: event.color,
  }))

  const revenueData = salesData.revenue.map((item) => ({
    date: item.date,
    value: item.value,
  }))

  return (
    <div className="grid grid-cols-[1fr_300px] gap-4 h-[calc(100vh-5rem)]">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{t("sales")}</h2>
            <p className="text-muted-foreground">
              {t("april")} <span className="text-sm">APRIL 10, 2023</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search..." />
            </div>
            <Button variant="outline" size="icon">
              <CalendarIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CalendarView events={calendarEvents} onEventClick={console.log} />
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Revenue</CardTitle>
              <div className="text-2xl font-bold">$2189</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("saleCalendar")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }, (_, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0",
                    i === 15 && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  )}
                >
                  {((i + 1) % 31) + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bca277212800553.673b850c9035f-CI0ECFQ8g5oDg3UCQkCrKAcmfyDHlV.png"
            alt="Floral Midaxi Tea Dresses"
            width={300}
            height={400}
            className="w-full object-cover"
          />
          <CardContent className="p-4 bg-amber-100">
            <h3 className="font-medium">Floral Midaxi Tea Dresses</h3>
            <p className="text-sm text-muted-foreground">New Collection</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

