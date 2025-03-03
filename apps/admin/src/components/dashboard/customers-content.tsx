"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CustomersContent() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  // Mock customer data
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", totalOrders: 5, totalSpent: 500 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", totalOrders: 3, totalSpent: 300 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", totalOrders: 7, totalSpent: 700 },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("customers")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("customerManagement")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder={t("searchCustomers")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button>{t("addCustomer")}</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("email")}</TableHead>
                <TableHead>{t("totalOrders")}</TableHead>
                <TableHead>{t("totalSpent")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>${customer.totalSpent}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      {t("view")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("edit")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

