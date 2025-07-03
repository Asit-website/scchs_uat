import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "./css/cart.module.scss";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import Navbar from '../components/common/Navbar/Navbar'
//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingProductSlider from "../components/common/shopping/product-slider";
import { MdKeyboardArrowDown } from "react-icons/md";

import ShoppingCollections from "../components/common/shopping/collections";
import Head from "next/head";
import HeadSEO1 from "../components/common/Head/head1";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaUser, FaMapMarkedAlt, FaBuilding, FaCity, FaGlobe, FaFlag, FaMapPin, FaPhone } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { toast } from "react-toastify";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};



export default function storeorder(pageProp) {
    const [quantity, setQuantity] = useState(1);
    const price = 15;
    const shipping = 6;

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const [showPaypal, setShowPaypal] = useState(true)

    const [savedAddress, setSavedAddress] = useState(null);

    useEffect(() => {
        const fetchSavedAddress = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("scchs_Access"));
                const res = await fetch("https://uat.scchs.co.in/api/listalladdress", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                console.log(data);
                if (data?.data?.length > 0) {
                    setSavedAddress(data.data[0]); // assuming first address is the main one
                } else {
                    setSavedAddress(null);
                }
            } catch (err) {
                console.error("API fetch error:", err);
            }
        };

        fetchSavedAddress();
    }, []);


    console.log(savedAddress)


    const handleEdit = () => {
        router.push(`address?edit=true`)
    };

    // ====================

    const { toggleBoolValue, boolValue } = pageProp;

    const [cartLoad, setCartLoad] = useState(true);
    const [cartEnpty, setCartEnpty] = useState(false);
    const [cartUpdate, setCartUpdate] = useState(false);
    // const [cartData, setCartData] = useState([]);
    const [cartData, setCartData] = useState({ cart: [], total_amount: 0, grand_total: 0 });
    const { data: session, status } = useSession();
    const nx_cart_id = Cookies.get("nx_cart_id");

    const router = useRouter();


    const [count, setCount] = useState(1);

    // const [payment, setPayment] = useState({})

    const [payment, setPayment] = useState(null);
    const [payNow, setPayNow] = useState(false);

    //  const [instaUser, setInstaUser] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState("loading");



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
            console.log(data?.grand_total);
            console.log(data);
            setCartData(data);
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
            setCartData(data);

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
            toast.success(data?.message)
            setCartData(data);
            toggleBoolValue();


        } catch (error) {
        }
    }

    const [datas, setDatas] = useState([]);

    const [order, setOrder] = useState([]);

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
            console.log("alllca0", allCarts);
            // setCartData(allCarts);
            calculateTotals(allCarts);
        }
    }, [boolValue])

    // ==============suri===========
    // const calculateTotals = (cartItems) => {
    //     const total_amount = cartItems.reduce((sum, item) => {
    //         const price = membershipStatus === "active"
    //             ? parseFloat(item.membership_price || item.price || 0)
    //             : parseFloat(item.price || 0);
    //         return sum + price * (item.quantity || 1);
    //     }, 0);

    //     const shipping_cost = cartItems.reduce((sum, item) => {
    //         const cost = parseFloat(item.shipping_cost || 0); // default to 0 if undefined
    //         return sum + cost;
    //     }, 0);

    //     console.log(shipping_cost);

    //     const grand_total = total_amount + shipping_cost;

    //     setCartData({
    //         cart: cartItems,
    //         total_amount: total_amount.toFixed(2),
    //         grand_total: grand_total.toFixed(2),
    //         shipping_cost: shipping_cost.toFixed(2), // optional if you want to show this separately
    //     });
    // };

    // const calculateTotals = (cartItems) => {
    //     const isMember = membershipStatus?.toLowerCase() === "active";

    //     let total_amount = 0;
    //     let grand_total_m = 0;

    //     cartItems.forEach((item) => {
    //         const quantity = parseInt(item.quantity) || 1;

    //         const normalPrice = parseFloat(item.price ?? 0);
    //         const memberPrice = parseFloat(item.membership_price ?? item.price ?? 0);
    //         const shippingCost = parseFloat(item.shipping_cost ?? 0);

    //         total_amount += normalPrice * quantity;
    //         grand_total_m += (memberPrice * quantity) + shippingCost;
    //     });

    //     const shipping_cost = cartItems.reduce((sum, item) => {
    //         const cost = parseFloat(item.shipping_cost ?? 0);
    //         return sum + cost;
    //     }, 0);

    //     const grand_total = isMember ? grand_total_m : total_amount + shipping_cost;

    //     setCartData({
    //         cart: cartItems,
    //         total_amount: total_amount.toFixed(2),
    //         grand_total: grand_total.toFixed(2),
    //         grand_total_m: grand_total_m.toFixed(2),
    //         shipping_cost: shipping_cost.toFixed(2),
    //     });
    // };

    const calculateTotals = (cartItems) => {
        const isMember = membershipStatus?.toLowerCase() === "active";

        let total_amount = 0;
        let grand_total_m = 0;
        let shipping_cost = 0;

        cartItems.forEach((item) => {
            const quantity = parseInt(item.quantity) || 1;

            const normalPrice = parseFloat(item.price ?? 0);
            const memberPrice = parseFloat(item.membership_price ?? item.price ?? 0);
            const itemShipping = parseFloat(item.shipping_cost ?? 0);

            total_amount += normalPrice * quantity;
            grand_total_m += (memberPrice * quantity) + (itemShipping * quantity);
            shipping_cost += itemShipping * quantity;
        });

        const grand_total = isMember ? grand_total_m : total_amount + shipping_cost;

        setCartData({
            cart: cartItems,
            total_amount: total_amount.toFixed(2),
            grand_total: grand_total.toFixed(2),
            grand_total_m: grand_total_m.toFixed(2),
            shipping_cost: shipping_cost.toFixed(2),
        });
    };


    const updateQuantity = (productId, direction) => {
        const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));

        if (isLoggedIn) {
            // Call backend update if needed
            // You can add API call here to sync backend if required
        }

        setCartData((prev) => {
            const updatedCart = prev.cart.map((item) => {
                const match = item.id === productId || item.product_id === productId;
                const qty = parseInt(item.quantity) || 1;
                if (match) {
                    const newQty = direction === "inc" ? qty + 1 : Math.max(1, qty - 1);
                    return { ...item, quantity: newQty };
                }
                return item;
            });

            if (!isLoggedIn) {
                sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
            }

            calculateTotals(updatedCart);
            return { ...prev, cart: updatedCart };
        });
    };


    useEffect(() => {
        if (cartData?.cart?.length) {
            calculateTotals(cartData.cart);
        }
    }, [cartData?.cart]);
    // useEffect(() => {
    //     if (cartData?.cart?.length && membershipStatus) {
    //         calculateTotals(cartData.cart);
    //     }
    // }, [membershipStatus]);

    const handleAddToCart = (item) => {
        const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
        const existing = cartData.cart.find((cartItem) =>
            (cartItem.id || cartItem.product_id) === (item.id || item.product_id)
        );

        let updatedCart;

        if (existing) {
            updatedCart = cartData.cart.map((cartItem) =>
                (cartItem.id || cartItem.product_id) === (item.id || item.product_id)
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            updatedCart = [...cartData.cart, { ...item, quantity: 1 }];
        }

        if (!isLoggedIn) {
            sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }

        calculateTotals(updatedCart);
        setCartData({ ...cartData, cart: updatedCart });
    };
    // ==============end===========

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

    useEffect(() => {
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            setInstaUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const fetchMembership = async () => {
            if (!instaUser?.id) return;

            try {
                const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
                const data = await res.json();

                const today = new Date();

                const activePlan = data?.data?.find(plan => {
                    const isActive = plan.status === "active";
                    const endDate = new Date(plan.end_date);
                    return isActive && endDate >= today;
                });

                setMembershipStatus(activePlan ? "active" : "none");
            } catch (err) {
                console.error("Error fetching membership:", err);
                setMembershipStatus("none");
            }
        };

        fetchMembership();
    }, [instaUser]);




    // const paymentHandler = async () => {

    //     const response = await fetch("https://uat.scchs.co.in/api/order/create",
    //         {
    //             method: "POST",
    //             headers: {
    //                 "content-type": "application/json",
    //                 "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`

    //             },
    //             body: JSON.stringify(
    //                 {
    //                     products: cartData?.cart?.map(x => (
    //                         {
    //                             id: x?.product_id,
    //                             qty: x.quantity
    //                         }
    //                     ))
    //                     ,
    //                     address_id: datas[0]?.id
    //                 }
    //             ),
    //         }
    //     );


    //     const formattedResponse = await response.json();
    //     //  let order_id = form
    //     console.log(formattedResponse);

    //     setPayment(formattedResponse);
    //     console.log(payment.grand_total_price);
    //     //  let amount = formattedResponse.message.amount/100;

    //     // http://localhost/instacertify-backend/public/api/ecommerce/transactions


    //     const options = {
    //         // key: "rzp_live_qmaktzPiRRIRtX",
    //         key: "rzp_test_pX78hyqIUdIzIN",
    //         amount: formattedResponse?.grand_total_price * 100,
    //         currency: "INR",
    //         name: "Nikhil",
    //         description: "product transaction",
    //         order_id: formattedResponse?.order_id,
    //         handler: async function (response) {
    //             //  console.log(response);
    //             //   if(response){
    //             //     clearCarts();
    //             //   }

    //             const resp = await fetch("https://uat.scchs.co.in/api/ecommerce/transactions", {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                     "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`

    //                 },
    //                 body: JSON.stringify({
    //                     razorpay_payment_id: response.razorpay_payment_id,
    //                     razorpay_order_id: response.razorpay_order_id,
    //                     razorpay_signature: response.razorpay_signature
    //                 })



    //             })

    //             const formatData = await resp.json();
    //             console.log(formatData);
    //             alert(formatData?.message);
    //             clearCarts();

    //         },
    //         // reference_id:formattedResponse?.order_id,


    //         // callback_url: `https://ecomm-backend-aopz.onrender.com/api/v1/payment/verifySignature/${JSON?.parse(localStorage.getItem("insta_Access"))}`,
    //         prefill: {
    //             name: instaUser?.name,
    //             email: instaUser?.email,
    //             contact: datas[0]?.phone
    //         },
    //         "notes": {
    //             "address": "Razorpay Corporate Office"
    //         },
    //         "theme": {
    //             "color": "#EC691F"
    //         }
    //     }

    //     const paymentObject = new window.Razorpay(options, instaUser);


    //     paymentObject.open();


    // }

    const payPalBtn = useRef();

    const paymentHandler = async () => {
        try {
            const response = await fetch("https://uat.scchs.co.in/api/order/create", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify({
                    products: cartData?.cart?.map(x => ({
                        id: x?.product_id,
                        qty: x.quantity
                    })),
                    address_id: datas[0]?.id
                }),
            });

            const formattedResponse = await response.json();
            console.log("Order created:", formattedResponse);
            setPayment(formattedResponse);
            setPayNow(true);
            payPalBtn.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error("Order creation failed", error);
        }
    };

    // const updateQuantity = (productId, direction) => {
    //     setCartData((prev) => {
    //         const updatedCart = prev.cart.map((item) => {
    //             if (item.id === productId || item.product_id === productId) {
    //                 const newQty = direction === "inc"
    //                     ? item.quantity + 1
    //                     : Math.max(1, item.quantity - 1);

    //                 return { ...item, quantity: newQty };
    //             }
    //             return item;
    //         });

    //         const total_amount = updatedCart.reduce(
    //             (sum, item) => sum + item.price * item.quantity,
    //             0
    //         );

    //         const shipping_cost = parseFloat(prev.shipping_cost); // static or you can update dynamically
    //         const grand_total = total_amount + shipping_cost;

    //         return {
    //             ...prev,
    //             cart: updatedCart,
    //             total_amount,
    //             grand_total,
    //         };
    //     });
    // };

    // const updateQuantity = (productId, direction) => {
    //     setCartData((prev) => {
    //         const prevCart = prev?.cart || [];

    //         const updatedCart = prevCart.map((item) => {
    //             const match = item.id === productId || item.product_id === productId;
    //             const currentQty = parseInt(item.quantity) || 1;

    //             if (match) {
    //                 const newQty = direction === "inc"
    //                     ? currentQty + 1
    //                     : Math.max(1, currentQty - 1);

    //                 return { ...item, quantity: newQty };
    //             }
    //             return item;
    //         });

    //         const total_amount = updatedCart.reduce((sum, item) => {
    //             const itemPrice = membershipStatus === "active"
    //                 ? parseFloat(item.membership_price || item.price)
    //                 : parseFloat(item.price);

    //             return sum + itemPrice * item.quantity;
    //         }, 0);

    //         const shipping_cost = parseFloat(prev?.shipping_cost || 0);
    //         const grand_total = total_amount + shipping_cost;

    //         return {
    //             ...prev,
    //             cart: updatedCart,
    //             total_amount: total_amount.toFixed(2),
    //             grand_total: grand_total.toFixed(2),
    //         };
    //     });
    // };

    // const updateQuantity = (productId, direction) => {
    //     setCartData((prev) => {
    //         const prevCart = prev?.cart || [];

    //         const updatedCart = prevCart.map((item) => {
    //             const match = item.id === productId || item.product_id === productId;
    //             const currentQty = parseInt(item.quantity) || 1;

    //             if (match) {
    //                 const newQty = direction === "inc"
    //                     ? currentQty + 1
    //                     : Math.max(1, currentQty - 1);

    //                 return { ...item, quantity: newQty };
    //             }
    //             return item;
    //         });

    //         // Use updatedCart to recalculate totals based on current membership
    //         const total_amount = updatedCart.reduce((sum, item) => {
    //             const memberPrice = parseFloat(item.membership_price || item.price);
    //             const normalPrice = parseFloat(item.price);
    //             const priceToUse =
    //                 membershipStatus?.toLowerCase() === "active" ? memberPrice : normalPrice;

    //             return sum + priceToUse * item.quantity;
    //         }, 0);

    //         const shipping_cost = parseFloat(prev?.shipping_cost || 0);
    //         const grand_total = total_amount + shipping_cost;

    //         // Also update grand_total_m if needed (optional)
    //         const grand_total_m = updatedCart.reduce((sum, item) => {
    //             const memberPrice = parseFloat(item.membership_price || item.price);
    //             return sum + memberPrice * item.quantity;
    //         }, 0) + shipping_cost;

    //         return {
    //             ...prev,
    //             cart: updatedCart,
    //             total_amount: total_amount.toFixed(2),
    //             grand_total: grand_total.toFixed(2),
    //             grand_total_m: grand_total_m.toFixed(2), // optional
    //         };
    //     });
    // };

    // useEffect(() => {
    //     if (cartData) {
    //         updateQuantity(null, null); // Trigger recalc with no quantity change
    //     }
    // }, [membershipStatus]);




    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"Store"} description={"This is store"} image={null} />

            <HeadSEO1 />





            {cartUpdate == true ? (<span className='loadingOverlay' style={{ display: 'block', position: 'fixed' }} />) : ""}

            <div className="event_system_main">
                <div className="event_main">
                    {
                        savedAddress && (

                            <div className="saved-address-card">
                                <div className="card-headerrss">
                                    <h2><FaMapMarkedAlt className="icon" /> Saved Address</h2>
                                    {/* <button onClick={handleEdit}><FaMapPin className="icon" /> Edit</button> */}

                                    <button onClick={handleEdit}><MdEdit className="icon" /> Edit</button>
                                </div>
                                <div className="card-contentt">
                                    <div className="roww"><span className="labells"><FaUser className="icon" /> Name:</span><span>{savedAddress.first_name} {savedAddress.last_name}</span></div>
                                    <div className="roww"><span className="labells"><FaMapMarkedAlt className="icon" /> Address:</span><span>{savedAddress.address1}</span></div>
                                    {savedAddress.address2 && (
                                        <div className="roww"><span className="labells"><FaMapMarkedAlt className="icon" /> Address 2:</span><span>{savedAddress.address2}</span></div>
                                    )}
                                    <div className="roww"><span className="labells"><FaCity className="icon" /> City:</span><span>{savedAddress.city}</span></div>
                                    <div className="roww"><span className="labells"><FaFlag className="icon" /> State:</span><span>{savedAddress.state}</span></div>
                                    <div className="roww"><span className="labells"><FaGlobe className="icon" /> Country:</span><span>{savedAddress.country}</span></div>
                                    <div className="roww"><span className="labells"><FaMapPin className="icon" /> Zip:</span><span>{savedAddress.zipcode}</span></div>
                                    <div className="roww"><span className="labells"><FaPhone className="icon" /> Phone:</span><span>{savedAddress.phone}</span></div>
                                </div>
                            </div>
                        )
                    }
                    {
                        cartEnpty === false ? <div className="order-info-container">
                            {
                                cartData?.cart?.length > 0 && <div className="order-info-containerr">
                                    <h2 className="order-info-title">Order Information</h2>
                                    <button onClick={() => {

                                        const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                        if (isLoggedIn) {
                                            clearCarts();

                                        }
                                        else {
                                            sessionStorage.setItem("cartItems", JSON.stringify([]));
                                            setCartData([]);
                                            toggleBoolValue();
                                        }

                                    }} className="order-btnn">Empty Cart</button>
                                    <Link href={"/store"}><button className="order-btnn">Back</button></Link>
                                </div>
                            }

                            {
                                cartData?.cart?.length > 0 ? <div className="order-info-table">
                                    <div className="order-info-header">
                                        <div className="item-col">Item</div>
                                        <div className="qty-col">Quantity</div>
                                        <div className="price-col price-col11">Price</div>
                                    </div>
                                    {
                                        cartData?.cart?.map((val, index) => {
                                            return <div key={index} className="order-info-row">
                                                <div className="item-col">
                                                    {/* src={val?.image || val?.images[0]} */}
                                                    {/* https://res.cloudinary.com/dgif730br/image/upload/v1745412566/image_3_qhe6b5.png */}
                                                    <img src={(val?.image?.trim() || val?.images?.[0]?.trim()) || "https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png"}
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png";
                                                        }} alt="print" className="order-info-image" />
                                                    <div className="order-info-details">
                                                        {/* <div className="item-title">Print "The Meeting Place"</div> */}
                                                        <div className="item-title">{val?.name || val?.product_name}</div>

                                                        <div className="item-desc">{val?.short_description}</div>
                                                        <button style={{ color: "#AB0635", marginTop: "10px" }} onClick={() => {
                                                            const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                                            if (isLoggedIn) {
                                                                removeCarts(val.product_id, val.quantity);
                                                            }
                                                            else {
                                                                const filterdata = cartData?.cart?.filter(data => data?.id !== val?.id);
                                                                setCartData(filterdata);
                                                                sessionStorage.setItem("cartItems", JSON.stringify(filterdata));
                                                                toggleBoolValue();

                                                            }

                                                        }} type="button">Remove</button>
                                                    </div>

                                                </div>

                                                <div className="qty-col with-border">
                                                    {/* <div className="qty-control">
                                        <button onClick={decrease}>−</button>
                                        <span>{quantity}</span>
                                        <button onClick={increase}>+</button>
                                    </div> */}
                                                    <div className="qty-selector qty-select11">
                                                        {/* <button onClick={() => {
                                                            setCartData((prev) => ({
                                                                ...prev,
                                                                cart: prev.cart.map((item) =>
                                                                    (item.id || item.product_id) === (val.id || val.product_id)
                                                                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                                                                        : item
                                                                )
                                                            }))
                                                        }}>−</button>
                                                        <span>{val?.quantity}</span>
                                                        <button onClick={() => {
                                                            setCartData((prev) => ({
                                                                ...prev,
                                                                cart: prev.cart.map((item) =>
                                                                    (item.id || item.product_id) === (val.id || val.product_id)
                                                                        ? { ...item, quantity: item.quantity + 1 }
                                                                        : item
                                                                )
                                                            }))
                                                        }}>+</button> */}

                                                        <button onClick={() => updateQuantity(val.id || val.product_id, "dec")}>−</button>
                                                        <span>{val.quantity}</span>
                                                        <button onClick={() => updateQuantity(val.id || val.product_id, "inc")}>+</button>
                                                    </div>
                                                </div>

                                                <div className="price-col with-border">
                                                    <div className="price-line">
                                                        <span>{membershipStatus === "active" ? "Membership Price" : "Price"} :</span>
                                                        <strong>${membershipStatus === "active" ? val?.
                                                            membership_price
                                                            * val?.quantity : val?.price * val?.quantity}</strong>
                                                    </div>

                                                    <div className="price-line price-line2">
                                                        <span>S & H :</span>
                                                        <strong>${parseFloat(val?.shipping_cost).toFixed(2) * val?.quantity}</strong>
                                                    </div>
                                                    <div className="price-line">
                                                        <span>Item Total:</span>
                                                        <strong>{val?.quantity}</strong>
                                                    </div>

                                                </div>

                                            </div>
                                        })
                                    }

                                    <div className="total-due">
                                        {/* Total Due: <strong>${parseFloat(cartData.grand_total).toFixed(2)}</strong> */}
                                        Total Due: <strong>${membershipStatus === "active" ? parseFloat(cartData.grand_total_m).toFixed(2) : parseFloat(cartData.grand_total).toFixed(2)}</strong>
                                    </div>
                                </div> :
                                    <div className="container">
                                        <div className={style.cart_empty}>
                                            <svg fill="#1C2E33" width="26" height="28" viewBox="0 0 26 28">
                                                <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                                            </svg>
                                            <h2>Your cart is empty</h2>
                                            <Link href={"/store"}>Go to Store</Link>
                                        </div>
                                    </div>
                            }


                            <div className="order-info-footer">
                                {
                                    cartData?.cart?.length > 0 && <div className="order-info-buttons">
                                        <Link href={"/store"}><button className="btn-secondarys">Continue Shopping</button></Link>
                                        <button onClick={() => {

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

                                        }} className="btn-primarys">Checkout</button>
                                    </div>
                                }

                            </div>
                        </div> :
                            <div className="container">
                                <div className={style.cart_empty}>
                                    <svg fill="#1C2E33" width="26" height="28" viewBox="0 0 26 28">
                                        <path d="M10 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM24 24c0 1.094-0.906 2-2 2s-2-0.906-2-2 0.906-2 2-2 2 0.906 2 2zM26 7v8c0 0.5-0.391 0.938-0.891 1l-16.312 1.906c0.078 0.359 0.203 0.719 0.203 1.094 0 0.359-0.219 0.688-0.375 1h14.375c0.547 0 1 0.453 1 1s-0.453 1-1 1h-16c-0.547 0-1-0.453-1-1 0-0.484 0.703-1.656 0.953-2.141l-2.766-12.859h-3.187c-0.547 0-1-0.453-1-1s0.453-1 1-1h4c1.047 0 1.078 1.25 1.234 2h18.766c0.547 0 1 0.453 1 1z"></path>
                                    </svg>
                                    <h2>Your cart is empty</h2>
                                    <Link href={"/store"}>Go to Store</Link>
                                </div>
                            </div>
                    }

                    {payNow && (
                        <PayPalScriptProvider options={{ "client-id": "AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy", currency: "USD" }}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: membershipStatus === "active" ? payment?.order_amount_m : payment?.order_amount,
                                            }
                                        }]
                                    });
                                }}
                                ref={payPalBtn}
                                onApprove={async (data, actions) => {
                                    const details = await actions.order.capture();
                                    console.log("Payment successful!", details);
                                    toast.success("Payment successful!");
                                    // clearCarts();

                                    // Send to backend if needed
                                    await fetch("https://uat.scchs.co.in/api/ecommerce/transactions", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                                        },
                                        body: JSON.stringify({
                                            user_id: parseInt(instaUser.id),
                                            order_id: payment?.order_id,
                                            transaction_id: details.id,
                                            payer_id: details.payer.payer_id,
                                            // amount: payment?.grand_sale_price?.toString(),
                                            // amount: cartData?.grand_total?.toString(),
                                            amount: membershipStatus === "active" ? payment?.order_amount_m : payment?.order_amount,
                                            status: details?.status,
                                            // currency: "USD",
                                            // payment_gateway: "paypal"
                                        })
                                    });

                                    // toast.success("payment done successfully");

                                    clearCarts1();
                                    // setTimeout(() => {
                                    //     window.location.href = "/store";
                                    // }, 2000)

                                    router.push(`/paymentsuccess?orderId=${payment?.order_id}`);

                                }}
                                onCancel={() => {
                                    alert("Payment cancelled");
                                }}
                            />
                        </PayPalScriptProvider>
                    )}

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