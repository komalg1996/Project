import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Components/Header'
import {toast} from 'react-toastify'
import { URL_PATH } from '../../Constants/Url'

const ViewAllCategoriesScreen = (props) => {
    const userSignIn = useSelector(store =>store.userSignIn)
    
    const url_category = URL_PATH+"/category/all"
    const url_edit = URL_PATH+"/category/edit"
    const url_delete = URL_PATH+"/category/delete"

    const header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem("Authorization")
        },
    };

    const [categoryList,setCategoryList] = useState([])
    const [nameError,setNameError] = useState("")
    const [isEdited,setIsEdited] = useState(false)
    const [isDeleted,setIsDeleted] = useState(false)

    useEffect(()=>{
        axios.get(url_category,header)
        .then((response)=>{
            setIsEdited(false)
            setIsDeleted(false)
            setCategoryList([])
            setCategoryList(response.data.data)
        })
        .catch((error)=>{
            toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
        })
    },[isEdited,isDeleted])

    const onEdit = (category) =>{
        if(category.name.length === 0 ){
            setNameError("Category Name is required")
        }
        else{
            setNameError("")
            const {id,name,status} = category
            const body ={id,name,status}
            axios.put(url_edit,body,header)
            .then((response)=>{
                setIsEdited(true)
                toast.success(name+" edited successfully!",{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
            })
            .catch((error)=>{
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
        }
    }

    const onDelete = (id) => {
        axios.delete(url_delete+`/${id}`,header)
        .then((response)=>{
            setIsDeleted(true)
            toast.success(response.data.data,{position:toast.POSITION.TOP_RIGHT,autoClose:2000})
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
                <div>
                    <Header title="Categories"/>
                    <div className="row">
                        <div className="table-responsive table-body">
                            <table className="table table-striped table-hover text-center">
                                <tbody>
                                    {
                                        categoryList && categoryList.map(category => {
                                            return(
                                                <tr>
                                                    <td>{category.id}</td>
                                                    <td>
                                                        <input type="text" className="text-center" defaultValue={category.name} onChange={(e)=> category.name=e.target.value}/>
                                                        <h6 className="text-danger">{nameError}</h6>
                                                    </td>
                                                    <td>
                                                        {    
                                                            category.status === "ACTIVE" &&
                                                            <select onChange={(e)=>{category.status=e.target.value}}>
                                                                <option>ACTIVE</option>
                                                                <option>INACTIVE</option>
                                                            </select>
                                                        }
                                                        {    
                                                            category.status === "INACTIVE" &&
                                                            <select onChange={(e)=> {category.status=e.target.value}}>
                                                                <option>INACTIVE</option>
                                                                <option>ACTIVE</option>
                                                            </select>
                                                        }
                                                    </td>
                                                    <td><button onClick={() => onEdit(category)} className="btn btn-outline-success">Save</button></td>
                                                    <td><button onClick={()=> onDelete(category.id)} className="btn btn-outline-danger NextBtn">Remove</button></td>
                                                </tr>
                                            ) 
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewAllCategoriesScreen