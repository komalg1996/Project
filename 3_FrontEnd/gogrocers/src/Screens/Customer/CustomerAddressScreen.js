import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { URL_PATH } from '../../Constants/Url'

const CustomerAddressScreen = (props) => {
    
    const url_get_address = URL_PATH+"/address/all"
    const url_del_address = URL_PATH+"/address/delete"
    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const dispatch = useDispatch()

    const [addressList,setAddressList] = useState([])
    const [isDeleted,setIsDeleted] = useState(false)

    useEffect(()=>{
        axios.get(url_get_address,header)
        .then((response)=>{
            setAddressList([])
            setAddressList(response.data.data)
            setIsDeleted(false)
        })
        .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    },[isDeleted])

    const onEdit = (address)=>{
        dispatch({
            type : "EDIT_ADDRESS",
            payload : address,
        })
        props.history.push("/edit-address")
    }

    const onDelete = (id,category)=> {
        axios.delete(url_del_address+`/${id}`,header)
        .then((response)=>{
            toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
            setIsDeleted(true)
        })
        .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }
    
    return (
        <div className="Screen">
            <Header title="Addresses"/>
            <div className="row">
                {
                    addressList.length>0 &&   addressList.map(address=>{
                        return (
                            <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title"> <h4>{address.addressLine1}</h4> </div>
                                            <div className="card-text">
                                                <h5>{address.addressLine2}</h5>
                                                <span>{address.city}</span>
                                                <span className="NextBtn fs-6">-</span>
                                                <span className="NextBtn">{address.pinCode}</span>
                                                <br/>
                                                <span>{address.state}</span>
                                                <br/>
                                                <span>{address.country}</span>
                                                <hr/>
                                                <div>
                                                    <button className="btn btn-info" onClick={()=>{onEdit(address)}}>Edit</button>
                                                    <button className="btn btn-outline-danger NextBtn" onClick={()=>{onDelete(address.id)}}>Delete</button>
                                                </div>
                                        </div>        
                                    </div>
                                </div>
                            </div>  
                        )
                    })
                }
                <div className="col-md-3 col-sm-6 col-xs-12 myCardElement addCard" onClick={() => {props.history.push("/add-address")}}>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="card-text fs-2">
                                <br/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                            </div>
                            <br/><br/><hr/>
                            <h3 className="text-center">Add New Address</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

export default CustomerAddressScreen
