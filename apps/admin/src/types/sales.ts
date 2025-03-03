export interface SalesDataPoint {
  date: string
  value: number
}

export interface TransactionDataPoint {
  date: string
  online: number
  inStore: number
  gift: number
}

export interface SalesData {
  revenue: SalesDataPoint[]
  profit: SalesDataPoint[]
  customers: SalesDataPoint[]
  transactions: TransactionDataPoint[]
}

export interface SalesEvent {
  id: string
  title: string
  start: string
  end: string
  color: string
}

