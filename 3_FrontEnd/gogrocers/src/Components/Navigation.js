import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../Actions/userActions";

const Navigation = (props) => {
  const userSignIn = useSelector((store) => store.userSignIn);
  const cart = useSelector((store)=>store.cart)
  const dispatch = useDispatch();

  let [isClicked,setIsClicked] = useState(false)

  const onLogOut = () => {
    dispatch(signout());
    document.location.href = "/";
  };

  const cartClicked = () => {
    setIsClicked(true)
  }

  useEffect(()=>{
    if(isClicked===true){
      document.getElementById("cartView").style.width = "100%";
      setIsClicked(false)
    }
  },[isClicked])



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark myNav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">GoGrocers</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
            aria-expanded="false"aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {
            userSignIn.response && userSignIn.response.data.role === "ADMIN" && (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/admin-home"> Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/edit-profile">Profile</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Employees</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/employees"> View Employees and Delivery Persons</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/add-employee">Add Employee</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/delete-employee">Remove Employee</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/categories">View Categories</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/add-category">Add Category</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/products">View Products</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/add-product">Add Product</Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/stock">Stock</Link>
                </li>
              </ul>
              <div className="d-flex">
                <button onClick={onLogOut} className="btn btn-outline-info" type="button" >Logout</button>
              </div>
            </div>
            )
          }
          {   
                userSignIn.response && userSignIn.response.data.role==="EMPLOYEE" &&     
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/employee-home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/edit-profile">Profile </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Manage Orders
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/orders"> All Orders </Link></li>
                                <li><Link className="dropdown-item" to="/assigned-orders"> Assigned Orders </Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/categories"> View Categories </Link></li>
                                <li><Link className="dropdown-item" to="/add-category"> Add Category </Link></li>
                                
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/products"> View Products </Link></li>
                                <li><Link className="dropdown-item" to="/add-product"> Add Product </Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button onClick={onLogOut} className="btn btn-outline-info"> Logout </button>
                    </div>

                </div>
              }

              {   
                userSignIn.response && userSignIn.response.data.role==="CUSTOMER" &&
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/customer-home">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Profile
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/edit-profile"> My Profile </Link></li>
                                <li><Link className="dropdown-item" to="/addresses"> My Address </Link></li>
                            </ul>
                        </li>
                     
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-orders"> My Orders </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customer-products"> Products </Link>
                        </li>
                 </ul>
                 <div className="d-flex">
                    <div className="cartArea" onClick={() => {cartClicked()}}>                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5bc0de" className="bi bi-cart-fill text-info" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                            <label className="cartCount">{cart.length}</label>
                            <span className="right-space"></span>
                    </div>
                    <button onClick={onLogOut} className="btn btn-outline-info"> Logout </button>
                  </div>

                </div>
              }

              {   
                userSignIn.response && userSignIn.response.data.role==="DELIVERY_PERSON" &&
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/delivery-home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/edit-profile"> Edit Profile </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Deliver Orders
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/orders"> Ready Orders </Link></li>
                                <li><Link className="dropdown-item" to="/picked-orders"> Picked Orders </Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <button onClick={onLogOut} className="btn btn-outline-info"> Logout </button>
                    </div>
                </div>
              }

          {!userSignIn.response && (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/"> Home </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about"> About </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
              </ul>
              <div className="d-flex">
                <Link to="/signin" className="btn btn-outline-info" type="button">Login</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;