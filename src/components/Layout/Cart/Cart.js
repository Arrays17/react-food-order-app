import React, { useContext, useState, useRef } from "react";
import CartContext from "../../../store/cart-context";

import Modal from "../../UI/Modal";
import css from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const nameRef = useRef("");
  const streetRef = useRef("");
  const cityRef = useRef("");
  const postalRef = useRef("");
  const [FormValidity, setFormValidity] = useState({
    nameIsValid: true,
    cityIsValid: true,
    streetIsValid: true,
    postalIsValid: true,
  });

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

  const toggleCheckout = () => {
    setCheckoutMode((prevMode) => {
      return !prevMode;
    });
  };

  const submitOrder = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://practiceproject-foodorderapp-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setOrderSubmitted(true);
    cartCtx.clearCart();
  };

  const checkoutHandler = () => {
    const formData = validateForm();

    if (!formData.isValid) return;

    submitOrder(formData.userData);
  };

  const validateForm = () => {
    const userData = {
      name: nameRef.current.value,
      street: streetRef.current.value,
      postal: postalRef.current.value,
      city: cityRef.current.value,
    };

    const isValid = {
      nameIsValid: userData.name,
      streetIsValid: userData.street,
      postalIsValid: userData.postal,
      cityIsValid: userData.city,
    };

    let errorCounter = 0;

    for (const key in isValid) {
      if (isValid[key].trim() === "") {
        errorCounter++;
        setFormValidity((prevState) => {
          return {
            ...prevState,
            [key]: false,
          };
        });
      } else {
        setFormValidity((prevState) => {
          return {
            ...prevState,
            [key]: true,
          };
        });
      }
    }

    if (errorCounter) {
      return { userData, isValid: false };
    } else {
      return { userData, isValid: true };
    }
  };

  const cancelButton = (
    <button
      className={css["button--alt"]}
      onClick={!checkoutMode ? props.onClose : toggleCheckout}
    >
      {checkoutMode ? "Cancel" : "Close"}
    </button>
  );

  const confirmButton = (
    <button
      className={css.button}
      onClick={!checkoutMode ? toggleCheckout : checkoutHandler}
    >
      {checkoutMode ? "Check Out" : "Order"}
    </button>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={css.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutMode && (
        <CheckoutForm
          onCancel={toggleCheckout}
          ref={{ nameRef, streetRef, postalRef, cityRef }}
          {...FormValidity}
          onInputBlur={validateForm}
        />
      )}
      <div className={css.actions}>
        {cancelButton}
        {hasItems && confirmButton}
      </div>
    </React.Fragment>
  );

  const submittingOrderModalContent = <p>Submitting Order...</p>;

  const orderSubmittedModalContent = (
    <React.Fragment>
      <p>Order Successful!</p>
      <div className={css.actions}>
        <button className={css.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal closeFunction={props.onClose}>
      {!isSubmitting && !orderSubmitted && cartModalContent}
      {isSubmitting && !orderSubmitted && submittingOrderModalContent}
      {!isSubmitting && orderSubmitted && orderSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
