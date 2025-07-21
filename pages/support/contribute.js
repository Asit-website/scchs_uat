import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ReCAPTCHA from 'react-google-recaptcha';
import Link from "next/link";


var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


const records = [
    { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
    { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
    { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
    { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
    { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
    { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
    { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
    { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
    { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
    { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
    { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
    { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
    { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
    { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
    { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
    { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
    { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
    { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
    { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
    { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
    { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
    { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
    { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
    { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
    // Add more for testing pagination
];
console.log(records);
const itemsPerPage = 10;
export default function contribute(pageProp) {

    const router = useRouter();

    const [isVerified, setIsVerified] = useState(false);

    // const handleRecaptchaChange = (value) => {
    //   console.log('Captcha value:', value);
    // };

    // const handleRecaptchaChange = (token) => {
    //     if (token) {
    //         setIsVerified(true);
    //     }
    // };



    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('donationFormData'));
        if (data) {
            setSavedData(data);
        }
    }, []);

    console.log(savedData);

    const handleEditClick = () => {
        // localStorage.setItem('donationFormMode', 'edit');
        //  localStorage.setItem('donationFormData', JSON.stringify(formdata));
        localStorage.setItem('donationFormMode', 'edit');
        router.push('/support/donation');
    };

    const paypalRef = useRef();
    const [showPayPal, setShowPayPal] = useState(false);

    useEffect(() => {
        if (showPayPal && window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: String(savedData?.donation_amount || "10.00"),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const details = await actions.order.capture();

                    const payload = {
                        ...savedData,
                        transaction_id: details.id,
                        payment_status: details.status.toLowerCase(),
                        payment_method: "paypal",
                        payload: JSON.stringify(details),
                    };

                    try {
                        const res = await fetch("https://uat.scchs.co.in/api/donations", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                            },
                            body: JSON.stringify(payload),
                        });

                        if (!res.ok) {
                            throw new Error("Failed to submit donation.");
                        }

                        const donationId = details.id;
                        console.log(donationId);
                        router.push(`/thankyou?id=${donationId}`);
                        toast.success("Donation successful! Thank you!");
                    } catch (error) {
                        console.error("Donation API error:", error);
                        toast.error("Donation succeeded but failed to store in database.");
                    }
                },
            }).render(paypalRef.current);
        }
    }, [showPayPal, savedData]);

    useEffect(() => {
        // Load PayPal SDK
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy&currency=USD`;
        script.addEventListener("load", () => {
            if (showPayPal) {
                window.paypal?.Buttons().render(paypalRef.current);
            }
        });
        document.body.appendChild(script);
    }, []);



    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="donation-review-wrapper">
                        <h1 className="donation-title">SCCHS Contributions</h1>

                        <div className="donation-card">
                            <h2 className="donation-subtitle">Review & Confirm Donation</h2>

                            <div className="donation-grid">
                                <div className="donation-label">First Name</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.first_name}</div>

                                <div className="donation-label">Last Name</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.last_name}</div>

                                <div className="donation-label">Organization</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.organization}</div>

                                <div className="donation-label">Email Address</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.email}</div>

                                <div className="donation-label">Phone</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.phone}</div>

                                <div className="donation-label">Donation Amount (USD)</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.donation_amount}</div>

                                <div className="donation-label">Donation Type</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">{savedData?.donation_type}</div>
                            </div>

                            <hr className="donation-divider" />

                            <div className="donation-grid donation-anonymous">
                                <div className="donation-label">Anonymous</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    I would like to make this donation anonymously. Please do not publish my name.
                                </div>
                                <div className="donation-label">Donor Comments:</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.comment}
                                </div>
                            </div>

                            <hr className="donation-divider" />

                            <div className="donation-grid donation-anonymous">
                                <div className="donation-label">Address</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.address1}
                                </div>
                                <div className="donation-label">Address 2</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.address2 ? savedData?.address2 : "false"}
                                </div>
                                <div className="donation-label">City</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.city}
                                </div>
                                <div className="donation-label">State / Province</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.state}
                                </div>
                                <div className="donation-label">Postal Code</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.postal_code}
                                </div>
                                <div className="donation-label">Country</div>
                                <div className="donation-separator">:</div>
                                <div className="donation-value">
                                    {savedData?.country}
                                </div>
                            </div>

                            <hr className="donation-divider" />
                            {/* <div className="donation-checkbox">
                                <input type="checkbox" />
                                <p>I am not a robot</p>
                            </div> */}

                          {/*  <ReCAPTCHA className='hghglol' size='normal' sitekey="6LfCVJ0qAAAAANSJX8eycxotMBzwuCHuMndZOSbY" onChange={handleRecaptchaChange} />*/} 
                            
                            {/* <ReCAPTCHA className='hghglol' size='normal' sitekey="6Lcng1ArAAAAALCboQHrKS6cNzKdbsLs4E2hTjz6" onChange={handleRecaptchaChange} /> */}

                        </div>
                        <div className="submit_donation">
                            {/* <button>Confirm & Pay with Paypal</button> */}
                            {!showPayPal ? (
                                <>
                                    <button
                                            style={{
                                                transition: "background-color 0.3s ease",
                                              }}
                                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ab0635")}
                                              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                                      onClick={handleEditClick}>Edit Save</button>
                                    <button
                                            style={{
                                                transition: "background-color 0.3s ease",
                                              }}
                                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#ab0635")}
                                              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
                                        onClick={() => setShowPayPal(true)}
                                        // disabled={!isVerified}
                                        // style={{
                                        //     opacity: isVerified ? 1 : 0.5,
                                        //     cursor: isVerified ? "pointer" : "not-allowed"
                                        // }}
                                    >Confirm & Pay </button>

                                </>
                            ) : (
                                <div ref={paypalRef}></div>
                            )}
                        </div>
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