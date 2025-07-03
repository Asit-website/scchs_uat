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
    const printRef = useRef();
    const router = useRouter();
    const { id, personId } = router.query;
    const [personData, setPersonData] = useState(null);

    useEffect(() => {
        if (id && personId) {
            fetch(`https://uat.scchs.co.in/api/cemeteries/${id}/people/${personId}`)
                .then((res) => res.json())
                .then((data) => setPersonData(data));
        }
    }, [id, personId]);

    const handlePrint = () => {
        const printContents = printRef.current.cloneNode(true);
        const printWindow = window.open("", "", "width=800,height=600");

        printWindow.document.write(`
      <html>
        <head>
          <title>Print Surname Details</title>
          <style>
           @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
          *{
             font-family: "Inter", sans-serif;
          }
          body{
              font-family: "Inter", sans-serif;
          }
           .cemetery-box {
  border: 1px solid #aaa;
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
}

.cemetery-box-title {
  color: #335533;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
          </style>
        </head>
        <body>
         
        </body>
      </html>
    `);

        printWindow.document.body.appendChild(printContents);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    if (!personData) return <p>Loading...</p>;
    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />



            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="cemetery-detail-container">
                        <div className="cemetery-detail-header">
                            <h1 className="cemetery-detail-title">Cemetery Record</h1>
                            <div className="cemetery-detail-buttons">
                                <button className="cemetery-btn-print" onClick={handlePrint}>Print</button>
                                <button className="cemetery-btn-close" onClick={() => router.back()}>Close</button>
                            </div>
                        </div>
                        <div ref={printRef}>
                            <div className="cemetery-box" >
                                <h3 className="cemetery-box-title">Personal Data:</h3>
                                <p>Surname: <strong>{personData.surname}</strong></p>
                                <p>Given Name: <strong>{personData.given_name}</strong></p>
                                <p>Age: <strong>{personData.age}</strong></p>
                            </div>

                            <div className="cemetery-box">
                                <h3 className="cemetery-box-title">Birth Information:</h3>
                                <p>  Mo. / Day / Year : <strong>{personData.birth_month} {personData?.birth_day} {personData?.birth_year}</strong></p>
                            </div>

                            <div className="cemetery-box">
                                <h3 className="cemetery-box-title">Death Information:</h3>
                                <p> / Mo. / Day / Year : <strong>{personData.death_month} {personData?.death_day} {personData?.death_year}</strong></p>
                            </div>

                            <div className="cemetery-box">
                                <h3 className="cemetery-box-title">Interment Information:</h3>
                                <p>Cemetery: <strong>{personData.cemetery}</strong></p>
                            </div>

                            <div className="cemetery-box">
                                <h3 className="cemetery-box-title">Notes / Comments:</h3>
                                <p><strong>{personData.notes}</strong></p>
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