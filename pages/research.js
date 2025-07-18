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


const records = [
  {
    title: "Baue Funeral Home Records Index - IN PROCESS",
    description: "The Baue Funeral Home Records Index is a searchable database of individuals who were served by Baue Funeral Home. The database includes information such as name, date of death, and burial location. Records currently include only last name, first name, death date, and funeral home record number.",
    updated: "22 November 2023",
    category: "Obituaries",
    link: "/cementry-records"
  },
  {
    title: "Burial or Removal Permits",
    description: "A Burial or Removal Permit is a legal document issued by the government that authorizes the burial or removal of a deceased person's body. It is an important document used in the funeral and burial process to ensure that all legal and health requirements are met. Burial or Removal Permits are usually issued by the local government agency responsible for vital records, such as a city or county health department. These permits are required before a body can be buried, cremated, or transported across state or international borders. The permit includes important information such as the name of the deceased, date and place of death, cause of death, and the name and address of the funeral home or other person responsible for the burial or removal. It may also include information about the location of the burial or cremation. Burial or Removal Permits are an important source of information for genealogists and family historians. They can provide valuable clues about an ancestor's death and final resting place, and may help researchers locate other records such as death certificates, obituaries, and cemetery records.",
    updated: "15 July 2016",
    category: "City/State/Federal Records",
    link: "/Br-permit"
  },
  {
    title: "Burials By Church - All Saints",
    description: "This index of old St. Charles churches is offered as a finding tool. While the actual records are held by the individual churches, St. Charles County Historical Society has indexes of these church records which will include more information for you; typical information might be the names of the deceased, burial date, and cause of death. Sometimes information about the deceased's family is given. If you see your family name listed in a church's burial records, you may want to also check the entire index of that church for marriage and burial information. Locating their church may pinpoint the region of St. Charles County where your family resided.",
    updated: "08 November 2023",
    category: "Church Records",
    link: "/Burials-By-Church"
  },
  {
    title: "Business & Industry Files Index",
    description: "Business & Industry Files Index contains historical records and documents related to local businesses and industries in the region. This index serves as a reference tool for researchers interested in the commercial history and development of the area.",
    updated: "26 March 2021",
    category: "City/State/Federal Records",
    link: "https://uat.scchs.co.in/backend/admin/media/Business%20%26%20Industry%20Files%20Index/Business%20%26%20Industry%20Files%20Index.pdf"
  },
  {
    title: "Cemeteries in St. Charles County",
    description: "",
    updated: "10 May 2022",
    category: "Cemeteries",
    link: "/saint_charles_cemeteries.pdf"
  },
  {
    title: "Cemetery Records (St. Charles County)",
    description: "",
    updated: "10 May 2022",
    category: "Cemeteries",
    link: "/cementryrecord"
  },
  {
    title: "Census, St. Charles County, 1876",
    description: "This record includes information collected during the 1876 census for St. Charles County, Missouri. It offers insights into households, residents, occupations, and more.",
    updated: "10 May 2022",
    category: "Cemeteries",
    link: "/census"
  },
  {
    title: "Circuit Court Index 1805-1893",
    description: "An index of Circuit Court records from 1805 through 1893, including legal filings, decisions, and other documentation.",
    updated: "08 November 2023",
    category: "City/State/Federal Records",
    link: "https://s1.sos.mo.gov/records/archives/archivesdb/JudicialRecords/"
  },
  {
    title: "Deed Records Related To Smith Chapel Cemetery",
    description: "These are land deed records that pertain specifically to Smith Chapel Cemetery and its property transactions over time.",
    updated: "07 August 2020",
    category: "Cemeteries",
    link: "/deeprecord"
  },
  {
    title: "Family Files",
    description: "The Family Files are compiled genealogies and research notes organized by family surname. These records are useful for tracing lineage, local family histories, and relationships between community members.",
    updated: "20 March 2024",
    category: "Family History",
    link: "https://uat.scchs.co.in/backend/admin/media/Family%20Files/Family%20Files.pdf"
  },
  {
    title: "Family Search",
    description: "FamilySearch is a free service provided by The Church of Jesus Christ of Latter-day Saints. It offers access to billions of historical records, family trees, and genealogical resources.",
    updated: "18 May 2024",
    category: "Cemeteries",
    link: "https://www.familysearch.org/en/united-states/"
  },
  {
    title: "Find-A-Grave",
    description: "Find A Grave is an online database of cemetery records that provides information about the final resting places of individuals. It often includes birth and death dates, photos, obituaries, and family links.",
    updated: "18 May 2024",
    category: "Cemeteries",
    link: "https://www.findagrave.com/"
  },
  {
    title: "Guardian Books",
    description: "Guardian books contain legal documentation related to guardianship appointments, including guardians of minors and incapacitated adults. These are helpful in legal and genealogical research.",
    updated: "23 April 2016",
    category: "Family History",
    link: "/guardian-book-search"
  },
  {
    title: "Land and Property Record by Last Name",
    description: "An indexed collection of land and property records organized by surname. This index allows users to quickly find transactions or ownership data linked to family names.",
    updated: "13 January 2021",
    category: "City/State/Federal Records",
    link: "/land-and-property"
  },
  {
    title: "Land and Property Records by Year",
    description: "A chronological listing of land and property transactions and records for St. Charles County, sorted by year of occurrence.",
    updated: "13 January 2021",
    category: "City/State/Federal Records",
    link: "/land-and-property 1"
  },
  {
    title: "Marriage Index 1805-1858",
    description: "A compiled index of marriage records from 1805 to 1858 in St. Charles County, providing names, dates, and references to official documentation.",
    updated: "31 July 2020",
    category: "Marriages",
    link: "/marriage1"
  },
  {
    title: "Marriages by Church",
    description: "A listing of marriages performed in churches, organized by the church name. This helps locate church-based wedding records for genealogical purposes.",
    updated: "26 March 2021",
    category: "Church Records",
    link: "/marriages-by-church"
  },
  {
    title: "McElhiney Olson Historical Newspaper Articles Index",
    description: "This index catalogues historical newspaper articles collected by McElhiney Olson, covering events, people, and places of interest in the local area.",
    updated: "7 May 2021",
    category: "Newspapers",
    link: "https://uat.scchs.co.in/backend/admin/media/New_data/St.%20Charles%20County%20Historical%20Society%20-%20McElhiney%20Olson%20Index.pdf"
  },
  {
    title: "Missouri Death Certificates",
    description: "Death certificates from Missouri, containing vital information including cause of death, residence, burial place, and family data.",
    updated: "18 February 2025",
    category: "Marriages",
    link: "https://s1.sos.mo.gov/Records/Archives/ArchivesMvc/"
  },
  {
    title: "Naturalization Records",
    description: "These records document the process by which immigrants became United States citizens. They can include declarations of intent, petitions, and oaths of allegiance.",
    updated: "23 April 2016",
    category: "City/State/Federal Records",
    link: "/naturalization-records"
  },
  {
    title: "Obituaries",
    description: "A growing collection of obituary notices from local newspapers and funeral homes, indexed for genealogical reference.",
    updated: "23 April 2016",
    category: "Obituaries",
    link: "/obituaries"
  },
  {
    title: "Online Catalog",
    description: "Our online catalog allows visitors to search our full archival database of items, records, photographs, and documents housed by the Historical Society.",
    updated: "26 June 2016",
    category: "Past Perfect Online",
    link: "/checkout"
  },
  {
    title: "Probate Records",
    description: "Probate records include wills, estate inventories, and court proceedings for the distribution of a deceased person's property. Useful for understanding family relationships and property holdings.",
    updated: "15 July 2016",
    category: "City/State/Federal Records",
    link: "/Probate Records"
  },
  {
    title: "Recorder of Deeds and Assessor Office Search (Video)",
    description: "This video tutorial explains how to navigate the Recorder of Deeds and Assessor Office’s online tools to locate land, property, and ownership information.",
    updated: "1 March 2025",
    category: "City/State/Federal Records",
    link: "https://www.youtube.com/watch?v=wPNwPRSJYRk"
  },
  {
    title: "Selected Church Baptisms",
    description: "A selection of baptism records collected from various churches in St. Charles County. These include names, dates, and church locations.",
    updated: "23 April 2016",
    category: "Church Records",
    link: "/Church-Baptisms"
  },
  {
    title: "Sibley Diary 1844-1855",
    description: "The Sibley Diary offers a glimpse into life in mid-19th century Missouri, detailing events, personal reflections, and historical context.",
    updated: "15 July 2016",
    category: "Cemeteries",
    link: "https://uat.scchs.co.in/backend/admin/media/hisrical_record/St.%20Charles%20County%20Historical%20Society%20-%20Sibley%20Diary%201844-1855.pdf"
  },
  {
    title: "Stillbirths",
    description: "These records document stillbirths in the region and include names (if known), parents, and burial locations. They are important for genealogical completeness.",
    updated: "23 April 2016",
    category: "City/State/Federal Records",
    link: "https://uat.scchs.co.in/backend/admin/media/Stillbirths.pdf"
  },
  {
    title: "Subject/Topic Files",
    description: "These files contain newspaper clippings, research notes, and references organized by topic such as schools, military, or local events.",
    updated: "26 March 2021",
    category: "City/State/Federal Records",
    link: "https://uat.scchs.co.in/backend/admin/media/St.%20Charles%20County%20Historical%20Society%20-%20Subject_Topic%20Files.pdf"
  },
  {
    title: "World War II Marriages",
    description: "This index includes marriages that occurred during World War II, providing details such as names, dates, and officiating institutions.",
    updated: "23 April 2016",
    category: "Marriages",
    link: "/world-war"
  }
];




