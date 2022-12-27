import { IonButton } from "@ionic/react";
import React, { useRef } from "react";
import Input from "../../../UI/Input";
import css from "./MealItemForm.module.css";

const MealItemForm = (props, ref) => {
  const amountInputRef = useRef(0);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.toString().trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      return;
    }

    props.onAdd(enteredAmountNumber);
  };

  return (
    <form
      className={`${css.form} ion-no-padding`}
      onSubmit={submitHandler}
      slot="end"
    >
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount" + props.id,
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 1,
        }}
      />
      <IonButton
        type="submit"
        shape="round"
        disabled="false"
        className={`${css.button}`}
        size="medium"
      >
        ADD TO CART
      </IonButton>
    </form>
  );
};

export default MealItemForm;
