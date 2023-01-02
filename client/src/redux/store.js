import { configureStore } from "@reduxjs/toolkit";
import localUserSlice from "./slice/localUserSlice";
import cartSlice from "./slice/cartSlice";
import alertSlice from "./slice/alertSlice";

export const store = configureStore({
  reducer: {
    localUserState:localUserSlice,
    cartState: cartSlice,
    alertState: alertSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})