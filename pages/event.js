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



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

// const cards = [
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },

//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     {
//         date: "March 29, 2025",
//         time: "10am - 7pm",
//         title: "ROCK N ROLL BINGO",
//         image: "https://res.cloudinary.com/dgif730br/image/upload/v1744273279/1740627457_bingo_d7m6tj.png", // use your actual image
//         description: `ROCK 'N' ROLL BINGO Presented By The Saint Charles County Historical Society SATURDAY, MARCH 29, 2025 - DOORS OPEN AT 6:00PM, EVENT STARTS AT 7:00PM $200 PER TABLE OF 8 OR $25 PER PERSON Free Soda And Water, BYO`
//     },
//     // repeat for other cards
// ];

const ITEMS_PER_PAGE = 3;

export default function events(pageProp) {

    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };


    const product = pageProp.page_content.product;
    const customFields = product?.customFields;







    // const fetchcats = async () => {
    //     try {

    //         const resp = await fetch("https://admin.instacertify.com/api/get-news-category", {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (resp.status === 200) {
    //             const formateddata = await resp.json();
    //             setAllNewsCat(formateddata?.categories)

    //         }


    //     } catch (error) {

    //         console.error("There was an error fetching the categories:", error);
    //     }
    // };

    // const fetchAllNews = async (page = 1) => {
    //     try {
    //         const resp = await fetch(`https://admin.instacertify.com/api/get-news?page=${page}&limit=${itemsPerPage}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (resp.status === 200) {
    //             const formateddata = await resp.json();
    //             setalnews(formateddata?.news);
    //             setTotalPages(Math.ceil(formateddata?.news?.length / itemsPerPage)); // Calculate total pages
    //         }
    //     } catch (error) {
    //         console.error("There was an error fetching the news:", error);
    //     }
    // };

    // const fetchNewsByCat = async (slug, page = 1) => {
    //     try {
    //         const resp = await fetch(`https://admin.instacertify.com/api/get-news-by-category/${slug}?page=${page}&limit=${itemsPerPage}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });

    //         if (resp.status === 200) {
    //             const formateddata = await resp.json();
    //             console.log(formateddata);
    //             setalnews(formateddata?.news);
    //             setTotalPages(Math.ceil(formateddata?.news?.length / itemsPerPage)); // Update total pages for categories
    //         }
    //     } catch (error) {
    //         console.error("There was an error fetching the news by category:", error);
    //     }
    // };


    // useEffect(() => {
    //     fetchcats();
    //     fetchAllNews(currentPage);
    // }, [])


    // console.log("allnew ", alnews)

    const [cards, setCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    // ======for timeframe===========
    const [timeframe, setTimeframe] = useState('upcoming');

    const [searchField, setSearchField] = useState('title');
    const [searchInput, setSearchInput] = useState('');
    const [searchText, setSearchText] = useState(''); // this is what gets used in filter




    const fetchCategory = async () => {
        try {
            const resp = await fetch(`https://uat.scchs.co.in/api/get-event-category`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await resp.json();
            setCategories(data?.categories);
            console.log(data);
        } catch (error) {
            console.error("There was an error fetching the news:", error);
        }
    };



    const fetchAllNews = async () => {
        try {
            const resp = await fetch(`https://uat.scchs.co.in/api/get-event`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (resp.status === 200) {
                const formateddata = await resp.json();
                console.log(formateddata)
                setCards(formateddata?.events);
                setAllEvents(formateddata?.events)
                // setTotalPages(Math.ceil(formateddata?.news?.length / itemsPerPage)); // Calculate total pages
            }
        } catch (error) {
            console.error("There was an error fetching the news:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
        fetchAllNews();
    }, [])


    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        const categoryId = parseInt(selected);
        setSelectedCategory(categoryId);

        if (!categoryId) {
            setCards(allEvents);
            return;
        }

        const filtered = allEvents.filter(event => {
            let ids = event.category_ids;

            console.log(ids)

            if (!ids) return false;

            // Ensure it's an array of numbers
            const idNumbers = ids.map(id => parseInt(id));

            return idNumbers.includes(categoryId);
        });

        console.log(filtered);

        setCards(filtered);
    };



    // const formatTime = (timeStr) => {
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

                    <div className="filters-container">
                        <div>
                            <div className="filters-left">
                                <div className="custom_drop sustom_drop">
                                    <label style={{ marginBottom: "10px", fontWeight: "bold" }}>Filter By Category</label>
                                    <select onChange={handleCategoryChange}
                                        value={selectedCategory} className="dropdown">
                                        <option value="">All</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="custom_drop sustom_drop">
                                    {/* <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="dropdown">
                                        <option>Timeframe</option>
                                       
                                        <option value="today">Today</option>
                                        <option value="thisWeek">This Week</option>
                                        <option value="thisMonth">This Month</option>
                                    </select> */}
                                    <label style={{ marginBottom: "10px", fontWeight: "bold" }}>Timeframe</label>
                                    <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="dropdown">
                                        {/* <option value="upcoming">All</option> */}
                                        <option value="upcoming">All Upcoming</option>
                                        <option value="within1Month">Within 1 month</option>
                                        <option value="within3Months">Within 3 months</option>
                                        <option value="within6Months">Within 6 months</option>
                                        <option value="within12Months">Within 12 months</option>
                                        <option value="past">History of past event</option>
                                    </select>
                                </div>

                            </div>
                            <div className="event-title-filter">
                                <div className="custom_drop">
                                    <select value={searchField} onChange={(e) => setSearchField(e.target.value)} className="dropdown small">
                                        {/* <option>Event Title</option> */}
                                        <option value="title">Event Title</option>
                                        <option value="title_description">Event Title & Description</option>
                                    </select>
                                </div>
                                <span className="for-label">FOR:</span>
                                <input value={searchInput}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setSearchText(searchInput);
                                        }
                                    }}
                                    onChange={(e) => setSearchInput(e.target.value)} type="text" className="search-input" />
                                <button onClick={() => setSearchText(searchInput)} className="search-button">
                                    <img width="28" src="https://res.cloudinary.com/dgif730br/image/upload/v1744279927/Mask_group_zicocm.png" alt="this is search image" />
                                </button>
                                {searchInput && (
                                    <button
                                        style={{ background: "red" }}
                                        onClick={() => {
                                            setSearchInput("");     // reset input field
                                            setSearchText("");      // reset search result
                                        }}
                                        className="clear-button"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* <div className="filters-right">
                            <div className="listing">
                                <label>Listing Per Page</label>
                                <div className="custom_drop custom_drop1">
                                    <select className="dropdown small">
                                        <option>50</option>
                                    </select>
                                </div>
                            </div>
                            <div className="record-info">
                                Records : <span>1 to 4 of </span> 4
                            </div>
                        </div> */}
                    </div>

                    {/* slice(0, visibleCount) */}
                    {/* <div className="card-grid">
                        {cards.length === 0 ? (
                            <p>No events found.</p>
                        ) : (
                            cards
                                .filter(card => {
                                    const eventDate = new Date(card.date);
                                    const now = new Date();
                                    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                    const eventOnlyDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

                                    // ======= TIMEFRAME FILTER =======
                                    if (timeframe === 'past' && eventOnlyDate >= today) return false;
                                    if (timeframe === 'upcoming' && eventOnlyDate < today) return false;

                                    if (timeframe === 'within1Month') {
                                        const oneMonthLater = new Date(today);
                                        oneMonthLater.setMonth(today.getMonth() + 1);
                                        if (eventOnlyDate < today || eventOnlyDate > oneMonthLater) return false;
                                    }

                                    if (timeframe === 'within3Months') {
                                        const threeMonthsLater = new Date(today);
                                        threeMonthsLater.setMonth(today.getMonth() + 3);
                                        if (eventOnlyDate < today || eventOnlyDate > threeMonthsLater) return false;
                                    }

                                    if (timeframe === 'within6Months') {
                                        const sixMonthsLater = new Date(today);
                                        sixMonthsLater.setMonth(today.getMonth() + 6);
                                        if (eventOnlyDate < today || eventOnlyDate > sixMonthsLater) return false;
                                    }

                                    if (timeframe === 'within12Months') {
                                        const twelveMonthsLater = new Date(today);
                                        twelveMonthsLater.setMonth(today.getMonth() + 12);
                                        if (eventOnlyDate < today || eventOnlyDate > twelveMonthsLater) return false;
                                    }

                                    // ======= CATEGORY FILTER (if selected) =======
                                    // if (selectedCategory && selectedCategory !== 'all') {
                                    //     if (card.category_name?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
                                    // }

                                    if (typeof selectedCategory === 'string' && selectedCategory !== 'all') {
                                        if ((card.category_name || '').toLowerCase() !== selectedCategory.toLowerCase()) return false;
                                    }

                                    // ======= SEARCH FILTER =======
                                    const search = searchText.toLowerCase();
                                    if (search) {
                                        const title = card.title?.toLowerCase() || '';
                                        const desc = card.short_description?.toLowerCase() || '';

                                        if (searchField === 'title' && !title.includes(search)) return false;
                                        if (searchField === 'title_description' && !(title.includes(search) || desc.includes(search))) return false;
                                    }

                                    return true;
                                })
                                .slice(0, visibleCount).map((card, index) => (
                                    <div className="event-card" key={index}>
                                        <div className="card-header">
                                            <span>
                                                {new Intl.DateTimeFormat('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })
                                                    .format(new Date(card.date))
                                                    .replace(',', '')}
                                            </span>

                                            <span>{formatTime(card?.start_time)} - {formatTime(card?.end_time)}</span>
                                        </div>
                                        <Link href={`/eventdetail?id=${card?.slug}`}>  <img
                                            src={`https://uat.scchs.co.in/backend/admin/images/event_management/events/${card?.images[0]}`}
                                            alt="Event"
                                            className="card-image"
                                        /></Link>
                                        <div className="card-content">
                                            <Link style={{ textDecoration: "none", color: "#000" }} href={`/eventdetail?id=${card?.slug}`}><h3>{card.title}</h3></Link>
                                            <p>{card.short_description}</p>
                                            <Link href={`/eventdetail?id=${card?.slug}`}>
                                                <button className="info-btn">
                                                    More Info <span className="arrow-icon"></span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div> */}
                    {cards.length === 0 ? (
                        <p>No events found.</p>
                    ) : (
                        (() => {
                            const filtered = cards.filter(card => {
                                const eventDate = new Date(card.date);
                                const now = new Date();
                                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                                const eventOnlyDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

                                // ======= TIMEFRAME FILTER =======
                                if (timeframe === 'past' && eventOnlyDate >= today) return false;
                                if (timeframe === 'upcoming' && eventOnlyDate < today) return false;

                                if (timeframe === 'within1Month') {
                                    const oneMonthLater = new Date(today);
                                    oneMonthLater.setMonth(today.getMonth() + 1);
                                    if (eventOnlyDate < today || eventOnlyDate > oneMonthLater) return false;
                                }

                                if (timeframe === 'within3Months') {
                                    const threeMonthsLater = new Date(today);
                                    threeMonthsLater.setMonth(today.getMonth() + 3);
                                    if (eventOnlyDate < today || eventOnlyDate > threeMonthsLater) return false;
                                }

                                if (timeframe === 'within6Months') {
                                    const sixMonthsLater = new Date(today);
                                    sixMonthsLater.setMonth(today.getMonth() + 6);
                                    if (eventOnlyDate < today || eventOnlyDate > sixMonthsLater) return false;
                                }

                                if (timeframe === 'within12Months') {
                                    const twelveMonthsLater = new Date(today);
                                    twelveMonthsLater.setMonth(today.getMonth() + 12);
                                    if (eventOnlyDate < today || eventOnlyDate > twelveMonthsLater) return false;
                                }

                                // ======= CATEGORY FILTER =======
                                if (typeof selectedCategory === 'string' && selectedCategory !== 'all') {
                                    if ((card.category_name || '').toLowerCase() !== selectedCategory.toLowerCase()) return false;
                                }

                                // ======= SEARCH FILTER =======
                                const search = searchText.toLowerCase();
                                if (search) {
                                    const title = card.title?.toLowerCase() || '';
                                    const desc = card.short_description?.toLowerCase() || '';

                                    if (searchField === 'title' && !title.includes(search)) return false;
                                    if (searchField === 'title_description' && !(title.includes(search) || desc.includes(search))) return false;
                                }

                                return true;
                            });

                            // Sort filtered data by date ascending (soonest event first)
                            const sorted = filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

                            return (
                                <>
                                    <div className="card-grid">
                                        {sorted.length === 0 ? (
                                            <p>No events found.</p>
                                        ) : (
                                            sorted.slice(0, visibleCount).map((card, index) => (
                                                <div className="event-card" key={index}>
                                                    <div className="card-header">
                                                        <span>
                                                            {new Intl.DateTimeFormat('en-US', {
                                                                month: 'long',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })
                                                                .format(new Date(card.date))
                                                                .replace(',', '')}
                                                        </span>

                                                        <span>{formatTime(card?.start_time)} - {formatTime(card?.end_time)}</span>
                                                    </div>
                                                    <Link href={`/eventdetail/${card?.id}/${card?.slug}`}>
                                                        <img
                                                            src={`https://uat.scchs.co.in/backend/admin/images/event_management/events/${card?.images[0]}`}
                                                            alt="Event"
                                                            className="card-image"
                                                        />
                                                    </Link>
                                                    <div className="card-content">
                                                        <Link style={{ textDecoration: "none", color: "#000" }} href={`/eventdetail?id=${card?.slug}`}>
                                                            <h3>{card.title}</h3>
                                                        </Link>
                                                        <p>{card.short_description}</p>
                                                        <Link href={`/eventdetail/${card?.id}/${card?.slug}`}>
                                                            <button className="info-btn">
                                                                More Info <span className="arrow-icon"></span>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    {/* Load More Button Centered */}
                                    {sorted.length > 6 && visibleCount < sorted.length && (
                                        <div className="load-more-wrapper" style={{ textAlign: "center", marginTop: "20px" }}>
                                            <button onClick={handleLoadMore} className="load-more-btn">
                                                Load More
                                                <span className="arrow-wrap">
                                                    <img
                                                        width="12"
                                                        src="https://res.cloudinary.com/dgif730br/image/upload/v1744279126/Group_1171280891_zvryne.png"
                                                    />
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            );
                        })()
                    )}



                    {/* {visibleCount < cards.length && (
                        <div className="load-more-wrapper">
                            <button onClick={handleLoadMore} className="load-more-btn">
                                Load More
                                <span className="arrow-wrap">
                                    <img
                                        width="12"
                                        src="https://res.cloudinary.com/dgif730br/image/upload/v1744279126/Group_1171280891_zvryne.png"
                                    />
                                </span>
                            </button>
                        </div>
                    )} */}

                    {/* {cards.length > 6 && visibleCount < cards.length && (
                        <div className="load-more-wrapper">
                            <button onClick={handleLoadMore} className="load-more-btn">
                                Load More
                                <span className="arrow-wrap">
                                    <img
                                        width="12"
                                        src="https://res.cloudinary.com/dgif730br/image/upload/v1744279126/Group_1171280891_zvryne.png"
                                    />
                                </span>
                            </button>
                        </div>
                    )} */}


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