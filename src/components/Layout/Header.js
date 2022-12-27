import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

import HeaderCartButton from "../UI/HeaderCartButton";
import css from "./header.module.css";

const Header = (props) => {
  return (
    <IonHeader className={css.header}>
      <IonToolbar color={"8a2b06"}>
        <IonTitle slot="start">GudPuds</IonTitle>
        <HeaderCartButton onClick={props.showCartHandler} />
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
