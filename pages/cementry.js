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

export default function cementry(pageProp) {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').filter(letter => letter !== 'W' && letter !== 'X' && letter !== 'Y' && letter !== 'Z');

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="funeral-notes-container">

                        <div className="funnel_btn">
                            <h1 className="funeral-notes-heading">Notes on Baue Funeral Home Records</h1>
                            <Link href="research"><button className="funeral-notes-back-btn">Back</button></Link>
                        </div>

                        <p className="funeral-notes-intro">
                            Digitizing this index is a work-in-progress. Full index and records available at our Archives.
                        </p>

                        <p className="funeral-notes-subheading">Index by Last Name:</p>

                        <div className="funeral-notes-alphabet">
                            {alphabet.map((letter, index) => (
                                <span key={index} className="funeral-notes-letter">{letter}</span>
                            ))}
                        </div>

                        <p className="funeral-notes-paragraph">
                            These records were initially gifted to the St. Charles County Genealogical Society. When the St. Charles County Genealogical Society merged with the St. Charles County Historical Society in 2009, these records became a part of SCCHS's collections.
                        </p>

                        <p className="funeral-notes-highlight">
                            Notes on Baue Funeral Home Records from Microfiche Records
                        </p>
                        <p className="funeral-notes-subnote">
                            (from St. Charles County Genealogical Society, Nov 2006)
                        </p>

                        <p className="funeral-notes-paragraph">
                            Lisa Baue, the President of Baue Funeral Home, Inc. has given the St. Charles County Genealogical Society permission to extract the genealogical information from the microfiche of their records. Included in this extraction are the records of the Dallmeyer Funeral Home, Hackmann-Baue and Baue Funeral Homes thru 1988.
                        </p>

                        <p className="funeral-notes-paragraph">
                            Baue Funeral Home was founded in 1935, by Arthur C Baue and Clarence Hackmann, as the Hackmann-Baue Funeral Home on North Sixth Street in St Charles.  In 1947 they purchased the Salveter Home at 620 Jefferson Street, across from the Immanuel Lutheran School, and moved to the present location.  After the death of Clarence Hackmann, the Baue Family became the owners and operated since that time as the BAUE FUNERAL HOME INC.  Lisa is the third generation Baue serving the community.  They now have other parlors including one at Cave Springs, MO with a crematory, and O'Fallon, MO.  This index has none of the records of the other parlors.
                        </p>
                        <p className="funeral-notes-paragraph">
                            Dallmeyer Funeral Home (on North Second Street in St Charles) was purchased by Baue.  Those records were integrated resulting in a file of several thousand funerals in these early records spanning a period over 50 years.  A quick glance of those we have indexed shows a date of 1924.
                        </p>
                        <p className="funeral-notes-paragraph">
                            The information copied from the records includes the death date and place, birth date and place, parents (if known), residence at time of death, occupation, military if applicable, spouse, date of burial and place, and usually the survivors of the deceased.  Not all information is in all the records.  An index of the surnames (those of survivors, spouses, parents etc) included in the book of the full records has been added for cross-reference.  Relationships can be proven using this information.

                        </p>
                        <p className="funeral-notes-paragraph">
                            We thank Lisa and the BAUE FUNERAL HOME INC. for the privilege of making this listing and sincerely hope that you will find the ancestor you may be looking for.

                        </p>
                        <p className="funeral-notes-paragraph">
                            Wilma Jo Schnare has keyed the information into a database, and the index added by Marva Roelling and Colleen Schaeper, all members of the Society.  Members of the Society did proof reading, and an every name index added to the printouts of the records including those survivors listed in the records.
                        </p>
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