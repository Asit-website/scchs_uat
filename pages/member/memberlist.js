import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


// const records = [
//     { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
//     { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
//     { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
//     { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
//     { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
//     { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
//     { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
//     { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
//     { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
//     { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
//     { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
//     { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
//     { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
//     { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
//     { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
//     { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
//     { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
//     { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
//     { name: 'Almeling, Dan and Christy', email: 'd56da@aol.com' },
//     { name: 'Anderson, Evan', email: 'eja2100@aol.com' },
//     { name: 'Angell, Natalie', address: '202 Sandfort Ln. St. Charles, MO 63301-4411', phone: '(636) 947-6970', email: 'natalie.angell20@gmail.com' },
//     { name: 'Archer, Hillary', email: 'hillaryarcher47@gmail.com' },
//     { name: 'Arens, Dan [Dan] Robert', email: 'drarens@yahoo.com' },
//     { name: 'Armantrout, F. John', email: 'kayak910@outlook.com' },
//     // Add more for testing pagination
// ];

const itemsPerPage = 10;
export default function memberlist(pageProp) {

    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('https://uat.scchs.co.in/api/all/customers');
                const data = await response.json();
                setRecords(data || []);
                setFilteredRecords(data || []);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    // Filter function
    useEffect(() => {
        if (!searchValue || !searchField) {
            setFilteredRecords(records);
            return;
        }

        const result = records.filter((item) => {
            const name = item.user?.[searchField]?.toLowerCase() || "";
            return name.includes(searchValue.toLowerCase());
        });

        setFilteredRecords(result);
        setCurrentPage(1); // Reset to first page after search
    }, [searchValue, searchField, records]);

    // Pagination setup
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

    // const handleClick = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="memberList_filter" >
                        <div className="event-title-filter memberlist-title-filter">
                            <div className="custom_drop">
                                <select value={searchField}
                                    onChange={(e) => setSearchField(e.target.value)} className="dropdown small">
                                    <option value="">Select</option>
                                    <option value="first_name">First Name</option>
                                    <option value="last_name">Last Name</option>
                                </select>
                            </div>
                            <span className="for-label">FOR:</span>
                            <input value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)} type="text" className="search-input" />
                            <button onClick={() => {
                                setSearchField("");
                                setSearchValue("");
                            }} className="search-button">
                                Clear
                                {/* <img width="28" src="https://res.cloudinary.com/dgif730br/image/upload/v1744279927/Mask_group_zicocm.png" alt="this is search image" /> */}
                            </button>
                        </div>

                        <div className="filters-right">
                            <div className="listing">
                                <label>Listing Per Page</label>
                                <div className="custom_drop custom_drop1">
                                    <select value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1);
                                        }} className="dropdown small">
                                        {[10, 25, 50, 100].map((count) => (
                                            <option key={count} value={count}>
                                                {count}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className="listing" id="listingg">
                                <label>Jump to Page</label>
                                <div className="custom_drop custom_drop1">
                                    <select value={currentPage}
                                        onChange={(e) => setCurrentPage(Number(e.target.value))} className="dropdown small">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                                            <option key={pg} value={pg}>
                                                {pg}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="record-info mem-record-info">
                        Records: {filteredRecords.length === 0 ? 0 : startIndex + 1} to{" "}
                        {Math.min(startIndex + itemsPerPage, filteredRecords.length)} of {filteredRecords.length}
                    </div>

                    <div className="scch-table-container">
                        <table className="scch-member-table">
                            <colgroup>
                                <col style={{ width: "25%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "45%" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className="nh1">Member Name</th>
                                    <th className="nh1">Address</th>
                                    <th>Telephone / Email / Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item?.user?.first_name} {item?.user?.last_name}</td>
                                        <td>{item?.user?.address || ''}</td>
                                        <td>
                                            {item?.user?.mobile_number && <div>{item?.user.mobile_number}</div>}
                                            {item?.user?.email}
                                            {item?.user?.website}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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