import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from "../Images/AddProduct.jpg"
import {toast} from "react-toastify"
import { Link } from 'react-router-dom';
import { URL_PATH } from '../Constants/Url';

const CartView = (props) => {

    let cart = useSelector(store => store.cart)

    const url_cart_update = URL_PATH+"/cart/update"
    const url_cart_remove = URL_PATH+"/cart/delete"

    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    let [cartTotal, setCartTotal] = useState(0)
    let [isUpdated, setIsUpdated] = useState(false)
    let [isRemoved, setIsRemoved] = useState(false)

    const dispatch = useDispatch()

    useEffect(()=>{
        
        if(cart.length>0){
            let total=0
            cart.forEach(item => {
               total+=(item.quantity * item.selectedProduct.price)
            });
            setCartTotal(total)
            setIsUpdated(false)
            setIsRemoved(false)
        }
        else{
            setCartTotal(0)
        }   
    }, [cart, isUpdated, isRemoved])

    const onAdd = (cartItem) => {

        if(cartItem.quantity < 5){
            const body = {
                "cartId" : cartItem.id,
                "quantity": cartItem.quantity + 1
            }
    
            axios.put(url_cart_update, body, header)
            .then(response => {
                let index = cart.findIndex( ({id}) => id===response.data.data.id )
                cart[index] = response.data.data
                dispatch({
                    type: "UPDATE_CART",
                    payload: cart
                })
                setIsUpdated(true)
                if(response.data.status!=="success")
                    toast.error(response.data.status, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
        }
        else{
            toast.warning("Max allowed quantity reached", {autoClose: 1500, position: toast.POSITION.TOP_RIGHT})
        }
    }

    const onReduce = (cartItem) => {
        
        if(cartItem.quantity === 1){
            onRemoveFromCart(cartItem)
        }

        else{
            const body = {
                "cartId" : cartItem.id,
                "quantity": cartItem.quantity - 1
            }
    
            axios.put(url_cart_update, body, header)
                .then(response => {
                    let index = cart.findIndex( ({id}) => id===response.data.data.id )
                    cart[index] = response.data.data
                    dispatch({
                        type: "UPDATE_CART",
                        payload: cart
                    })
                    setIsUpdated(true)
                    if(response.data.status!=="success")
                        toast.error(response.data.status, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
                })
                .catch(error => {
                    toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
                })
        }
    }

    const onRemoveFromCart = (cartItem) => {
        cart = cart.filter(item => item.id!==cartItem.id)
        dispatch({
            type: "UPDATE_CART",
            payload: cart
        })
        axios.delete(url_cart_remove+"/"+cartItem.id, header)
            .then(response => {
                toast.warning(""+response.data.data, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
                setIsRemoved(true)
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }

    const onCheckOut =() => {
        if(cart.length>0){
            return "/order-review"
        }
        return "/customer-products"
    }

    return (
        <div className="Cart overlay" id="cartView">
            
            <div className="full-height overlay-content">
                <div className="full-height row">
                    <div className="col-md-9 blank-space" onClick={()=>{document.getElementById("cartView").style.width = "0%";}}></div>

                    <div className="col-md-3">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container-fluid">
                                
                                <div className="navbar-item cart-title"> My Cart ({cart.length} items) </div>
                                <span className="closeBtn">
                                    <svg onClick={()=>{document.getElementById("cartView").style.width = "0%";}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </span>
                            </div>
                        </nav>

                        <div className="cart-area">
                            
                            {
                                cart.length>0 &&
                                cart.map(item => {
                                    
                                    return(
                                        <div className="cart-item">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <span className="vertical-aligner"></span>
                                                    {
                                                                item.selectedProduct.imageName &&
                                                                <img src={`Img` + `/${item.selectedProduct.imageName}`} alt="product" className="img-fluid img-thumbnail"/>
                                                            }
                                                            {
                                                                !item.selectedProduct.imageName &&
                                                                <img src={AddProduct} alt="product" className="img-fluid img-thumbnail"/>
                                                            }
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="cart-item-title fs-5">{item.selectedProduct.name}</div>
                                                    <div className="cart-item-body">
                                                        
                                                        <svg onClick={()=>{onReduce(item)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                        </svg>

                                                        <span className="NextBtn">{item.quantity}</span>

                                                        <svg onClick={()=>{onAdd(item)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle NextBtn" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                        </svg>

                                                        <span className="NextBtn"> x </span> 

                                                        <span className="NextBtn"> &#8377; {item.selectedProduct.price} </span>

                                                        <span className="float-end">Total : &#8377; {item.selectedProduct.price * item.quantity} </span>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>           
                                    )
                                })
                            }
                            {
                                !cart.length>0 &&
                                <div>
                                    <span className="vertical-aligner"></span>
                                    <h5 className="text-center"> Cart is empty </h5>
                                </div>
                            }
                        </div>
                        <div className="check-out text-center">
                          
                            <Link className="btn btn-warning check-out-btn" to={onCheckOut}>
                                <div onClick={()=>{if(document.getElementById("cartView")){document.getElementById("cartView").style.width = "0%";}}}>
                                    <span className="float-start">Proceed to check out</span> 
                                    <span className="float-end">&#8377; {cartTotal}</span>  
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartView