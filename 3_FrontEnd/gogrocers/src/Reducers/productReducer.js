import { PRODUCT_EDIT } from "../Constants/productConstants";

export const ProductReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_EDIT:
        return action.payload;
    default: return state
    }
  };