import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupIonicReact } from "@ionic/react";

import "@ionic/react/css/core.css";

import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals/Meals";
import Cart from "./components/Layout/Cart/Cart";
import CartProvider from "./store/context/CartProvider";
import { loadCartData, saveCartData } from "./store/cart";

setupIonicReact();

let isInitialLoad = true;

function App() {
  const [cartVisible, setCartVisible] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const showCartHandler = () => {
    if (cartVisible) return setCartVisible(false);
    setCartVisible(true);
  };

  useEffect(() => {
    if (isInitialLoad) {
      isInitialLoad = false;

      dispatch(loadCartData());

      return;
    }

    cart.changed && dispatch(saveCartData(cart));
  }, [cart, dispatch]);
  return (
    <CartProvider>
      {cartVisible && <Cart onClose={showCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
