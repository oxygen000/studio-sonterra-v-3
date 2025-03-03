import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Customer } from "@/types/customer"

interface CustomersState {
  customers: Customer[]
  selectedCustomer: Customer | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  status: "idle",
  error: null,
}

export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async () => {
  // In a real app, this would be an API call
  return mockCustomers
})

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    selectCustomer: (state, action: PayloadAction<string>) => {
      state.selectedCustomer = state.customers.find((c) => c.id === action.payload) || null
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch customers"
      })
  },
})

export const { selectCustomer, clearSelectedCustomer } = customersSlice.actions

export default customersSlice.reducer

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "CUST1",
    name: "Michelle Smith",
    email: "michelle.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Fashion St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    orders: ["ORD1234"],
    totalSpent: 579.98,
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "CUST2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 234-5678",
    address: {
      street: "456 Style Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    orders: ["ORD1235"],
    totalSpent: 459.98,
    createdAt: "2023-02-20T11:45:00Z",
  },
  {
    id: "CUST3",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "+1 (555) 345-6789",
    address: {
      street: "789 Trendy Blvd",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA",
    },
    orders: ["ORD1236"],
    totalSpent: 189.98,
    createdAt: "2023-03-10T14:20:00Z",
  },
]

