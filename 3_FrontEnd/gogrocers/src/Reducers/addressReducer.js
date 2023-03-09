export const EditAddressReducer = (state = [], action) => {
    switch (action.type) {
      case "EDIT_ADDRESS":
        return action.payload;
    default: return state
    }
};