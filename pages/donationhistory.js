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

    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://uat.scchs.co.in/api/donaction/payment/history", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                    }
                });
                const data = await res.json();
                console.log(data)
                setDonations(data.data);
            } catch (error) {
                console.error("Failed to fetch donation history", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />



            <div className="donation-payment-history-wrapper">
                <h1 className="donation-payment-history-title">Donation Payment History</h1>
                <div className="donation-payment-history-grid">
                    {/* {donations.map((donation) => (

                        <div key={donation.id} className="donation-payment-history-card">
                            <div className="donation-payment-history-amount">$ {donation.donation_amount}</div>
                            <div className="donation-payment-history-info">
                                <div>Donor: {donation.first_name} {donation.last_name}</div>
                                <div>Email: {donation.email}</div>
                                <div>Phone: {donation.phone}</div>
                                <div>City: {donation.city}, {donation.state}</div>
                                <div>Status: <span className={donation.payment_status === "completed" ? "status-success" : "status-failed"}>{donation.payment_status}</span></div>
                                <div className="donation-payment-history-date">
                                    

                                    Date: {new Date(donation.created_at).toLocaleString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                        
                                    })}

                                    

                                </div>

                            </div>
                        </div>

                    ))} */}
                    {donations.length === 0 ? (
                        <p className="donation-history-empty-message">No donation history found.</p>
                    ) : (
                        donations.map((donation) => (
                            <div key={donation.id} className="donation-payment-history-card">
                                <div className="donation-payment-history-amount">$ {donation.donation_amount}</div>
                                <div className="donation-payment-history-info">
                                    <div>Donor: {donation.first_name} {donation.last_name}</div>
                                    <div>Email: {donation.email}</div>
                                    <div>Phone: {donation.phone}</div>
                                    <div>City: {donation.city}, {donation.state}</div>
                                    <div>Status:
                                        <span className={donation.payment_status === "completed" ? "status-success" : "status-failed"}>
                                            {donation.payment_status}
                                        </span>
                                    </div>
                                    <div className="donation-payment-history-date">
                                        Date: {new Date(donation.created_at).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))
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