"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Package, Search, Truck } from "lucide-react"
import type { Order } from "@/types/order"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersContent() {
  const { t } = useLanguage()
  const { orders, selectedOrder, status } = useSelector((state: RootState) => state.orders)
  const [selectedTab, setSelectedTab] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const orderStats = [
    { label: "New Orders", value: "2k", color: "bg-emerald-500" },
    { label: "Pending", value: "70", color: "bg-blue-500" },
    { label: "Completed", value: "120", color: "bg-purple-500" },
    { label: "Cancelled", value: "60", color: "bg-red-500" },
    { label: "Paid Orders", value: "160", color: "bg-blue-500" },
    { label: "Unpaid", value: "222", color: "bg-yellow-500" },
    { label: "Refund", value: "78", color: "bg-orange-500" },
    { label: "Checkout", value: "35", color: "bg-green-500" },
  ]

  const renderOrdersList = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">#</th>
            <th className="text-left p-2">CUSTOMER</th>
            <th className="text-left p-2">AMOUNT</th>
            <th className="text-left p-2">PAYMENT</th>
            <th className="text-left p-2">DELIVERY DATE</th>
            <th className="text-left p-2">STATUS</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{order.id}</td>
              <td className="p-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {order.shippingAddress.fullName.charAt(0)}
                  </div>
                  <span>{order.shippingAddress.fullName}</span>
                </div>
              </td>
              <td className="p-2">${order.total.toFixed(2)}</td>
              <td className="p-2">{order.paymentMethod}</td>
              <td className="p-2">{new Date(order.updatedAt).toLocaleDateString()}</td>
              <td className="p-2">{getStatusBadge(order.status)}</td>
              <td className="p-2">
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderOrderDetail = (order: Order) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order #{order.id}</CardTitle>
              <Button className="bg-[#FF7A50] hover:bg-[#ff6a37]">Update Status</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-2 border-b">
                  <img
                    src={item.image || "/placeholder.svg?height=60&width=60"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("comment")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add a note. This is a private note that only you can see." />
              <Button className="mt-4 w-full">Save</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("shippingInformation")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("paymentDetails")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Card Number</span>
                <span>**** **** **** 1234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("orderSummary")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{t("subtotal")}</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("shippingCharges")}</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>{t("totalTaxes")}</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex gap-2">
                <Input placeholder={t("enterDiscountCode")} />
                <Button variant="outline">{t("apply")}</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("trackOrder")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="w-1 h-12 bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-medium">{t("orderPlaced")}</h4>
                  <p className="text-sm text-muted-foreground">An order has been placed.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="w-1 h-12 bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-medium">{t("packed")}</h4>
                  <p className="text-sm text-muted-foreground">Product has been packed.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="w-1 h-12 bg-muted"></div>
                </div>
                <div>
                  <h4 className="font-medium">{t("shipped")}</h4>
                  <p className="text-sm text-muted-foreground">Order has been shipped with UPS Express.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">{t("delivered")}</h4>
                  <p className="text-sm text-muted-foreground">Product has been delivered.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("orders")}</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search Order..." className="w-full sm:w-64 pl-8" />
          </div>
          <Button className="bg-[#FF7A50] hover:bg-[#ff6a37]">Create Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {orderStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <p className={`text-2xl font-bold ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
              <p className="text-xs text-center text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">ALL ORDERS</TabsTrigger>
                <TabsTrigger value="new">NEW</TabsTrigger>
                <TabsTrigger value="delivered">DELIVERED</TabsTrigger>
                <TabsTrigger value="pending">PENDING</TabsTrigger>
                <TabsTrigger value="cancelled">CANCELLED</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filters
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="m-0">
              {status === "loading" ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                renderOrdersList()
              )}
            </TabsContent>

            <TabsContent value="new" className="m-0">
              {status === "loading" ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                renderOrdersList()
              )}
            </TabsContent>

            <TabsContent value="delivered" className="m-0">
              {status === "loading" ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                renderOrdersList()
              )}
            </TabsContent>

            <TabsContent value="pending" className="m-0">
              {status === "loading" ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                renderOrdersList()
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="m-0">
              {status === "loading" ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                renderOrdersList()
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

