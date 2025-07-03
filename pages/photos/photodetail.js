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
export default function photodetail(pageProp) {



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
                                    src="https://res.cloudinary.com/dgif730br/image/upload/v1745681045/Group_1171281766_eplmhr.png" // replace with actual path
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
                                                <td>Telescope inside Grover Parker's observatory
                                                February 1973</td>
                                            </tr>
                                            <tr>
                                                <td>Collection</td>
                                                <td>Parker Collection</td>
                                            </tr>
                                            <tr>
                                                <td>Print size</td>
                                                <td>3 1/2" x 3 1/2"</td>
                                            </tr>
                                            <tr>
                                                <td>Title</td>
                                                <td>Telescope inside Grover Parker's observatory February 1973</td>
                                            </tr>
                                            <tr>
                                                <td>Medium</td>
                                                <td>Color</td>
                                            </tr>
                                            <tr>
                                                <td>Catalog Number</td>
                                                <td>254.1055</td>
                                            </tr>
                                            <tr>
                                                <td>People</td>
                                                <td><a href="#">Parker, Grover</a></td>
                                            </tr>
                                            <tr>
                                                <td>Image</td>
                                                <td>020\2541055.jpg</td>
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