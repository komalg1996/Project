import {
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../Constants/userConstants";
import axios from "axios";
import { URL_PATH } from "../Constants/Url";

export const signup = (firstName,lastName,email, password,role) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });

    const url = URL_PATH+"/user/register";

    const body = { firstName,lastName,email, password,role};

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error.response.data,
        });
      });
  };
};

export const signin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    });

    const url = URL_PATH+"/user/login";

    const body = { email, password };

    const header = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error.response.data,
        });
      });
  };
};

export const editUser = (id,firstName,lastName,email, password,role,phone) => {
  return (dispatch) => {
    dispatch({
      type: USER_EDIT_REQUEST,
    });

    const url = URL_PATH+`/user/edit/${id}`;

    const body = { firstName,lastName,email, password,role,phone};

    const header = {
      headers: {
        "Content-Type": "application/json",
        "Authorization" : sessionStorage.getItem("Authorization")
      },
    };

    axios
      .put(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_EDIT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_EDIT_FAIL,
          payload: error.response.data,
        });
      });
  };
};

export const signout = () => {
  sessionStorage.removeItem("Authorization");
  return (dispatch) => {
    dispatch({
      type: USER_SIGNOUT,
    });
  };
};