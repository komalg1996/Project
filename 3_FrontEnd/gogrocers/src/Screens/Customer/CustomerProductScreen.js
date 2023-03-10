import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../Components/Header'
import AddProduct from "../../Images/AddProduct.jpg"
import {toast} from 'react-toastify'
import { CATEGORY_LIST_FETCH, CATEGORY_SELECT } from '../../Constants/categoryConstants'
import { URL_PATH } from '../../Constants/Url'
import Scrolling from '../../Components/carousel'

const CustomerProductsScreen = (props) => {

    let category = useSelector(store => store.selectedCategory)
    const categories = useSelector(store => store.categories)
    const cart = useSelector(store=>store.cart)
    const userSignIn = useSelector(store=>store.userSignIn)
    
    const url_products = URL_PATH+"/product/category"
    const url_cart_add = URL_PATH+"/cart/add"
    const url_cart_fetch = URL_PATH+"/cart/all"
    const url_cart_remove = URL_PATH+"/cart/delete"
    const url_category = URL_PATH+"/category/all"
    
    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
            
        }
    }

    const [categoryList, setCategoryList] = useState(categories)
    const [products, setProducts] = useState([])
    const [isAdded, setIsAdded] = useState(false)
    const [isFetched, setIsFetched] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(categories.length === 0){
            axios.get(url_category,header)
            .then((response)=>{
                setCategoryList([])
                setCategoryList(response.data.data)
                dispatch({
                type: CATEGORY_LIST_FETCH,
                payload: response.data.data
                })
                fetchProducts(response.data.data[0].name)
                dispatch({
                  type : CATEGORY_SELECT,
                  payload : response.data.data[0]  
                })
            })
            .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
        }
        
        if(!isFetched && !category){
            fetchProducts(categoryList[0].name)
        }
        if(!isFetched && category.name){
            fetchProducts(category.name)
        }
        if(isAdded || isRemoved)
        axios.get(url_cart_fetch,header)
        .then((response)=>{
            dispatch({
                type : "UPDATE_CART",
                payload : response.data.data,
            })
            setIsAdded(false)
            setIsRemoved(false)
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }, [isAdded,isRemoved])

    const fetchProducts = (categoryName) => {
        setIsFetched(true)
        axios.get(url_products+`/${categoryName}`, header)
            .then(response => {
                setProducts(response.data.data)
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }

    const onSelectCategory = (category) => {
        fetchProducts(category.name)
        dispatch({
            type:CATEGORY_SELECT,
            payload:category
        })
    }
    
    const onAddToCart = (product) => {
        if(!userSignIn.response){
            toast.error("Please signin to continue...",{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            props.history.push("/signin")
        }
        else{
            const body = {
                "productId" : product.id,
                "quantity" : 1
            }
            axios.post(url_cart_add,body,header)
            .then(response => {
                toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:1500})
                setIsAdded(true)
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
        }
    }

    const onRemoveFromCart = (product) => {
        const cartItem = cart.filter(cartItem => cartItem.selectedProduct.id===product.id)[0];
        axios.delete(url_cart_remove+"/"+cartItem.id, header)
            .then(response => {
                toast.error(""+response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:1500})
                setIsRemoved(true)
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }

    const getStatusClass = (status) => {
        if(status === "INACTIVE")
          return " overlay"
        return ""
      }

    return (
        <div className="Screen">
            <Header title="Welcome" />
            
            <div className="mb-3 text-center">
                
                <div className="row">
                    <div className="col-md-3"> 
                        <strong className="fs-3 form-label"></strong>
                        {
                            categoryList.length>0 &&
                            <div className="col-md-12" >
                                <table className="table table-hover table-bordered pallette">
                                    <tbody>
                                        {
                                            categoryList.map(category =>{
                                                return(
                                                    <tr className={getStatusClass(category.status)}>
                                                        <td onClick = {() => { onSelectCategory(category)} } >
                                                            <h6>{category.name}</h6>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div> 
                        }
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                        
                            {
                                
                                products.length>0 &&
                                products.map(product => {
                                    let isFound = cart.filter(cartItem => cartItem.selectedProduct.id === product.id).length > 0
                                    return(
                                        <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                {
                                                    product.imageName &&
                                                    <img src={`Img` + `/${product.imageName}`} alt="product" className="img-fluid productImage"/>
                                                }
                                                {
                                                    !product.imageName &&
                                                    <img src={AddProduct} alt="product" className="img-fluid productImage"/>
                                                }
                                                    <div className="card-title"> <h5>{product.name}</h5> </div>
                                                    
                                                    <div className="card-text">
                                                        <h5>{product.price} &#8377;</h5>
                                                        <hr/>
                                                        {
                                                            isFound===true &&
                                                                <button onClick={() => {onRemoveFromCart(product)}} className="btn btn-danger">Remove from Cart</button>
                                                        }
                                                        {
                                                            isFound===false &&
                                                                <button onClick={() => {onAddToCart(product)}} className="btn btn-success" >Add To Cart</button>
                                                        }
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>  
                                    )    
                                })
                           
                            }
                           </div>
                           </div>
                            {
                                !products.length>0 &&
                                <div >
                                    <Scrolling />
                                    <h4 className="text-center">Please Login to proceed</h4>
                                </div>
                            }  
                       
                    
                </div>
            </div>
        </div>
    )
}

export default CustomerProductsScreen