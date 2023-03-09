/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../Actions/userActions";
import Header from "../../Components/Header";
import { USER_SIGNUP_RESET } from "../../Constants/userConstants";

const SignUpScreen = (props) => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("CUSTOMER");
    
    const [fNameError,setFNameError] = useState("")
    const [emailError,setEmailError] = useState("")
    const [passwordError,setPasswordError] = useState("")
    const [roleError,setRoleError] = useState("")

    const {loading,response,error} = useSelector(store => store.userSignUp)
    const userSignIn = useSelector(store => store.userSignIn)
    const dispatch = useDispatch()
    const onSignUp = () => {
        if((role === "CUSTOMER" || role === "") && userSignIn.response &&userSignIn.response.data.role === "ADMIN")
            setRoleError("Select a valid role")
        else
            setRoleError("")
        
        if(firstName.length<1)
            setFNameError("First Name is mandatory")
        else
            setFNameError("")

        if(!email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"))
            setEmailError("Enter a valid email")
        else
            setEmailError("")

        if(password.length<1)
            setPasswordError("Password is required")
        else
            setPasswordError("")

        if(firstName.length>1 && password.length>1 && email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") && ((role==="CUSTOMER" && !userSignIn.response) || role==="EMPLOYEE" || role==="DELIVERY_PERSON"))
            dispatch(signup(firstName,lastName,email,password,role))
    }

    useEffect(()=>{
            if(response && response.status === "success"){
                if(userSignIn.response && userSignIn.response.data.role ==="ADMIN")
                    props.history.push("/employees")
                else
                    props.history.push("/signin")
                    dispatch({
                        type : USER_SIGNUP_RESET,
                    })
            }
    },[loading,response,error])

    return (
        <div className="Screen">
                <div>
                    <Header title="SignUp"/>
                    {
                        error && error.status === "error" && <h5 className="text-danger text-center">{error.message}</h5>
                    }
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input required onChange={(e)=>{setFirstName(e.target.value)}} type="text" className="form-control"  placeholder="First Name"></input>
                                   <h6 className="text-danger text-center">{fNameError}</h6>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input onChange={(e)=>{setLastName(e.target.value)}} type="text" className="form-control"  placeholder="Last Name" minLength="2"></input>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input required onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control"  placeholder="name@example.com"></input>
                                <h6 className="text-danger text-center">{emailError}</h6>
                            </div>

                           

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input required onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control"  placeholder="********"></input>
                                <h6 className="text-danger text-center">{passwordError}</h6>
                            </div>


                            {
                                userSignIn.response && userSignIn.response.data.role === "ADMIN" &&
                                <div className="mb-3 col-md-3">
                                    <h5 className="form-label">Role</h5>
                                    <select className="form-select" onChange={(e)=>{setRole(e.target.value.toUpperCase())}}>
                                        <option disabled selected>-- Select </option>
                                        <option >Employee</option>
                                        <option >Delivery_person</option>
                                    </select>
                                    <h6 className="text-danger text-center">{roleError}</h6>
                                </div>
                                
                            }
                            { 
                            !userSignIn.response && 
                            <div className="float-end">
                                <br/> Already a User? <Link to="/signin">SignIn</Link>
                            </div>
                            }
                            <div className="mb-3 float-start">
                                <button onClick={onSignUp} type="button" className="btn btn-outline-primary">Register</button>
                            </div>
              
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
    )
};

export default SignUpScreen;
