import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {environment} from '../../../environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;
// Ensure the URL here is correct and points to the right API_ENDPOINT endpoint
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${API_ENDPOINT.baseURL}/list_product`);  
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json(); // Ensure that the response is parsed as JSON
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productsSlice.reducer;



