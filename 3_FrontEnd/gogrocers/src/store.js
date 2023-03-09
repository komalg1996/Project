import { applyMiddleware, combineReducers, createStore } from "redux";
import { EditUserReducer, SignInReducer, SignUpReducer } from "./Reducers/userReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { ProductReducer } from "./Reducers/productReducer";
import { CategoryListReducer, SelectCategoryReducer } from "./Reducers/categoryReducer";
import { CartReducer } from "./Reducers/cartReducer";
import { EditAddressReducer } from "./Reducers/addressReducer";

const reducers = combineReducers({
  userSignIn: SignInReducer,
  userSignUp: SignUpReducer,
  editUser : EditUserReducer,
  productDetail : ProductReducer,
  categories : CategoryListReducer,
  selectedCategory : SelectCategoryReducer,
  cart : CartReducer,
  editAddress : EditAddressReducer,
});

let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
