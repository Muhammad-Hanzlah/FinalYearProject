import React, { useEffect, createContext, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/allproducts"
    )
      .then((res) => res.json())
      .then((data) => setAll_Product(data));
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch(
        "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/getcart",
        {
          method: "POST",
          headers: { "auth-token": token, "Content-Type": "application/json" },
          body: "",
        }
      )
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(
        "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/addtocart",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        }
      );
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0),
    }));
    if (localStorage.getItem("auth-token")) {
      fetch(
        "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/removefromcart",
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        }
      );
    }
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };
  const getTotalCartAmount = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let info = all_product.find((p) => p.id === Number(item));
        if (info) total += info.new_price * cartItems[item];
      }
    }
    return total;
  };
  const getTotalCartItems = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) total += cartItems[item];
    }
    return total;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
