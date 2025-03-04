import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./features/products/productsSlice"
import ordersReducer from "./features/orders/ordersSlice"
import customersReducer from "./features/customers/customersSlice"
import salesReducer from "./features/sales/salesSlice"
import authReducer from "./features/auth/authSlice"

export const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    sales: salesReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

