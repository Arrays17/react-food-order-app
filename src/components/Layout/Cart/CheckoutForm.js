import React from "react";

import css from "./Checkout.module.css";

const CheckoutForm = React.forwardRef((props, ref) => {
  return (
    <form>
      <div className={`${css.control} ${!props.nameIsValid && css.invalid}`}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          ref={ref.nameRef}
          onBlur={props.onInputBlur}
        />
        {!props.nameIsValid && (
          <p style={{ color: "red", fontSize: ".7rem", marginTop: 0 }}>
            Name is required.
          </p>
        )}
      </div>
      <div className={`${css.control} ${!props.streetIsValid && css.invalid}`}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={ref.streetRef}
          onBlur={props.onInputBlur}
        />
        {!props.streetIsValid && (
          <p style={{ color: "red", fontSize: ".7rem", marginTop: 0 }}>
            Street is required.
          </p>
        )}
      </div>
      <div className={`${css.control} ${!props.postalIsValid && css.invalid}`}>
        <label htmlFor="postal">Postal</label>
        <input
          type="text"
          id="postal"
          ref={ref.postalRef}
          onBlur={props.onInputBlur}
        />
        {!props.postalIsValid && (
          <p style={{ color: "red", fontSize: ".7rem", marginTop: 0 }}>
            Postal is required.
          </p>
        )}
      </div>
      <div className={`${css.control} ${!props.cityIsValid && css.invalid}`}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={ref.cityRef}
          onBlur={props.onInputBlur}
        />
        {!props.cityIsValid && (
          <p style={{ color: "red", fontSize: ".7rem", marginTop: 0 }}>
            City is required.
          </p>
        )}
      </div>
    </form>
  );
});

export default CheckoutForm;
