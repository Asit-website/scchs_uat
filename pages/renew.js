import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import style from "./css/shoppings-lists.module.scss";
import Link from "next/link";

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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


export default function renew(pageProp) {



    const product = pageProp.page_content.product;
    const customFields = product?.customFields;

    const [membershipPlans, setMembershipPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [instaUser, setInstaUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            setInstaUser(JSON.parse(storedUser));
        }
    }, []);




    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser?.id}`);
                const result = await res.json();
                setMembershipPlans(result?.data || []);
            } catch (err) {
                console.error("Failed to fetch membership plans", err);
            }
        };

        if (instaUser?.id) fetchPlans();
    }, [instaUser?.id]);

    const handleRenew = (plan) => {
        setSelectedPlan(plan);
    };

    const handleApprove = async (details) => {
        try {
            const payload = {
                user_membership_id: selectedPlan.id,
                user_id: instaUser.id,
                transaction_id: details.id,
                amount: Number(selectedPlan.plan.price).toFixed(2),
                currency: "USD",
                status: details.status,
                payment_gateway: "paypal",
            };

            const response = await fetch("https://uat.scchs.co.in/api/membership/renew", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.status !== false) {
                toast.success("Membership renewed successfully!");
            } else {
                toast.error("Failed to renew membership.");
            }
        } catch (error) {
            console.error("Renew error:", error);
            toast.error("Error during renewal.");
        }
    };

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={product?.seo?.pageTitle == "" ? product?.name : product?.seo?.pageTitle} description={product?.seo?.metaDescription} image={null} />

            <HeadSEO1 />

            <div className="event_system_main">

                <div className="event_main">
                    <div className="membership-renew-container">
                        <h2 className="membership-renew-heading">Your Membership Plans</h2>
                        {/* {membershipPlans.map((plan) => {
                            const endDate = new Date(plan.end_date);
                            const graceEndDate = new Date(plan.grace_end_date);
                            const now = new Date();

                            

                            const twoMonthsBeforeEnd = new Date(endDate);
                            twoMonthsBeforeEnd.setMonth(twoMonthsBeforeEnd.getMonth() - 1);

                            const isRenewVisible =
                                (now >= twoMonthsBeforeEnd && now <= endDate) || 
                                (now > endDate && now <= graceEndDate);          


                            return (
                                <div className="membership-renew-card" key={plan.id}>
                                    <h3 className="membership-renew-name">{plan.plan?.name}</h3>
                                    <p className="membership-renew-dates">
                                        Expired on: {new Date(plan.end_date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <p className="membership-renew-dates">
                                        Grace end date: {new Date(plan.grace_end_date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>

                                  
                                    <p
                                        className="membership-renew-status"
                                        style={{
                                            color:
                                                now > graceEndDate
                                                    ? 'orange' 
                                                    : now > endDate
                                                        ? 'green' 
                                                        : 'red',  
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {now > graceEndDate
                                            ? 'Expired'
                                            : now > endDate
                                                ? 'Grace Period'
                                                : 'Active'}
                                    </p>

                                    <button
                                        className="membership-renew-btn"
                                        onClick={() => handleRenew(plan)}
                                        disabled={!isRenewVisible}


                                    >
                                       
                                        {isRenewVisible ? 'Renew Now' : 'Renew Disabled'}
                                    </button>
                                </div>
                            );
                        })} */}

                        {membershipPlans.map((plan) => {
                            const endDate = new Date(plan.end_date);
                            const graceEndDate = new Date(plan.grace_end_date);
                            const now = new Date();

                            const twoMonthsBeforeEnd = new Date(endDate);
                            twoMonthsBeforeEnd.setMonth(twoMonthsBeforeEnd.getMonth() - 1);

                            const isRenewVisible =
                                (now >= twoMonthsBeforeEnd && now <= endDate) || // within 1 month before expiry
                                (now > endDate && now <= graceEndDate) ||        // grace period
                                (now > graceEndDate);                            // expired

                            return (
                                <div className="membership-renew-card" key={plan.id}>
                                    <h3 className="membership-renew-name">{plan.plan?.name}</h3>

                                    <p className="membership-renew-dates">
                                        Expired on: {new Date(plan.end_date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>

                                    <p className="membership-renew-dates">
                                        Grace end date: {new Date(plan.grace_end_date).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </p>

                                    {/* <p
                                        className="membership-renew-status"
                                        style={{
                                            color:
                                                now > graceEndDate
                                                    ? 'red'
                                                    : now > endDate
                                                        ? 'orange'
                                                        : 'green',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {now > graceEndDate
                                            ? 'Expired'
                                            : now > endDate
                                                ? 'Grace Period'
                                                : 'Active'}
                                    </p> */}
                                    <div className="ren_dis">
                                        <span
                                            className={`status-badge ${now > graceEndDate
                                                ? 'expired'
                                                : now > endDate
                                                    ? 'grace'
                                                    : 'active'
                                                }`}
                                        >
                                            {now > graceEndDate
                                                ? 'Expired'
                                                : now > endDate
                                                    ? 'Grace Period'
                                                    : 'Active'}
                                        </span>
                                        <button
                                            className="membership-renew-btn"
                                            onClick={() => handleRenew(plan)}
                                            disabled={!isRenewVisible}
                                        >
                                            {isRenewVisible ? 'Renew Now' : 'Renew Disabled'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}


                        {selectedPlan && (
                            <div className="membership-renew-paypal-box">
                                <h3 className="membership-renew-paypal-title">
                                    Renewing: {selectedPlan.plan.name}
                                </h3>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy",
                                        currency: "USD",
                                    }}
                                >
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: Number(selectedPlan.plan.price).toFixed(2),
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const details = await actions.order.capture();
                                            handleApprove(details);
                                        }}
                                        onError={(err) => {
                                            toast.error("Payment failed.");
                                            console.error("PayPal Error:", err);
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        )}
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