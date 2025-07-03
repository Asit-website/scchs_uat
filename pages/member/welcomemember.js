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



export default function welcomemember(pageProp) {

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="member_welcome">
                        <div className="welcome_flex">
                            <h2>Important Notice</h2>
                            {/* <Link href={"/join/memberplan"}><button>Renew Online</button></Link> */}
                        </div>
                        <div className="welcome_head_para">
                            <p>This information is for members only; please do not share your ID and password with non-members. Names and contact information are provided to assist members in collaborating on society projects and in genealogical research. The use of this information for commercial, political, personal, or religious purposes is strictly forbidden. It would show a lack of respect for the privacy of our members and would reduce their willingness to share contact data. Any violation will be considered a serious offense and will have consequences.</p>
                            <p>Just as you would not share your private family conversations or your family financial matters with the general public, please do not share our newsletters, financial reports, board meeting notes, etc with non-members. In an effort to keep our members well informed, we are exceptionally open with this data within our membership. However, it is not intended for public dissemination.  If you do not want some or all of your membership information to appear on the Membership List that is visible to all SCCHS members see item 4 below.</p>
                            <p>For more information about our organization, please use the menu on the left to navigate through our Website! </p>
                        </div>
                    </div>
                    <div className="member_login1">
                        <h2>To change your Login Name and/or Password do the following:</h2>
                        <div className="member_login1_para">
                            <p>1.) Select <span className="my_prof">My Profile</span> from the menu on the left.</p>
                            <p>2.) Select the <span className="member_setting">"Member Settings"</span>  tab in the bottom window.</p>
                            <p>3.) You may then edit your member information for any field that has the <span className="member_setting">Edit icon</span> next to it (Login Name, Password, etc.)</p>
                            <p>4.) To change the items that appears on your Receive <span className="member_setting"> Email and/or Membership</span> List select Yes (i.e., check the box) for each item you want displayed.  To  <span className="member_setting">"OPT OUT"</span> completely, select No (i.e., uncheck the box) for ALL items. </p>
                        </div>
                    </div>
                    <div className="member_login1 member_login2">
                        <h2>Note that five other tabs appear in the bottom window of the My Profile View: </h2>
                        <div className="member_login1_para">
                            <p>1.) Member Info</p>
                            <p>2.) Contact Info</p>
                            <p>3.) Alt Contact Info</p>
                            <p>4.) Custom Data</p>
                            <p>5.) Surname</p>
                            <p>
                                You may change your membership information in the <span className="member_setting">"Member Info", "Contact Info",</span>and <span className="member_setting">"Alt Contact Info"</span> tabs using the above procedure.  For instructions on changing information in the "Surnames" tab <span className="my_prof my_prof1">CLICK HERE.</span> To change any of your membership information in the "Member Info" or "Custom Data" tab use our convenient <span className="my_prof my_prof1">CONTACT FORM</span> and include the name of the information you wish to change in the Subject box (e.g., New Company Name).
                            </p>
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