import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import AddProduct from '../../Images/AddProduct.jpg'
import {toast} from "react-toastify"
import { URL_PATH } from '../../Constants/Url'

const EditProductScreen = (props) => {
    const userSignIn = useSelector(store =>store.userSignIn)
    const productDetail = useSelector(store =>store.productDetail)
    
    const url_category = URL_PATH+"/category/all"
    const url_product_edit = URL_PATH+"/product/edit"
    const url_image = "http://127.0.0.1:8887/src/Images"
    const header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem("Authorization")
        },
    };

    const [categoryList,setCategoryList] = useState([])
    const [productName,setProductName] = useState(productDetail.product.name)
    const [description,setDescription] = useState(productDetail.product.description)
    const [price,setPrice] = useState(productDetail.product.price)
    const [category,setCategory] = useState(productDetail.category)
    const [quantity,setQuantity] = useState(productDetail.stock.quantity)
    const [unit,setUnit] = useState(productDetail.stock.unit)
    const [imageFile,setImageFile] = useState((productDetail.product.imageName && `Images` + `/${productDetail.product.imageName}` )|| AddProduct)
    const [image,setImage] = useState(null)
    
    const onFileUpload =(file) => {
        setImage(file)
        setImageFile(URL.createObjectURL(file))
    }

    useEffect(()=>{
        axios.get(url_category,header)
        .then((response)=>{
            setCategoryList([])
            setCategoryList(response.data.data)
        })
        .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    },[])

    const onEditProduct = ()=>{
        const body ={
            product : {
                id : productDetail.product.id,
                name : productName,
                description,
                price,
                status : "ACTIVE",
                imageName : productDetail.product.imageName
            },
            category,
            stock : {
                id : productDetail.product.id,
                quantity,
                unit
            }
        }

        const formData = new FormData()
        formData.append('productDto',JSON.stringify(body))
        formData.append('image',image)

        axios.put(url_product_edit,formData,header)
        .then((response)=>{
            props.history.push("/products")
            toast.success(response.data.data,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
        .catch(error => {
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    }

    return (
        <div className="Screen">
            {
                !userSignIn.response &&
                    <Header title="You are not logged in"/>
            }
            {
                userSignIn.response &&
                <div className="row">
                    <Header title="Edit Product"/>
                    <div className="col-md-4 Block">                        
                        <div className="mb-3 productHolder text-center">
                            <span className="vertical-aligner"></span>
                            <img src={imageFile} alt="product" className="img-fluid productImage"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Add or Change Image</label>
                            <input type="file" className="form-control" onChange={(e)=>onFileUpload(e.target.files[0])} multiple={false}></input>
                        </div>
                    </div>
                    <div className="col-md-8">                          
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input defaultValue={productDetail.product.name} onChange={(e)=> setProductName(e.target.value)} type="text" className="form-control" placeholder="Product Name"></input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Description</label>
                            <textarea defaultValue={productDetail.product.description} onChange={(e)=> setDescription(e.target.value)} className="form-control" rows="3" placeholder="Add Description of Product"/>
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <div className="mb-3">
                                    <label className="form-label">Category: </label>
                                    {
                                        categoryList.length>0 &&
                                        <select className="NextBtn" onChange={(e)=> setCategory(e.target.value)}>
                                            <option disabled selected>Select Category</option>
                                            {
                                                categoryList.map(category =>{
                                                return(
                                                    <option>{category.name}</option>
                                                    )
                                                })
                                            }
                                            <option>Other</option>
                                        </select> 
                                    }
                                    <input type="text" className="NextBtn" onChange={(e)=> setCategory(e.target.value)}placeholder="New Category"/>
                                    
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Quantity: </label>
                                    <input defaultValue={productDetail.stock.quantity} onChange={(e)=> setQuantity(e.target.value)} type="number" className="NextBtn"/>    
                                </div>
                            </div>
                            
                            <div className="col-md-5">
                                <div className="mb-3">
                                    <label className="form-label">Price: </label>
                                    <input defaultValue={productDetail.product.price} onChange={(e)=> setPrice(e.target.value)} type="number" className="NextBtn" placeholder="Rs.125" />
                                </div>
                                
                            </div>
                        </div>
                            
                        <div className="mb-3">
                            <br/>
                            <button onClick={onEditProduct} type="button" className="btn btn-success" >Edit Product</button>
                            <button onClick={() => props.history.push("/products")} className="btn btn-danger NextBtn"> Cancel </button>
                        </div> 
                    </div>
                </div>
            }
        </div>
    )
}

export default EditProductScreen