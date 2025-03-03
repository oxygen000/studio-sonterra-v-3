import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import cartReducer from './cartSlice';
import storeReducer from './storeSlice';
export const store = configureStore({
  reducer: {
    language: languageReducer,
    cart: cartReducer,
    store: storeReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;