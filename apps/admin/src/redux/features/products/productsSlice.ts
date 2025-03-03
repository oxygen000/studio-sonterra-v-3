import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Product, ProductFilter } from "@/types/product"

interface ProductsState {
  products: Product[]
  filteredProducts: Product[]
  filters: ProductFilter
  selectedProduct: Product | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  filters: {
    category: [],
    price: { min: 0, max: 1000 },
    brand: [],
    color: [],
    status: "all",
  },
  selectedProduct: null,
  status: "idle",
  error: null,
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  // In a real app, this would be an API call
  return mockProducts
})

export const addProduct = createAsyncThunk("products/addProduct", async (product: Omit<Product, "id">) => {
  // In a real app, this would be an API call
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  }
  return newProduct
})

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilter>>) => {
      state.filters = { ...state.filters, ...action.payload }
      state.filteredProducts = applyFilters(state.products, state.filters)
    },
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = state.products.find((p) => p.id === action.payload) || null
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.products = action.payload
        state.filteredProducts = applyFilters(action.payload, state.filters)
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch products"
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
        state.filteredProducts = applyFilters(state.products, state.filters)
      })
  },
})

// Helper function to apply filters
function applyFilters(products: Product[], filters: ProductFilter): Product[] {
  return products.filter((product) => {
    // Filter by category
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }

    // Filter by price
    if (product.price < filters.price.min || product.price > filters.price.max) {
      return false
    }

    // Filter by brand
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false
    }

    // Filter by color
    if (filters.color.length > 0 && !filters.color.includes(product.color)) {
      return false
    }

    // Filter by status
    if (filters.status !== "all" && product.status !== filters.status) {
      return false
    }

    return true
  })
}

export const { setFilters, selectProduct, clearSelectedProduct } = productsSlice.actions

export default productsSlice.reducer

// Mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Leather Flat Sandals",
    description: "Comfortable leather sandals",
    price: 229.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Footwear",
    brand: "Luxe",
    color: "Brown",
    stock: 25,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Stylish Cross Body Bag",
    description: "Elegant cross body bag",
    price: 349.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Bags",
    brand: "Luxe",
    color: "Green",
    stock: 18,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Minimalist Pear Clip",
    description: "Elegant hair accessory",
    price: 229.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Accessories",
    brand: "Elegance",
    color: "Gold",
    stock: 30,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Square Sunglasses",
    description: "Stylish square sunglasses",
    price: 129.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Accessories",
    brand: "Vision",
    color: "Black",
    stock: 15,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Non-Woven Sports Top",
    description: "Comfortable sports top",
    price: 59.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Sportswear",
    brand: "Active",
    color: "Gray",
    stock: 40,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Leather Flat Sandals",
    description: "Comfortable leather sandals",
    price: 229.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Footwear",
    brand: "Luxe",
    color: "Brown",
    stock: 25,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Oversized Sunglasses",
    description: "Stylish oversized sunglasses",
    price: 129.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Accessories",
    brand: "Vision",
    color: "Black",
    stock: 15,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Slim-Waist Sports Bra",
    description: "Comfortable sports bra",
    price: 49.99,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/62336e212800553.673b850c87380-9d15wM1IPvLQUNqrJNSC2Vv1ExXQtN.png",
    category: "Sportswear",
    brand: "Active",
    color: "Black",
    stock: 30,
    status: "available",
    discount: 0,
    createdAt: new Date().toISOString(),
  },
]

