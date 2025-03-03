export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  color: string
  stock: number
  status: "available" | "sale" | "disabled" | "new"
  discount: number
  createdAt: string
}

export interface ProductFilter {
  category: string[]
  price: {
    min: number
    max: number
  }
  brand: string[]
  color: string[]
  status: "all" | "available" | "sale" | "disabled" | "new"
}

