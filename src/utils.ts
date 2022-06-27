import { CART_KEY, TOKEN_KEY } from "./const";
import { ShoppingCartItem } from "./types";

export const storeShoppingCart = (item: ShoppingCartItem) => {
  let persisted = loadShoppingCart() ?? [];
  const idx = persisted.findIndex((i) => i.recipe.id === item.recipe.id);
  if (idx === -1) {
    persisted = [...persisted, item];
  } else {
    const next = [...persisted];
    const found = next[idx];
    next[idx] = {
      ...found,
      quantity: item.quantity,
    };
    persisted = next;
  }
  localStorage.setItem(CART_KEY, JSON.stringify(persisted));
};

export const loadShoppingCart = (): ShoppingCartItem[] | null => {
  const cart: string | null = localStorage.getItem(CART_KEY);

  if (!cart) return null;
  return JSON.parse(cart);
};

export const removeStoredShoppingCartItem = (id: number) => {
  let persisted = loadShoppingCart() ?? [];
  persisted = persisted.filter((item) => item.recipe.id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(persisted));
};

export const clearShoppingCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  const data = localStorage.getItem(TOKEN_KEY);
  if (data) {
    return JSON.parse(data);
  }
};
