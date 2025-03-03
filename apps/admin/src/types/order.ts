export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface ShippingAddress {
  fullName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  customerId: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  shippingAddress: ShippingAddress
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

