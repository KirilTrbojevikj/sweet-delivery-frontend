// import { createContext, useEffect, useState } from "react";
// import { Recipe, ShoppingCartItem } from "../types";
// import { loadShoppingCart, storeShoppingCart } from "../utils";

import { createContext, Reducer, useEffect, useReducer } from "react";
import { CartAction, CartActionsEnum, ShoppingCartItem } from "../types";
import {
  clearShoppingCart,
  loadShoppingCart,
  removeStoredShoppingCartItem,
  storeShoppingCart,
} from "../utils";

export interface CartContextType {
  items: ShoppingCartItem[];
  setItems: (items: ShoppingCartItem[]) => void;
  addShoppingCartItem: (item: ShoppingCartItem) => void;
  removeShoppingCartItem: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

export const CartContextProvider = createContext<CartContextType>({
  items: loadShoppingCart() ?? [],
  addShoppingCartItem: (item: ShoppingCartItem) => {
    throw new Error("context used outside provider");
  },
  removeShoppingCartItem: (id: number) => {
    throw new Error("context used outside provider");
  },
  calculateTotal: () => {
    throw new Error("context used outside provider");
  },
  clearCart: () => {
    throw new Error("context used outside provider");
  },
  setItems: (items: ShoppingCartItem[]) => {
    throw new Error("context used outside provider");
  },
});

interface CartContextState {
  items: ShoppingCartItem[];
}

const InitialCartState: CartContextState = {
  items: [],
};

const cartReducer: Reducer<CartContextState, CartAction> = (
  state,
  action
): CartContextState => {
  const { type, payload } = action;
  switch (type) {
    case CartActionsEnum.AddItem: {
      const findIndex = state.items.findIndex(i => i.recipe.id === payload.recipe.id);
      if(findIndex !== -1){
        const next = [...state.items];
        const found = next[findIndex];
        next[findIndex] = {
          ...found,
          quantity: payload.quantity,
        };
        return {
            items : next
        }
      }  
      return {
        items: [...state.items, payload],
      };
    }
    case CartActionsEnum.RemoveItem: {
      return {
        items: state.items.filter((item) => item.recipe.id !== payload),
      };
    }
    case CartActionsEnum.Clear: {
      return {
        items: [],
      };
    }
    case CartActionsEnum.AddAllItems: {
      return { items: payload };
    }
    default: {
      throw new Error(`No action with type: ${type} found CartReducer.`);
    }
  }
};
interface CartContextPropTypes {
  children?: React.ReactNode;
}
const CartContext: React.FC<CartContextPropTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, InitialCartState);

  useEffect(() => {
    const items = loadShoppingCart();
    if (items) {
      dispatch({
        type: CartActionsEnum.AddAllItems,
        payload: items,
      });
    }
  }, []);

  const addShoppingCartItem = (item: ShoppingCartItem) => {
    storeShoppingCart(item);
    dispatch({
      type: CartActionsEnum.AddItem,
      payload: item,
    });
  };

  const removeShoppingCartItem = (id: number) => {
    removeStoredShoppingCartItem(id);
    dispatch({
      type: CartActionsEnum.RemoveItem,
      payload: id,
    });
  };

  const clearCart = () => {
    clearShoppingCart();
    dispatch({
      type: CartActionsEnum.Clear,
      payload: null,
    });
  };

  const calculateTotal = () => {
    return state.items.reduce((acc, obj) => {
      return acc + obj.quantity * obj.recipe.price;
    }, 0);
  };

  return (
    <CartContextProvider.Provider
      value={{
        items: state.items,
        addShoppingCartItem: addShoppingCartItem,
        removeShoppingCartItem: removeShoppingCartItem,
        clearCart: clearCart,
        calculateTotal: calculateTotal,
        setItems: () => {},
      }}
    >
      {children}
    </CartContextProvider.Provider>
  );
};

export default CartContext;
