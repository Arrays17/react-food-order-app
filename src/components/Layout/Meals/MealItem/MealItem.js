import { IonItem, useIonToast } from "@ionic/react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../../store";
import css from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const [presentToast] = useIonToast();
  const dispatch = useDispatch();
  const price = `$${props.price.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );

    presentToast({
      position: "bottom",
      message: `${amount}x ${props.name} added to cart!`,
      duration: 1000,
    });
  };

  return (
    <IonItem
      className={`${css.meal} ion-no-padding ion-justify-content-between`}
    >
      <div className={css.details}>
        <h3>{props.name}</h3>
        <div className={css.description}>{props.description}</div>
        <div className={css.price}>{price}</div>
      </div>
      <MealItemForm id={props.id} onAdd={onAddToCartHandler} />
    </IonItem>
  );
};

export default MealItem;
