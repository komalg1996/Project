/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from "react-toastify"
import { URL_PATH } from '../../Constants/Url'

const CustomerOrderReviewScreen = (props) => {
    
    const url_get_address = URL_PATH+"/address/all"
    const url_place_order = URL_PATH+"/order/place"
    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const cart = useSelector(store => store.cart)
    const [addressList,setAddressList] = useState([])
    const [addressId,setAddressId] = useState(0)
    const [selectedPaymentMode,setSelectedPaymentMode] = useState("")
    
    let i=1
    if(cart.length === 0)
        props.history.push("/customer-products")

    useEffect(()=>{
        axios.get(url_get_address,header)
        .then((response)=>{
            setAddressList([])
            setAddressList(response.data.data)
        })
        .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }, [])


    const onAddressSelect = (id) => {
        setAddressId(id)
        document.getElementById(""+id).checked = true
    }

    const onPaymentModeSelect = (mode) => {
        setSelectedPaymentMode(mode)
        document.getElementById(""+mode).checked = true
    }

    const body = {
        addressId : addressId,
        paymentMode : selectedPaymentMode
    }

    const onConfirmOrder = () => {
        if(addressId===0)
            toast.error("Choose a Delivery Address",{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
        if(selectedPaymentMode === "")
            toast.error("Choose a Payment Mode",{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
        if(selectedPaymentMode !=="" && addressId!==0){
            axios.post(url_place_order,body,header)
            .then(response=>{
                toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
                props.history.push("/my-orders")
            })
            .catch(error=>{
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
        }
    }

    let cartTotal = 0;

    const getCartTotal = () => {
        if(cart.length>0){
            let total=0
            cart.forEach(item => {
                total+=(item.quantity * item.selectedProduct.price)
            });
            cartTotal=total
            return total;
        }
        else{
            cartTotal=0
            return 0;
        }
            
    }
    
    return (
        <div className="Screen">
            <Header title="Review Your Order"/>
            <div className="row">
                <div className="col-md-6 Block parent-block">
                    <h5 className="text-center"> Order Summary</h5>
                    <hr/>
                    <table className ="table table-bordered pallete">
                        <thead className="table-light">
                            <tr>
                                <th className="text-center">Sr</th>
                                <th>Product Name</th>
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Price (&#8377;)</th>
                                <th className="text-center">Total (&#8377;)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.length>0 && cart.map(item => {
                                    return (
                                        <tr>
                                            <td className="text-center">{i++}</td>
                                            <td>{item.selectedProduct.name}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-center">{item.selectedProduct.price}</td>
                                            <td className="text-center">{item.quantity * item.selectedProduct.price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="float-end fs-6 price-block">
                        <div className="float-end">
                            <table>
                                <tr>
                                    <td className="text-end"> <strong>Sub Total</strong> : </td> 
                                    <td className="text-end"><span className="NextBtn"></span> &#8377; {getCartTotal()}<span className="NextBtn"></span></td>
                                </tr>
                                <tr>
                                    <td className="text-end">Delivery : </td> 
                                    <td className="text-end"><span className="NextBtn"></span>&#8377; 25 <span className="NextBtn"></span></td>
                                </tr>
                            </table>
                            <br/>
                        </div>
                        <div>
                            <br/><br/>
                            <h5> Grand Total: &#8377; {cartTotal+25}.00</h5>
                        </div>
                        
                    </div>
                    <div id="order-action-block">
                        <button className="btn btn-outline-info" onClick={()=>{props.history.push("/customer-products")}}>Continue Shopping</button>
                        <button className="btn btn-outline-success NextBtn" onClick={onConfirmOrder} >Confirm Order</button>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="text-center">Address & Payment</h5>
                    <hr/>
                    <div className="row">
                    {
                        addressList.length>0 &&   addressList.map(address=>{
                            return (
                                <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                                        <div className="card parent-block" onClick={()=>onAddressSelect(address.id)}>
                                            <div className="card-body">
                                                <div className="card-title"> <h5>{address.addressLine1}</h5> </div>
                                                <div className="card-text">
                                                    <h6>{address.addressLine2}</h6>
                                                    <span>{address.city}</span>
                                                    <span className="NextBtn fs-6">-</span>
                                                    <span className="NextBtn">{address.pinCode}</span>
                                                    <br/>
                                                    <span>{address.state}</span>
                                                    <br/>
                                                    <span>{address.country}</span>
                                            </div> 
                                            <input type="radio" className="radio-card-block form-check-input" name="address" id={address.id}/>
                                        </div>
                                    </div>
                                </div>  
                            )
                        })
                    }
                    {
                        addressList.length===0 &&
                        <div className="col-md-6 col-sm-6 col-xs-12 myCardElement addCard" onClick={() => {props.history.push("/add-address")}}>
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
                    }
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                            <div className="card parent-block" onClick={()=>{onPaymentModeSelect("UPI")}}>
                                <div className="card-body">
                                    <h6 className="text-center">UPI</h6>                                  
                                </div>
                                <input type="radio" className="radio-card-block form-check-input" name="payment-mode" id="UPI"/>
                            </div>
                        </div>  

                        <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                            <div className="card parent-block" onClick={()=>{onPaymentModeSelect("NETBANKING")}}>
                                <div className="card-body">
                                    <h6 className="text-center">Net Banking</h6>                                  
                                </div>
                                <input type="radio" className="radio-card-block form-check-input" name="payment-mode" id="NETBANKING"/>
                            </div>
                        </div>  

                        <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                            <div className="card parent-block" onClick={()=>{onPaymentModeSelect("CARD")}}>
                                <div className="card-body">
                                    <h6 className="text-center">Cards</h6>                                  
                                </div>
                                <input type="radio" className="radio-card-block form-check-input" name="payment-mode" id="CARD"/>
                            </div>
                        </div>  

                        <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                            <div className="card parent-block" onClick={()=>{onPaymentModeSelect("COD")}}>
                                <div className="card-body">
                                    <h6 className="text-center">Cash On Delievery</h6>                                  
                                </div>
                                <input type="radio" className="radio-card-block form-check-input" name="payment-mode" id="COD"/>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default CustomerOrderReviewScreen