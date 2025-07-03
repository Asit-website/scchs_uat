import React, { useEffect, useState } from "react";
import style from "./css/cart.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import HeadSEO from "../components/common/Head/head";
import CartItemsLoading from "../components/common/Cart/cart-items-loading";
import { useSession } from "next-auth/react";
import CartItems from "../components/common/Cart/cart-items";
import { useRouter } from 'next/router';
import EventDetMinus from "../components/common/svg/eventDetials/minus";
import EventDetPlus from "../components/common/svg/eventDetials/plus";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import { constrainedMemory } from "process";
import { format } from "path";
import handler from "./api/hello";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Cart(props) {

  // console.log("cartprob",props);

  const { toggleBoolValue, boolValue } = props;

  const [cartLoad, setCartLoad] = useState(true);
  const [cartEnpty, setCartEnpty] = useState(false);
  const [cartUpdate, setCartUpdate] = useState(false);
  const [cartData, setCartData] = useState([]);
  const { data: session, status } = useSession();
  const nx_cart_id = Cookies.get("nx_cart_id");

  const router = useRouter();


  const [count, setCount] = useState(1);

  const [payment,setPayment] = useState({})

  const getCarts = async () => {

    try {
      const response = await fetch("https://uat.scchs.co.in/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        }
      });

      const data = await response.json();
      console.log(data);
      console.log(data?.cart);
      setCartData(data?.cart);
    } catch (error) {
    }
  };

  const removeCarts = async (id, qty) => {
    try {
      const response = await fetch("https://uat.scchs.co.in/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        },
        body: JSON.stringify({
          product_id: id,
          quantity: qty
        }),
      });


      // if (response.ok) {
      const data = await response.json();
      console.log(data);
      toggleBoolValue();
      setCartData(data?.cart);

      // } 
    } catch (error) {
      console.log(error);
    }
  }

  const clearCarts = async () => {
  const result = await Swal.fire({
    title: 'Clear Cart?',
    text: 'Are you sure you want to remove all items from your cart?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'Cancel',
  });

  if (!result.isConfirmed) return;

  try {
    const response = await fetch("https://uat.scchs.co.in/api/cart/clear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
      },
    });

    const data = await response.json();
    Swal.fire('Cleared!', data?.message || 'Your cart has been cleared.', 'success');
    setCartData(data?.cart);
    toggleBoolValue();

  } catch (error) {
    Swal.fire('Error', 'Failed to clear the cart. Please try again.', 'error');
  }
};

