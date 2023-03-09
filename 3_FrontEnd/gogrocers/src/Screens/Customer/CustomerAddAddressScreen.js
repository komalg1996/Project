import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../../Components/Header'
import { URL_PATH } from '../../Constants/Url'

const CustomerAddAddressScreen = (props) => {


    const url_AddAddress = URL_PATH+"/address/add"

    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [stateName, setStateName] = useState("")
    const [country, setCountry] = useState("")
        
    const body = {
        addressLine1,
        addressLine2,
        city,
        pinCode,
        state: stateName,
        country

    }

    const onAddAddress = () => {
        axios.post(url_AddAddress, body, header)
            .then(response => {
                toast.success("Address added successfully", {autoClose: 1500, position: toast.POSITION.TOP_RIGHT})
                props.history.push("/addresses")
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }

    return (
        <div className="Screen">
            <Header title="Add Address" />
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">

                    <div className="mb-3">
                        <h5 className="form-label">Address line 1</h5>
                        <input onChange={e => {setAddressLine1(e.target.value)}} className="form-control" type="text" placeholder="House number, apartment" />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label">Address line 2</h5>
                        <input onChange={e => {setAddressLine2(e.target.value)}} className="form-control" type="text" placeholder="Locality / area / nearby landmark " />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5>City</h5>
                                <input className="form-control" onChange={e => { setCity(e.target.value) }} type="text" placeholder="City name" />
                            </div>
                            
                            <div className="mb-3">
                                  <h5>State</h5>  
                                <input className="form-control" onChange={e => {setStateName(e.target.value)}} type="text" placeholder="State / union territory" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5>Pin Code</h5>    
                                <input className="form-control" onChange={e => {setPinCode(e.target.value)}} type="text" placeholder="pincode / zipcode" />
                            </div>
                            
                            <div className="mb-3">
                                <h5>Country</h5>
                                <input className="form-control" onChange={e => {setCountry(e.target.value)}} type="text" placeholder="country" />
                            </div>
                            
                        </div>
                    </div>

                    <div className="mb-3">
                        <br/>
                        <button onClick={onAddAddress} className="btn btn-outline-primary"> Add address </button>
                        <button onClick={()=>{props.history.push("addresses/")}} className="btn btn-outline-danger NextBtn"> Cancel </button>
                    </div>
                    
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default CustomerAddAddressScreen