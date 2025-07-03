import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
// import "../css/login.module.scss";
import { toast } from "react-toastify";
var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function deeprecord(pageProp) {

  


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />



            <div className='deeptop'>

            <div className="deeprecords1-container">
                <h2 className="deeprecords1-title">DEED RECORDS RELATED TO SMITH CHAPEL</h2>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 43, 519, Warranty Deed, 28 February 1880<br />
                        Charles S. Osgood to Edward M. Pringle
                    </p>
                    <p className="deeprecords1-price">$4300</p>
                    <p className="deeprecords1-text">
                        All that messuage or farm and heretofore occupied by me the said Osgood as a homestead composed of the following described and designated lots or parcels of land, viz.:
                        The E ½ of the NW ¼ excepting 5 acres of the N end of the same
                        The S ½ of the S ½ of the NE ¼ and the N ½ of the SE ¼ excepting the school house lot of one acre
                        And fifteen acres of right angled parallel to grain farm of the SE part of the N ½ of the S ½ and limited on the W by the colored people’s church and cemetery lot and corner marked by set stones, being the land conveyed to said Osgood by Smith Ball and wife by deed recorded in the St. Charles County record Book 32, Page 319
                        Also a piece of about 4 acres being all of that part of the SW ¼ of the SE ¼ N of the Rail Road except the Eastern about ½ of same sold by said Osgood to Arthur Sullivan and fenced off to him
                        All the foregoing parcels being part of Section 19 in TWP47 N R1E
                        Also the SW ¼ of the NW ¼ of Section 20 of said TWP
                        All of said parcels aggregating about 250 acres to be the same more or less

                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 50, 321, Deed of Release, 31 January 1889<br />
                        C. C. Potes (Marion Co., FL.), assignee of W. W. Potes to Smith and Minerva Ball
                    </p>
                    <p className="deeprecords1-text">
                        Whereas Smith Ball and Minerva Ball, his wife, of the County of St. Charles, in the State of MO, on the 27th day of March 1882 made and executed their certain Deed of Trust by which they conveyed to A. E. Forderhase, then of same County and State, in trust, for the purpose of securing the payment of a certain note in said Deed of Trust described and which said note was payable to W. W. Potes, then of the County of Lenawee in the State of Michigan for the sum of $800 payable in ten equal annual payments with interest at 6% payable annually and dated 1 March 1882; the following described real estate situated in the County of St. Charles in the State of Missouri, to wit:
                        Part of the NW ¼ of the NE ¼ and part of the NE ¼ of the NE ¼ of Section 19 of TWP 47N, R1E, containing 65 acres, also the N part of the SE ¼ of the NE ¼ and N part of the SW ¼ of the NE ¼ being a strip of land about eighteen and a half rods wide and parallel with Section line of Section No. 19 of TWP 47 of R1E being in all eighty-three acres and a half more or less, being the same land deeded to said W. W. Potes by Daniel McGowan and wife by deed dated 23 February 1865, excepting any and all parts of a tract out of the SE part of the N ½ of the S ½ of the NE ¼ of Section 19 aforesaid extending W to cemetery and of sufficient width to make 15 acres, which the said Smith Ball and wife conveyed to O. S. Osgood by deed dated 27 March 1882
                        And Whereas, the said W. W. Potes on 23 October 1883 at Benton Harbor, Michigan, in writing assigned and transferred for value received the said note in said deed of trust described to C. C. Potes, and whereas the said C. C. Potes afterwards, without having assigned or transferred said note to any person, lost the said note, while he was the legal holder thereof and cannot now produce said note or assign the same, but is now the person lawfully entitled to said lost note, and the only person who has any legal right to the ownership or possession of said note and whereas Smith Ball the said maker of said note has paid off and fully satisfied the amount due upon said note and every part thereof
                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 43, 85, 19 October 1887<br />
                        Charles S. Osgood to Arthur Sullivan
                    </p>
                    <p className="deeprecords1-text">
                        The easterly part of that part of the SW ¼ of the SE ¼ of Sec 19 TWP 47N R1 E, lying N of the RR bounded
                        N & E  boundary lines of said ¼ section
                        S          Railroad
                        W        line beginning at a point on the N line 6 chains W of the NE corner at the supposed SW corner of the School Lot and running S 24 ¼ W 4.76 chains to the RR said tract containing 3.96 acres
                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 32, p. 317, 27 March 1882<br />
                        Smith and Minerva Ball to Mildred Sullivan
                    </p>
                    <p className="deeprecords1-price">$350</p>
                    <p className="deeprecords1-text">
                        The N part of the NE ¼ of the NW ¼ of Section No. 19 TWP 47 R1E contain 5 acres
                        Also a lot or parcel of land in said County and State
                        A part of the SE ¼ of the SW ¼ of Section 18 TWP 47 R1E being the NE corner of said 40 acres tract being S & W of lands originally owned by Chas. C. Allen beginning at a stone near the NE corner of hill thence S 9.50 chains to a stone in section line, thence W 6.33 chains to a stone thence W 9.53 chains to a rock, thence E 6.33 chains to place of beginning containing six acres
                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 32, p. 319, 27 March 1882<br />
                        Smith and Minerva Ball (Forestill, MO) to C. S. Osgood (Foristell, MO)
                    </p>
                    <p className="deeprecords1-price">$300</p>
                    <p className="deeprecords1-text">
                        15 acres of the SE part of the N ½ of the S ½ of the NE ¼ of Section 19 TWP 47 R1E
                        Said tract being limited on the W by the colored peoples cemetery the SE corner of which is marked by a set stone from which a small cedar bears N9 ½ °W46 ½ links, the Northern boundary of this tract to be parallel with its southern and at such distance from it as will include fifteen acres
                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">
                        Book 12, 38, 28 September 1877<br />
                        William W. and Ursula Potes to the Trustees of the M.E. Church of Snow Hill
                    </p>
                    <p className="deeprecords1-price">$40</p>
                    <p className="deeprecords1-text">
                        One acre of land on the S side of the N ½ of the SW ¼ of the NE ¼ of Section No. 19 TWP 47 R1E beginning at a certain Rock in the Public Road Eight chains E of the SW corner of the farm now owned by W. W. Potes, thence E 4.50 chains thence N 2 chains and 22 2/9 links; thence W 4.50 chains, thence S 2 chains and 22 2/9 links, to place of beginning
                        The said parcel of land to be divided in three equal lots, the E lot to be used for cemetery, the center lot to be used for church purposes and the W lot to be used for School purposes the said parcel of land to be held and controlled by the present trustees and their successors in Office of the M.E. Church at Snow Hill, MO, organized for colored people
                        Provided that the said Trustees—Austin Pringle, Nathaniel Abington, Smith Ball, Jackson Lockett, David Bird, Thomas McClean, Mark Robinson, Clayborne Richards & Martin Boyd & their successors in office keep a lawful fence on the S side and on the E & W end of said acre of land a good lawful fence & that the premises
                    </p>
                </div>

                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">

                        Book 8, p. 435, Warranty Deed, 1 January 1870<br />
                        Josiah and Amer. Christopher to Smith Ball (all of St. Charles Co)
                    </p>
                    <p className="deeprecords1-price">$750</p>
                    <p className="deeprecords1-text">
                        *Ten rods wide (N & S) eighty rods long (E & W) it being the N part of the NE ¼ of the NW ¼ of Section 19, TWP 47, R1E, containing 5 acres*
                        Also a lot or parcel of land situated in the County of St. Charles & State of MO, viz.:  a part of the SE ¼ of the SW ¼ of Section 18 in TWP 47N R1E and being in the NE corner of said 41 acre tract and being S & W of lands originally owned by Charles C. Allen
                        Beginning at a stone near the NE corner of Mill, thence S 9.50 chains to a stone set in the section line, thence W 6.33 chains to a stone; thence N 9.56 chains to a rock; thence E 6.33 chains to the place of beginning and being the same tract of land conveyed to Anton Dumproff by John A. Farmer by a deed dated 25 February 1867
                    </p>
                </div>


                <div className="deeprecords1-block">
                    <p className="deeprecords1-heading">

                        Book N, 1, 10 July 1839<br />
                        Henry and Maria Abington to Henry Pritchett, Taylor Abington (St. Charles Co) and Daniel Sherman (Warren Co), Trustees appointed by Shiloh Methodist Church
                    </p>
                    {/* <p className="deeprecords1-price">$750</p> */}
                    <p className="deeprecords1-text">
                        For the purpose of establishing permanently a place of public worship for the use and benefit of the Methodist Church called Shiloh, and also for and in consideration of $1
                        A tract of land situated in said County of St. Charles and containing one acre and bounded as follows, to wit:  Beginning at a stake on the SE side of the house and running due W 70 yards to stake thence due N 70 yards to stake thence due E 70 yards to stake and then running due S to the beginning
                        Said trustees and their successors are to hold said lot of ground and said church shall have the right to build on said land such house or houses for public worship as its members may think proper
                        Mill, thence S 9.50 chains to a stone set in the section line, thence W 6.33 chains to a stone; thence N 9.56 chains to a rock; thence E 6.33 chains to the place of beginning and being the same tract of land conveyed to Anton Dumproff by John A. Farmer by a deed dated 25 February 1867
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