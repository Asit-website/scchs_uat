import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";
// import ReactToPrint from "react-to-print";



var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};



// const data = {
//     surname: "Alferman",
//     city: "St. Charles",
//     county: "St. Charles",
//     state: "Missouri",
//     country: "USA",
//     beginYear: "1801",
//     endYear: "1960",
//     alternateSpellings: "Alfermann",
// };

export default function surenamelook(pageProp) {

    const printRef = useRef();

    const { query } = useRouter();

    const data = {
        surname: query.surname || "",
        city: query.city || "",
        county: query.county || "",
        state: query.state || "",
        country: query.country || "",
        beginYear: query.start_year || "",
        endYear: query.end_year || "",
        alternateSpellings: query.alt || "",
        notes: query?.commant
    };



    console.log(data)

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
             .surname-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 24px;
  column-gap: 60px;
  align-items: center;
}

.surname-details-grid div {
  color: rgba(8, 13, 23, 1);
  font-size: 18px;
  font-family: "Euclid-Regular";
}

.surname-details-grid strong {
  color: rgba(0, 49, 92, 1) !important;
  font-size: 18px !important;
  font-family: "Euclid-Medium" !important;
  font-weight: 400 !important;
}

.surname-details-grid div:nth-child(3n+2) {
  color: #000;
}

.surname-details-grid a {
  color: #003865;
  /* Same as the Figma color for links */
  text-decoration: none;
}

.surname-btn-group {
  margin-top: 40px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.btn-primary {
  background-color: #002f5f;
  color: white;
  padding: 10px 40px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  font-family: "Euclid-Regular";
}

.btn-outline {
  border: 1px solid #97002b;
  background: none;
  color: #97002b;
  padding: 10px 28px;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
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


    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="surname-btn-group">
                        <button onClick={handlePrint} className="btn-primary">Print</button>
                        <Link href={"/surenamelook"}><button className="btn-outline">Back</button></Link>
                    </div>
                    <div className="surname-details-wrapper">
                        <div className="surname-details-grid" ref={printRef}>
                            {data?.surname && <><div>Surname</div>
                                <div>: <strong><a href="#">{data.surname}</a></strong></div></>}

                            {
                                data?.city && <>
                                    <div>City</div>
                                    <div>: <strong><a href="#">{data.city}</a></strong></div>
                                </>
                            }

                            {
                                data?.county && <>
                                    <div>County</div>
                                    <div>: <strong><a href="#">{data.county}</a></strong></div>
                                </>
                            }

                            {
                                data?.state && <>
                                    <div>State/Prov./Rgn</div>
                                    <div>: <strong><a href="#">{data.state}</a></strong></div>
                                </>
                            }

                            {
                                data?.country &&
                                <>
                                    <div>Country</div>
                                    <div>: <strong><a href="#">{data.country}</a></strong></div>
                                </>
                            }

                            {
                                data?.beginYear && <>
                                    <div>Being Year</div>
                                    <div>: <strong><a href="#">{data.beginYear}</a></strong></div>
                                </>
                            }
                            {
                                data?.endYear && <>
                                    <div>End Year</div>
                                    <div>: <strong><a href="#">{data.endYear}</a></strong></div>
                                </>
                            }


                            {
                                data?.alternateSpellings && <>
                                    <div>Alternate Spellings</div>
                                    <div>: <strong><a href="#">{data.alternateSpellings}</a></strong></div>
                                </>
                            }

                            {
                                data?.notes && <>
                                    <div>Notes / Comments</div>
                                    <div>: <strong><a href="#">{data.notes}</a></strong></div>
                                </>
                            }

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