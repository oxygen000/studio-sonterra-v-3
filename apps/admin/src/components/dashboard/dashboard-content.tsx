"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardContent() {
  const { t } = useLanguage()
  const { salesData } = useSelector((state: RootState) => state.sales)

  const todayStats = [
    { title: t("revenue"), value: "$450", color: "bg-emerald-500" },
    { title: t("orders"), value: "40", color: "bg-blue-500" },
    { title: t("customers"), value: "70", color: "bg-orange-500" },
    { title: t("products"), value: "88.2K", color: "bg-emerald-500" },
    { title: t("views"), value: "99K", color: "bg-blue-500" },
    { title: t("returns"), value: "7.3K", color: "bg-orange-500" },
  ]

  const feedbackData = [
    { name: t("positive"), value: 60, color: "#00C49F" },
    { name: t("neutral"), value: 25, color: "#FFBB28" },
    { name: t("negative"), value: 15, color: "#FF8042" },
  ]

  const visitsBySource = [
    { name: t("direct"), value: 65 },
    { name: t("social"), value: 40 },
    { name: t("email"), value: 25 },
    { name: t("referral"), value: 15 },
    { name: t("organic"), value: 35 },
  ]

  return (
    <div className="space-y-6">
      <section id="dashboard" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboardOverview")}</CardTitle>
            <CardDescription>{t("dashboardDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
                <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
                <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <h2 className="text-2xl font-bold">{t("todayOverview")}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {todayStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex flex-col items-center justify-center">
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("profit")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesData.profit}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("audienceOverview")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={salesData.customers}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#00C49F" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("feedback")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={feedbackData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {feedbackData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        {feedbackData.map((item, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-xs">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("visitsBySource")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {visitsBySource.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span>{item.value}%</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${item.value}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("totalTransactions")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={salesData.transactions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="online" stackId="a" fill="#8884d8" />
                            <Bar dataKey="inStore" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="gift" stackId="a" fill="#ffc658" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
                          <span className="text-xs">{t("online")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
                          <span className="text-xs">{t("inStore")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-[#ffc658]"></div>
                          <span className="text-xs">{t("gift")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("analyticsOverview")}</CardTitle>
                    <CardDescription>{t("analyticsDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>{/* Add analytics content here */}</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("reportsOverview")}</CardTitle>
                    <CardDescription>{t("reportsDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>{/* Add reports content here */}</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("notificationsOverview")}</CardTitle>
                    <CardDescription>{t("notificationsDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent>{/* Add notifications content here */}</CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section id="quickActions" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("quickActions")}</CardTitle>
            <CardDescription>{t("quickActionsDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button>{t("createNewOrder")}</Button>
              <Button>{t("addNewProduct")}</Button>
              <Button>{t("viewRecentReviews")}</Button>
              <Button>{t("generateReport")}</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="recentActivity" className="scroll-mt-16">
        <Card>
          <CardHeader>
            <CardTitle>{t("recentActivity")}</CardTitle>
            <CardDescription>{t("recentActivityDescription")}</CardDescription>
          </CardHeader>
          <CardContent>{/* Add recent activity content here */}</CardContent>
        </Card>
      </section>
    </div>
  )
}

