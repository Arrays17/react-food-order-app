import { IonButton, IonList } from "@ionic/react";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store";

import Modal from "../../UI/Modal";
import css from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

const Cart = (props) => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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

  const hasItems = cartState.items.length > 0;
  const totalAmount = `$${cartState.totalAmount.toFixed(2)}`;

  const inCartAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const inCartRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItems = (
    <IonList className={css["cart-items"]}>
      {cartState.items.map((item) => (
        <CartItem
          key={item.id}
          {...item}
          onAdd={inCartAddHandler.bind(null, item)}
          onRemove={inCartRemoveHandler.bind(null, item.id)}
        />
      ))}
    </IonList>
  );

  const toggleCheckout = () => {
    document.activeElement.setFormValidity({
      nameIsValid: true,
      cityIsValid: true,
      streetIsValid: true,
      postalIsValid: true,
    });
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
          orderedItems: cartState.items,
        }),
      }
    );
    setIsSubmitting(false);
    setOrderSubmitted(true);
    dispatch(cartActions.clearCart());
  };

  const checkoutHandler = () => {
    const formData = validateForm();

    if (!formData.isValid) return;

    submitOrder(formData.userData);
  };

  const validateInput = (inputRef) => {
    let fieldToValidate;
    let verdict = true;
    if (inputRef === nameRef) fieldToValidate = "nameIsValid";
    if (inputRef === streetRef) fieldToValidate = "streetIsValid";
    if (inputRef === postalRef) fieldToValidate = "postalIsValid";
    if (inputRef === cityRef) fieldToValidate = "cityIsValid";
    if (inputRef.current.value.trim() === "") {
      verdict = false;
    }

    return setFormValidity((prevState) => {
      return {
        ...prevState,
        [fieldToValidate]: verdict,
      };
    });
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
    <IonButton
      shape="round"
      className={css["button--alt"]}
      onClick={!checkoutMode ? props.onClose : toggleCheckout}
    >
      {checkoutMode ? "Cancel" : "Close"}
    </IonButton>
  );

  const confirmButton = (
    <IonButton
      shape="round"
      className={css.button}
      onClick={!checkoutMode ? toggleCheckout : checkoutHandler}
    >
      {checkoutMode ? "Check Out" : "Order"}
    </IonButton>
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
          onInputBlur={validateInput}
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
        <IonButton className={css.button} onClick={props.onClose}>
          Close
        </IonButton>
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
