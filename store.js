import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './src/features/cart/cartSlice';
import userReducer from './src/features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
