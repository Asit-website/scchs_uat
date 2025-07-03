import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";




var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


export default function cementrytable(pageProp) {
    const router = useRouter();
    const { id } = router.query;

    const [people, setPeople] = useState([]);
    const [surname, setSurname] = useState("");

    useEffect(() => {
        if (id) {
            fetch(`https://uat.scchs.co.in/api/cemeteries/${id}/people`)
                .then((res) => res.json())
                .then((data) => {
                    setPeople(data);
                });
        }
    }, [id]);

    const filteredPeople = people?.filter((person) =>
        person.surname.toLowerCase().includes(surname.toLowerCase())
    );


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />



            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    
                    <div className="cemetery-records-wrapper">
                        <div className="cemetery-records-filters">
                            <div className="cemetery-filter-group">
                                <label>Search for Surname:</label>
                                <div className="cemetery-search-row">
                                    <input
                                        type="text"
                                        className="cemetery-search-input"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                    <button
                                        className="cemetery-clear-btn"
                                        onClick={() => setSurname("")}
                                    >
                                        🧹
                                    </button>
                                </div>
                            </div>
                            <div className="cemetery-results-info">
                                <div className="cemetery-record-count">
                                    Records: 1 to {filteredPeople.length} of {filteredPeople.length}
                                </div>
                            </div>
                        </div>

                        <table className="cemetery-table">
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    {/* ⬆ */}
                                    <th>Surname </th>
                                    <th>Given Name</th>
                                    <th>Age</th>
                                    <th>Birth Year</th>
                                    <th>Death Year</th>
                                    <th>Burial Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPeople.map((person, idx) => (
                                    <tr key={idx}>
                                        <td style={{ cursor: "pointer" }} onClick={() => router.push(`/cementrytabledetail?id=${id}&personId=${person?.index}`)}>👁</td>
                                        <td>{person.surname}</td>
                                        <td>{person.name}</td>
                                        <td>{person.age}</td>
                                        <td>{person.birth_year}</td>
                                        <td>{person.death_year}</td>
                                        <td style={{width:"20%"}}>{person.burial_year}</td>
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