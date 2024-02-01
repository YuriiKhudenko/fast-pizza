import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (item) => item.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity += 1;
          item.totalPrice = item.unitPrice * item.quantity;
          return item;
        }
        return item;
      });
    },
    decreaseItemQuantity(state, action) {
      state.cart.map((item) => {
        if (item.pizzaId === action.payload) {
          item.quantity -= 1;

          item.totalPrice = item.unitPrice * item.quantity;

          if (item.quantity === 0) {
            cartSlice.caseReducers.deleteItem(state, action);
          }
          return item;
        }
        return item;
      });
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce(
    (total, item) => (total = total + item.quantity),
    0,
  );

export const getTotalPrice = (state) =>
  state.cart.cart.reduce(
    (total, item) => (total = total + item.totalPrice),
    0,
  );

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
