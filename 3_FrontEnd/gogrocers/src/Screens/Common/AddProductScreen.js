import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import AddProduct from '../../Images/AddProduct.jpg'
import {toast} from 'react-toastify'
import { URL_PATH } from '../../Constants/Url'

const AddProductScreen = (props) => {
    const userSignIn = useSelector(store =>store.userSignIn)

    const url_category = URL_PATH+"/category/all"
    const url_product_add = URL_PATH+"/product/add-product"

    const header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem("Authorization")
        },
    };

    const [categoryList,setCategoryList] = useState([])
    const [productName,setProductName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState(5)
    const [imageFile,setImageFile] = useState(AddProduct)
    const [image,setImage] = useState(null)
    const onFileSelect =(file) => {
        setImageFile(URL.createObjectURL(file))
        setImage(file)
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

    const onAddProduct = ()=>{
        const productDTO ={
            product : {
                name : productName,
                description,
                price,
                status : "ACTIVE"
            },
            category,
            stock : {
                quantity,
            }
        }

        const formData = new FormData()
        formData.append('productDto',JSON.stringify(productDTO))
        formData.append('image',image)

        axios.post(url_product_add,formData,header)
        .then((response)=>{
            toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
            props.history.push("/products")
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
                    <Header title="Add Product"/>
                    <div className="col-md-4 Block">                    
                        <div className="mb-3 productHolder text-center">
                            <span className="vertical-aligner"></span>
                            <img src={imageFile} className="img-thumbnail img-responsive img-fluid" alt="imgae"/>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Add or Change Image</label>
                            <input type="file" className="form-control" onChange={(e)=>onFileSelect(e.target.files[0])} multiple={false}></input>
                        </div>
                    </div>
                    <div className="col-md-8">                          
                        <div className="mb-3">
                            <label className="form-label">Product Name</label>
                            <input onChange={(e)=> setProductName(e.target.value)} type="text" className="form-control" placeholder="Product Name"></input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Description</label>
                            <textarea onChange={(e)=> setDescription(e.target.value)} className="form-control" rows="3" placeholder="Add Description of Product"/>
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
                                    <input onChange={(e)=> setQuantity(e.target.value)} type="number" className="NextBtn" defaultValue={5}/>    
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="mb-3">
                                    <label className="form-label">Price: </label>
                                    <input onChange={(e)=> setPrice(e.target.value)} type="number" className="NextBtn" placeholder="Rs.125" />
                                </div>                            
                
                            </div>
                        </div>
                            
                        <div className="mb-3">
                            <br/>
                            <button onClick={onAddProduct} type="button" className="btn btn-primary" >Add Product</button>
                            <button onClick={() => props.history.push(`/${userSignIn.response.data.role.toUpperCase()}-home`)} className="btn btn-danger NextBtn"> Cancel </button>
                        </div> 
                    </div>
                </div>
            }
        </div>
    )
}

export default AddProductScreen