import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "./css/shoppings-lists.module.scss";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import HeadSEO from "/components/common/Head/head";
import GlobalHeaderFooter from "/utils/common/global-header-footer";
import Navbar from '/components/common/Navbar/Navbar'
//Slider css files
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingProductSlider from "/components/common/shopping/product-slider";
import { MdKeyboardArrowDown } from "react-icons/md";

import ShoppingCollections from "/components/common/shopping/collections";
import Head from "next/head";
import HeadSEO1 from "/components/common/Head/head1";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
// import { useRouter } from "next/router";


var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};



const ITEMS_PER_PAGE = 3;

export default function eventdetail(pageProp) {

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }

    const product = pageProp.page_content.product;
    const customFields = product?.customFields;

    const [showModal, setShowModal] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('');

    // ================paypal==============


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




    const router = useRouter();
    const { id, slug } = router.query;

    console.log(id);

    const [aboutnew, setaboutnew] = useState({});

    const [showModal1, setShowModal1] = useState(false);

    const [qty, setQty] = useState('');
    const [orderAmount, setOrderAmount] = useState(null); // Store order amount
    const [showPayPal, setShowPayPal] = useState(false);
    const [orderId, setOrderId] = useState(null); // Optional: track internal order


    const closeModal = () => {
        setShowModal1(false);
        setQty('');
        setOrderAmount(null);
        setShowPayPal(false);
        setOrderId(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://uat.scchs.co.in/api/events/${aboutnew.id}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify({ qty: Number(qty) }),
            });

            if (!res.ok) throw new Error('Order API failed');

            const data = await res.json();

            console.log(data)

            // Use API amount for PayPal
            setOrderAmount(data.amount);
            setOrderId(data.order_id); // optional
            setShowPayPal(true); // now show PayPal button
        } catch (err) {
            console.error(err);
            toast.error('Failed to place order');
        }

    };
    console.log(orderId);
    // useEffect(() => {
    //     if (orderSuccess && window.paypal && paypalRef.current) {
    //          const script = document.createElement('script');
    //     script.src = "https://www.paypal.com/sdk/js?client-id=AQUoEi-7BxQtfIAz4ulCu1obszrCBZ5NXJQriaMbotUhBEa0_7yJLUrYG7QbTqpOJM-FyoViTuYduBZz";
    //     script.addEventListener("load", () => {
    //         window.paypal.Buttons({
    //             createOrder: (data, actions) => {
    //                 return actions.order.create({
    //                     purchase_units: [{
    //                         amount: {
    //                             value: '10.00'
    //                         }
    //                     }]
    //                 });
    //             },
    //             onApprove: async (data, actions) => {
    //                 const order = await actions.order.capture();
    //                 console.log(order);
    //                 // Send order data to your backend if needed
    //             }
    //         }).render('#paypal-button-container');
    //     });
    //     document.body.appendChild(script);
    //     }
    // }, [orderSuccess]);

    const fetchnewsbyycat = async (name) => {
        try {

            const resp = await fetch(`https://uat.scchs.co.in/api/get-event-details/${id}/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                console.log("formare ", formateddata);
                console.log(formateddata?.event?.image[0])
                setaboutnew(formateddata?.event);

            }


        } catch (error) {

            console.error("There was an error fetching the categories:", error);
        }
    }

    useEffect(() => {

        if (id) {
            // fetchProductDetails();
            fetchnewsbyycat();
        }
        else {
            console.log("error");
        }

    }, [id, slug]);

    // ============slider=========

    const openModal = () => {
        // setCurrentIndex(index);
        setShowModal(true);
    };

    const nextSlide = () => {
        setDirection('right');
        setCurrentIndex((prev) => (prev + 1) % aboutnew.image.length);
    };

    const prevSlide = () => {
        setDirection('left');
        setCurrentIndex((prev) => (prev - 1 + aboutnew.image.length) % aboutnew.image.length);
    };

    const arrowStyle = (side) => ({
        position: 'absolute',
        top: '50%',
        [side]: 10,
        transform: 'translateY(-50%)',
        background: '#AB0535',
        color: 'white',
        border: 'none',
        fontSize: 30,
        width: 35,
        height: 35,
        // padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '50%',
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    });

    // =================slider end===============

    function formatDateToLongLabel(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',   // Saturday
            month: 'long',     // March
            day: 'numeric'     // 29
        });
    }

    // const formatTime = (timeStr) => {
    //     if (!timeStr || !timeStr.includes(':')) return '';
    //     const [hour, minute] = timeStr.split(':');
    //     const date = new Date();
    //     date.setHours(hour);
    //     date.setMinutes(minute);

    //     return new Intl.DateTimeFormat('en-US', {
    //         hour: 'numeric',
    //         minute: '2-digit',
    //         hour12: true,
    //     }).format(date);
    // };


    // ===========for auto slide============
    //     useEffect(() => {
    //   if (!showModal) return;

    //   const interval = setInterval(() => {
    //     setDirection('right');
    //     setCurrentIndex(prev =>
    //       (prev + 1) % (aboutnew?.image?.length || 1)
    //     );
    //   }, 3000); // every 3 seconds

    //   return () => clearInterval(interval); // clear on close or unmount
    // }, [showModal, aboutnew?.image?.length]);

     const formatTime = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string') return '';

        // Case 1: Already in 12-hour format like "4:00 PM" or "12:00 AM"
        const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
        if (ampmMatch) {
            const date = new Date();
            const [, hourStr, minuteStr, meridian] = ampmMatch;
            let hour = Number(hourStr);
            const minute = Number(minuteStr);

            if (meridian.toUpperCase() === 'PM' && hour !== 12) hour += 12;
            if (meridian.toUpperCase() === 'AM' && hour === 12) hour = 0;

            date.setHours(hour, minute, 0, 0);
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        }

        // Case 2: 24-hour string like "14:30"
        const parts = timeStr.split(':');
        if (parts.length !== 2) return '';

        const hour = Number(parts[0]);
        const minute = Number(parts[1]);

        if (
            isNaN(hour) || isNaN(minute) ||
            hour < 0 || hour > 23 ||
            minute < 0 || minute > 59
        ) return '';

        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

            <HeadSEO1 />

            <div className="event_system_main">
                <div className="event_main">

                    {/* {showModal1 && (
                        <div className="modal-overlay" onClick={closeModal}>
                            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                                <h2>Purchase Tickets</h2>
                                <p>Number of avilable tickets : {aboutnew.
                                    number_of_tickets}</p>

                                <form onSubmit={handleSubmit}>
                                    <input type="number"
                                        placeholder="Enter Quantity"
                                        required
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)} />

                                    <button type="submit" className="modal-submit">Procede</button>
                                </form>
                                <button onClick={() => setShowModal1(false)} className="modal-close">Close</button>
                            </div>
                        </div>
                    )} */}

                    <PayPalScriptProvider options={{ clientId: 'AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy', currency: 'USD' }}>
                        <div>
                            <button onClick={() =>{
                                instaUser ? setShowModal1(true) : router.push("/user/userlogin")
                                
                            }} className="ticket-btn">Purchase Tickets</button>

                            {showModal1 && (
                                <div className="modal-overlay" onClick={closeModal}>
                                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                                        <h2>Buy Tickets</h2>

                                        <p>Avilable Tickets: <span>{aboutnew?.number_of_tickets}</span></p>

                                        {!showPayPal ? (
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Quantity"
                                                    required
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                />
                                                <button type="submit" className="modal-submit">Proceed</button>
                                            </form>
                                        ) : (
                                            <div className="paypal-box">
                                                <h3>Pay ${orderAmount}</h3>
                                                <PayPalButtons
                                                    style={{ layout: 'vertical' }}
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [{
                                                                amount: {
                                                                    value: orderAmount
                                                                },
                                                            }],
                                                        });
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                        const details = await actions.order.capture();
                                                        console.log(details);
                                                        const captureId = details?.purchase_units?.[0]?.payments?.captures?.[0]?.id;
                                                        await fetch(`https://uat.scchs.co.in/api/orders/${orderId}/confirm`, {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                                "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                                                            },
                                                            body: JSON.stringify({
                                                                paypal_order_id: details.id,
                                                                paypal_capture_id: captureId,
                                                                paypal_payload: details
                                                            })
                                                        });
                                                        toast.success("Payment completed successfully!")
                                                        closeModal();
                                                         router.push(`/eventpayment?orderId=${orderId}`);
                                                    }}
                                                    onError={(err) => {
                                                        console.error('PayPal error:', err);
                                                        alert('Payment failed');
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <button onClick={closeModal} className="modal-close">Close</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </PayPalScriptProvider>


                    <div className="event_details_main">
                        <Link style={{ textDecoration: "none" }} href={"/event"}><button className="event_det_back">Back</button></Link>
                        <div className="event-page">
                            <div className="event-header">
                                <div className="event-info">
                                    <h1>{aboutnew?.title}</h1>
                                    {/* <h2>Saturday, March 29</h2> */}
                                    <h2>{formatDateToLongLabel(aboutnew?.start_date)}</h2>

                                    <div className="timing-box">
                                        <div className="item">
                                            <h4>Doors open at</h4>
                                            {/* <p>Sat, March 29, 6:00 PM</p> */}
                                            <p>{formatDateToLongLabel(aboutnew?.start_date)}, {formatTime(aboutnew?.start_time)}</p>
                                        </div>
                                        <div className="item">
                                            <h4>Event Starts</h4>
                                            {/* <p>Sat, March 29, At 7:00 PM</p> */}
                                            <p>{formatDateToLongLabel(aboutnew?.start_date)}, {formatTime(aboutnew?.start_time)}</p>
                                        </div>
                                    </div>

                                    <div className="event-details">
                                        <h3>When and where</h3>

                                        <div className="detail-row">
                                            <span className="icon"><svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="48" rx="4" fill="white" />
                                                <path d="M33.9434 12.2207H30.9434V11.2207C30.9434 10.9555 30.838 10.7011 30.6505 10.5136C30.4629 10.3261 30.2086 10.2207 29.9434 10.2207C29.6781 10.2207 29.4238 10.3261 29.2363 10.5136C29.0487 10.7011 28.9434 10.9555 28.9434 11.2207V12.2207H18.9434V11.2207C18.9434 10.9555 18.838 10.7011 18.6505 10.5136C18.4629 10.3261 18.2086 10.2207 17.9434 10.2207C17.6781 10.2207 17.4238 10.3261 17.2363 10.5136C17.0487 10.7011 16.9434 10.9555 16.9434 11.2207V12.2207H13.9434C13.4129 12.2207 12.9042 12.4314 12.5291 12.8065C12.1541 13.1816 11.9434 13.6903 11.9434 14.2207V34.2207C11.9434 34.7511 12.1541 35.2598 12.5291 35.6349C12.9042 36.01 13.4129 36.2207 13.9434 36.2207H33.9434C34.4738 36.2207 34.9825 36.01 35.3576 35.6349C35.7326 35.2598 35.9434 34.7511 35.9434 34.2207V14.2207C35.9434 13.6903 35.7326 13.1816 35.3576 12.8065C34.9825 12.4314 34.4738 12.2207 33.9434 12.2207ZM16.9434 14.2207V15.2207C16.9434 15.4859 17.0487 15.7403 17.2363 15.9278C17.4238 16.1153 17.6781 16.2207 17.9434 16.2207C18.2086 16.2207 18.4629 16.1153 18.6505 15.9278C18.838 15.7403 18.9434 15.4859 18.9434 15.2207V14.2207H28.9434V15.2207C28.9434 15.4859 29.0487 15.7403 29.2363 15.9278C29.4238 16.1153 29.6781 16.2207 29.9434 16.2207C30.2086 16.2207 30.4629 16.1153 30.6505 15.9278C30.838 15.7403 30.9434 15.4859 30.9434 15.2207V14.2207H33.9434V18.2207H13.9434V14.2207H16.9434ZM33.9434 34.2207H13.9434V20.2207H33.9434V34.2207Z" fill="#AB0635" />
                                            </svg>
                                            </span>
                                            <div className="text">
                                                <span>Date and time</span><br />
                                                {/* <p>Sat, March 29, 6:00 PM – Sat, March 29, 10:00 PM</p> */}
                                                <p>{formatDateToLongLabel(aboutnew?.start_date)}, {formatTime(aboutnew?.start_time)} - {formatDateToLongLabel(aboutnew?.start_date) || formatDateToLongLabel(aboutnew?.end_date)}, {formatTime(aboutnew?.end_time)} </p>
                                            </div>
                                        </div>

                                        <div className="detail-row">
                                            <span className="icon"><svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="48" height="48" rx="4" fill="white" />
                                                <path d="M24.1914 16.4023C23.2025 16.4023 22.2358 16.6956 21.4136 17.245C20.5913 17.7944 19.9504 18.5753 19.572 19.4889C19.1936 20.4026 19.0946 21.4079 19.2875 22.3778C19.4804 23.3477 19.9566 24.2386 20.6559 24.9379C21.3551 25.6371 22.246 26.1133 23.216 26.3063C24.1859 26.4992 25.1912 26.4002 26.1048 26.0217C27.0185 25.6433 27.7993 25.0024 28.3488 24.1802C28.8982 23.3579 29.1914 22.3913 29.1914 21.4023C29.1914 20.0763 28.6646 18.8045 27.7269 17.8668C26.7893 16.9291 25.5175 16.4023 24.1914 16.4023ZM24.1914 24.4023C23.5981 24.4023 23.018 24.2264 22.5247 23.8968C22.0313 23.5671 21.6468 23.0986 21.4198 22.5504C21.1927 22.0022 21.1333 21.399 21.2491 20.8171C21.3648 20.2351 21.6505 19.7006 22.0701 19.281C22.4896 18.8615 23.0242 18.5757 23.6061 18.46C24.1881 18.3442 24.7913 18.4036 25.3395 18.6307C25.8876 18.8578 26.3562 19.2423 26.6858 19.7356C27.0155 20.229 27.1914 20.809 27.1914 21.4023C27.1914 22.198 26.8753 22.9611 26.3127 23.5237C25.7501 24.0863 24.9871 24.4023 24.1914 24.4023ZM24.1914 10.4023C21.275 10.4057 18.4791 11.5656 16.4169 13.6278C14.3547 15.69 13.1947 18.486 13.1914 21.4023C13.1914 25.3273 15.0052 29.4873 18.4414 33.4336C19.9854 35.2168 21.7232 36.8225 23.6227 38.2211C23.7908 38.3389 23.9911 38.4021 24.1964 38.4021C24.4017 38.4021 24.602 38.3389 24.7702 38.2211C26.6661 36.8219 28.4005 35.2162 29.9414 33.4336C33.3727 29.4873 35.1914 25.3273 35.1914 21.4023C35.1881 18.486 34.0281 15.69 31.9659 13.6278C29.9037 11.5656 27.1078 10.4057 24.1914 10.4023ZM24.1914 36.1523C22.1252 34.5273 15.1914 28.5586 15.1914 21.4023C15.1914 19.0154 16.1396 16.7262 17.8274 15.0384C19.5153 13.3506 21.8045 12.4023 24.1914 12.4023C26.5784 12.4023 28.8675 13.3506 30.5554 15.0384C32.2432 16.7262 33.1914 19.0154 33.1914 21.4023C33.1914 28.5561 26.2577 34.5273 24.1914 36.1523Z" fill="#AB0635" />
                                            </svg>
                                            </span>
                                            <div className="text">
                                                <span>Location</span><br />
                                                {/* <p> St. Peter Catholic Church Parish Center, 3rd & 1st Capital Drive, St. Charles, MO 63301</p> */}
                                                <p>{aboutnew?.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="event-gallery-main">

                                    <div className="event-gallery">
                                        <div className="main-photo">
                                            {/* <img src="https://res.cloudinary.com/dgif730br/image/upload/v1744282766/image_s8otec.png" alt="Main Event" /> */}

                                            {/* <img src={aboutnew?.image[0]} alt="main event"/> */}
                                            {aboutnew?.image?.length > 0 && (
                                                <img src={aboutnew.image[0]} alt="main event" />
                                            )}
                                        </div>

                                        <div className="side-photos">
                                            {
                                                aboutnew?.image?.length > 3 && <div onClick={() => openModal(true)} className="slider_more">
                                                    <img width={18} height={18} src="https://res.cloudinary.com/dgif730br/image/upload/v1747139017/grid_view_sxuxqh.svg" />
                                                    <p>Show More Photos</p>
                                                </div>
                                            }

                                            {
                                                aboutnew?.image?.length > 1 && <div className="thumbs">
                                                    {/* <img src="https://res.cloudinary.com/dgif730br/image/upload/v1744282766/image_1_vctfyt.png" alt="Thumb 1" /> */}
                                                    {aboutnew?.image?.length > 0 && (
                                                        <img src={aboutnew.image[1]} />
                                                    )}
                                                    {/* <img src="https://res.cloudinary.com/dgif730br/image/upload/v1744282765/image_2_yqkqjg.png" alt="Thumb 2" /> */}
                                                    {aboutnew?.image?.length > 0 && (
                                                        <img src={aboutnew.image[2]} />
                                                    )}
                                                </div>
                                            }



                                            {/* Wrap this to include both button and text */}
                                            {/* <div className="show-more-wrapper">
                                            <button className="show-more-btn">📷 Show More Photos</button>
                                           
                                        </div> */}
                                        </div>
                                    </div>
                                    <p className="presented-by">
                                        Presented by the Saint Charles County Historical Society
                                    </p>
                                </div>

                            </div>
                            <div className="event-about">
                                <h4>About this event</h4>
                                {/* <ul>
                                    <li>1) <b>$200</b> per table of 8 or <b>$25</b> per person</li>
                                    <li>2) Free soda and water, BYO snacks and adult beverages</li>
                                    <li>3) <b>50/50</b> raffle drawing, silent auction, game of Dead or Alive</li>
                                    <li><span style={{ textTransform: "uppercase" }}>To reserve a table</span>: Please call, visit or mail in the attached form to:<br />
                                        Saint Charles County Historical Society 101 S. Main Street, St. Charles, MO <b>63301</b>
                                        <b>636-946-9828</b> sccshs.org</li>
                                </ul> */}
                                <div className="makepoppinsfont" dangerouslySetInnerHTML={{ __html: aboutnew?.description }} />
                            </div>
                            <div className="event_payment">
                                <h3>Payment can be made by check or phone with a credit card. Make checks payable to SCCHS</h3>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="payment_advance">
                    <div className="payment_advance_flex">
                        <div className="payment_left">
                            <h3>Payment in advance is greatly appreciated, table hosts are responsible <br /> for ensuring full payment at or prior to event</h3>
                        </div>
                        <div className="payment_right">
                            <button onClick={() => setShowModal1(true)}>Purchase Tickets</button>
                        </div>
                        {/* <div className="payment_right">
                            <button>Download</button>
                        </div>
                        <div className="payment_right">
                            <button>Reserve Seats</button>
                        </div> */}
                    </div>
                </div>

                <div>
                    {showModal && (
                        <div style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
                            justifyContent: 'center', alignItems: 'center', zIndex: 9999,
                        }}>
                            {/* style={{ position: 'relative', width: '80%', maxWidth: 800 }} */}
                            <div >
                                <button
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        position: 'absolute', top: 10, right: 10, background: '#AB0535',
                                        border: 'none', padding: '5px 10px', cursor: 'pointer', color: "white", borderRadius: "50%", zIndex: 100
                                    }}
                                >
                                    ✕
                                </button>

                                <button onClick={prevSlide} style={arrowStyle('left')}><img style={{ filter: "invert(1)" }} width={20} height={20} src="https://res.cloudinary.com/dgif730br/image/upload/v1747138065/left-arrow_dztds9.png" /></button>
                                <img
                                    key={currentIndex}
                                    src={aboutnew?.image[currentIndex]}
                                    className={`slide-image ${direction}`}
                                    alt={`img-${currentIndex}`}
                                    style={{ width: 450, borderRadius: 8, height: 450, objectFit: "cover" }}
                                />
                                <button onClick={nextSlide} style={arrowStyle('right')}><img style={{ filter: "invert(1)" }} width={20} height={20} src="https://res.cloudinary.com/dgif730br/image/upload/v1747138347/right-arrow_rgmiww.png" /></button>
                            </div>
                            <style>{`
            .slide-image {
              opacity: 0;
              animation: fadeIn 0.3s ease forwards;
            }

            .slide-image.left {
              animation: slideLeft 0.3s ease, fadeIn 0.3s ease forwards;
            }

            .slide-image.right {
              animation: slideRight 0.3s ease, fadeIn 0.3s ease forwards;
            }

            @keyframes fadeIn {
              to { opacity: 1; }
            }

            @keyframes slideLeft {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }

            @keyframes slideRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
                        </div>
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

function arrowStyle(side) {
    return {
        position: 'absolute',
        top: '50%',
        [side]: 10,
        transform: 'translateY(-50%)',
        background: '#fff',
        border: 'none',
        fontSize: 30,
        padding: '5px 10px',
        cursor: 'pointer',
        zIndex: 10,
    };
}