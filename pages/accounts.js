import React, { useEffect, useState } from "react";
import style from "./css/cart.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import HeadSEO from "../components/common/Head/head";
import CartItemsLoading from "../components/common/Cart/cart-items-loading";
import { useSession } from "next-auth/react";
import CartItems from "../components/common/Cart/cart-items";

import EventDetMinus from "../components/common/svg/eventDetials/minus";
import EventDetPlus from "../components/common/svg/eventDetials/plus";
import GlobalHeaderFooter from "../utils/common/global-header-footer";

export default function Accounts() {
  const [cartLoad, setCartLoad] = useState(true);
  const [cartEnpty, setCartEnpty] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [cartData, setCartData] = useState({});
  const { data: session, status } = useSession();
  const nx_cart_id = Cookies.get("nx_cart_id");


  // const getCarts = async () => {

  //   // https://admin.instacertify.com/instacertify-backend/public/api/cart
  //     try {
  //         const response = await fetch("https://admin.instacertify.com/api/cart", {
  //             method: "GET",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             }
  //         });

  //         console.log("reponse" , response);

  //         if (response.ok) {
  //             const data = await response.json();
             
  //         } 
  //     } catch (error) {
  //     } 
  // };

  const [pageLoad, setPageLoad] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // const [refreshFlag,setRefreshFlag] = useState(false);





  const submitHandler = async (e) => {
      e.preventDefault(); 

      setPageLoad(true); 

      try {
          const response = await fetch("https://admin.instacertify.com/api/profile-update", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization":`Bearer ${JSON?.parse(localStorage.getItem("insta_Access"))} `
              },
              body: JSON.stringify({
                  name: name,
                  last_name: lastName,
                  email: email
               
              })
          });

          const data = await response.json();

          console.log(data);
          
          if (response.ok) {
              setMessage("Profile updated successfully!");
              // setRefreshFlag(!refreshFlag)
          } else {
              setMessage(data.error || "Failed to update profile");
          }
      } catch (error) {
          setMessage("An error occurred while updating profile");
      } finally {
          setPageLoad(false); 
      }
  };

    useEffect(() => {
      const fetchUserProfile = async () => {
          setPageLoad(true); 

          try {
              const response = await fetch("https://admin.instacertify.com/api/user-profile", {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                      // Add authorization header if needed
                      "Authorization":`Bearer ${JSON?.parse(localStorage.getItem("insta_Access"))}`
                      
                  }
              });

              console.log("response" , response);

           
                  const data = await response.json();
                  console.log(data);
                  // setRefreshFlag(!refreshFlag)
                  setName(data?.name);
                  setLastName(data?.last_name);
                  setEmail(data?.email);

                  
               
          } catch (error) {
              setMessage("An error occurred while fetching profile data");
          } finally {
              setPageLoad(false); // Hide loading overlay
          }
      };

      fetchUserProfile();
  }, []); 

  
  return (
    <div className={style.cartBody}>
      <HeadSEO
        title={"Shopping Cart"}
        description={"Shopping Cart"}
        image={false}
      />

<div className="container">
                    <h1 className={style.pageHead}>Account settings</h1>

                    <div className={style.accountContainer}>
                        <div className={style.formBuilder}>
                            <form className="surii" method='POST' encType="multipart/form-data"
                             onSubmit={submitHandler}
                             >
                                {/* Form fields go here, e.g., firstName, lastName, etc. */}
                                <div className={style.formGroup}>
                                    <div  className="test_input">
                                        <label>First Name <small>*</small></label>
                                        <input type="text" name="name" value={name && name} onChange={(e) => setName(e.target.value)} maxLength="30" />
                                    </div>
                                    <div className="test_input">
                                        <label>Last Name <small>*</small></label>
                                        <input type="text" name="lastName" value={lastName && lastName} onChange={(e) => setLastName(e.target.value)} maxLength="30" />
                                    </div>
                                    <div className="test_input">
                                        <label>Email <small>*</small></label>
                                        <input type="email" name="email" value={email && email} onChange={(e) => setEmail(e.target.value)} maxLength="30" />
                                    </div>
                                </div>
                                
                                {/* Add the rest of your form fields here */}

                                <div className={style.formAction}>
                                    <button type="submit" className="btn-success tryingh">Update Details</button>
                                </div>

                                {message && <span className={style.formMessage}>{message}</span>}
                            </form>
                        </div>
                    </div>
                </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    
    const globalSettings = await GlobalHeaderFooter();
    return {
      props: {
        page_content: false,
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      },
    };

  } catch (error) {
    
    return {
      props: {
        page_content: false,
        navbar: false,
        footer: false
      },
      notFound: true
    };

  }
}
