import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { SalesData, SalesEvent } from "@/types/sales"

interface SalesState {
  salesData: SalesData
  salesEvents: SalesEvent[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: SalesState = {
  salesData: {
    revenue: [],
    profit: [],
    customers: [],
    transactions: [],
  },
  salesEvents: [],
  status: "idle",
  error: null,
}

export const fetchSalesData = createAsyncThunk("sales/fetchSalesData", async () => {
  // In a real app, this would be an API call
  return mockSalesData
})

export const fetchSalesEvents = createAsyncThunk("sales/fetchSalesEvents", async () => {
  // In a real app, this would be an API call
  return mockSalesEvents
})

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.salesData = action.payload
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch sales data"
      })
      .addCase(fetchSalesEvents.fulfilled, (state, action) => {
        state.salesEvents = action.payload
      })
  },
})

export default salesSlice.reducer

// Mock data
const mockSalesData: SalesData = {
  revenue: [
    { date: "2023-04-01", value: 2500 },
    { date: "2023-04-02", value: 3200 },
    { date: "2023-04-03", value: 2800 },
    { date: "2023-04-04", value: 3500 },
    { date: "2023-04-05", value: 4200 },
    { date: "2023-04-06", value: 3800 },
    { date: "2023-04-07", value: 4500 },
  ],
  profit: [
    { date: "2023-04-01", value: 1200 },
    { date: "2023-04-02", value: 1500 },
    { date: "2023-04-03", value: 1300 },
    { date: "2023-04-04", value: 1700 },
    { date: "2023-04-05", value: 2000 },
    { date: "2023-04-06", value: 1800 },
    { date: "2023-04-07", value: 2200 },
  ],
  customers: [
    { date: "2023-04-01", value: 25 },
    { date: "2023-04-02", value: 32 },
    { date: "2023-04-03", value: 28 },
    { date: "2023-04-04", value: 35 },
    { date: "2023-04-05", value: 42 },
    { date: "2023-04-06", value: 38 },
    { date: "2023-04-07", value: 45 },
  ],
  transactions: [
    { date: "2023-04-01", online: 15, inStore: 10, gift: 5 },
    { date: "2023-04-02", online: 20, inStore: 12, gift: 8 },
    { date: "2023-04-03", online: 18, inStore: 10, gift: 6 },
    { date: "2023-04-04", online: 22, inStore: 13, gift: 7 },
    { date: "2023-04-05", online: 25, inStore: 17, gift: 9 },
    { date: "2023-04-06", online: 23, inStore: 15, gift: 8 },
    { date: "2023-04-07", online: 28, inStore: 17, gift: 10 },
  ],
}

const mockSalesEvents: SalesEvent[] = [
  {
    id: "1",
    title: "Spring Collection Launch",
    start: "2023-04-03T10:00:00",
    end: "2023-04-03T18:00:00",
    color: "blue",
  },
  {
    id: "2",
    title: "Flash Sale",
    start: "2023-04-05T12:00:00",
    end: "2023-04-05T20:00:00",
    color: "orange",
  },
  {
    id: "3",
    title: "Evening Dresses Sale",
    start: "2023-04-07T14:00:00",
    end: "2023-04-07T22:00:00",
    color: "green",
  },
  {
    id: "4",
    title: "Weekend Promotion",
    start: "2023-04-08T10:00:00",
    end: "2023-04-09T18:00:00",
    color: "teal",
  },
  {
    id: "5",
    title: "Summer Collection Preview",
    start: "2023-04-12T10:00:00",
    end: "2023-04-12T18:00:00",
    color: "yellow",
  },
]

