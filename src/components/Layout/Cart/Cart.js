import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";

import Modal from "../../UI/Modal";
import css from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const inCartAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const inCartRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };

  const cartItems = (
    <ul className={css["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={inCartAddHandler.bind(null, item)}
          onRemove={inCartRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal closeFunction={props.onClose}>
      {cartItems}
      <div className={css.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={css.actions}>
        <button className={css["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={css.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
