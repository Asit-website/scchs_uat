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
export default function randomimagedetails(pageProp) {



    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="photo-record-container">
                        <div className="photo-record-header">
                            <Link href={"/photos/mainhome"}><button className="photo-record-back">Back</button></Link>
                            <div className="photo-record-actions">
                                <button className="photo-record-email">Email to a friend</button>
                                <button className="photo-record-feedback">Send us feedback</button>
                            </div>
                        </div>

                        <div className="photo-record-content">
                            <div className="photo-record-image">
                                <img
                                    src="https://res.cloudinary.com/dgif730br/image/upload/v1745591825/Group_1171281742_rsh4yu.png" // replace with actual path
                                    alt="Gentleman of Old Britanny"
                                />
                            </div>

                            <div className="photo_record_title">
                                <h2 className="photo-record-title">Photo Record</h2>
                                <div className="photo-record-table">

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Description</td>
                                                <td>Gentleman of Old Britanny</td>
                                            </tr>
                                            <tr>
                                                <td>Collection</td>
                                                <td>Thomas J. Campbell Collection</td>
                                            </tr>
                                            <tr>
                                                <td>Print size</td>
                                                <td>3 1/2 x 2 3/4</td>
                                            </tr>
                                            <tr>
                                                <td>Year Range from</td>
                                                <td>1917.0</td>
                                            </tr>
                                            <tr>
                                                <td>Year Range to</td>
                                                <td>1918.0</td>
                                            </tr>
                                            <tr>
                                                <td>Title</td>
                                                <td>World War I Scene - French Front</td>
                                            </tr>
                                            <tr>
                                                <td>Photographer</td>
                                                <td><a href="#">Charles H. Abbott</a></td>
                                            </tr>
                                            <tr>
                                                <td>Medium</td>
                                                <td>Black & White</td>
                                            </tr>
                                            <tr>
                                                <td>Date</td>
                                                <td>1917-1918</td>
                                            </tr>
                                            <tr>
                                                <td>Catalog Number</td>
                                                <td>240.0233</td>
                                            </tr>
                                            <tr>
                                                <td>Subjects</td>
                                                <td>World War I <br/> War destruction & pillage <br/> War damage</td>
                                            </tr>
                                            <tr>
                                                <td>Image</td>
                                                <td>014\2400233.jpg</td>
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