const itemsPerPage = 3;
export default function research(pageProp) {

  // const [currentPage, setCurrentPage] = useState(1);

  // const categories = [...new Set(records.map(item => item.category))];

  // const totalPages = Math.ceil(records.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = records.slice(startIndex, startIndex + itemsPerPage);

  const categories = [...new Set(records.map(item => item.category))];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [appliedCategory, setAppliedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter records based on applied category
  const filteredRecords = appliedCategory
    ? records.filter(record => record.category === appliedCategory)
    : records;

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryApply = () => {
    setAppliedCategory(selectedCategory);
    setCurrentPage(1);
  };

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="page_shopping_list sop">
      <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

      <HeadSEO1 />

      <div className="schss_research">
        <div className="schss_research_inner">
          <h2>SCCHS Research</h2>
          <div className="rest_para">
            <p>
              The <span>St. Charles County Historical Society's</span> Archives has an extensive collection of County and City records. Over the years, a number of the research items have been indexed by various volunteers to enable researchers to more readily locate information for genealogical or family history.
            </p>
            <p>
              Please note that the <span>original documents</span> referenced by the indexes on our website are not available online.  For more information about an original document please submit a <Link href={"/contact-us"}><span className="research_req">RESEARCH REQUEST.</span></Link>
            </p>
          </div>
        </div>
      </div>

      <div className="event_system_main event_system_main1">
        <div className="event_main">
          <div className="memberList_filter research_filter" >
            <div className="event-title-filter memberlist-title-filter res-title-filter">
              <div className="custom_drop">
                <select value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)} className="dropdown small">
                  <option value="">All Categories</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              {/* <span className="for-label">FOR:</span>
                            <input type="text" className="search-input" /> */}
              <button onClick={handleCategoryApply} className="search-button">
                <img width="28" src="https://res.cloudinary.com/dgif730br/image/upload/v1744279927/Mask_group_zicocm.png" alt="this is search image" />
              </button>
            </div>

            {/* <div className="filters-right">
              <div className="listing">
                <label>Listing Per Page</label>
                <div className="custom_drop custom_drop1">
                  <select className="dropdown small">
                    <option>50</option>
                  </select>
                </div>
              </div>


              <div className="listing">
                <label>Jump to Page</label>
                <div className="custom_drop custom_drop1">
                  <select className="dropdown small">
                    <option>50</option>
                  </select>
                </div>
              </div>

            </div> */}

          </div>
          <div className="record-box-section">
            {currentItems.map((record, index) => (
              <div key={index} className="record-box-card">
                <h2 className="record-box-title">{record.title}</h2>
                <p className="record-box-description">{record.description}</p>
                <div className="record-box-meta">
                  <span className="record-box-updated">
                    <strong>Last Updated:</strong> {record.updated}
                  </span>
                  <span className="record-box-separator">|</span>
                  <span className="record-box-category">
                    <strong>Located in Category:</strong> {record.category}
                  </span>
                </div>
                <Link href={`${record?.link}`}><button className="record-box-button">More</button></Link>
              </div>
            ))}
            <div className="custom-pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => handleClick(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="page-btn next-btn1"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span style={{ color: "#333" }}>Next</span>
                <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
                </svg>

              </button>
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