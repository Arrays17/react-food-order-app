import { createSlice } from "@reduxjs/toolkit";
import { cartActions } from ".";

const initialState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadExistingCart(state, action) {
      state.items = action.payload.items || [];
      state.totalAmount = action.payload.totalAmount;
    },
    addItem(state, action) {
      state.changed = true;
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
      state.changed = true;
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const itemToRemove = state.items[itemIndex];

      state.totalAmount -= itemToRemove.price;
      if (state.totalAmount < 0) state.totalAmount = 0;

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

export const saveCartData = (cart) => {
  return async (dispatch) => {
    const sendData = async () => {
      // dispatch sending notification
      const response = await fetch(
        "https://practiceproject-foodorderapp-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Saving cart data failed...");
      }
    };

    try {
      await sendData();

      console.log("Cart data saved!");

      // dispatch saving success notification
    } catch (error) {
      // dispatch error notification
    }
  };
};

export const loadCartData = () => {
  return async (dispatch) => {
    const requestData = async () => {
      // dispatch requesting data notification
      const response = await fetch(
        "https://practiceproject-foodorderapp-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Loading cart data failed...");
      }

      const data = await response.json();

      return data;
    };

    try {
      const existingCart = await requestData();

      dispatch(cartActions.loadExistingCart(existingCart));
      // dispatch saving success notification
    } catch (error) {
      // dispatch error notification
    }
  };
};

export default cartSlice;
