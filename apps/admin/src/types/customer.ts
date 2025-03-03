export interface CustomerAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: CustomerAddress
  orders: string[]
  totalSpent: number
  createdAt: string
}

