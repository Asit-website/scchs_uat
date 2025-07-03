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
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';


var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};



export default function storedetail(pageProp) {
    const [quantity, setQuantity] = useState(1);

    const { toggleBoolValue } = pageProp;



    const router = useRouter();
    const { id } = router.query;

    const [instaUser, setInstaUser] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState("loading");

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

    const [productdetail, setProductDetails] = useState({});

    const fetchProductDetails = async () => {
        try {

            const resp = await fetch(`https://uat.scchs.co.in/api/products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                console.log(formateddata)
                setProductDetails(formateddata?.product);
                // setReviews(formateddata?.reviews);

            }

        } catch (error) {

            console.error("There was an error fetching the categories:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
        else {
            console.log("error");
        }
    }, [id])





    const addToCartApi = async (id) => {

        const resp = await fetch('https://uat.scchs.co.in/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
            },
            body: JSON.stringify({
                product_id: id,
                quantity: quantity,
            }),
        })
            .then(response => response.json())
            .then(data => {
                toast.success(data?.message);
                router.push("/storeorder");
                toggleBoolValue();
            })
            .catch(error => console.error('Error:', error));

        // alert(resp)
    }

    // ========new add==========

    useEffect(() => {
        const savedQty = sessionStorage.getItem(`product_qty_${productdetail.id}`);
        if (savedQty) {
            setQuantity(parseInt(savedQty));
        }
    }, [productdetail.id]);

    useEffect(() => {
        sessionStorage.setItem(`product_qty_${productdetail.id}`, quantity);
    }, [quantity, productdetail.id]);

    // const increase = () => setQuantity(prev => prev + 1);
    // const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"Store"} description={"This is store"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main">
                <div className="event_main">
                    <div className="product-detail-wrapper">
                        <div className="product-detail-container">
                            {
                                productdetail?.images?.length > 1
                                    ?
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        className="product-image-slider"
                                    >
                                        {productdetail?.images?.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    className="product-detail-image"
                                                    src={img}
                                                    alt={`Print ${index + 1}`}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    : <img
                                        className="product-detail-image"
                                        src={productdetail?.images || "https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png";
                                        }}
                                        // src={productdetail?.images ? productdetail?.images : "https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png"}
                                        alt="Print"
                                    />

                            }



                            <div className="product-detail-info">
                                <h2 className="product-title">{productdetail?.product_name}</h2>
                                {/* <p className="product-subtitle"> */}
                                {/* Street car (interurban) terminal, St.Charles, */}
                                <div className="product-subtitle" dangerouslySetInnerHTML={{ __html: productdetail?.product_detail }} />
                                {/* </p> */}

                                <div className="price-box">

                                    {
                                        membershipStatus === "active" && <p>
                                            <span>Sale price :</span> ${
                                                productdetail?.price * quantity
                                            }
                                        </p>
                                    }

                                    <p>
                                        <span>{membershipStatus === "active" ? "Membership Price" : "Price"} :</span> ${membershipStatus === "active" ? productdetail?.membership_price * quantity : productdetail?.price * quantity

                                        }
                                    </p>


                                    <p>
                                        <span>Shipping / Handling :</span> ${productdetail?.
                                            shipping_cost * quantity}
                                    </p>
                                </div>

                                <div className="quantity-row">
                                    <div className="qty-selector">
                                        <button onClick={decreaseQuantity}>−</button>
                                        <span>{quantity}</span>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>

                                    {/* <button onClick={async () => {
                                        const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                        const productId = productdetail?.id;

                                        if (isLoggedIn) {
                                            await addToCartApi(productId);
                                        }
                                        else {
                                            const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

                                            const productExit = cartItems?.some(item => item.id === productId);

                                            if (!productExit) {
                                                productdetail.quantity = 1;
                                                cartItems.push(productdetail);
                                            }

                                            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                                            // alert("Product successfuly added");
                                            toast.success("Product successfuly added");
                                            router.push("/storeorder");
                                            toggleBoolValue();

                                        }



                                    }} className="add-to-cart-btn">Add To Cart</button> */}

                                    <button
                                        onClick={async () => {
                                            const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                            const productId = productdetail?.id;

                                            if (isLoggedIn) {
                                                await addToCartApi(productId, quantity); // Make sure your API supports quantity
                                            } else {
                                                const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
                                                const existingProduct = cartItems.find(item => item.id === productId);

                                                if (existingProduct) {
                                                    // Increase quantity by selected amount
                                                    existingProduct.quantity += quantity;
                                                } else {
                                                    cartItems.push({ ...productdetail, quantity });
                                                }

                                                sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                                                toast.success("Product successfully added");
                                                router.push("/storeorder");
                                                toggleBoolValue();
                                            }

                                            // Optional: Clear saved quantity after adding to cart
                                            sessionStorage.removeItem(`product_qty_${productId}`);
                                        }}
                                        className="add-to-cart-btn"
                                    >
                                        Add To Cart
                                    </button>

                                </div>
                            </div>
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