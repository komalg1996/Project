/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../Actions/userActions";
import Header from "../../Components/Header";
import {toast} from 'react-toastify'

const SignInScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, response, error } = useSelector((store) => store.userSignIn);

  const onSignIn = () => {
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (response && response.status === "success") {
      sessionStorage.setItem("Authorization", "Bearer " + response.token);
      if (response.data.role === "ADMIN") {       // role based login
        props.history.push("/admin-home");
      } else if (response.data.role === "EMPLOYEE") {
        props.history.push("/employee-home");
      } else if (response.data.role === "CUSTOMER") {
        props.history.push("/customer-home");
      } else if (response.data.role === "DELIVERY_PERSON") {
        props.history.push("/delivery-home");
      }
    }
    else if(error){
      toast.error('Invalid Login Credentials. Try again!!',{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
    }
  }, [loading, response, error]);

  return (
    <div className="Screen">
      <Header title="Login" />
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control"
          placeholder="name@example.com"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="*******"
        />
      </div>

      <div className="float-end">
          <br/>
          New around here? <Link to="/signup">Sign Up</Link>
      </div>

      <div className="mb-3">
        <button onClick={onSignIn} className="btn btn-outline-info">
          Login
        </button>
      </div>
    </div>
  );
};

export default SignInScreen;