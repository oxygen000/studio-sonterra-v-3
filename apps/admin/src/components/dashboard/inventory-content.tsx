"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function InventoryContent() {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")

  // Mock inventory data
  const inventoryItems = [
    { id: 1, name: "T-Shirt", sku: "TS001", quantity: 100, reorderPoint: 20 },
    { id: 2, name: "Jeans", sku: "JN001", quantity: 50, reorderPoint: 10 },
    { id: 3, name: "Dress", sku: "DR001", quantity: 30, reorderPoint: 5 },
    { id: 4, name: "Shoes", sku: "SH001", quantity: 40, reorderPoint: 8 },
    { id: 5, name: "Hat", sku: "HT001", quantity: 60, reorderPoint: 15 },
  ]

  const filteredItems = inventoryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("inventory")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("inventoryManagement")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder={t("searchInventory")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button>{t("addItem")}</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("sku")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("reorderPoint")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.reorderPoint}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      {t("edit")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("delete")}
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

