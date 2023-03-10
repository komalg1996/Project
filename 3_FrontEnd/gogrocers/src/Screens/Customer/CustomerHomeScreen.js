import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import { CATEGORY_LIST_FETCH, CATEGORY_SELECT } from "../../Constants/categoryConstants";
import { toast } from "react-toastify"
import { URL_PATH } from "../../Constants/Url";
import img from '../../Images/About.jpg'
 
const CustomerHomeScreen = (props) => {
  const userSignIn = useSelector((store) => store.userSignIn);
  const url_category = URL_PATH + "/category/all"
  const url_cart_fetch = URL_PATH + "/cart/all"

  const header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": sessionStorage.getItem("Authorization")
    },
  };

  const [categoryList, setCategoryList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {

    axios.get(url_cart_fetch, header)
      .then((response) => {
        dispatch({
          type: "UPDATE_CART",
          payload: response.data.data,
        })
      })
      .catch(error => {
        toast.error(error.message, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
      })

    axios.get(url_category, header)
      .then((response) => {
        setCategoryList([])
        setCategoryList(response.data.data)
        dispatch({
          type: CATEGORY_LIST_FETCH,
          payload: response.data.data
        })
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
      })
  }, [])

  const onSelect = (category) => {
    console.log(category)
    if (category.status === "ACTIVE") {
      console.log(category)
      dispatch({
        type: CATEGORY_SELECT,
        payload: category,
      })
      props.history.push("/customer-products")
    }
    else {
      toast.error("Not selling " + category.name + " at the moment", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
    }
  }

  const getStatusClass = (status) => {
    if (status === "INACTIVE")
      return " block-card"
    return ""
  }

  return (
    <div >
      <div className="Screen">
        {
          !userSignIn.response &&
          <div>
            <Header title="You are not logged in" />
            <img
              src={img}
              height="500px"
              width="1100px"
            />
          </div>
        }
        {
          userSignIn.response &&
          <div>
            <Header title={"Welcome " + userSignIn.response.data.firstName} />
            <div className="row">
              {
                categoryList.length > 0 && categoryList.map(detail => {
                  return (
                    <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                      <div className={"card" + getStatusClass(detail.status)} onClick={() => { onSelect(detail) }}>
                        <div className="card-body text-center">

                          <div className="row">
                            <div className="col-md-9">
                              <h5 className="cat-card-title">
                                {detail.name}

                              </h5>
                            </div>

                            <div className="col-md-3">
                              <span className="vertical-aligner"></span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right NextBtn" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                              </svg>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <img
                src={img}
                height="500px"
                width="1100px"
              />
            </div>

          </div>

        }
      </div>

    </div>
  );
};

export default CustomerHomeScreen;