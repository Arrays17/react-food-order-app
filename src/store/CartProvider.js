import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    let updatedItems;

    if (existingItemIndex < 0) {
      updatedItems = prevState.items.concat(action.item);
    } else {
      updatedItems = [...prevState.items];
      updatedItems[existingItemIndex].amount += action.item.amount;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const itemIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );

    const itemToRemove = prevState.items[itemIndex];

    const updatedTotalAmount = prevState.totalAmount - itemToRemove.price;

    let updatedItems = [...prevState.items];

    if (updatedItems[itemIndex].amount > 1) {
      updatedItems[itemIndex].amount -= 1;
    } else {
      updatedItems = updatedItems.filter((item) => item.id !== action.id);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
