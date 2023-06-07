import { useState, createContext, useEffect } from "react";

const CartContext = createContext();
const CartState = ({ children }) => {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    let exsistingCartItem = localStorage.getItem("Cart");
    if (exsistingCartItem) setCart(JSON.parse(exsistingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// const useCart = () => useContext(CartContext);

export { CartContext, CartState };
