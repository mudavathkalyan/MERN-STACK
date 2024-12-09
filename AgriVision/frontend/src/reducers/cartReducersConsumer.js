// cartReducers.js

import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartSeedReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.cartItems.find((x) => x.seed === item.seed);

      if (existingItem) {
        // If it exists, update the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.seed === existingItem.seed ? item : x
          ),
        };
      } else {
        // If it doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
