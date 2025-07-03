import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
// import { useRouter } from "next/router";
// import "../css/login.module.scss";
import { toast } from "react-toastify";
var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function business(pageProp) {

    const { toggleBoolValue } = pageProp;

    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState({ products: [], businesses: [], events: [] });
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const formatTime = (timeStr) => {
        const [hour, minute] = timeStr.split(':');
        const date = new Date();
        date.setHours(hour);
        date.setMinutes(minute);

        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await fetch(`https://uat.scchs.co.in/api/search?query=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (query) fetchSearchResults();
    }, [query]);

    const addToCartApi = async (id) => {

        const resp = await fetch('https://uat.scchs.co.in/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
            },
            body: JSON.stringify({
                product_id: id,
                quantity: 1,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                toast.success(data?.message);
                router.push("/storeorder");
                toggleBoolValue();
            })
            .catch(error => console.error('Error:', error));

        // alert(resp)
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />


            <div className="event_system_main">
                <div className="event_main">
                    <div className="p-6 space-y-10">
                        <h2 className="text-xl font-bold">Search Results for: {query}</h2>

                        {/* Products */}
                        {results.products.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Products</h3>
                                <div className="custom-grid-container">
                                    {results.products.map((product) => (
                                        // <div key={product.id} className="p-4 border rounded">
                                        //     <img
                                        //         src={`https://uat.scchs.co.in/storage/${product.images?.[0]}`}
                                        //         alt={product.product_name}
                                        //         className="w-full h-40 object-contain mb-2"
                                        //     />
                                        //     <h4 className="font-medium">{product.product_name}</h4>
                                        //     <p dangerouslySetInnerHTML={{ __html: product.product_detail }} />
                                        // </div>
                                        <div className="custom-card" key={product.id}>
                                            <Link href={`/storedetail?id=${product?.slug}`}><img
                                                className="custom-card-image"
                                                // https://res.cloudinary.com/dgif730br/image/upload/v1745405452/image_1_ip1mnv.png
                                                src={`https://uat.scchs.co.in//ecommerce/products/${product?.images[0]}`}
                                                alt="Product"
                                            /></Link>
                                            <div className="custom-card-content">
                                                <Link style={{ textDecoration: "none" }} href={`/storedetail?id=${product?.slug}`}>
                                                    <h3 className="custom-card-title">{product.product_name}</h3></Link>
                                                <p className="custom-card-subtitle">{product.product_specification}</p>
                                                {/* <p className="custom-card-location">{product.location}</p> */}
                                                {/* <p className="custom-card-location">MO 1918</p> */}
                                                <p className="custom-card-updated">
                                                    <span>Last Updated:</span> {new Date(product.updated_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '').replace(' ', '-')}

                                                    {/* {product.updated} */}

                                                </p>
                                                <button
                                                    //  out-stock
                                                    className="custom-card-button"
                                                    onClick={async () => {
                                                        const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
                                                        const productId = product?.id;

                                                        if (isLoggedIn) {
                                                            await addToCartApi(productId);
                                                        }
                                                        else {
                                                            const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

                                                            const productExit = cartItems?.some(item => item.id === productId);

                                                            if (!productExit) {
                                                                product.quantity = 1;
                                                                cartItems.push(product);
                                                            }

                                                            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
                                                            toast.success("Product successfuly added");
                                                            router.push("/storeorder");
                                                            toggleBoolValue();

                                                        }



                                                    }}
                                                >
                                                    {product.inStock ? "Out of Stock" : "Add to Cart"}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Businesses */}
                        {results.businesses.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Businesses</h3>
                                {results.businesses.map((biz) => (
                                    <div key={biz.id} className="p-4 border rounded mb-2">
                                        <h4 className="font-medium">{biz.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: biz.description }} />
                                        {
                                        biz?.link && <div className="flying1-btn">
                                            <a href={`${biz?.link ? biz.link : "#"}`} target="_blank" rel="noopener noreferrer">
                                                View Website
                                            </a>
                                        </div>
                                    }
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Events */}
                        {results.events.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Events</h3>
                                <div className="card-grid">
                                    {results.events.map((event) => (
                                        // <div key={event.id} className="p-4 border rounded mb-2">
                                        //     <h4 className="font-medium">{event.title}</h4>
                                        //     <p dangerouslySetInnerHTML={{ __html: event.description }} />
                                        // </div>
                                        <div className="event-card" key={event.id}>
                                            <div className="card-header">
                                                <span>
                                                    {new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }).format(new Date(event.date))}
                                                </span>
                                                <span>{formatTime(event?.start_time)} - {formatTime(event?.end_time)}</span>
                                            </div>
                                            <img
                                                src={`https://uat.scchs.co.in/backend/admin/images/event_management/events/${event?.images[0]}`}
                                                alt="Event"
                                                className="card-image"
                                            />
                                            <div className="card-content">
                                                <h3>{event.title}</h3>
                                                <p>{event.short_description}</p>
                                                <Link href={`/eventdetail?id=${event?.slug}`}>
                                                    <button className="info-btn">
                                                        More Info <span className="arrow-icon"></span>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {results.products.length === 0 && results.businesses.length === 0 && results.events.length === 0 && (
                            <p>No results found.</p>
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