import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import Link from "next/link";


var settingsMorePhotos = {
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

const records = [
    {
        title: "600.001.587 - Map",
        description: "Map of Missouri counties",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey.",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.574 - Map",
        description: "Educational poster of Missouri, 1821",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey.",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.574 - Map",
        description: "Educational poster of Missouri, 1821.",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "2008.006.175 - Folder",
        description: "Land Entry, Survey",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    },
    {
        title: "600.001.587 - Map",
        description: "Educational poster of Missouri, 1821.",
        recordType: "Archive",
        buttonText: "Know More",
        imagePlaceholder: true,
    }
];

const itemsPerPage = 3;

export default function archieve(pageProp) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInput,setSearchInput] = useState("")
    const [withImagesOnly, setWithImagesOnly] = useState(false);

    const normalize = str => str.toLowerCase().replace(/\s+/g, '').trim();

    const filteredRecords = records.filter(item => {
        const titleNorm = normalize(item.title);
        const descNorm = normalize(item.description);
        const searchNorm = normalize(searchTerm);
        const matchesSearch = titleNorm.includes(searchNorm) || descNorm.includes(searchNorm);
        const matchesImage = withImagesOnly ? item.imagePlaceholder : true;
        return matchesSearch && matchesImage;
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const filteredStartIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredRecords.slice(filteredStartIndex, filteredStartIndex + itemsPerPage);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />
            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="ks-search-bar">
                    <h2 className="ks-title">Keyword Search</h2>
                    <div className="ks-input-group">
                        <input
                            className="ks-input"
                            type="text"
                            placeholder="Enter Search Criteria Here"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <button onClick={() => setSearchTerm(searchInput)} className="ks-search-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078Z" fill="#a00036" stroke="white" />
                            </svg>
                        </button>
                    </div>
                    <label className="ks-checkbox-label">
                        <input
                            type="checkbox"
                            className="ks-checkbox"
                            checked={withImagesOnly}
                            onChange={(e) => {
                                setWithImagesOnly(e.target.checked);
                                setCurrentPage(1);
                            }}
                        />
                        Items with Images Only
                    </label>
                    <p className="ks-hint">
                        <strong>{filteredRecords.length} Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
                    </p>
                    <p className="ks-result-count">
                        <strong>{filteredRecords.length}</strong> Results found. Records searched: <strong>3627</strong>
                    </p>
                </div>

                <div className="event_main">
                    <div className="ks-page">
                        {currentItems.map((item, idx) => (
                            <div key={idx} className="ks-result-card">
                                <div className="ks-result-text">
                                    <h3 className="ks-result-title">{item?.title}</h3>
                                    <p className="ks-result-desc">{item?.description}</p>
                                    <p className="ks-record-type"><strong>Record Type:</strong> {item?.recordType}</p>
                                    <button className="ks-more-button">{item?.buttonText}</button>
                                </div>
                                <div className="ks-result-image-placeholder">{item?.imagePlaceholder}</div>
                            </div>
                        ))}
                    </div>

                    {filteredRecords.length > 0 && (
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

// var settingsMorePhotos = {
//     arrows: true,
//     dots: false,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1
// };

// const records = [
//     {
//         title: "600.001.587 - Map",
//         description: "Map of Missouri counties",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "2008.006.175 - Folder",
//         description: "Land Entry, Survey.",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "600.001.574 - Map",
//         description: "Educational poster of Missouri, 1821",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "2008.006.175 - Folder",
//         description: "Land Entry, Survey",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "2008.006.175 - Folder",
//         description: "Land Entry, Survey.",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "600.001.574 - Map",
//         description: "Educational poster of Missouri, 1821.",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "2008.006.175 - Folder",
//         description: "Land Entry, Survey",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "2008.006.175 - Folder", 
//         description: "Land Entry, Survey",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     },
//     {
//         title: "600.001.587 - Map",
//         description: "Educational poster of Missouri, 1821.",
//         recordType: "Archive",
//         buttonText: "Know More",
//         imagePlaceholder: true,
//     }
// ];

// const itemsPerPage = 3;
// export default function archieve(pageProp) {

//  const [currentPage, setCurrentPage] = useState(1);

//     const totalPages = Math.ceil(records.length / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = records.slice(startIndex, startIndex + itemsPerPage);

//     const handleClick = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     return (
//         <div className="page_shopping_list sop">
//             <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

//             <HeadSEO1 />

//             <div className="event_system_main event_system_main1">
//                 <div className="ks-search-bar">
//                     <h2 className="ks-title">Keyword Search</h2>
//                     <div className="ks-input-group">
//                         <input className="ks-input" type="text" placeholder="Enter Search Criteria Here" />
//                         <button className="ks-search-button">
//                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
//                             </svg>

//                         </button>
//                     </div>
//                     <label className="ks-checkbox-label">
//                         <input type="checkbox" className="ks-checkbox" />
//                         Items with Images Only
//                     </label>
//                     <p className="ks-hint">
//                         <strong>Search Hints:</strong> To search by phrase wrap your criteria in quotes. ex: "Find me"
//                     </p>
//                     <p className="ks-result-count">
//                         <strong>3627</strong> Results found. Records searched: <strong>3627</strong>
//                     </p>
//                 </div>
//                 <div className="event_main">
//                     <div className="ks-page">
//                         {
//                             currentItems.map((item, idx) => {
//                                 return (
//                                     <div key={idx} className="ks-result-card">
//                                         <div className="ks-result-text">
//                                             <h3 className="ks-result-title">{item?.title}</h3>
//                                             <p className="ks-result-desc">{item?.description}</p>
//                                             <p className="ks-record-type"><strong>Record Type:</strong>{item?.recordType}</p>
//                                             <button className="ks-more-button">{item?.buttonText}</button>
//                                         </div>
//                                         <div className="ks-result-image-placeholder">{item?.imagePlaceholder}</div>
//                                     </div>
//                                 )
//                             })
//                         }

//                     </div>

//                     <div className="custom-pagination">
//                         {[...Array(totalPages)].map((_, i) => (
//                             <button
//                                 key={i}
//                                 className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//                                 onClick={() => handleClick(i + 1)}
//                             >
//                                 {i + 1}
//                             </button>
//                         ))}

//                         <button
//                             className="page-btn next-btn1"
//                             onClick={() => handleClick(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                         >
//                            <span>Next</span> 
//                             <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
//                             </svg>

//                         </button>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     );
// }

// export async function getServerSideProps(context) {
//     try {

//         const globalSettings = await GlobalHeaderFooter();
//         return {
//             props: {
//                 page_content: false,
//                 navbar: globalSettings?.header,
//                 footer: globalSettings?.footer
//             },
//         };

//     } catch (error) {

//         return {
//             props: {
//                 page_content: false,
//                 navbar: false,
//                 footer: false
//             },
//             notFound: true
//         };

//     }
// }