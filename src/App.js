import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonApp, IonContent, setupIonicReact } from "@ionic/react";

import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals/Meals";
import Cart from "./components/Layout/Cart/Cart";
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
    <IonApp>
      {cartVisible && <Cart onClose={showCartHandler} />}
      <Header showCartHandler={showCartHandler} />
      <IonContent>
        <Meals />
      </IonContent>
    </IonApp>
  );
}

export default App;
