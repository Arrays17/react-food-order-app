import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Layout/Meals/Meals";
import Cart from "./components/Layout/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  const showCartHandler = () => {
    if (cartVisible) return setCartVisible(false);
    setCartVisible(true);
  };

  // const hideCartHandler = () => {
  //   setCartVisible(false);
  // };

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
