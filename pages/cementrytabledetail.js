import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";

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
           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
          * {
            font-family: "Inter", sans-serif;
          }
          body {
            font-family: "Inter", sans-serif;
            padding: 20px;
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
      <body></body>
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

                        <div ref={printRef} className="cemetery-flex-wrapper">
                            <div className="cemetery-info-left">
                                <div className="cemetery-box">
                                    <h3 className="cemetery-box-title">Personal Data:</h3>
                                    <p>Surname: <strong>{personData.surname}</strong></p>
                                    <p>Given Name: <strong>{personData.given_name}</strong></p>
                                    <p>Age: <strong>{personData.age}</strong></p>
                                </div>

                                <div className="cemetery-box">
                                    <h3 className="cemetery-box-title">Birth Information:</h3>
                                    <p>Mo. / Day / Year: <strong>{personData.birth_month} {personData?.birth_day} {personData?.birth_year}</strong></p>
                                </div>

                                <div className="cemetery-box">
                                    <h3 className="cemetery-box-title">Death Information:</h3>
                                    <p>Mo. / Day / Year: <strong>{personData.death_month} {personData?.death_day} {personData?.death_year}</strong></p>
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

                            {Array.isArray(personData.images) && personData.images.length > 0 && (
                                <div className="cemetery-info-right" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    {personData.images.map((imgUrl, idx) => {
                                        console.log(`🖼️ Image ${idx + 1}:`, imgUrl);
                                        return (
                                            <img
                                                key={idx}
                                                src={
                                                    imgUrl.startsWith("http")
                                                        ? imgUrl
                                                        : `https://uat.scchs.co.in/uploads/${imgUrl}`
                                                }
                                                alt={`Person Image ${idx + 1}`}
                                                className="cemetery-image"
                                                style={{ width: "300px", height: "auto", borderRadius: "6px" }}
                                            />
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .cemetery-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cemetery-detail-buttons button {
          margin-left: 10px;
          padding: 6px 12px;
          background-color: #00305b;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cemetery-detail-buttons button:hover {
          opacity: 0.9;
        }

        .cemetery-flex-wrapper {
          display: flex;
          gap: 40px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .cemetery-info-left {
          flex: 1 1 60%;
        }

        .cemetery-info-right {
          flex: 1 1 35%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .cemetery-image {
          border-radius: 6px;
          object-fit: cover;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          max-width: 100%;
          height: auto;
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

        @media (max-width: 768px) {
          .cemetery-flex-wrapper {
            flex-direction: column;
          }

          .cemetery-info-right {
            margin-top: 20px;
          }

          .cemetery-detail-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
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
                footer: globalSettings?.footer,
            },
        };
    } catch (error) {
        return {
            props: {
                page_content: false,
                navbar: false,
                footer: false,
            },
            notFound: true,
        };
    }
}
