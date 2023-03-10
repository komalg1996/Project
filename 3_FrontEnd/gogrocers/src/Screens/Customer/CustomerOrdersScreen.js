import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import AddProduct from "../../Images/AddProduct.jpg"
import {toast} from 'react-toastify'
import { URL_PATH } from '../../Constants/Url'
import { useDispatch } from 'react-redux'

const CustomerOrdersScreen = (props) => {

    const url_fetch_orders = URL_PATH+"/order/customer/all"
    const url_cart_fetch = URL_PATH+"/cart/all"
    const header = {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": sessionStorage.getItem("Authorization")
        }
    }

    const [orders, setOrders] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get(url_cart_fetch,header)
        .then((response)=>{
            dispatch({
                type : "UPDATE_CART",
                payload : response.data.data,
            })
        })
        .catch(error => {
          toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })

        axios.get(url_fetch_orders, header)
        .then(response => {
            setOrders([])
            setOrders(response.data.data)
        })
        .catch(error=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }, [])

    return (
        <div className="Screen">
            <Header title="My Order history" />
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                {
                    orders.length>0 &&
                    orders.map( orderInfo => {
                        return(
                            <div className="order-area">
                                <div className=" order-top ">
                                    <div className="row text-center">
                                        <div className="col-md-3"> <strong> Order Date </strong> <br/> {orderInfo.order.orderDate.split("T")[0]} | {orderInfo.order.orderDate.split("T")[1].split(".")[0]}</div>
                                        <div className="col-md-2"> <strong> Total Price </strong> <br/> {orderInfo.order.totalPrice}</div>
                                        <div className="col-md-4"> <strong> Latest Update </strong> <br/> {orderInfo.order.statusUpdateDate.split("T")[0]} | {orderInfo.order.statusUpdateDate.split("T")[1].split(".")[0]}</div>
                                        <div className="col-md-3"> <strong> Order status </strong> <br/> {orderInfo.order.orderStatus}</div>
                                    </div>
                                </div>
                                <div className="order-details">
                                    {
                                        orderInfo.orderDetails.map(detail => {
                                            return (
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        
                                                        <div className="order-image text-center">
                                                            <span className="vertical-aligner"></span>
                                                            {
                                                                detail.selectedProduct.imageName &&
                                                                <img src={`Img` + `/${detail.selectedProduct.imageName}`} alt="product" className="img-fluid img-thumbnail"/>
                                                            }
                                                            {
                                                                !detail.selectedProduct.imageName &&
                                                                <img src={AddProduct} alt="product" className="img-fluid img-thumbnail"/>
                                                            }
                                                        </div>

                                                    </div>

                                                    <div className="col-md-6">
                                                        <br/>
                                                        <h5> {detail.selectedProduct.name} </h5>
                                                        <p> {detail.selectedProduct.description} </p>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <br/><br/>
                                                        <h6> Price: {detail.selectedProduct.price} x {detail.quantity} </h6>
                                                        
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    

                                </div>
                                <br/>
                            </div>
                            
                        )
                    })                   
                }             
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default CustomerOrdersScreen