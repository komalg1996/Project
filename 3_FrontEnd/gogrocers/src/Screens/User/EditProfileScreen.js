/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, signout } from "../../Actions/userActions";
import Header from "../../Components/Header";
import { USER_EDIT_RESET } from "../../Constants/userConstants";
import {toast} from 'react-toastify'

const EditProfileScreen = (props) => {
    const userSignIn = useSelector(store => store.userSignIn)
    let {id,firstName,lastName,email,password,phone,role} = userSignIn.response.data

    let [firstName_o,setFirstName] = useState(""+firstName);
    let [lastName_o,setLastName] = useState(""+lastName);
    let [password_o,setPassword] = useState(""+password);
    let [phone_o,setPhone] = useState(""+phone);
    
    const [fNameError,setFNameError] = useState("")
    const [passwordError,setPasswordError] = useState("")

    const {loading,response,error} = useSelector(store => store.editUser)
    const dispatch = useDispatch()
    const onEditUser = () => {        
        if(firstName_o.length<1)
            setFNameError("First Name is mandatory")
        else
            setFNameError("")

        if(password_o.length<1)
            setPasswordError("Password is required")
        else
            setPasswordError("")

        if(firstName_o.length>1 && password_o.length>1)
            dispatch(editUser(id,firstName_o,lastName_o,email,password_o,role,phone_o))
    }

    useEffect(()=>{
            if(response && response.status === "success"){
                    
                    dispatch({
                        type : USER_EDIT_RESET,
                    })

                    dispatch(signout())
                    toast.success('Logging out for saving changes',{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
                    props.history.push("/signin")
            }
            else if(error){
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            }
    },[loading,response,error])

    return (
        <div className="Screen">
                <div>
                    <Header title="Edit Profile"/>
                    {
                        error && error.status === "error" && <h5 className="text-danger text-center">{error.message}</h5>
                    }
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input defaultValue={firstName_o} onChange={(e)=>{setFirstName(e.target.value)}} type="text" className="form-control"  placeholder="First Name"></input>
                                   <h6 className="text-danger text-center">{fNameError}</h6>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input defaultValue={lastName_o} onChange={(e)=>{setLastName(e.target.value)}} type="text" className="form-control"  placeholder="Last Name" minLength="2"></input>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input readOnly defaultValue={email} type="email" className="form-control"  placeholder="name@example.com"></input>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input defaultValue={password_o} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control"  placeholder="********"></input>
                                <h6 className="text-danger text-center">{passwordError}</h6>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input defaultValue={phone_o} onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control"  placeholder="Phone "></input>
                            </div>

                            <div className="mb-3 float-start">
                                <button onClick={onEditUser} type="button" className="btn btn-success">Save</button>
                            </div>
              
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
    )
};

export default EditProfileScreen;