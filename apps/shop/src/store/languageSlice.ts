import { createSlice } from '@reduxjs/toolkit';
const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: 'en'
  },
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
      // Update document direction based on language
      document.dir = action.payload === 'ar' ? 'rtl' : 'ltr';
    }
  }
});
export const {
  setLanguage
} = languageSlice.actions;
export default languageSlice.reducer;