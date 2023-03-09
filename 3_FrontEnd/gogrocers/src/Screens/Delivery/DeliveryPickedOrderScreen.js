/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from "react-toastify"
import { URL_PATH } from '../../Constants/Url'

const DeliveryPickedOrderScreen = (props) => {
    const url_fetch_orders = URL_PATH+"/order/assigned"
    const url_change_status = URL_PATH+"/order/update-status"

    const role = useSelector(store=>store.userSignIn.response.data.role)

    const header = {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": sessionStorage.getItem("Authorization")
        }
    }

    const [orders, setOrders] = useState([])
    const [isUpdated,setIsUpdated] = useState(false)
    
    useEffect(()=>{
        axios.get(url_fetch_orders, header)
        .then(response => {
            setOrders([])
            setIsUpdated(false)
            if(role==="DELIVERY_PERSON"){
                setOrders(response.data.data.filter(item => item.order.orderStatus==="OUT_FOR_DELIVERY"))
            }
        })
        .catch(error=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }, [isUpdated])


    const onDeliver = (orderId) => {
        axios.patch(url_change_status,{orderId,status:"DELIVERED"},header)
        .then(response => {
            toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
            setIsUpdated(true)
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }

    const onReturn = (orderId) => {
        axios.patch(url_change_status,{orderId,status:"READY"},header)
        .then(response => {
            toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
            setIsUpdated(true)
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }

    return (
        <div className="Screen">
            <Header title="Picked Orders" />
            <div className="row">
                <div className="col-md-12">
                {
                    orders.length>0 &&
                    orders.map( orderInfo => {
                        return(
                            <div>
                                <div className="delivery-order-area order-card">
                               
                               <div className="row">
                               <strong className="fs-5 text-end assign-btn">Order id: #{orderInfo.order.id}</strong>
                               <div className="col-md-3 col-sm-6 col-xs-12 order-card">
                                       <div className="card">
                                           <div className="card-body">
                                               <h4>{orderInfo.order.customer.firstName} {orderInfo.order.customer.lastName}</h4>
                                               <div className="card-text">
                                                   <h5>{orderInfo.order.customer.phone}</h5>
                                                   <span>{orderInfo.order.customer.email}</span>
                                               </div>        
                                           </div>
                                       </div>
                                   </div>  
                                   <div className="col-md-4 col-sm-8 col-xs-8 order-card">
                                       <div className="card">
                                           <div className="card-body">
                                               <h4>{orderInfo.order.deliveryAddress.addressLine1}</h4>
                                               <div className="card-text">
                                                   <h5>{orderInfo.order.deliveryAddress.addressLine2}</h5>
                                                   <span>{orderInfo.order.deliveryAddress.city}</span>
                                                   <span className="NextBtn fs-6">-</span>
                                                   <span className="NextBtn">{orderInfo.order.deliveryAddress.pinCode}</span>
                                                   <br/>                
                                               </div>        
                                           </div>
                                       </div>
                                   </div>
                                   <div className="col-md-3 col-sm-6 col-xs-6 order-card">
                                       <div className="card">
                                           <div className="card-body">
                                               <div className="card-text">
                                                   {
                                                       orderInfo.orderDetails.map(detail => {
                                                           return (
                                                               <div>
                                                                   <strong className="text-center fs-5">{detail.selectedProduct.name}</strong>
                                                                   <strong className="text-center NextBtn fs-5 float-end">{detail.quantity}</strong>
                                                               </div>
                                                           )
                                                       })
                                                   }
                                               </div>        
                                           </div>
                                       </div>
                                   </div>
                                   <div className="col-md-2 col-sm-6 col-xs-6 order-card">
                                        <br/>
                                        <button type="button" className="btn btn-outline-success" onClick={()=>onDeliver(orderInfo.order.id)}>Delivered</button>
                                        <br/><br/>
                                        <button type="button" className="btn btn-outline-danger" onClick={()=>onReturn(orderInfo.order.id)}>Taken Back</button>
                                   </div>
                                    {
                                        orderInfo.payment.type === "COD" &&
                                        <div className="fs-5 text-end assign-btn">
                                            Collect Cash on Delivery: &#8377; {orderInfo.payment.amount}
                                        </div> 
                                    }
                               </div>
                           </div>
                                <br/>
                            </div>
                            
                        )
                    })
                    
                }   
                {
                    !orders.length>0 &&
                    <h5 className="text-center">
                        <br/>
                        No Orders Found.
                    </h5>
                }
                

                </div>
            </div>
        </div>
    )
}

export default DeliveryPickedOrderScreen
