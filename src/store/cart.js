import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.totalAmount += action.payload.amount * action.payload.price;

      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex < 0) {
        state.items = state.items.concat(action.payload);
      } else {
        state.items[existingItemIndex].amount += action.payload.amount;
      }
    },
    removeItem(state, action) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const itemToRemove = state.items[itemIndex];

      state.totalAmount -= itemToRemove.price;

      if (state.items[itemIndex].amount > 1) {
        state.items[itemIndex].amount -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart() {
      return initialState;
    },
  },
});

export default cartSlice;
