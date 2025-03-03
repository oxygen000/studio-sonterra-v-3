import { createSlice } from '@reduxjs/toolkit';
interface CartItem {
  id: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.total -= action.payload.price;
    }
  }
});
export const {
  addToCart,
  removeFromCart
} = cartSlice.actions;
export default cartSlice.reducer;