const clearCarts1 = async () => {
    try {
      const response = await fetch("https://uat.scchs.co.in/api/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        },

      });
      const data = await response.json();
      alert(data?.message)
      setCartData(data);
      toggleBoolValue();


    } catch (error) {
    }
  }

  const [datas, setDatas] = useState([]);

  const [order,setOrder] = useState([]);

  const getAddress = async () => {

    try {
      const response = await fetch("https://uat.scchs.co.in/api/listalladdress", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        }
      });

      const data1 = await response.json();
      setDatas(data1?.data)
      console.log(data1.data)
      // setData(data1?.data);
      // console.log(data?.user_id);

    } catch (error) {
    }
  };

  const fetchOrders = async () => {
    try {

      const resp = await fetch("https://uat.scchs.co.in/api/orders", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        }
      });


        const formateddata = await resp.json();
        console.log(formateddata);
        setOrder(formateddata)

      


    } catch (error) {

      console.error("There was an error fetching the categories:", error);
    }
  };

  useEffect(() => {
    getAddress();
    fetchOrders();
  }, [])


  useEffect(() => {
    const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
    if (isLoggedIn) {
      sessionStorage.removeItem("cartItems");
      getCarts();
    }
    else {
      let allCarts = JSON.parse(sessionStorage.getItem("cartItems")) || [];
      console.log("alllca0" , allCarts);
      setCartData(allCarts);
    }
  }, [boolValue])

  useEffect(() => {
    const loadRazorpayScript = async () => {
      // Check if Razorpay script is not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }
    };

    loadRazorpayScript();
  }, []); // Empty dependency array ensures it runs only once after mount


  const [instaUser, setInstaUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensures code only runs in the browser
      const storedInstaUser = localStorage.getItem("scchs_User");
      setInstaUser(storedInstaUser ? JSON.parse(storedInstaUser) : null);
    }
  }, []);




  const paymentHandler = async () => {

    const response = await fetch("https://uat.scchs.co.in/api/order/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`

        },
        body: JSON.stringify(
          {
            products: cartData?.map(x => (
              {
                id: x?.product_id,
                qty: x.quantity
              }
            ))
            ,
            address_id: datas[0]?.id
          }
        ),
      }
    );


    const formattedResponse = await response.json();
    //  let order_id = form
    console.log(formattedResponse);

    setPayment(formattedResponse);
    console.log(payment.grand_total_price);
    //  let amount = formattedResponse.message.amount/100;

    // http://localhost/instacertify-backend/public/api/ecommerce/transactions


    const options = {
      // key: "rzp_live_qmaktzPiRRIRtX",
      key:"rzp_test_pX78hyqIUdIzIN",
      amount: formattedResponse?.grand_sale_price * 100,
      currency: "INR",
      name: "Nikhil",
      description: "product transaction",
      order_id: formattedResponse?.order_id,
      handler: async function(response){
      //  console.log(response);
      //   if(response){
      //     clearCarts();
      //   }

      const resp = await fetch("https://uat.scchs.co.in/api/ecommerce/transactions",{
        method:"POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`

        },
        body: JSON.stringify({
          razorpay_payment_id:response.razorpay_payment_id,
          razorpay_order_id:response.razorpay_order_id,
          razorpay_signature:response.razorpay_signature
        })
        


      })

      const formatData = await resp.json();
      console.log(formatData);
      alert(formatData?.message);
      clearCarts();
      
      },
      // reference_id:formattedResponse?.order_id,
      
      
      // callback_url: `https://ecomm-backend-aopz.onrender.com/api/v1/payment/verifySignature/${JSON?.parse(localStorage.getItem("insta_Access"))}`,
      prefill: {
        name: instaUser?.name,
        email: instaUser?.email,
        contact: datas[0]?.phone
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#EC691F"
      }
    }

    const paymentObject = new window.Razorpay(options, instaUser);


    paymentObject.open();


  }

  



  return (
    <div className={style.cartBody}>
      <HeadSEO
        title={"Shopping Cart"}
        description={"Shopping Cart"}
        image={false}
      />

      {cartUpdate == true ? (<span className='loadingOverlay' style={{ display: 'block', position: 'fixed' }} />) : ""}

      {cartEnpty === false ? (
        <div className="container cart_container">
          {
            cartData?.length > 0 ?
              <table
                className={

                  style.cartTabel
                }
              >
                <thead>
                  <tr>
                    <th className={style.item_th_1}>Product</th>
                    <th className={style.item_th_2}>Price</th>
                    <th className={style.item_th_3}>Quantity</th>
                    <th className={style.item_th_4}>Total</th>
                  </tr>
                </thead>
                {
                  cartData?.map((val, index) => {
                    return (
                      <tbody className="test_carting" key={index}>


                        <>

                          <td className={style.item_td_1}>
                            <div className={style.imageWithContent}>
                              <div className={style.left}>

                                <img width="200" height="212" src={val?.image || val?.images} />
                              </div>
                              <div className={style.right}>
                                <h4>{val?.name || val?.product_name}</h4>
                                <button onClick={() => {
                                  const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                  if (isLoggedIn) {
                                    removeCarts(val.product_id, val.quantity);
                                  }
                                  else {
                                    const filterdata = cartData?.filter(data => data?.id !== val?.id);
                                    setCartData(filterdata);
                                    sessionStorage.setItem("cartItems", JSON.stringify(filterdata));
                                    toggleBoolValue();

                                  }

                                }} type="button">Remove</button>
                              </div>
                            </div>
                          </td>

                          <td className={style.item_td_2}>
                            <span>${val?.price}</span>
                          </td>

                          <td className={style.item_td_3}>
                            <div className={style.formIncrement + " parentFormIncrement"}>
                              <button onClick={() =>{
                                 setCartData((prev) => (
                                  prev.map((item) => {
                                  if(item.id){
                                    return item.id === val.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                                  }
                                  else{
                                    return item.product_id === val.product_id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
                                  }
                              })
                                ))
                              } } className={style.btnIncDec + " qtyDecrement"} type="button">
                                <EventDetMinus />
                              </button>
                              <span className={style.inputQty}>{val?.quantity}</span>
                              <button onClick={() =>
                                setCartData((prev) => (
                                  prev.map((item) => {
                                     if(item?.id){
                                     return item.id === val.id ? { ...item, quantity: Math.max(1, item.quantity + 1) } : item
                                     }
                                     else{
                                    return  item.product_id === val.product_id ? { ...item, quantity: Math.max(1, item.quantity + 1) } : item
                                     }
                                  })
                                ))
                              } className={style.btnIncDec + " qtyIncrement"} type="button">
                                <EventDetPlus />
                              </button>
                            </div>
                          </td>

                          <td className={style.item_td_4}>
                            {/* <span className={style.eleTitle}>Total:</span> */}
                            <span>${val?.price * val?.quantity}</span>
                          </td>
                        </>


                      </tbody>
                    )

                  })




                }

              </table>
              :

              <div className="container">
                <div className={style.cart_empty}>
                  <svg fill="#1C2E33" width="26" height="28" viewBox="0 0 26 28">
                    <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                  </svg>
                  <h2>Your cart is empty</h2>
                  <Link href={"/"}>Go to Home</Link>
                </div>
              </div>

          }


          {
            cartData?.length > 0 && <button onClick={() => {

              const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
              if (isLoggedIn) {
                clearCarts();

              }
              else {
                sessionStorage.setItem("cartItems", JSON.stringify([]));
                setCartData([]);
                toggleBoolValue();
              }

            }} className="site-button site_button1">Clear Carts</button>
          }

          {
            cartData?.length > 0 && <button onClick={() => {

              const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
              if (isLoggedIn) {
                if (datas[0]?.id) {
                  paymentHandler()
                }
                else {
                  router.push("/address")
                }
                // paymentHandler();
              }
              else {
                router.push('/user/userlogin');
              }

            }} className="site-button site_button1">Checkout</button>
          }

          {cartLoad == false ? (
            <div className={style.cartSummary}>
              <ul>
                <li>
                  <span>Subtotal</span>
                  <span>${cartData?.cart_amount.toFixed(2)}</span>
                </li>
                <li>
                  <span>Shipping & Tax</span>
                  <span>Calculated at Checkout</span>
                </li>
                <li className={style.grandTotal}>
                  <span>Total</span>
                  <span>${cartData?.cart_amount.toFixed(2)}</span>
                </li>
              </ul>
              <p className={style.discountInfo}>
                Discount codes can be applied during checkout.
              </p>

              {instaUser ? (<Link href={cartData?.redirect_urls?.checkout_url} className={style.btnCheckout}>Checkout</Link>) : (<Link href={'/login'} className={style.btnCheckout}>Checkout</Link>)}


            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="container">
          <div className={style.cart_empty}>
            <svg fill="#1C2E33" width="26" height="28" viewBox="0 0 26 28">
              <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
            </svg>
            <h2>Your cart is empty</h2>
            <Link href={"/"}>Go to Home</Link>
          </div>
        </div>
      )}
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
