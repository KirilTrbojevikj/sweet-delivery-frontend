import { useContext } from "react";
import { CartContextProvider, CartContextType } from "../contexts/CartContext";

export const useCart = (): CartContextType => {
    const context = useContext(CartContextProvider);
  
    if (!context) {
      throw new Error("useCart cannot be used outsize an CartContextProvider");
    }
  
    return context;
  };