import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Order, OrderStatus } from "@/types/order"

interface OrdersState {
  orders: Order[]
  selectedOrder: Order | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  status: "idle",
  error: null,
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  // In a real app, this would be an API call
  return mockOrders
})

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
    // In a real app, this would be an API call
    return { orderId, status }
  },
)

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrder = state.orders.find((o) => o.id === action.payload) || null
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch orders"
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, status } = action.payload
        const orderIndex = state.orders.findIndex((o) => o.id === orderId)
        if (orderIndex !== -1) {
          state.orders[orderIndex].status = status
          if (state.selectedOrder?.id === orderId) {
            state.selectedOrder.status = status
          }
        }
      })
  },
})

export const { selectOrder, clearSelectedOrder } = ordersSlice.actions

export default ordersSlice.reducer

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD1234",
    customerId: "CUST1",
    items: [
      {
        productId: "1",
        name: "Leather Flat Sandals",
        price: 229.99,
        quantity: 1,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ea280212800553.673b850c87c15-qcvIZ7apUY6dti8DScER3lX9Zlfdnf.png",
      },
      {
        productId: "2",
        name: "Stylish Cross Body Bag",
        price: 349.99,
        quantity: 1,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ea280212800553.673b850c87c15-qcvIZ7apUY6dti8DScER3lX9Zlfdnf.png",
      },
    ],
    total: 579.98,
    status: "delivered",
    shippingAddress: {
      fullName: "Michelle Smith",
      address: "123 Fashion St, New York, NY 10001",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-20T14:20:00Z",
  },
  {
    id: "ORD1235",
    customerId: "CUST2",
    items: [
      {
        productId: "3",
        name: "Minimalist Pear Clip",
        price: 229.99,
        quantity: 2,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ea280212800553.673b850c87c15-qcvIZ7apUY6dti8DScER3lX9Zlfdnf.png",
      },
    ],
    total: 459.98,
    status: "shipped",
    shippingAddress: {
      fullName: "Sarah Johnson",
      address: "456 Style Ave, Los Angeles, CA 90001",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    paymentMethod: "PayPal",
    createdAt: "2023-04-16T11:45:00Z",
    updatedAt: "2023-04-18T09:30:00Z",
  },
  {
    id: "ORD1236",
    customerId: "CUST3",
    items: [
      {
        productId: "4",
        name: "Square Sunglasses",
        price: 129.99,
        quantity: 1,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ea280212800553.673b850c87c15-qcvIZ7apUY6dti8DScER3lX9Zlfdnf.png",
      },
      {
        productId: "5",
        name: "Non-Woven Sports Top",
        price: 59.99,
        quantity: 1,
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3ea280212800553.673b850c87c15-qcvIZ7apUY6dti8DScER3lX9Zlfdnf.png",
      },
    ],
    total: 189.98,
    status: "processing",
    shippingAddress: {
      fullName: "Emma Davis",
      address: "789 Trendy Blvd, Miami, FL 33101",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA",
    },
    paymentMethod: "Credit Card",
    createdAt: "2023-04-17T14:20:00Z",
    updatedAt: "2023-04-17T14:25:00Z",
  },
]

