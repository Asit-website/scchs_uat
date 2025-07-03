import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};




// const itemsPerPage = 10;
export default function librarydetail(pageProp) {
    const router = useRouter();
    const { id } = router.query;

    const phottos = [
        {
            title: "600.001.574",
            description: "Map",
            recordType: "Educational poster of Missouri, 1821",
            buttonText: "Map",
            buttonTextt:"1986",
            CatalogNumber:"004.608",

        },
        {
            title: "20th Century Bookkeeping and Accounting - 657.2",
            description: "657.2",
            recordType: "Baker, James W.",
            buttonText: "Student's guide to bookkeeping principles and procedures.",
            buttonTextt:"1928",
            CatalogNumber:"004.657.2",
            
        },
        {
            title: "Tales & Talk from Down in Pike",
            description: "977.8",
            recordType: "GFWC Coterie, Clarksville, Missouri",
            buttonText: "A collection of remembrances and research from Calumet Township in southeastern Pike County, Missouri.",
            buttonTextt:"1976",
            CatalogNumber:"004.977.8.48",
            
        },
        {
            title: "The Messages and Proclamations of the Governors of the State of Missouri - 353.9778",
            description: "353.9778",
            recordType: "Penn, Dorothy",
            buttonText: "Messages and Proclamations of Missouri Governors Henry S. Caulfield (1929-1933) and Guy B. Park (1933-1937)",
            buttonTextt:"1947",
            CatalogNumber:"004.353.9778.01",
            imagePlaceholder: true,
        },
        {
            title: "Historic Inventions - 608",
            description: "608",
            recordType: "Holland, Rupert S.",
            buttonText: "A guide to historic inventions and their creators.",
            buttonTextt:"1911",
            CatalogNumber:"004.608",
            imagePlaceholder: true,
        },   
        {
            title: "20th Century Bookkeeping and Accounting - 657.2",
            description: "	657.2.",
            recordType: "Baker, James W.",
            buttonText: "Student's guide to bookkeeping principles and procedures.",
            buttonTextt:"1928",
            CatalogNumber:"004.657.2",
            imagePlaceholder: true,
        },
        {
            title: "Tales & Talk from Down in Pike",
            description: "Null",
            recordType: "GFWC Coterie, Clarksville Missouri",
            buttonText: "A collection of remembrances and research from Calumet Township in southeastern Pike County, Missouri",
            buttonTextt:"1988",
            CatalogNumber:"2007.026.04",
            imagePlaceholder: true,
        },
        {
            title: "The Messages and Proclamations of the Governors of the State of Missouri - 353.9778",
            description: "353.9778",
            recordType: "Guitar, Sarah",
            buttonText: "Messages and Proclamations of Missouri Governor Forrest Smith (1949-1953)",
            buttonTextt:"1955",
            CatalogNumber:"004.353.9778.03",
            imagePlaceholder: true,
        },
    ];

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
                                            {/* <tr>
                                                <td>Title</td>
                                                <td>{600.001.574}</td>
                                            </tr>
                                            <tr>
                                                <td>Call#</td>
                                                <td>Map</td>
                                            </tr>
                                            <tr>
                                                <td>Author</td>
                                                <td>Educational poster of Missouri, 1821</td>
                                            </tr>
                                            <tr>
                                                <td>Summary</td>
                                                <td>Map</td>
                                            </tr>
                                            <tr>
                                                <td>Published Date</td>
                                                <td>1986</td>
                                            </tr>
                                            <tr>
                                                <td>Catalog Number</td>
                                                <td>004.608</td>
                                            </tr> */}



                                            <tr>
                                                <td>Title</td>
                                                <td>{phottos[id].title}</td>
                                            </tr>
                                            <tr>
                                                <td>Call#</td>
                                                <td>{phottos[id].description}</td>
                                            </tr>
                                            <tr>
                                                <td>Author</td>
                                                <td>{phottos[id].recordType}</td>
                                            </tr>
                                            <tr>
                                                <td>Summary</td>
                                                <td>{phottos[id].buttonText}</td>
                                            </tr>
                                            <tr>
                                                <td>Published Date</td>
                                                <td>{phottos[id].buttonTextt}</td>
                                            </tr>
                                            <tr>
                                                <td>Catalog Number</td>
                                                <td>{phottos[id].CatalogNumber}</td>
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