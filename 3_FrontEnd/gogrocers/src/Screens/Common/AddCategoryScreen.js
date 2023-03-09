import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from "react-toastify"
import { URL_PATH } from '../../Constants/Url'

const AddCategoryScreen = (props) => {
    const url_add = URL_PATH+"/category/add"
    const userSignIn = useSelector(store =>store.userSignIn)
    const [name,setName] = useState("")

    const header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem("Authorization")
        },
    };

    const body = {name,status:"ACTIVE"}

    const onAddCategory = () => {
        axios.post(url_add,body,header)
        .then((response)=>{
            toast.success(response.data.data.name+" category added successfully!",{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            props.history.push("/categories")
        })
        .catch((error)=>{
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
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Header title="Add New Category"/>
                        <div className="mb-3">
                            <label className="form-label">Category Name</label>
                            <input required onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control"></input>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <input className="form-control" defaultValue="ACTIVE" disabled ></input>
                        </div>
                        <div className="mb-3">
                            <button onClick={onAddCategory} type="button" className="btn btn-primary" >Add Category</button>
                            <button onClick={() => props.history.push(`/${userSignIn.response.data.role.toLowerCase()}-home`)} className="btn btn-outline-danger float-end"> Cancel </button>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            }
        </div>
    )
}

export default AddCategoryScreen
