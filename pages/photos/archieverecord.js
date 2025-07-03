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




// const itemsPerPage = 10;
export default function archieverecord(pageProp) {



    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="photo-record-container photo-record-container11">
                        <div className="photo-record-header">
                            <Link href={"/photos/mainhome"}><button className="photo-record-back">Back</button></Link>
                            <div className="photo-record-actions">
                                <button className="photo-record-email">Email to a friend</button>
                                <button className="photo-record-feedback">Send us feedback</button>
                            </div>
                        </div>

                        <div className="photo-record-content">

                            <div className="photo_record_title">
                                <div className="photo-record-table">

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Catalog Number</td>
                                                <td>600.001.574</td>
                                            </tr>
                                            <tr>
                                                <td>Object Name</td>
                                                <td>Map</td>
                                            </tr>
                                            <tr>
                                                <td>Scope & Content</td>
                                                <td>Educational poster of Missouri, 1821</td>
                                            </tr>
                                            <tr>
                                                <td>Collection</td>
                                                <td>Map</td>
                                            </tr>
                                            <tr>
                                                <td>Date</td>
                                                <td>1986</td>
                                            </tr>
                                        </tbody>
                                    </table>
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