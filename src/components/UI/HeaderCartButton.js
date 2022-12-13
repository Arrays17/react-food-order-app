import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import css from "./HeaderCartButton.module.css";
import CartIcon from "../Layout/Cart/CartIcon";

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
    <button onClick={props.onClick} className={bumpBtnClass}>
      <span className={css.icon}>
        <CartIcon />
      </span>
      <span>My Cart</span>
      <span className={css.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
