import React from "react";

import mealsImg from "../../assets/meals.jpeg";
import HeaderCartButton from "../UI/HeaderCartButton";
import css from "./header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={css.header}>
        <h1>GudPuds</h1>
        <HeaderCartButton onClick={props.showCartHandler} />
      </header>
      <div className={css["main-image"]}>
        <img src={mealsImg} alt="table filled with foods" />
      </div>
    </React.Fragment>
  );
};

export default Header;
