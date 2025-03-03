"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function MarketingContent() {
  const { t } = useLanguage()

  // Mock campaign data
  const campaigns = [
    { id: 1, name: "Summer Sale", status: "Active", budget: 1000, roi: 2.5 },
    { id: 2, name: "New Product Launch", status: "Scheduled", budget: 1500, roi: 0 },
    { id: 3, name: "Holiday Promotion", status: "Ended", budget: 2000, roi: 3.2 },
  ]

  // Mock performance data
  const performanceData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("marketing")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("activeCampaigns")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("campaignName")}</TableHead>
                  <TableHead>{t("status")}</TableHead>
                  <TableHead>{t("budget")}</TableHead>
                  <TableHead>{t("roi")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell>${campaign.budget}</TableCell>
                    <TableCell>{campaign.roi}x</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4">{t("createCampaign")}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("marketingPerformance")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

