import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import HeadSEO1 from "../components/common/Head/head1";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};



export default function researchs(pageProp) {
    const [instaUser, setInstaUser] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState("loading");

    useEffect(() => {
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            setInstaUser(JSON.parse(storedUser));
        }
    }, []);


    useEffect(() => {
        const fetchMembership = async () => {
            if (!instaUser?.id) return;

            try {
                const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
                const data = await res.json();

                console.log(data);

                const today = new Date();

                const activePlan = data?.data?.find(plan => {
                    const isActive = plan.status === "active";
                    const endDate = new Date(plan.end_date);
                    return isActive && endDate >= today;
                });

                setMembershipStatus(activePlan ? "active" : "none");
            } catch (err) {
                console.error("Error fetching membership:", err);
                setMembershipStatus("none");
            }
        };

        fetchMembership();
    }, [instaUser]);

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"Store"} description={"This is store"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main">
                <div className="event_main">

                    <section className="main-section">
                        <div className="container">
                            <section>
                                <div className="research-section">
                                    <h1>Research</h1>
                                    <p>
                                        The <span>St. Charles County</span> Historical Society's Archives has an extensive collection of
                                        County and City records. Over the years, a number of the research items have been indexed by various
                                        volunteers to enable researchers to more readily locate information for genealogical or family
                                        history.
                                    </p>
                                </div>

                                <div className="research-request">
                                    <h2>You may submit a research request by:</h2>
                                    <div>
                                        <p>1. Using our convenient <a href="/contact-us">RESEARCH&nbsp;CONTACT FORM</a></p>
                                        <p>2. Calling us at&nbsp;<span>(636) 946-9828</span>&nbsp;</p>
                                        <p>3. Visiting the Archives at&nbsp;<span>101 South Main Street,&nbsp;St. Charles, MO. 63301-2802</span></p>
                                    </div>

                                    <h2>You may submit a research request by:</h2>
                                    <div>
                                        <p>1. In-Person Research: <span>$5.00/day</span> (Fee waived for SCCHS Members)</p>
                                        <p>2. Remote Research Assistance: <span>$20.00</span>/hour (<span>$10.00 </span>minimum)</p>
                                        <p>3. Photocopies: <span>$.25</span>/page for black and white, $.50/page for color</p>
                                        <p>4. Scans: <span>$1.00</span>/page</p>
                                        <p className="text-primary">Fees can be paid by Credit Card, Check, or Cash.&nbsp;</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="custom-box">
                                    <p>Only <span>SCCHS Members</span> have access to the following online indexes:</p>
                                    <ul>
                                        <li><a onClick={(e) => {
                                            if (membershipStatus !== "active") {
                                                e.preventDefault(); // prevent redirect
                                                alert("You must need to purchase a member plan");
                                                // Optional: then redirect manually
                                                window.location.href = "/join/memberplan";
                                            }
                                        }} href={membershipStatus === "active" ? "/research4" : "/join/memberplan"}>Archived Copies of SCCHS Heritage Journals</a></li>
                                        <li><a href={membershipStatus === "active" ? "/heritage" : "/join/memberplan"}>Archived Copies of SCCHS Newsletters</a></li>
                                        <li><a href={membershipStatus === "active" ? "/cementry-records" : "/join/memberplan"}>Baue Funeral Home Records Index (in progress)</a></li>
                                        <li><a href={membershipStatus === "active" ? "/Br-permit" : "/join/memberplan"}>Burial or Removal Permits</a></li>
                                        <li><a href={membershipStatus === "active" ? "/Burials-By-Church" : "/join/memberplan"}>Burials by Church</a></li>
                                        {/* https://uat.scchs.co.in/backend/admin/media/Business%20%26%20Industry%20Files%20Index/Business%20%26%20Industry%20Files%20Index.pdf */}
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/Business%20%26%20Industry%20Files%20Index/Business%20%26%20Industry%20Files%20Index.pdf" : "/join/memberplan"}>Business &amp; Industry Files Index</a></li>
                                        <li>
                                            <a href={membershipStatus === "active" ? "/cementryrecord" : "/join/memberplan"}>Cemetery Records</a>
                                            <p className="cementry-text">There are currently almost 50,000 individual records available from over 350 cemeteries in Saint Charles</p>
                                        </li>

                                        {/* <li><a href={membershipStatus === "active" ? "#" : "/member/memberlogin"}>County. For more information CLICK HERE</a></li> */}

                                        <li><a href={membershipStatus === "active" ? "	/census" : "/join/memberplan"}>Census, St. Charles County, 1876 Family Files</a></li>
                                        {/*  */}
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/Family%20Files/Family%20Files.pdf" : "/join/memberplan"}>Family Files</a></li>
                                        <li><a href={membershipStatus === "active" ? "/guardian-book-search" : "/join/memberplan"}>Guardian Books</a></li>
                                        <li><a href={membershipStatus === "active" ? "/land-and-property" : "/join/memberplan"}>Land and Property Record by Last Name</a></li>
                                        <li><a href={membershipStatus === "active" ? "/land-and-property 1" : "/join/memberplan"}>Land and Property Records by Year</a></li>
                                        <li><a href={membershipStatus === "active" ? "	/marriages-by-church" : "/join/memberplan"}>Marriages by Church</a></li>
                                        <li><a href={membershipStatus === "active" ? "/marriage1" : "/join/memberplan"}>Marriage Index 1836 - 1858</a></li>
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/New_data/St.%20Charles%20County%20Historical%20Society%20-%20McElhiney%20Olson%20Index.pdf " : "/join/memberplan"}>McElhiney Olson Historical Newspaper Articles Index</a></li>
                                        <li><a href={membershipStatus === "active" ? "/naturalization-records" : "/member/memberlogin"}>Naturalization Records</a></li>
                                        <li><a href={membershipStatus === "active" ? "	/obituaries" : "/member/memberlogin"}>Obituaries</a></li>
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/New_data/St.%20Charles%20County%20Historical%20Society%20-%20Demokrat%20obits%201852-1894.pdf " : "/join/memberplan"}>Obituaries from the Demokrat w/English translations (1852-1894)</a></li>
                                        <li><a href={membershipStatus === "active" ? "/Probate Records" : "/member/memberlogin"}>Probate Records</a></li>
                                        <li><a href={membershipStatus === "active" ? "/Church-Baptisms	" : "/member/memberlogin"}>Selected Church Baptisms</a></li>
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/hisrical_record/St.%20Charles%20County%20Historical%20Society%20-%20Sibley%20Diary%201844-1855.pdf " : "/join/memberplan"}>Sibley Diary 1844 - 1855</a></li>
                                        {/* https://uat.scchs.co.in/backend/admin/media/Stillbirths.pdf */}
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/Stillbirths.pdf" : "/join/memberplan"}>Stillbirths</a></li>
                                        <li><a href={membershipStatus === "active" ? "https://uat.scchs.co.in/backend/admin/media/St.%20Charles%20County%20Historical%20Society%20-%20Subject_Topic%20Files.pdf " : "/join/memberplan"}>Subject/Topic Files</a></li>
                                        <li><a href={membershipStatus === "active" ? "/world-war" : "/join/memberplan"}>World War II Marriages</a></li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <div className="info">
                                    <p>
                                        Please note that the&nbsp;original documents&nbsp;referenced by the indexes on our website&nbsp;are&nbsp;not&nbsp;available online.
                                    </p>
                                    <p>
                                        If you are a member, you may view the above indexes by clicking on them or going to the&nbsp;
                                        <a href={membershipStatus === "active" ? "/research" : "/member/memberlogin"}>RESEARCH</a>&nbsp;section of the MEMBERS ONLY&nbsp;page.&nbsp;
                                    </p>
                                    <p>
                                        If you are&nbsp;not&nbsp;a member and would like&nbsp;information about becoming&nbsp;one&nbsp;
                                        <a href="https://scchs.co.in/membership-information-join-us">CLICK HERE</a>
                                    </p>
                                </div>

                                <div className="info-box">
                                    <p>
                                        Everyone using our website has access to our online Catalog and to the St. Charles County Circuit<br />
                                        Court online index.
                                    </p>
                                    <p><a href="/checkout">The online Catalog contains our collection of:</a></p>
                                    <ul>
                                        <li>
                                            <strong>Photographs</strong> - The SCCHS collection contains over 14,000 images of buildings,
                                            businesses, events,<br /> and individuals and residences.
                                        </li>
                                        <li>
                                            <strong>Archives</strong> - Diaries, family collections, journals, manuscripts, maps,
                                            scrapbooks, school records and towns.
                                        </li>
                                        <li>
                                            <strong>Library</strong> - Over 1,700 volumes on state and local history, genealogical study and<br />
                                            reference.
                                        </li>
                                    </ul>
                                </div>

                                <div className="info-below">
                                    <p><a href="/checkout">CLICK HERE</a>&nbsp;to view our&nbsp;Online Catalog.</p>
                                    <p>
                                        2. The&nbsp;St. Charles County Circuit Court online index&nbsp;is the result of a-partnership between the Local
                                        Records Division of the Missouri State Archives, the St. Charles County' circuit clerk and the
                                        SCCHS.&nbsp; See <a href="https://uat.scchs.co.in/backend/admin/media/scchs/Historical_Research_with_St._Charles_County_Circuit_Court_Records.pdf" download="download">Historical Research with St Charles County Circuit Court Records</a>&nbsp;for more
                                        information.&nbsp;&nbsp;The index:
                                    </p>

                                    <ul>
                                        <li>1. includes sessions held&nbsp;from 1805 through 1893 (includes the period St. Charles served as Missouri's state capital),</li>
                                        <li>2. is&nbsp;to&nbsp;original records&nbsp;that are stored at the SCCHS Archives, and</li>
                                        <li>3. may&nbsp;be&nbsp;searched&nbsp;free at&nbsp;<a href="https://s1.sos.mo.gov/records/archives/archivesdb/JudicialRecords">MO Judicial Archives</a>&nbsp;as part of the Missouri Judicial Records Collection (select Saint&nbsp;Charles in the County box).&nbsp;</li>
                                        <li>4. The original documents are at the St. Charles County Historical Society Archives.</li>
                                    </ul>

                                    <p className="info-text">
                                        We also maintain&nbsp;a large&nbsp;Personal Ancestral File (PAF)&nbsp;containing the genealogy of over 75,000 selected individuals and family members&nbsp;who lived in St. Charles County.&nbsp; However, this
                                        file is&nbsp;not&nbsp;available online and may only be viewed at the SCCHS Archives.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </section>


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