import { createSlice } from '@reduxjs/toolkit';
export const initialState = {
  cart: sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : [],
};
const cartSlice = createSlice({
  name: 'cartState',
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.cart = action.payload;
      sessionStorage.setItem('cart', JSON.stringify(state.cart))
    },
    deleteCartItem: (state, action) => {
      state.cart = [];
      sessionStorage.removeItem('cart')
    }
  },
});
export const { setCartItem, deleteCartItem } = cartSlice.actions;
export default cartSlice.reducer;