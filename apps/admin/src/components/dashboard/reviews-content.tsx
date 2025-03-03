"use client"

import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function ReviewsContent() {
  const { t } = useLanguage()

  // Mock review data
  const reviews = [
    { id: 1, product: "T-Shirt", customer: "John Doe", rating: 4, comment: "Great product!", date: "2023-05-01" },
    { id: 2, product: "Jeans", customer: "Jane Smith", rating: 5, comment: "Love it!", date: "2023-04-28" },
    {
      id: 3,
      product: "Sneakers",
      customer: "Bob Johnson",
      rating: 3,
      comment: "Okay, but could be better",
      date: "2023-04-25",
    },
  ]

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t("reviews")}</h2>

      <Card>
        <CardHeader>
          <CardTitle>{t("latestReviews")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("product")}</TableHead>
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("rating")}</TableHead>
                <TableHead>{t("comment")}</TableHead>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.product}</TableCell>
                  <TableCell>{review.customer}</TableCell>
                  <TableCell>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {t("respond")}
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

