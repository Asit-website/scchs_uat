import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import Link from "next/link";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

const TABS = [
    'Home',
    'Keyword Search',
    'Advanced Search',
    'Random Images',
    'Archives',
    'Photos',
    'Libraries',
    'Objects'
]

const categories = [
    'Objects', 'Photos', 'Archives', 'Items with Images Only',
    'Containers', 'Libraries', 'Creators', 'People'
];

const fields = [
    ['Title', 'Subject'],
    ['Creator (Artist/Photographer/Author)', 'Object Name / Other Name'],
    ['People', 'Place'],
    ['Search Terms', 'Catalog Number'],
    ['Call#', 'Dates'],
    ['Description', 'Collection'],
    ['Events', null]
];

// ===============for random images==========================

const images = [
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/image_amqxkh.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/213258_lp7zkp.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/396149_si5c9x.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/2400451_piz26u.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/image_amqxkh.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/213258_lp7zkp.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/396149_si5c9x.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/2400451_piz26u.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/image_amqxkh.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/213258_lp7zkp.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588453/396149_si5c9x.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dgif730br/image/upload/v1745588452/2400451_piz26u.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },


];

// =============for archieve==============
const records = [
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    }
];


// =================for photos====================

const imagess = [
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },



];


const photos = [
    {
        title: "Telescope inside Grover Parker's observatory February 1973 - Parker Collection",
        description: "3 1/2 x 3 1/2",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Tank on Parade - 1919 - 1920 - Thomas J. Campbell Collection",
        description: "2 x 3 1/2",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Mexico - Vera Cruz - Decampo Monument 1910 - 1920 - Stumberg Family Collection",
        description: "Map of Missouri counties 3",
        recordType: "7 x 5",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "A No. 4 Federal Drift Type siren - claimed to be the loudest fire apparatus siren ever made, according to a letter to Mr. Henry Bloebaum, City Clerk, St. Charles dated Nov. 8, 1929. Quoted price was $85.00.",
        description: "3 1/2 x 5 1/2",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Telescope inside Grover Parker's observatory February 1973 - Parker Collection",
        description: "Map of Missouri counties 5",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Tank on Parade - 1919 - 1920 - Thomas J. Campbell Collection",
        description: "2 x 3 1/2",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Mexico - Vera Cruz - Decampo Monument 1910 - 1920 - Stumberg Family Collection",
        description: "7 x 5",
        recordType: "Photo",
        buttonText: "More",
        imagePlaceholder: true,
    },

];


// const [searchKeyword, setSearchKeyword] = useState('');
//   const [filteredPhotos, setFilteredPhotos] = useState(photos);
//   const [currentPage, setCurrentPage] = useState(1);

//   const handleSearch = () => {
//     const keyword = searchKeyword.toLowerCase();
//     const filtered = photos.filter(photo =>
//       photo.title.toLowerCase().includes(keyword) ||
//       photo.description.toLowerCase().includes(keyword) ||
//       photo.recordType.toLowerCase().includes(keyword)
//     );
//     setFilteredPhotos(filtered);
//     setCurrentPage(1);
//   };

//   const handleClick = (page) => {
//     setCurrentPage(page);
//   };

//   const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredPhotos.slice(indexOfFirstItem, indexOfLastItem);

// =====///


// ===========================for Library======================================


const immagess = [
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },



];


const phottos = [
    {
        title: "Historic Inventions - 608",
        description: "Holland, Rupert S.",
        recordType: "Library",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "20th Century Bookkeeping and Accounting - 657.2",
        description: "Baker, James W.",
        recordType: " Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Tales & Talk from Down in Pike",
        description: "GFWC Coterie, Clarksville Missouri",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "The Messages and Proclamations of the Governors of the State of Missouri - 353.9778",
        description: "Land Entry, Survey.",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Historic Inventions - 608",
        description: "Holland, Rupert S.",
        recordType: "Library",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "20th Century Bookkeeping and Accounting - 657.2",
        description: "Baker, James W.",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "Tales & Talk from Down in Pike",
        description: "Tales & Talk from Down in Pike",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "The Messages and Proclamations of the Governors of the State of Missouri - 353.9778",
        description: "Land Entry, Survey.",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
];


// =======================for archiver=================================

const immagesss = [
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Wabash Freight Depot, Main and Clark, St. Charles - 1900 - 1920",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263548/Group_1171281767_vtlbtk.png",
        caption: "Gentleman of Old Britanny",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/2400350_muzl7w.png",
        caption: "Dr. Stumberg, WWII, 1940 - 1950",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },
    {
        src: "https://res.cloudinary.com/dbcmdtr3r/image/upload/v1746263382/213658_fhnlfh.png",
        caption: "Al and George: Al with a Rifle and George on a hobby horse",
    },



];


