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


export default function searchsurname(pageProp) {

    const router = useRouter();
    const { surname } = router.query;

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (surname) {
            fetch(`https://uat.scchs.co.in/api/people/search?surname=${surname}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setSearchResults(data);
                    setLoading(false);
                });
        }
    }, [surname]);

    console.log(searchResults[0])

    if (loading) return <div>Loading...</div>;

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />



            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="cemetery-records-wrapper">
                        <h2>Search Results for: <strong>{surname}</strong></h2>
                        <div style={{ overflowX: "auto" }}>
                        <table className="cemetery-table" style={{ minWidth: "700px", width: "100%", overflowX: "auto"}}>
                            <thead>
                                <tr>
                                    <th>Actions</th>
                                    <th>Surname</th>
                                    <th>Given Name</th>
                                    <th>Age</th>
                                    <th>Birth Year</th>
                                    <th>Death Year</th>
                                    <th>Burial Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((person) => (
                                    <tr key={person.id}>
                                        <td>
                                            <Link href={`/cementrytabledetail?id=${person.cemetery_id}&personId=${person.index}`}>👁</Link>
                                        </td>
                                        <td>{person.surname}</td>
                                        <td>{person.name}</td>
                                        <td>{person.age}</td>
                                        <td>{person.birth_year}</td>
                                        <td>{person.death_year}</td>
                                        <td>{person.burial_year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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