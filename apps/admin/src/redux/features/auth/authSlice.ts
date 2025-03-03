import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "staff"
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    // In a real app, this would be an API call
    if (email === "admin@example.com" && password === "password") {
      return {
        user: {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin" as const,
        },
        token: "mock-jwt-token",
      }
    }
    throw new Error("Invalid credentials")
  },
)

export const logout = createAsyncThunk("auth/logout", async () => {
  // In a real app, this would be an API call
  return true
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Login failed"
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError } = authSlice.actions

export default authSlice.reducer

