import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";

export default function cementryrecord(pageProp) {
  const [counties, setCounties] = useState([]);
  const [cemeteries, setCemeteries] = useState([]);
  const [filteredCemeteries, setFilteredCemeteries] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState("All");
  const [selectedCemetery, setSelectedCemetery] = useState("All");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const router = useRouter();

  const [surname, setSurname] = useState("");

  useEffect(() => {
    fetch("https://uat.scchs.co.in/api/counties")
      .then((res) => res.json())
      .then((data) => setCounties(data));

    fetch("https://uat.scchs.co.in/api/cemeteries")
      .then((res) => res.json())
      .then((data) => {
        setCemeteries(data);
        setFilteredCemeteries(data);
      });
  }, []);

  useEffect(() => {
    if (selectedCounty === "All") {
      setFilteredCemeteries(cemeteries);
    } else {
      const normalizedCounty = selectedCounty.toLowerCase().trim();
      setFilteredCemeteries(
        cemeteries.filter((cemetery) => {
          const countyStr = String(
            typeof cemetery.county === "object"
              ? cemetery.county?.name
              : cemetery.county || ""
          )
            .toLowerCase()
            .trim();

          return countyStr === normalizedCounty;
        })
      );
    }
  }, [selectedCounty, cemeteries]);

  useEffect(() => {
    let records = selectedCemetery === "All"
      ? filteredCemeteries
      : filteredCemeteries.filter(
        (c) => c.name.toLowerCase().trim() === selectedCemetery.toLowerCase().trim()
      );

    setTotalRecords(records.length);
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    setFilteredRecords(records.slice(start, end));
  }, [selectedCemetery, filteredCemeteries, currentPage, resultsPerPage]);

  // const handleSearch = () => {
  //   if (surname.trim()) {
  //     router.push(`/searchsurname?surname=${surname}`);
  //   }
  // };

  const handleSearch = () => {
    if (surname.trim()) {
      // Agar user ne specific cemetery select ki hai, toh uske hisaab se redirect karo
      if (selectedCemetery !== "All") {
        // Find selected cemetery object to get its id
        const cemeteryObj = filteredCemeteries.find(
          (c) => c.name.toLowerCase().trim() === selectedCemetery.toLowerCase().trim()
        );
        if (cemeteryObj && cemeteryObj.id) {
          router.push(
            `/searchsurname?surname=${encodeURIComponent(surname)}&cemetery_id=${cemeteryObj.id}`
          );
          return;
        }
      }
      // Agar "All" hai toh purane tarike se redirect karo (all cemeteries)
      router.push(`/searchsurname?surname=${encodeURIComponent(surname)}`);
    }
  };

  const handlePerPageChange = (e) => {
    setResultsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageJump = (e) => {
    setCurrentPage(parseInt(e.target.value));
  };

  const totalPages = Math.ceil(totalRecords / resultsPerPage);
  const start = (currentPage - 1) * resultsPerPage + 1;
  const end = Math.min(start + resultsPerPage - 1, totalRecords);


  // ===============alphabatic cementry record===========
  // const groupedCemeteries = {};

  // filteredRecords
  //   .sort((a, b) => a.name.localeCompare(b.name))
  //   .forEach((cemetery) => {
  //     const trimmedName = cemetery.name.trim();
  //     const firstChar = trimmedName.charAt(0).toUpperCase();

  //     const isAlpha = /^[A-Z]$/.test(firstChar); // Check A-Z
  //     const key = isAlpha ? firstChar : '#';     // Group invalid under '#'

  //     if (!groupedCemeteries[key]) {
  //       groupedCemeteries[key] = [];
  //     }

  //     groupedCemeteries[key].push(cemetery);
  //   });

  const groupedCemeteries = {};
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (const letter of alphabet) {
    groupedCemeteries[letter] = [];
  }

  filteredRecords
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((cemetery) => {
      const trimmed = cemetery.name.trim();
      const first = trimmed.charAt(0).toUpperCase();
      const isAlpha = /^[A-Z]$/.test(first);
      const key = isAlpha ? first : "#";
      if (!groupedCemeteries[key]) groupedCemeteries[key] = [];
      groupedCemeteries[key].push(cemetery);
    });


  return (
    <div className="page_shopping_list sop">
      <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />
      <HeadSEO1 />

      <div className="event_system_main event_system_main1">
        <div className="event_main">
          <div className="cemetery-record">
            <div className="cemetery-wrapper">

              <div className="cemetery-header">
                <div className="filters-left">
                  <select
                    value={selectedCounty}
                    onChange={(e) => setSelectedCounty(e.target.value)}
                  >
                    <option value="All">Filter List by County / Region</option>
                    {counties.map((county) => (
                      <option key={county.id} value={county.name}>
                        {county.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCemetery}
                    onChange={(e) => setSelectedCemetery(e.target.value)}
                  >
                    <option value="All">Select Cemetery</option>
                    {filteredCemeteries.map((cemetery) => (
                      <option key={cemetery.id} value={cemetery.name}>
                        {cemetery.name}
                      </option>
                    ))}
                  </select>

                  <div className="surname-search">
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Search for Surname"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                    />
                    <button onClick={handleSearch}>🔍</button>
                    <button
                      style={{ marginLeft: "10px" }}
                      className="cemetery-clear-btn"
                      onClick={() => setSurname("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="filters-right">
                  <div className="dropdown-group">
                    <label>Results Per Page</label>
                    <select value={resultsPerPage} onChange={handlePerPageChange}>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  <div className="dropdown-group">
                    <label>Jump to Page</label>
                    <select value={currentPage} onChange={handlePageJump}>
                      {[...Array(totalPages)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="listing-info">
                    Listing : <strong>{start} to {end}</strong> of {totalRecords}
                  </div>
                </div>
              </div>

              <div className="cemetery-list">
                {/* {filteredRecords.map((cemetery) => (
                  <div className="cemetery-item" key={cemetery.id}>
                    <h3>{cemetery.name}</h3>
                    <div className="cemetery-links">
                      <Link style={{ border: '1px solid #9d0030', padding: '5px 10px', color: '#9d0030', fontSize: '13px', textDecoration: 'none', borderRadius: '3px' }} className="opens" href={`/cementrydetail?id=${cemetery.id}`}>View Cemetery Details</Link> {" "}
                      <Link style={{ border: '1px solid #00305b', padding: '5px 10px', color: '#00305b', fontSize: '13px', textDecoration: 'none', borderRadius: '3px' }} className="openss" href={`/cementrytable?id=${cemetery.id}`}>View Cemetery Records</Link>
                    </div>
                    {cemetery.short_description && (
                      <p dangerouslySetInnerHTML={{ __html: cemetery?.short_description }} />
                    )}
                  </div>
                ))} */}
                {Object.keys(groupedCemeteries)
                  .sort()
                  .map((letter) => (
                    <div key={letter}>
                      {/* <h2 style={{ marginTop: '30px', color: '#00305b' }}>{letter}</h2> */}

                      {groupedCemeteries[letter].map((cemetery) => (
                        <div className="cemetery-item" key={cemetery.id}>
                          <h3>{cemetery.name}</h3>
                          <div className="cemetery-links">
                            <Link
                              style={{
                                border: '1px solid #9d0030',
                                padding: '5px 10px',
                                color: '#9d0030',
                                fontSize: '13px',
                                textDecoration: 'none',
                                borderRadius: '3px',
                              }}
                              className="opens"
                              href={`/cementrydetail?id=${cemetery.id}`}
                            >
                              View Cemetery Details
                            </Link>{" "}
                            <Link
                              style={{
                                border: '1px solid #00305b',
                                padding: '5px 10px',
                                color: '#00305b',
                                fontSize: '13px',
                                textDecoration: 'none',
                                borderRadius: '3px',
                              }}
                              className="opens"
                              href={`/cementrytable?id=${cemetery.id}`}
                            >
                              View Cemetery Records
                            </Link>
                          </div>
                          {cemetery.short_description && (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: cemetery?.short_description,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

              </div>
            </div>

            <style jsx>{`
  .cemetery-wrapper {
    background: white;
    padding: 20px;
  }


 .cemetery-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  background: #fafafa;
  padding: 20px;
  border-radius: 10px;
}

.filters-left {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex: 1;
  align-items: center;
}

.filters-left select,
.surname-search input {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
}

.surname-search {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.surname-search input {
  border: none;
  outline: none;
  flex: 1;
  padding: 10px 12px;
  min-width: 220px;
}

.surname-search button {
  background: #9d0030;
  color: white;
  padding: 10px 14px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  height: 100%;
}

.filters-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  background: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #eee;
}

.dropdown-group {
  display: flex;
  flex-direction: column;
}

.dropdown-group label {
  font-size: 13px;
  margin-bottom: 4px;
  color: #333;
}

.dropdown-group select {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #9d0030;
  border-radius: 6px;
  background-color: #fff;
  min-width: 80px;
  color: #000;
}

.listing-info {
  font-size: 14px;
  color: #333;
}

  .cemetery-list {
    border-top: 1px solid #eee;
    padding-top: 20px;
  }

  .cemetery-item {
    background-color: #fafafa;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #e4e4e4;
  }

  .cemetery-item h3 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #222;
  }

  .cemetery-links {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

/* All buttons base style */
.cemetery-links a {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s ease;
  background-color: #fff;
}
.opens{
   border: 1px solid #9d0030;
   padding: 10px;
  }

/* First button (View Cemetery Details) */
.cemetery-links a:first-child {
  color: #9d0030;
  border: 1px solid #9d0030;
}

/* Other buttons (View Cemetery Records or more) */
.cemetery-links a:not(:first-child) {
  color: #000;
  border: 1px solid red;
}

.cemetery-links a:hover {
  background-color: #f2f2f2;
}




  .cemetery-item p {
    font-size: 14px;
    color: #444;
  }

  @media (max-width: 600px) {
    .cemetery-header {
      flex-direction: column;
    }
  .filters-left,
  .filters-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

    .cemetery-links {
      flex-direction: column;
      align-items: flex-start;
    }
      .surname-search {
    width: 100%;
  }

  .surname-search input {
    width: 100%;
  }

  .filters-right {
    align-items: flex-start;
  }
  }

  @media (max-width: 536px) {
  .cemetery-header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .filters-left,
  .filters-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .filters-left select,
  .surname-search input,
  .surname-search button,
  .dropdown-group select {
    width: 100%;
  }

  .surname-search {
    flex-direction: row;
    width: 100%;
  }

  .surname-search input {
    flex: 1;
    min-width: 0;
  }

  .surname-search button {
    width: 48px;
    flex-shrink: 0;
  }

  .filters-right {
    padding: 15px;
  }

  .listing-info {
    font-size: 13px;
    text-align: left;
  }

  .dropdown-group {
    width: 100%;
  }

  .dropdown-group select {
    width: 100%;
  }
}

`}</style>
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
