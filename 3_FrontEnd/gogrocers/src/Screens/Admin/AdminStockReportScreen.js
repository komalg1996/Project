import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import {toast} from "react-toastify"
import { URL_PATH } from '../../Constants/Url'

const AdminStockReportScreen = (props) => {

    const url_cat_all = URL_PATH+"/category/all"
    const url_stock = URL_PATH+"/product/stock/category-report"

    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const [categoryList, setCategoryList] = useState([])
    const [productDetails, setProductDetails] = useState([])

    useEffect(()=>{

        axios.get(url_cat_all, header)
        .then(response => {
            setCategoryList([]) 
            setCategoryList(response.data.data)
            onSelectCategory(response.data.data[0].name)
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })

    }, [])

    const onSelectCategory = (categoryName) => {
       
        axios.get(url_stock+`/${categoryName}`, header)
        .then(response => {
            setProductDetails([])
            setProductDetails(response.data.data)
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }

    return (
        <div className="Screen">
            <Header title="Stock Report" />            
            <div className="mb-3 text-center">
                <strong className="fs-5 form-label">Category : </strong>
                {
                    categoryList.length>0 &&
                    <select className="nextBtn" onChange={e => { onSelectCategory(e.target.value)} }>
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
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <hr/>
                    {
                        !productDetails.length>0 && 
                        <h5 className="text-center"> No products in this category</h5>
                    }
                    {
                        productDetails.length>0 && 
                        <table className="table table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Product ID</th>
                                    <th>Product Name</th>
                                    <th className="text-center">Product Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                productDetails.length>0 &&
                                productDetails.map(detail =>{
                                    return (
                                        <tr>
                                            <td className="text-center">{detail.product.id}</td>
                                            <td>{detail.product.name}</td>
                                            <td className="text-center">{detail.stock.quantity}</td>
                                        </tr>
                                    )
                                })
                                    
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default AdminStockReportScreen