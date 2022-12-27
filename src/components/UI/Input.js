import { IonInput, IonLabel } from "@ionic/react";
import React from "react";

import css from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={css.input}>
      <IonLabel className="label" htmlFor={props.input.id}>
        {props.label}
      </IonLabel>
      <IonInput
        ref={ref}
        {...props.input}
        className="ion-no-padding"
        value={1}
        disabled="false"
      />
    </div>
  );
});

export default Input;
