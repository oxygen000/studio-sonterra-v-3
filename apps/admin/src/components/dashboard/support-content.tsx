"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function SupportContent() {
  const { t } = useLanguage()

  // Mock support ticket data
  const supportTickets = [
    { id: 1, customer: "John Doe", issue: "Payment failed", status: "Open", priority: "High", date: "2023-05-01" },
    {
      id: 2,
      customer: "Jane Smith",
      issue: "Wrong item received",
      status: "In Progress",
      priority: "Medium",
      date: "2023-04-28",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      issue: "Account login issues",
      status: "Closed",
      priority: "Low",
      date: "2023-04-25",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("support")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("supportTickets")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("ticketId")}</TableHead>
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("issue")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("priority")}</TableHead>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.issue}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.priority}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {t("viewTicket")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4">{t("createNewTicket")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

