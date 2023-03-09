import { CATEGORY_LIST_FETCH, CATEGORY_SELECT } from "../Constants/categoryConstants";

export const CategoryListReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_LIST_FETCH:
        return action.payload;
    default: return state
    }
};

export const SelectCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case CATEGORY_SELECT:
        return action.payload;
    default: return state
    }
};