const archive = [
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.574 - Map",
        description: "Educational poster of Missouri, 1821",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.574 - Map",
        description: "Educational poster of Missouri, 1821",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Educational poster of Missouri, 1821",
        recordType: "Archive",
        buttonText: "More",
        imagePlaceholder: true,
    }

];























const itemsPerPage = 3;
export default function contribute(pageProp) {

    const [activeTab, setActiveTab] = useState('Home');

    useEffect(() => {
        const storedTab = localStorage.getItem('activeTab');
        if (storedTab) {
            setActiveTab(storedTab);
        }
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        localStorage.setItem('activeTab', tab);
    };

    //   =====================tab end=============

    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCheckbox = (label) => {
        setSelectedCategories((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    // ===============for archieve================
    const [currentPage, setCurrentPage] = useState(1);


    const totalPages = Math.ceil((activeTab === "Photos" ? photos.length : (activeTab === "Libraries" ? phottos.length : records.length)) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = (activeTab === "Photos" ? photos : (activeTab === "Libraries" ? phottos : records)).slice(startIndex, startIndex + itemsPerPage);

    // const items = activeTab === "Photos" ? phottos : records;
    // const totalPagess = Math.ceil(items.length / itemsPerPage);
    // const startIndexx = (currentPage - 1) * itemsPerPage;
    // const currentItemss = items.slice(startIndex, startIndex + itemsPerPage);

    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');

    const getFilteredItems = () => {
        const searchWords = search.toLowerCase().trim().split(/\s+/);

        const sourceData = activeTab === "Photos"
            ? photos
            : activeTab === "Libraries"
                ? phottos
                : records;

        return sourceData.filter((item) => {
            const title = item.title?.toLowerCase() || "";
            return searchWords.every((word) => title.includes(word));
        });
    };

    const filteredItems = getFilteredItems();
    const totalPages2 = Math.ceil(filteredItems.length / itemsPerPage);
    const startIndex2 = (currentPage - 1) * itemsPerPage;
    const currentItems2 = filteredItems.slice(startIndex2, startIndex2 + itemsPerPage);


    // ======================for photo============
    // const totalPagess = Math.ceil(photos.length / itemsPerPage);
    // const currentItemss = photos.slice(startIndex, startIndex + itemsPerPage);


    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="photos_main">
                <div className="photos_inner">
                    <div className="search-tabs-wrapper">
                        <div className={`tabs-container ${activeTab === "Advanced Search" || activeTab === "Random Images" ? "uids" : null}`}>
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {
                            activeTab === "Home" && (
                                <div className="tabs-content">
                                    <div className="tab_seming">
                                        <h2 className="tabs-title">Welcome to our Online Collections Database!</h2>
                                        <p className="tabs-subtitle">Tips for Searching</p>
                                    </div>

                                    <div className="search-section  serachjj_sectss">
                                        <h3 className="section-titless red-text">Keyword Search</h3>
                                        <p className="section-description">
                                            The Keyword Search button allows you to perform a general search across multiple fields for any catalog records online. Keyword searches use OR as the default connector between words (e.g. a search for Hanley Ranch will return records associated with Hanley OR Ranch). If you want to find records where both keywords are found, type in AND between the two words. To search for a specific phrase, be sure to put the phrase within quotes (e.g. "Rocky Pine Ranch"). You can also use the asterisk (*) as a wildcard (e.g. a search for histor* would come up with records containing history, histories, historical, etc.). Searches are not case sensitive.
                                        </p>
                                    </div>

                                    <div className="search-section">
                                        <h3 className="section-titless red-text">Advanced Search</h3>
                                        <p className="section-description">
                                            The Advanced Search button can help you be more specific with your search. You can search for a word or phrase within a particular search category or use multiple categories to further narrow down your search results. For example, searching White in the People field will bring up any records associated with a member of the White family, without having to sift through black & white photographs. You can also search People and Creator records through Advanced Search. Phrase searching with quotes and use of wildcards (*) are available in Advanced Search.
                                        </p>
                                    </div>

                                    <div className="search-section">
                                        <h3 className="section-titless red-text">Random Images</h3>
                                        <p className="section-description">
                                            The Random Images button is a great way to just browse the collection. Each Random Images page displays a random assortment of images from the records online. If something piques your interest, click the thumbnail to view a larger version of the image.
                                        </p>
                                    </div>

                                    <div className="search-section">
                                        <h3 className="section-titless red-text">Catalog Searches (Archives / Photos / Libraries / Objects)</h3>
                                        <p className="section-description">
                                            The catalog buttons can also help narrow down your search, by only searching with a selected catalog. If you only want to search for Photos, click the Photos button and type in your keyword(s) or phrase. You can also browse records within that catalog without performing a search. Phrase searching, wildcards (*) as well as AND/OR statements are available when performing catalog searches.
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                        {
                            activeTab === "Keyword Search" && (
                                <div className="ks-search-bar">
                                    <h2 className="ks-title">Keyword Search</h2>
                                    <div className="ks-input-group">
                                        <input className="ks-input" type="text" placeholder="Enter Search Criteria Here" />
                                        <button className="ks-search-button">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    <label className="ks-checkbox-label">
                                        <input type="checkbox" className="ks-checkbox" />
                                        Items with Images Only
                                    </label>
                                    <p className="ks-hint">
                                        <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                                    </p>
                                    <p className="ks-result-count">
                                        {/* <strong>14251</strong>  Results found. Records searched:  <strong>14251</strong> */}
                                    </p>
                                </div>
                            )
                        }

                        {
                            activeTab === "Advanced Search" && (
                                <div className="adv_wrapper1">
                                    <div className="adv-wrapper">
                                        <h2 className="adv-heading">Advanced Search</h2>
                                        <p className="adv-subheading">
                                            <span className="red-bold">Search Hints:</span> To search by phrase wrap your criteria in quotes. ex: "Find me"
                                        </p>

                                        <div className="checkbox-section">
                                            {categories.map((label) => (
                                                <label key={label} className="adv-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(label)}
                                                        onChange={() => handleCheckbox(label)}
                                                    />
                                                    {label}
                                                </label>
                                            ))}
                                        </div>

                                        <div className="form-section">
                                            <form>
                                                {fields.map(([left, right], idx) => (
                                                    <div key={idx} className="form-row" id={!right && "ids"}>
                                                        <input type="text" placeholder={left} className="form-input" />
                                                        {
                                                            right && <input type="text" placeholder={right} className="form-input" />
                                                        }

                                                    </div>
                                                ))}
                                                <div className="rt_sh">
                                                    <button className="rt_search">Search</button>
                                                    <button className="rt_reset">Reset</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            activeTab === "Random Images" && (
                                <div className="adv_wrapper1">
                                    <div className="adv-wrapper">
                                        <div className="random-images-wrapper">
                                            <h2 className="random-images-title">Random Images</h2>
                                            <div className="image-grid">
                                                {images.map((img, i) => (
                                                    <div className="image-card" key={i}>
                                                        <Link href={"/photos/randomimagedetails"}><img src={img.src} alt={img.caption} /></Link>
                                                        <Link style={{ textDecoration: "none" }} href={"/photos/randomimagedetails"}><p>{img.caption}</p></Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            // activeTab === "Archives" && (
                            //     <>
                            //         <div className="ks-search-bar">
                            //             <h2 className="ks-title">Keyword Search</h2>
                            //             <div className="ks-input-group">
                            //                 <input className="ks-input" type="text" placeholder="Enter Search Criteria Here" />
                            //                 <button className="ks-search-button">
                            //                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                         <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                            //                     </svg>

                            //                 </button>
                            //             </div>
                            //             <label className="ks-checkbox-label">
                            //                 <input type="checkbox" className="ks-checkbox" />
                            //                 Items with Images Only
                            //             </label>
                            //             <p className="ks-hint">
                            //                 <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                            //             </p>
                            //             <p className="ks-result-count">
                            //                 <strong>3627</strong> Results found. Records searched: <strong>3627</strong>
                            //             </p>
                            //         </div>

                            //         <div className="archieve_suing">
                            //             <div className="ks-page ks_pages11">
                            //                 {
                            //                     currentItems.map((item, idx) => {
                            //                         return (
                            //                             <div key={idx} className="ks-result-card">
                            //                                 <div className="ks-result-text">
                            //                                     <h3 className="ks-result-title">{archive[(currentPage-1)*itemsPerPage + idx]?.title}</h3>
                            //                                     <p className="ks-result-desc">{archive[(currentPage-1)*itemsPerPage + idx]?.description}</p>
                            //                                     <p className="ks-record-type"><strong>Record Type:</strong>{archive[(currentPage-1)*itemsPerPage + idx]?.recordType}</p>
                            //                                     <Link href={"/photos/archieverecord"}><button className="ks-more-button">{archive[(currentPage-1)*itemsPerPage + idx]?.buttonText}</button></Link>
                            //                                 </div>
                            //                                 <div className="ks-result-image-placeholder"></div>
                            //                             </div>
                            //                         )
                            //                     })
                            //                 }

                            //             </div>

                            //             <div className="custom-pagination">
                            //                 {[...Array(totalPages)].map((_, i) => (
                            //                     <button
                            //                         key={i}
                            //                         className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            //                         onClick={() => handleClick(i + 1)}
                            //                     >
                            //                         {i + 1}
                            //                     </button>
                            //                 ))}

                            //                 <button
                            //                     className="page-btn next-btn1"
                            //                     onClick={() => handleClick(currentPage + 1)}
                            //                     disabled={currentPage === totalPages}
                            //                 >
                            //                     <span>Next</span>
                            //                     <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            //                         <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
                            //                     </svg>

                            //                 </button>
                            //             </div>

                            //         </div>

                            //     </>
                            // )
                            activeTab === "Archives" && (
                                <>
                                    <div className="about-holdings">
                                        <h2 className="holdings-title">About Our Holdings</h2>
                                        <p className="holdings-text">
                                            The St. Charles County Historical Society's Archives has an extensive collection of documents, maps, books, photographs, manuscripts, and other records pertaining to St. Charles County history and Genealogy dating from 1800 to today. We maintain and preserve much of the historical records of both our county and our city. With a collection of over 50 years of diaries, journals, scrapbooks, and personal papers that have been&nbsp;donated to us we&nbsp;have a wealth of personal information on former residents useful in family history research. We maintain records on historic properties in the City and;County including tax and assessor records as well as source period photographs that assist those seeking to document the history of their property.&nbsp;
                                        </p>

                                    </div>
                                    <div className="online-research-cta">
                                        <div className="cta-wrapper">
                                            <p className="cta-text">To begin your online research experience</p>
                                            <button className="cta-button">Click Here</button>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            activeTab === "Photos" && (
                                <>
                                    <div className="ks-search-bar">
                                        <h2 className="ks-title">Keyword Search</h2>
                                        <div className="ks-input-group">
                                            <input
                                                className="ks-input"
                                                type="text"
                                                placeholder="Enter Search Criteria Here"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                            <button onClick={() => setSearch(searchInput)} className="ks-search-button">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                                                </svg>

                                            </button>
                                        </div>
                                        <label className="ks-checkbox-label">
                                            <input type="checkbox" className="ks-checkbox" />
                                            Items with Images Only
                                        </label>
                                        <p className="ks-hint">
                                            <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                                        </p>
                                        <p className="ks-result-count">
                                            <strong>{currentItems2.length} </strong> Results found. Records searched: <strong>14251 </strong>
                                        </p>
                                    </div>

                                    <div className="archieve_suing">
                                        <div className="ks-page ks_pages11">
                                            {
                                                currentItems2.map((item, idx) => (
                                                    <div key={idx} className="ks-result-card">
                                                        <div className="ks-result-text">
                                                            <h3 className="ks-result-title">{item.title}</h3>
                                                            <p className="ks-result-desc">{item.description}</p>
                                                            <p className="ks-record-type"><strong>Record Type:</strong> {item.recordType}</p>
                                                            <Link href="/photos/photodetail">
                                                                <button className="ks-more-button">{item.buttonText}</button>
                                                            </Link>
                                                        </div>
                                                        <img className="test_photo_img" src={item.image || imagess[idx]?.src} alt={item.title} />
                                                    </div>
                                                ))
                                            }

                                        </div>

                                        <div className="custom-pagination">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={() => handleClick(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}

                                            <button
                                                className="page-btn next-btn1"
                                                onClick={() => handleClick(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <span>Next</span>
                                                <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
                                                </svg>

                                            </button>
                                        </div>

                                    </div>
                                </>
                            )
                        }
                        {
                            activeTab === "Libraries" && (
                                <>
                                    <div className="ks-search-bar">
                                        <h2 className="ks-title">Keyword Search</h2>
                                        <div className="ks-input-group">
                                            <input className="ks-input" type="text" placeholder="Enter Search Criteria Here" value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)} />
                                            <button onClick={() => setSearch(searchInput)} className="ks-search-button">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                                                </svg>

                                            </button>
                                        </div>
                                        <label className="ks-checkbox-label">
                                            <input type="checkbox" className="ks-checkbox" />
                                            Items with Images Only
                                        </label>
                                        <p className="ks-hint">
                                            <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                                        </p>
                                        <p className="ks-result-count">
                                            <strong>{currentItems2.length}</strong> Results found. Records searched: <strong>3627</strong>
                                        </p>
                                    </div>

                                    <div className="archieve_suing">
                                        <div className="ks-page ks_pages11">
                                            {
                                                currentItems2.map((item, idx) => {
                                                    return (
                                                        <div key={idx} className="ks-result-card">
                                                            <div className="ks-result-text">
                                                                <h3 className="ks-result-title">{phottos[(currentPage - 1) * itemsPerPage + idx]?.title}</h3>
                                                                <p className="ks-result-desc">{phottos[(currentPage - 1) * itemsPerPage + idx]?.description}</p>
                                                                <p className="ks-record-type"><strong>Record Type:</strong>{phottos[(currentPage - 1) * itemsPerPage + idx]?.recordType}</p>
                                                                <Link href={`/photos/librarydetail?id=${(currentPage - 1) * itemsPerPage + idx}`}><button className="ks-more-button">{phottos[(currentPage - 1) * itemsPerPage + idx]?.buttonText}</button></Link>
                                                            </div>
                                                            <div className="ks-result-image-placeholder"></div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>

                                        <div className="custom-pagination">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={() => handleClick(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}

                                            <button
                                                className="page-btn next-btn1"
                                                onClick={() => handleClick(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <span>Next</span>
                                                <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
                                                </svg>

                                            </button>
                                        </div>

                                    </div>

                                </>
                            )
                        }
                        {
                            activeTab === "Objects" && (
                                <div className="ks-search-bar">
                                    <h2 className="ks-title">Keyword Search</h2>
                                    <div className="ks-input-group">
                                        <input className="ks-input" type="text" placeholder="Enter Search Criteria Here" />
                                        <button className="ks-search-button">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                                            </svg>

                                        </button>
                                    </div>
                                    <label className="ks-checkbox-label">
                                        <input type="checkbox" className="ks-checkbox" />
                                        Items with Images Only
                                    </label>
                                    <p className="ks-hint">
                                        <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                                    </p>
                                    <p className="ks-result-count">
                                        <strong></strong> No Results found. Records searched: <strong>0</strong>
                                    </p>
                                </div>
                            )
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