import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
// import "../css/login.module.scss";
import { toast } from "react-toastify";
var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function eventhistory(pageProp) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("orders");

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const res = await fetch('https://uat.scchs.co.in/api/orders/event/history', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                    },
                });
                const data = await res.json();
                console.log(data)
                setOrders(data.data || []);
            } catch (error) {
                console.error('Error fetching order history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) return <p className="order-history-loading">Loading order history...</p>;

    if (orders.length === 0) return <p className="order-history-loading">No event history found.</p>;

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />

            <div className="order-history-container">
                <h1 className="order-history-title">Event Order History</h1>

                {/*  */}
                {/* <div className="tabss">
                   <button
                        className={`tabs-button ${activeTab === "All" ? "active" : ""}`}
                        onClick={() => setActiveTab("All")}
                    >
                        All
                    </button>
                    <button
                        className={`tabs-button ${activeTab === "orders" ? "active" : ""}`}
                        onClick={() => setActiveTab("orders")}
                    >
                        Order History
                    </button>
                    <button
                        className={`tabs-button ${activeTab === "events" ? "active" : ""}`}
                        onClick={() => setActiveTab("events")}
                    >
                        Events History
                    </button>
                    <button
                        className={`tabs-button ${activeTab === "donations" ? "active" : ""}`}
                        onClick={() => setActiveTab("donations")}
                    >
                        Donation History
                    </button>
                </div> */}
                {/*  */}
                {orders.map(order => (
                    // <div key={order.id} className="order-card">
                    //     <div className="order-card-header">
                    //         <img
                    //             src={`https://uat.scchs.co.in/backend/admin/images/event_management/events/${order.event.images?.[0] || ''}`}
                    //             alt={order.event.title}
                    //             className="order-event-image"
                    //         />
                    //         <div className="order-event-info">
                    //             <h2 className="order-event-title">{order.event.title}</h2>
                    //             <p className="order-event-desc">{order.event.short_description}</p>
                    //             <p className="order-date">Purchased on: {new Date(order.purchased_at).toLocaleString()}</p>
                    //         </div>

                    //         <div className="order-card-body">
                    //         <div><strong>Tickets:</strong> {order.qty}</div>
                    //         <div><strong>Amount:</strong> ${order.amount}</div>
                    //         <div><strong>Status:</strong> <span className={`order-status ${order.status}`}>{order.status}</span></div>
                    //         <div><strong>User:</strong> {order.user.first_name} {order.user.last_name}</div>
                    //     </div>
                    //     </div>

                    // </div>



                    <div key={order.id} className="oderset1">
                        <div className="oderset1-header">
                            <img
                                src={`https://uat.scchs.co.in/backend/admin/images/event_management/events/${order.event.images?.[0] || ''}`}
                                alt={order.event.title}
                                className="oderset1-event-image"
                            />

                            <div className="oderset1-event-info">
                                <h2 className="oderset1-event-title">{order.event.title}</h2>
                                <p className="oderset1-event-desc">{order.event.short_description}</p>
                                <p className="oderset1-date">
                                    {/* Purchased on: {new Date(order.purchased_at).toLocaleString()} */}
                                    Purchased on: {new Date(order.purchased_at).toLocaleString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        // hour: "numeric",
                                        // minute: "2-digit",
                                        // hour12: true,
                                        // timeZone: "Europe/London"
                                    })}

                                </p>
                            </div>

                            <div className="oderset1-body">
                                <div><strong>Tickets:</strong> {order.qty}</div>
                                <div><strong>Amount:</strong> ${order.amount}</div>
                                <div>
                                    <strong>Status:</strong>
                                    <span id={`oderset1-status-${order.status.toLowerCase()}`}>{order.status}</span>
                                </div>
                                <div><strong>User:</strong> {order.user.first_name} {order.user.last_name}</div>
                            </div>
                        </div>
                    </div>


                ))}
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