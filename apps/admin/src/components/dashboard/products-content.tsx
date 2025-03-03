"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { useLanguage } from "@/context/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Download, Grid, List, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProductsContent() {
  const { t } = useLanguage()
  const { products, status } = useSelector((state: RootState) => state.products)
  const [view, setView] = useState<"list" | "grid">("list")
  const [priceRange, setPriceRange] = useState([0, 1000])

  const categories = [
    { id: "footwear", label: "Footwear", count: 125 },
    { id: "lingerie", label: "Lingerie & Nightwear", count: 78 },
    { id: "bags", label: "Bags & Purses", count: 45 },
    { id: "sportswear", label: "Sportswear", count: 97 },
    { id: "accessories", label: "Accessories", count: 154 },
  ]

  const brands = [
    { id: "luxe", label: "Luxe", count: 78 },
    { id: "elegance", label: "Elegance", count: 45 },
    { id: "active", label: "Active", count: 32 },
    { id: "streetwear", label: "Streetwear", count: 56 },
    { id: "vintage", label: "Vintage", count: 23 },
  ]

  const colors = [
    { id: "black", label: "Black", count: 78 },
    { id: "blue", label: "Blue", count: 45 },
    { id: "brown", label: "Brown", count: 32 },
    { id: "gray", label: "Gray", count: 56 },
    { id: "green", label: "Green", count: 23 },
  ]

  const renderProductList = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">PRODUCT</th>
            <th className="text-left p-2">PRICE</th>
            <th className="text-left p-2">STOCK</th>
            <th className="text-left p-2">STATUS</th>
            <th className="text-left p-2">TOTAL ORDERS</th>
            <th className="text-left p-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-muted/50">
              <td className="p-2">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image || "/placeholder.svg?height=50&width=50"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                </div>
              </td>
              <td className="p-2">${product.price.toFixed(2)}</td>
              <td className="p-2">{product.stock} pcs</td>
              <td className="p-2">
                <Badge
                  variant={
                    product.status === "available" ? "outline" : product.status === "sale" ? "destructive" : "secondary"
                  }
                >
                  {product.status}
                </Badge>
              </td>
              <td className="p-2">30 orders</td>
              <td className="p-2">
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderProductGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg?height=200&width=300"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={
                  product.status === "available" ? "outline" : product.status === "sale" ? "destructive" : "secondary"
                }
              >
                {product.status}
              </Badge>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">${product.price.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">{t("productsList")}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t("filters")}
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full sm:w-64 pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("exportProducts")}
          </Button>
          <Button size="sm" className="bg-[#FF7A50] hover:bg-[#ff6a37]">
            <Plus className="h-4 w-4 mr-2" />
            {t("addProduct")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">{t("category")}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`category-${category.id}`} />
                      <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">{category.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">{t("price")}</h3>
              <Slider defaultValue={[0, 1000]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">{t("brand")}</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`brand-${brand.id}`} />
                      <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">{brand.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">{t("color")}</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`color-${color.id}`} />
                      <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">{color.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">{t("allProducts")}</TabsTrigger>
                <TabsTrigger value="sale">{t("sale")}</TabsTrigger>
                <TabsTrigger value="available">{t("available")}</TabsTrigger>
                <TabsTrigger value="disabled">{t("disabled")}</TabsTrigger>
                <TabsTrigger value="new">{t("new")}</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
              <Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}>
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {status === "loading" ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : view === "list" ? (
            renderProductList()
          ) : (
            renderProductGrid()
          )}
        </div>
      </div>
    </div>
  )
}

