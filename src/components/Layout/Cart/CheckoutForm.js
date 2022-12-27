import { IonInput, IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import React from "react";

import css from "./Checkout.module.css";

const CheckoutForm = React.forwardRef((props, ref) => {
  const { nameRef, streetRef, postalRef, cityRef } = ref;
  const { nameIsValid, streetIsValid, postalIsValid, cityIsValid } = props;
  const validateInput = (ref) => {
    props.onInputBlur(ref);
  };

  console.log(document.activeElement);

  return (
    <IonList className={css.form}>
      <IonItem
        className={`${css.control} ${!nameIsValid && "ion-invalid"} `}
        fill="outline"
      >
        <IonLabel htmlFor="name" position="stacked" className={css.label}>
          Your name
        </IonLabel>
        <IonInput
          type="text"
          id="name"
          ref={ref.nameRef}
          onIonBlur={() => validateInput(nameRef)}
          autofocus={true}
        />
        <IonNote slot="error">Name is required</IonNote>
      </IonItem>

      <IonItem
        className={`${css.control} ${!streetIsValid && "ion-invalid"} `}
        fill="outline"
      >
        <IonLabel htmlFor="street" position="stacked">
          Street
        </IonLabel>
        <IonInput
          type="text"
          id="street"
          ref={ref.streetRef}
          onIonBlur={() => validateInput(streetRef)}
        />
        <IonNote slot="error">Street is required</IonNote>
      </IonItem>
      <IonItem
        className={`${css.control} ${!postalIsValid && "ion-invalid"} `}
        fill="outline"
      >
        <IonLabel position="stacked" htmlFor="postal">
          Postal
        </IonLabel>
        <IonInput
          type="text"
          id="postal"
          ref={ref.postalRef}
          onIonBlur={() => validateInput(postalRef)}
        />
        <IonNote slot="error">Postal is required</IonNote>
      </IonItem>
      <IonItem
        className={`${css.control} ${!cityIsValid && "ion-invalid"} `}
        fill="outline"
      >
        <IonLabel position="stacked" htmlFor="city">
          City
        </IonLabel>
        <IonInput
          type="text"
          id="city"
          ref={ref.cityRef}
          onIonBlur={() => validateInput(cityRef)}
        />
        <IonNote slot="error">City is required</IonNote>
      </IonItem>
    </IonList>
  );
});

export default CheckoutForm;
