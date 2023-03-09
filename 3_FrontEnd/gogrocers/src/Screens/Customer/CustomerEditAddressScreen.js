import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Header from '../../Components/Header'
import { URL_PATH } from '../../Constants/Url'

const CustomerEditAddressScreen = (props) => {

    const editAddress = useSelector(store => store.editAddress)
    const url_edit_address = URL_PATH+"/address/edit"

    const header = {
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : sessionStorage.getItem("Authorization")
        }
    }

    const [addressLine1, setAddressLine1] = useState(editAddress.addressLine1)
    const [addressLine2, setAddressLine2] = useState(editAddress.addressLine2)
    const [city, setCity] = useState(editAddress.city)
    const [pinCode, setPinCode] = useState(editAddress.pinCode)
    const [stateName, setStateName] = useState(editAddress.state)
    const [country, setCountry] = useState(editAddress.country)
        
    const body = {
        addressLine1,
        addressLine2,
        city,
        pinCode,
        state: stateName,
        country
    }

    const dispatch = useDispatch()

    const onEditAddress = () => {
        axios.put(url_edit_address + `/${editAddress.id}`, body, header)
            .then(response => {
                toast.success("Address edited successfully", {autoClose: 1500, position: toast.POSITION.TOP_RIGHT})
                dispatch({
                    type: "EDIT_ADDRESS",
                    payload: body
                })
                props.history.push("/addresses")
            })
            .catch(error => {
                toast.error(error.message,{autoClose:2000,position:toast.POSITION.TOP_RIGHT})
            })
    }

    return (
        <div className="Screen">
            <Header title="Edit Address" />
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">

                    <div className="mb-3">
                        <h5 className="form-label">Address line 1</h5>
                        <input defaultValue={addressLine1} onChange={e => {setAddressLine1(e.target.value)}} className="form-control" type="text" placeholder="House number, apartment" />
                    </div>

                    <div className="mb-3">
                        <h5 className="form-label">Address line 2</h5>
                        <input defaultValue={addressLine2} onChange={e => {setAddressLine2(e.target.value)}} className="form-control" type="text" placeholder="Locality / area / nearby landmark " />
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5>City</h5>
                                <input className="form-control" defaultValue={city} onChange={e => { setCity(e.target.value) }} type="text" placeholder="City name" />
                            </div>
                            
                            <div className="mb-3">
                                  <h5>State</h5>  
                                <input className="form-control" defaultValue={stateName} onChange={e => {setStateName(e.target.value)}} type="text" placeholder="State / union territory" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <h5>Pin Code</h5>    
                                <input className="form-control" defaultValue={pinCode} onChange={e => {setPinCode(e.target.value)}} type="text" placeholder="pincode / zipcode" />
                            </div>
                            
                            <div className="mb-3">
                                <h5>Country</h5>
                                <input className="form-control" defaultValue={country} onChange={e => {setCountry(e.target.value)}} type="text" placeholder="country" />
                            </div>
                            
                        </div>
                    </div>

                    <div className="mb-3">
                        <br/>
                        <button onClick={onEditAddress} className="btn btn-outline-primary"> Edit address </button>
                        <button onClick={()=>{props.history.push("/addresses")}} className="btn btn-outline-danger NextBtn"> Cancel </button>
                    </div>
                    
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}

export default CustomerEditAddressScreen