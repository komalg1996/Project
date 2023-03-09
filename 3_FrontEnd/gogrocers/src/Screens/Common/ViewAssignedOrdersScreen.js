/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from "react-toastify"
import AddProduct from "../../Images/AddProduct.jpg"
import { URL_PATH } from '../../Constants/Url'


const ViewAssignedOrdersScreen = (props) => {

    const url_fetch_orders = URL_PATH+"/order/assigned"
    const url_change_status = URL_PATH+"/order/update-status"
    //const url_image = URL_PATH+"/product/image"
  //  const url_image = "http://127.0.0.1:8887/src/Images"
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
                if(role==="EMPLOYEE"){
                    setOrders(response.data.data.filter(item => item.order.orderStatus==="PACKING"))
                }
                else if(role==="DELIVERY_PERSON"){
                    setOrders(response.data.data.filter(item => item.order.orderStatus==="OUT_FOR_DELIVERY"))
                }
            })
            .catch(error=>{
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }, [isUpdated])


    const onReady = (orderId) => {
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
            <Header title="Assigned Orders" />
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
                                        <div className="col-md-6"><strong> Assigned On </strong><br/> {orderInfo.order.statusUpdateDate.split("T")[0]} | {orderInfo.order.statusUpdateDate.split("T")[1].split(".")[0]}</div>
                                        <div className="col-md-3"><button className="btn btn-outline-success assign-btn" onClick={()=>{onReady(orderInfo.order.id)}}>Ready</button></div>
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
                                                                <img src={`Images` + `/${detail.selectedProduct.imageName}`} alt="product" className="img-fluid img-thumbnail"/>
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
                                                            <h6> Quantity: {detail.quantity} </h6>
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
                {
                    !orders.length>0 &&
                    <h5 className="text-center">
                        <br/>
                        No Orders Found.
                    </h5>
                }
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}
export default ViewAssignedOrdersScreen
