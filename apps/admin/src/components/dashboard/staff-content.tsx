"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function StaffContent() {
  const { t } = useLanguage()

  // Mock staff data
  const staffMembers = [
    { id: 1, name: "Alice Johnson", role: "Manager", department: "Sales", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Associate", department: "Customer Support", status: "Active" },
    { id: 3, name: "Carol Williams", role: "Supervisor", department: "Warehouse", status: "On Leave" },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("staff")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("staffDirectory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("role")}</TableHead>
                <TableHead>{t("department")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="mr-2">
                      {t("edit")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("viewDetails")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button className="mt-4">{t("addStaffMember")}</Button>
        </CardContent>
      </Card>
    </div>
  )
}

