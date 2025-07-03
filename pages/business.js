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

export default function business(pageProp) {

    const [businesses, setBusinesses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [timeframe, setTimeframe] = useState("all");




    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const res = await fetch("https://uat.scchs.co.in/api/businesses");
                const data = await res.json();
                setBusinesses(data);
            } catch (error) {
                console.error("Error fetching businesses:", error);
            }
        };

        fetchBusinesses();
    }, []);

    // ✅ Get Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://uat.scchs.co.in/api/business-categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const isWithinMonths = (dateString, months) => {
        const created = new Date(dateString);
        const now = new Date();
        const pastDate = new Date();
        pastDate.setMonth(now.getMonth() - months);
        return created >= pastDate;
    };

    // const filtered = selectedCategory
    //     ? businesses.filter((biz) => biz.category_id == selectedCategory)
    //     : businesses;

    const filtered = businesses.filter((biz) => {
        const categoryMatch = selectedCategory ? biz.category_id == selectedCategory : true;

        let timeframeMatch = true;
        if (timeframe === "1") timeframeMatch = isWithinMonths(biz.created_at, 1);
        else if (timeframe === "3") timeframeMatch = isWithinMonths(biz.created_at, 3);
        else if (timeframe === "6") timeframeMatch = isWithinMonths(biz.created_at, 6);
        else if (timeframe === "12") timeframeMatch = isWithinMonths(biz.created_at, 12);

        return categoryMatch && timeframeMatch;
    });

    const [perPage, setPerPage] = useState(10); // default 10
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate page-wise data
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedBusinesses = filtered.slice(startIndex, endIndex);

    // Total listings count
    const totalListings = filtered.length;
    const totalPages = Math.ceil(totalListings / perPage);




    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />


            <div className="event_system_main">
                <div className="event_main" id="eventsynopsis">

                    <div className="pagination-settings">
                        <label>Listings Per Page:&nbsp;</label>
                        <select value={perPage} onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setCurrentPage(1); // reset to page 1 on perPage change
                        }}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>

                    </div>
                    <p style={{textAlign:"right"}}>
                        Listings: {startIndex + 1} to {Math.min(endIndex, totalListings)} of {totalListings}
                    </p>


                    <div className="filters-left">
                        <div className="custom_drop">
                            {/* <span>Filter by category</span> */}
                            <select
                                className="dropdown"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Filter by category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="custom_drop">
                            {/* <p>Filter by Timeframe</p> */}
                            <select
                                className="dropdown"
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                            >
                                <option value="all">Timeframe</option>
                                <option value="1">Within 1 Month</option>
                                <option value="3">Within 3 Months</option>
                                <option value="6">Within 6 Months</option>
                                <option value="12">Within 12 Months</option>
                            </select>
                        </div>
                    </div>

                    <div className="flying1-container">
                        {
                            paginatedBusinesses?.map((item, index) => {
                                return <div key={index} className="flying1-box">
                                    {/* <div className="flying1-img">
                                    <img
                                        src="https://res.cloudinary.com/djz3wn3fl/image/upload/v1745835404/Group_1171281827_rx2hpl.png"
                                        width="100%"
                                        alt="Al Droste & Sons"
                                    />
                                </div> */}
                                    <div className="flying1-name">
                                        <a href="#">{item?.title}</a>
                                    </div>
                                    <div className="flying1-text">
                                        <p style={{ marginTop: "12px" }} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                    </div>
                                    <p className="flying1-text-1">
                                        <span>Located in Category:</span> {item.category?.name}
                                    </p>
                                    {
                                        item?.link && <div className="flying1-btn">
                                            <a href={`${item?.link ? item.link : "#"}`} target="_blank" rel="noopener noreferrer">
                                                View Website
                                            </a>
                                        </div>
                                    }

                                </div>
                            })
                        }

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