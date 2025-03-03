"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  color: string
}

interface CalendarViewProps {
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function CalendarView({ events, onEventClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<"day" | "week">("week")

  const daysInWeek = 7
  const hoursInDay = 24

  const getWeekDays = (date: Date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
    return Array.from({ length: daysInWeek }, (_, i) => {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      return day
    })
  }

  const weekDays = getWeekDays(currentDate)

  const formatHour = (hour: number) => {
    return `${hour === 0 ? "12" : hour > 12 ? hour - 12 : hour}${hour >= 12 ? "pm" : "am"}`
  }

  const getEventStyle = (event: CalendarEvent) => {
    const start = new Date(event.start)
    const end = new Date(event.end)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    const startHour = start.getHours() + start.getMinutes() / 60

    return {
      gridRow: `${Math.floor(startHour + 1)} / span ${Math.ceil(duration)}`,
      backgroundColor: event.color,
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(currentDate.getDate() - 7)
              setCurrentDate(newDate)
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {weekDays[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(currentDate.getDate() + 7)
              setCurrentDate(newDate)
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant={currentView === "day" ? "default" : "outline"} onClick={() => setCurrentView("day")}>
            Day
          </Button>
          <Button variant={currentView === "week" ? "default" : "outline"} onClick={() => setCurrentView("week")}>
            Week
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-[1px] bg-border">
          <div className="sticky left-0 z-10 bg-background w-16" />
          {weekDays.map((day, i) => (
            <div key={i} className="bg-background p-2 text-center border-b">
              <div className="font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-sm text-muted-foreground">{day.getDate()}</div>
            </div>
          ))}

          {Array.from({ length: hoursInDay }, (_, hour) => (
            <React.Fragment key={hour}>
              <div className="sticky left-0 z-10 bg-background w-16 p-2 text-right text-sm text-muted-foreground">
                {formatHour(hour)}
              </div>
              {weekDays.map((_, dayIndex) => (
                <div key={`${hour}-${dayIndex}`} className="bg-background border-b border-r min-h-[3rem] relative" />
              ))}
            </React.Fragment>
          ))}

          <AnimatePresence>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "absolute p-2 rounded-md text-white text-sm cursor-pointer hover:brightness-110 transition-all",
                  "overflow-hidden text-ellipsis whitespace-nowrap",
                )}
                style={getEventStyle(event)}
                onClick={() => onEventClick(event)}
              >
                {event.title}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

