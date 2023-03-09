import {
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_RESET,
  USER_EDIT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESET,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_RESET,
  USER_SIGNUP_SUCCESS,
} from "../Constants/userConstants";

export const SignInReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, response: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNIN_RESET:
      return {};
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const SignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, response: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
};

export const EditUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true };
    case USER_EDIT_SUCCESS:
      return { loading: false, response: action.payload };
    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case USER_EDIT_RESET:
      return {};
    default:
      return state;
  }
};