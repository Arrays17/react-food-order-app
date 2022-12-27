import { IonButton, IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";
import css from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <IonItem className={`${css["cart-item"]} ion-no-padding`} lines="none">
      <IonGrid>
        <IonRow className="ion-justify-content-between ion-no-padding ion-align-items-center">
          <IonCol>
            <h3>{props.name}</h3>
            <div className={css.summary}>
              <span className={css.price}>{price}</span>
              <span className={css.amount}>x {props.amount}</span>
            </div>
          </IonCol>
          <IonCol size="3" className="ion-align-items-end">
            <div className="ion-align-items-end">
              <IonButton onClick={props.onRemove}>−</IonButton>
              <IonButton onClick={props.onAdd}>+</IonButton>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default CartItem;
