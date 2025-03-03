import { createSlice } from '@reduxjs/toolkit';
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  collection?: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}
interface StoreState {
  storeInfo: {
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  categories: string[];
  collections: string[];
  products: Product[];
}
const initialState: StoreState = {
  storeInfo: {
    name: 'CHIC',
    description: 'Your premier destination for women\'s fashion',
    email: 'contact@chic-fashion.com',
    phone: '+1 (555) 123-4567',
    address: '123 Fashion Street, Style City, ST 12345',
    socialMedia: {
      facebook: 'https://facebook.com/chicfashion',
      instagram: 'https://instagram.com/chicfashion',
      twitter: 'https://twitter.com/chicfashion'
    }
  },
  categories: ['Dresses', 'Tops', 'Pants', 'Accessories', 'Outerwear'],
  collections: ['Summer 2024', 'Evening Wear', 'Casual Basics', 'Workwear'],
  products: [{
    id: 1,
    name: "Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
    category: "Dresses",
    collection: "Summer 2024",
    description: "A beautiful and comfortable summer dress perfect for warm days.",
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Yellow', 'Pink'],
    rating: 4.5,
    reviews: 128,
    inStock: true
  }
  // Add more products...
  ]
};
const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    // Add reducers if needed
  }
});
export default storeSlice.reducer;