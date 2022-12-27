import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { cart as cartIcon } from "ionicons/icons";

import css from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [bumpBtn, setBumpBtn] = useState(false);
  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (items.length === 0) return;
    setBumpBtn(true);
    const btnTimer = setTimeout(() => setBumpBtn(false), 300);

    return () => {
      clearTimeout(btnTimer);
    };
  }, [items]);

  const numberOfItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const bumpBtnClass = `${css.button} ${bumpBtn ? css.bump : ""}`;

  return (
    <IonButton
      className={bumpBtnClass}
      onClick={props.onClick}
      shape="round"
      slot="end"
    >
      <IonIcon slot="start" icon={cartIcon} />
      <IonBadge className={css.badge}>{numberOfItems}</IonBadge>
    </IonButton>
  );
};

export default HeaderCartButton;
