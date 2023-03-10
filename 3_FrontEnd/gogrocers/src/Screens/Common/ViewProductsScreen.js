import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Header from '../../Components/Header'
import { PRODUCT_EDIT } from '../../Constants/productConstants'
import { URL_PATH } from '../../Constants/Url'
import AddProduct from "../../Images/AddProduct.jpg"

const ViewProductsScreen = (props) => {

    const productDetail = useSelector(store => store.productDetail)
    
    const url_cat_all = URL_PATH+"/category/all"
    const url_stock = URL_PATH+"/product/stock/category-report"
    const url_delete = URL_PATH+"/product/delete"
    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const [categoryList, setCategoryList] = useState([])
    
    const [productDetails, setProductDetails] = useState([])
    let [isDeleted, setIsDeleted] = useState(false)

    useEffect(()=>{

        axios.get(url_cat_all, header)
            .then(response => {
                setCategoryList([]) //reset list to avoid bug while deleting
                setCategoryList(response.data.data)
            })
            .catch(error => {
                toast.error(error.message, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
            })

        if(productDetail.category)
            onSelectCategory(productDetail.category)

    }, [isDeleted])

    const dispatch = useDispatch();

    const onSelectCategory = (categoryName) => {
       
        axios.get(url_stock+`/${categoryName}`, header)
            .then(response => {
                setProductDetails([])
                setProductDetails(response.data.data)
            })
            .catch(error => {
                toast.error(error.message, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
            })
    }

    const onEdit = (productDetail) => {
        dispatch({
            type: PRODUCT_EDIT,
            payload: productDetail
        })
        props.history.push("/edit-product")
    }

    const onDelete = (id, category) => {
        axios.delete(url_delete+`/${id}`, header)
            .then(response => {
                setIsDeleted(true)
                onSelectCategory(category)
                toast.success("Product deleted successfully!", {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
            })
            .catch(error => {
                toast.error(error.message, {autoClose: 2000, position: toast.POSITION.TOP_RIGHT})
            })
    }

    return (
        <div className="Screen">
            <Header title="Products" />
            
            <div className="mb-3 text-center">
                <strong className="fs-5 form-label">Category : </strong>
                {
                    categoryList.length>0 &&
                    <select className="NextBtn" onChange={e => { onSelectCategory(e.target.value)} }>
                        <option disabled selected>Select category</option>
                        {
                            categoryList.map(category =>{
                                return(
                                    <option>{category.name}</option>
                                )
                            })
                        }
                       
                    </select> 
                }

            </div>

            <div className="row">
                {
                    productDetails.length>0 &&
                    productDetails.map(detail => {
                        return(
                            <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                <div className="card">
                                    <div className="card-body text-center">
                                        {
                                            detail.product.imageName!==null &&
                                            <img src={`Img`+`/${detail.product.imageName}`} alt="productimage" className="img-fluid productImage"/>
                                            
                                        }
                                        {
                                            detail.product.imageName===null &&
                                            <img src={AddProduct} alt="productimage" className="img-fluid"/>
                                        }
                                        
                                        <div className="card-title"> <h3>{detail.product.name}</h3> </div>
                                        
                                        <div className="card-text">
                                            <h5>Price : {detail.product.price} &#8377;</h5>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-4 Block stockData">Stock : {detail.stock.quantity} </div>
                                                <div className="col-md-4 Block"><button onClick={() => {onEdit(detail)}} className="btn btn-info">Edit</button></div>
                                                <div className="col-md-4"><button onClick={() => {onDelete(detail.product.id, detail.category)}} className="btn btn-outline-danger">Delete</button></div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>  
                        )
                        
                    })
                }
                
                <div className="col-md-3 col-sm-6 col-xs-12 myCardElement addProductCard" onClick={() => {props.history.push("/add-product")}}>
                    <div className="card">
                        <div className="card-body text-center">
                            <br/><br/>
                            <div className="card-text fs-1">
                                <br/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                
                            </div>
                            <br/><br/><br/><br/><hr/>
                            <h3 className="text-center">Add new Product</h3>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        
    )
}

export default ViewProductsScreen