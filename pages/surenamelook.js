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


// const records = [
//     { surname: 'Alferman', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1801', end: '1960', city: 'St. Charles', alt: 'Alfermann', Notes: '' },
//     { surname: 'Altman', county: 'St Charles', state: 'MO', country: 'USA', begin: '1860', end: '1870', city: 'Portage Des Sioux', alt: 'Aultman, Altmann', Notes: 'John Lewis Altman died Sep 20 1863 (born 1827 in Germany) leaving behind wife, Mary Catherine and sons, James Andrew, Emanuel Charles, Henry Martin, Samuel Frederick and John William. Searching for burial site for John Lewis and any other records on this family. John L. Altman and family was living in Portage Des Sioux in 1860 census and he served under Capt Windmullers Co K Homeguard in civil war. John William died in Elsah in 1883 and was a very prominent figure there. Announcement of probate 15 Oct 1863 (I have the probate but no will) in the St. Charles Democrat newspaper. Witnesses: Chas E. Hess, Ben H. Payne, August Westerfeld' },
//     { surname: 'Amptmann', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1800', end: '1950', city: 'Josephsville', alt: 'Amptman,Aumptman,Amtman', Notes: '' },
//     { surname: 'Amrein', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1834', end: '2017', city: 'St. Charles, St. Peters', alt: 'Amrine, Emerine, Amrene', Notes: '' },
//     { surname: 'Arens', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: 'Ahrens', Notes: '' },
//     { surname: 'Arens', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Arth', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1853', end: '', city: 'St. Charles', alt: 'Art', Notes: 'Anton Arth was born 8 Mar 1817 in Eberbach, Alsace, France and died 24 Mar 1865. A farmer, He and his wife and their 5 children arrived in New Orleans aboard the ship "Old England," on 17 Mar 1853. In St. Charles County, they added another four children to their family.' },
//     { surname: 'arth', county: 'st. charles', state: 'MO', country: '', begin: '1850', end: '1900', city: 'st. charles', alt: '', Notes: '' },
//     { surname: 'Ashby', county: 'ST. Charles', state: 'Missouri', country: '', begin: '1810', end: '1900', city: 'Defiance', alt: '', Notes: '' },
//     { surname: 'Auchli', county: 'St. Charles', state: 'Missouri', country: '', begin: '1834', end: '1900', city: '', alt: 'Auchligh, Auchley, Auchlay, Auchly', Notes: 'descendants of Anton and Maria (Termund) Auchli' },
//     {
//         surname: 'Audrain', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1816', end: '', city: '', alt: '', Notes: `James Hutner Audrain (1781-1830) brought his family by flatboat up the Mississippi to St. Charles County in 1816, settling on Peruque Creek in Dardenne Township. There he operated an inn described as "14 miles west of St. Charles at Peruque, on the road from Boone's Lick to Salt River." He also built a mill driven by young bulls and a distillery. (His land was in Sections 17 and 20, lying on both sides of what is now Highway P, near the present entrance to Dames Park on the outskirts of O'Fallon.
// He was one of the first Justices of the Peace appointed in Lower Cuivre Township, St. Charles County, after Missouri was admitted into the Union as a state. In 1825 and 1826 he served as St. Charles County Judge. He was elected to the state legislature, and served in the 8th District, State Senate, in 1828 and 1830. He was suddenly taken ill while visiting at the home of Governor William Clark in St. Louis and died there on 19 Nov 1830. When the Missouri county of Audrain was organized in 1836 it was named in his honor.` },
//     { surname: 'Baldridge', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: 'St. Charles', alt: '', Notes: 'Joseph Logan Baldridge was born about 1805 or 1806 in North Carolina, Tennessee or Missouri. There are conflicting genealogies for him that state his mother as either Christine Hoffman or Rebecca Douglas. Father is possibly Daniel Baldridge or Daniel Baldridge Jr. Joseph Logan Baldridge married Mary Ann Gosney is St. Charles in 1832, and he died in St. Charles on April 8, 1889.' },
//     { surname: 'Barnes', county: 'Lincoln', state: 'Missouri', country: 'USA', begin: '', end: '', city: 'Troy', alt: '', Notes: '' },
//     { surname: 'beckmann', county: 'St Charles', state: 'MO', country: '', begin: '1840', end: '', city: 'St Paul', alt: '', Notes: '' },
//     { surname: 'Berry', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Besterfeldt', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1851', end: '1900', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Beumer', county: '', state: '', country: '', begin: '', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Bezzenberger', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1850', end: '1900', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Bloebaum', county: 'Saint Charles', state: 'Mo', country: '', begin: '1846', end: '2000', city: 'Saint Charles', alt: '', Notes: '' },
//     { surname: 'Bloebaum', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'boeding', county: 'St Charles', state: '', country: '', begin: '1840', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Boettler', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Boone', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1725', end: '1799', city: 'Defiance', alt: '', Notes: '' },
//     { surname: 'Boone', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1800', end: '', city: '', alt: '', Notes: 'Daniel Boone & Rebecca Bryan = Earliest ancestors to St Charles District' },
//     { surname: 'Borgilt', county: 'St. Charles', state: '', country: 'USA', begin: '1830', end: '2018', city: 'St. Charles', alt: 'Borgmeier', Notes: 'Borgelt, Borgeld' },
//     { surname: 'Borgmeyer', county: '', state: 'Missouri and Minnesota', country: '', begin: '', end: '', city: '', alt: 'Borgmeier', Notes: '' },
//     { surname: 'Boschert', county: 'St Charles County', state: 'MO', country: '', begin: '1831', end: '1900', city: '', alt: 'Boshert', Notes: 'descendants of David and (Josephine (Distelzweig) Boschert. We are especially interested in their son Ignatz and his wife Mary Josephine (Auchli) Boschert.' },
//     { surname: 'Bowen', county: 'Cape May & Cumberland & Salem', state: 'New Jersey', country: 'United States', begin: '1825', end: '1921', city: '', alt: 'Leonora or Lenora Bowen married John Sims', Notes: '' },
//     { surname: 'Brent', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Bricker', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: '	St. Charles', alt: '', Notes: '' },
//     { surname: 'Bricker', county: 'Lincoln', state: 'Missouri', country: 'USA', begin: '', end: '', city: '	Troy', alt: '', Notes: '' },
//     { surname: 'Brinkmann', county: 'Missouri', state: 'Missouri', country: 'United States', begin: '1860', end: '', city: 'Old Monroe', alt: '', Notes: 'Brinkmann, Herman Heinrich  settled in Old Monroe, had 3 sons Frederick, August and Herman Heinrich.Herman Heinrich is the father of Kermit Brinkmann and grandfather to Gary Neil Brinkmann (my husband).' },
//     { surname: 'Broadwater', county: 'Missouri', state: 'Missouri', country: 'United States', begin: '1825', end: '1940', city: 'St Charles', alt: 'Brodwater, Broadwaters, Bradwater, Broodwater', Notes: 'Descendant of Charles M. Broadwater 1827-1884 who migrated from Edgefield SC in 1852 to Russell County, AL. I grew up in AL, moved to MO in 1964; unable to locate origins for Charles M but several Ancestry trees show Charles Henry Broadwater to be the father to Charles M. Would be interesting to find if that is so.' },
//     { surname: 'Brown', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1840', end: '', city: '', alt: 'Braun', Notes: 'Franz Henry Brown & Anna Margarette Hofflander = Earliest Ancestors' },
//     { surname: 'Bruns', county: 'Saint Charles', state: 'Missouri', country: 'United States', begin: '1830', end: '2020', city: 'Saint Charles', alt: '', Notes: '' },
//     { surname: 'Buerges', county: '', state: 'Missouri', country: '', begin: '', end: '', city: 'St Charles', alt: '', Notes: '' },
//     { surname: 'Bull', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Burgemeister', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1839', end: '', city: '', alt: 'Burgermeister', Notes: 'Jacob Burgemeister & Christina Katarina Kirchhoff = Earliest Ancestors' },
//     { surname: 'Callaway', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1800', end: '', city: '', alt: '', Notes: 'Flanders Callaway & Jemima Boone = Earliest ancestors to St Charles District' },
//     { surname: 'Capps', county: 'Lincoln', state: 'Missouri', country: 'USA', begin: '', end: '', city: 'Troy', alt: '', Notes: '' },
//     { surname: 'Caraker', county: '', state: 'Missouri', country: '', begin: '', end: '', city: 'Cape Girardeau', alt: '', Notes: '' },
//     { surname: 'Clouting', county: 'Cape May', state: 'New Jersey', country: 'United States', begin: '1829', end: '1916', city: '', alt: 'Clouding, Clowting, Cloutin', Notes: '	Geroge married  Sarah S. Wilets.  Henry from England.' },
//     { surname: 'Conoyer', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: 'Cornoyer, Knarr', Notes: '' },
//     { surname: 'Corson', county: 'Cape May', state: 'New Jersey', country: 'United States', begin: '1690', end: '1861', city: '', alt: 'Carson, Carstenson, Jansen', Notes: 'Patronymic naming.   Ellen Corson married Edmund Townsend, Joseph Corson married Harriet Gandy, Parmenas Corson married Mary Lee, Jacob Corson married Charity Stillwell-all NJ.' },
//     { surname: 'Cox', county: 'Monmouth & Hunterdon', state: 'New Jersey', country: 'United States', begin: '1713', end: '1875', city: '', alt: 'Coxe', Notes: 'Morgan R. Cox married Mary B. Rittenhouse,    Anna Cox married Henry Y. Willets,  Joseph Cox married Mary Mount,  James Cox married Ann Potts' },
//     { surname: 'Delger', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: 'St Charles', alt: '', Notes: '' },
//     { surname: 'Denker', county: 'St Charles', state: 'MO', country: 'USA', begin: '1840', end: '2023', city: 'St Charles', alt: '', Notes: '' },
//     { surname: 'Doll', county: '', state: '', country: '', begin: '1850', end: '1910', city: 'Saint Charles', alt: '', Notes: '' },
//     { surname: 'Doll', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: 'St. Peters', alt: '', Notes: '' },
//     { surname: 'Dorlaque', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: 'Dorlac', Notes: '' },
//     { surname: 'Dove', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '	Doewe', Notes: '' },
//     { surname: 'Drummond', county: 'Philadelphia', state: 'Pennsylvania', country: 'United States', begin: '1807', end: '1919', city: 'Philadelphia', alt: 'Drummon, Drum', Notes: 'Thomas b. 1807 married 2nd Elizabeth Snee.  Mary Ann Drummond married Gregory F. Garcia abt. 1870.' },
//     { surname: 'Duncan', county: '', state: 'Kansas', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Ehlmann', county: 'St. Charles', state: 'MO', country: 'United States', begin: '', end: '', city: 'SAINT CHARLES', alt: '', Notes: '' },
//     { surname: 'Ehlmann', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Ermeling', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Farley', county: 'Amelia, Bedford', state: 'Virginia', country: 'USA', begin: '', end: '', city: '', alt: 'Farlor', Notes: 'Looking for verification of the parents of Obediah Farley, born in 1757 in Amelia Co., VA and died in 1836 in Shelby Co., AL.  He served five months in the Revolutionary War and applied for a Revolutionary War pension in 1832.  His pension was rejected because he had not served enough time to qualify.' },
//     { surname: 'Faulkner', county: 'New York', state: 'New York', country: 'United States', begin: '1790', end: '1860', city: 'New York City', alt: 'Falkner', Notes: 'Jacob married Kathrine Thompson, Eliza married Alpha Manning' },
//     { surname: 'Fetter', county: 'Saint Charles', state: 'Missouri', country: 'United States', begin: '1792', end: '2020', city: 'Saint Charles', alt: 'Vetter', Notes: '' },
//     { surname: 'Fluesmeier', county: 'ST. Charles', state: 'MO', country: '', begin: '1836', end: '2019', city: 'Femme Osage', alt: 'Fluesmeyer', Notes: '' },
//     { surname: 'Gannaway', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Gant', county: 'Warren and Saint Charles', state: 'Missouri', country: '', begin: '1840', end: '1923', city: '', alt: '', Notes: '' },
//     { surname: 'Garcia', county: 'Philadelphia', state: 'Pennsylvania', country: 'United States', begin: '1843', end: '1980', alt: 'Garza', city: 'Philadelphia', Notes: 'Gregory born abt 1843 in Cape Verde Island or the Canary Islands,  married Mary Anne Drummond..' },
//     { surname: 'Gaty', county: '', state: '', country: '', begin: '1798', end: '', city: '', alt: `Gayde, Garty, Gatti, Geety, Gattay, Getty, Gatty, Gatte George Gaty (1751-1826) was born in Valee Ditredo, Novaro Province, Piedmont, Italy. He arrived in Pennsylvania between 1775-1779. By 1779, he owned land in Manheim Township, York County, Pennsylvania. He worked as a tanner, and was described in Captain Blackwood's Company, as 5 feet 1/2 inch tall, with dark brown hair and a round face. He married Christiana Smith, and they had six children with the three youngest born in St. Charles. Christiana died shortly after the birth of the youngest, Angelique, in September, 1801, and the baby Angelique lived only two weeks.`, Notes: '' },
//     { surname: 'Giessmann', county: 'Saint Charles', state: 'MO', country: '', begin: '', end: '', city: '', alt: 'Giesman', Notes: '' },
//     { surname: 'Gosney', county: 'St. Charles', state: 'Missouri', country: '', begin: '', end: '', city: 'St. Charles', alt: '', Notes: 'Gabriel Gosney and his wife, Winnifred Burford Gosney, came to St. Charles County between 1830 and 1832, when his daughter Mary Ann married Joseph Logan Baldridge in St. Charles. Gabriel Gosney was enumerated by censuses in Cuivre Township and was a justice of the peace from 1857-60, according to the Circuit Court records. He died before March 19, 1873, when his will was admitted to probate.' },
//     { surname: 'Graham', county: 'St. Charles', state: 'Missouri', country: 'US', begin: '1850', end: '1900', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Grandehn', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1936', end: '1938', city: 'Wentzville', alt: 'Grandin, Grandhen', Notes: `Gustave Grandehn died on his farm 8 miles southwest of Wentzville on 10 May 1937. Looking for information on the Coroner's inquest.` },
//     { surname: 'groeblinghoff', county: 'St Charles', state: 'MO', country: 'USA', begin: '1848', end: '2023', city: `St Paul`, alt: '', Notes: '' },
//     { surname: 'Gronefeld', county: 'St. Charles County', state: '', country: '', begin: '', end: '', city: ``, alt: '', Notes: '' },
//     { surname: 'Haferkamp', county: 'St. Charles County', state: 'Missouri', country: 'USA', begin: '', end: '', city: `Augusta`, alt: '', Notes: '' },
//     { surname: 'Hahn', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: ``, alt: '', Notes: '' },
//     { surname: 'Hahn', county: 'St. Louis City and County', state: 'Missouri', country: 'USA', begin: '', end: '', city: ``, alt: '', Notes: '' },
//     { surname: 'Halbruegge', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1840', end: '1980', city: `St. Charles`, alt: 'Halbrugge', Notes: '' },
//     { surname: 'Halter', county: 'St. Charles County', state: 'Missouri', country: 'USA', begin: '1834', end: '2017', city: `O'Fallon, St Paul`, alt: 'Holder, Hatter', Notes: '' },
//     { surname: 'Harrison', county: '', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Haverkamp', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Hayden', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1837', end: '1960', city: 'St. Paul', alt: 'Haden', Notes: 'African American family associated with the William B. and James Rapier Hayden families.' },
//     { surname: 'HEITGERD', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1816', end: '1899', city: 'Harvester & Wentzville', alt: '', Notes: 'Johann Arndt/Arnold (Arnold) HEITGERD b. 1816 in Hahlen, Hanover, Germany.  Married Anna Maria BERDING in Menslage, Hanover, Germany.  Immigrated in 1845 and settled on a farm on Caulks Hill Road, Harvester.  Moved to Wentsville and died in 1899.  He is buried in Linn Cemetery, Lutheran section.' },
//     { surname: 'HEITGERD', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1844', end: '1915', city: 'Harvester', alt: '', Notes: 'Johann Herman HEITGERD born 1844 as recorded in the Menslage Church records.  Immigrated in 1845 with his parents.  Married Maria Louise KRUSE. Served in the Civil War--Home Guards.  Died in 1915 and is buried in Zion Lutheran Church Cemetery.' },
//     { surname: 'Heitgerd', county: 'MO', state: 'MO', country: 'United States', begin: '1850', end: '2024', city: 'SAINT CHARLES', alt: '', Notes: '' },
//     { surname: 'Henke', county: 'St. Charles', state: '', country: '', begin: '', end: '', city: 'Flint Hill', alt: '', Notes: '' },
//     { surname: 'Henry', county: 'St Charles', state: 'MO', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'hermann', county: 'st. charles', state: 'MO', country: '', begin: '1850', end: '1910', city: 'st. charles', alt: '', Notes: '' },
//     { surname: 'Hiesel', county: '', state: '', country: '', begin: '', end: '', city: '', alt: 'Hiesel, Hiessel, Hiessler, Hiesler, Huessler', Notes: '' },
//     { surname: 'Hoeber', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: 'Flint Hill', alt: '', Notes: '' },
//     { surname: 'Hoelscher', county: 'St. Charles County', state: '', country: '', begin: '', end: '', city: '', alt: '	Hoelsher, Holsher, Holscher,', Notes: '' },
//     { surname: 'Hoffmann', county: '', state: '', country: 'Germany', begin: '1815', end: '2021', city: '', alt: 'Hoffman', Notes: '' },
//     { surname: 'Hollrah', county: '', state: '', country: '', begin: '', end: '', city: 'St. Charles', alt: 'Holrah', Notes: 'Herman Gerhard (Gerhard) HOLLRAH b. 1797 in Hahlen, Germany. Immigrated in 1833.   Murdered by the Western Plank Road on Nov 1, 1854.  Buried in Friedens UCC Cemetery, St. Charles.' },
//     { surname: 'HOLLRAH', county: 'St. Charles', state: 'Missouri', country: '', begin: '1797', end: '1854', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Hollrah', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '2022', end: '2022', city: '', alt: '', Notes: 'Holtgrave' },
//     { surname: 'Holtgrawe', county: 'st. Charles County', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: 'Holtgrave' },
//     { surname: 'Howell', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1798', end: '', city: '', alt: '', Notes: 'Francis Howell & Susannah Stone = earliest ancestors' },
//     {
//         surname: 'Hunn', county: '', state: '', country: '', begin: '', end: '', city: '', alt: 'Huhn, Hahn', Notes: `Joseph Hunn b.1805 d. 1872 buried St. Joseph Cemetery in Josephville, MO came to America from Germany.
// Brothers Conrad, Martin and Michael and sister Maria also came.
// There children married into Boschert, Willott, Prinster, Schwendemann, and many more families in the St, Charles area.` },
//     { surname: 'Hutchings', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1812', end: '', city: '', alt: 'Hutchins', Notes: 'Christopher Hutchings & Rachel Pitman = Earliest ancestors' },
//     { surname: 'Hutchings', county: 'St Charles', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Iler', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1817', end: '', city: '', alt: 'Isler', Notes: `Members of the Iler family are included in the Missouri Territory Enumeration by 1817-1819, and in the list of St. Charles County tax records in 1823, 1824 and 1826 which includes the names of Daniel, John, Richard and William. Stephen Iler, born about 1806 "in Kentucky," was likely a son of one of these households, and owned 100 acres in Survey 1790 in Dardenne Township until his death on 30 Nov 1851. His first wife was Eleanor Van Burkleo, the daughter of William Van Burkleo and Eleanor Fallis. They had one son, Francis Marion Iler, before she died about 1830. He remarried on 8 Nov 1832 to Jane Robertson, the daughter of Isaac E. Robertson and Theresa Gaty. They had seven children.` },
//     { surname: 'Irwin', county: '', state: 'MIssouri', country: '', begin: '1880', end: '1893', city: '', alt: '', Notes: '' },
//     { surname: 'Jungermann', county: 'St Charles', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Kalb', county: 'St CharlesCounty', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Karle', county: 'St. Charles', state: 'Missouri', country: 'United States', begin: '1850', end: '1900', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Kasper', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Keller', county: 'ST. Charles', state: 'Missouri', country: '', begin: '1800', end: '1900', city: '', alt: '', Notes: '' },
//     { surname: 'Kersting', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: 'Josephville', alt: '', Notes: '' },
//     { surname: 'Kettelhake/Kettlehake', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Klinger', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1830', end: '1900', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Kluesner', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Kluesner', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Knoblauch Elmendorf', county: 'St Charles', state: 'missouri', country: 'usa', begin: '', end: '', city: 'St Charles', alt: '', Notes: '' },
//     { surname: 'Knoernschild', county: '', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: 'Knornschild', Notes: '' },
//     { surname: 'Koenigsfeld', county: 'Osage', state: 'Missouri', country: 'United States', begin: '1830', end: '2020', city: '', alt: '', Notes: '' },
//     { surname: 'Kruel', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Kuhlmann', county: 'St. Charles', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'LaBarge', county: '', state: '', country: 'United States', begin: '1750', end: '1925', city: 'Portage des Sioux', alt: 'LaBerge', Notes: '' },
//     { surname: 'Landwehr', county: 'St Charles', state: 'MO', country: '', begin: '', end: '', city: 'New Melle', alt: '', Notes: '' },
//     { surname: 'Lauber', county: 'St. Charles Cty; Lincoln Cty', state: 'MO', country: '', begin: '1864', end: '2017', city: 'Flint Hill, Josephville; St. C', alt: 'Lober; Laubor', Notes: '' },
//     { surname: 'Lloyd', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Lock', county: 'Osage', state: 'Missouri', country: 'United States', begin: '1830', end: '1820', city: '', alt: '', Notes: '' },
//     { surname: 'Lucas', county: '', state: 'Kansas', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Ludolph', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1820', end: '2017', city: 'St. Charles, St. Peters', alt: 'Lutolf; Luetholt; Lutolph, Luthorf', Notes: `Have been researching since middle 1980's,` },
//     { surname: 'LUERDING', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1834', end: '1900', city: 'St. Charles', alt: 'Lurding', Notes: 'Johann Bernhard Lurding/LUERDING  b. 1834 in Renslage, Hanover, Germany.  Immigrated 1853.  Died 1900 and buried in Immanuel Lutheran Cemetery. Married Maria Susanna RASSAU nee HOLLRAH' },
//     { surname: 'LUERDING', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1867', end: '1959', city: 'St. Charles', alt: '', Notes: 'Herman Dietrich LUERDING  married Maria Anna Alwina (Alwinma) HEITGERD.' },
//     { surname: 'Mader', county: '', state: 'Pennsylvania', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Manning', county: 'New York', state: 'New York', country: 'United States', begin: '1775', end: '1955', city: 'New York City', alt: 'Mannon, Mannin', Notes: 'Henry, Alpha - Vermont & Upstate NY;      Oscar-New York City, Philadelphia, PA;     Ida-Philadelphia, PA      Henry married Cinthia Sawyer, Alpha married Eliza Faulkner, Oscar married Roxanna Mott, Ida married Augustine Garcia. ' },
//     { surname: 'McDearmon', county: '', state: 'Missouri', country: '', begin: '1830', end: '1960', city: 'St. Charles.', alt: 'McDearman', Notes: '' },
//     { surname: 'McKay', county: 'Saint Charles', state: 'MO', country: '', begin: '1820', end: '', city: '', alt: 'McCay', Notes: '' },
//     { surname: 'Menton', county: 'St. Charles Cty; Lincoln Cty', state: 'MO CA', country: '', begin: '1865', end: '2017', city: 'Flint Hill, Josephville, St. C', alt: 'Manton; Minton; Menten', Notes: '' },
//     { surname: 'Mertens', county: 'Osage', state: 'Missouri', country: 'United States', begin: '1830', end: '2020', city: '', alt: '', Notes: '' },
//     { surname: 'Meyer', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Middleton', county: '', state: 'Missouri', country: '', begin: '', end: '', city: 'Des Arc', alt: '', Notes: '' },
//     { surname: 'Miller', county: 'Saint Charles', state: 'MO', country: '', begin: '1820', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Mispagel', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1850', end: '1920', city: '', alt: 'St. Charles', Notes: '' },
//     { surname: 'Moehlenkamp', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Moeller', county: 'St. Charles', state: '', country: 'USA', begin: '1830', end: '2018', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Moellering', county: 'St CharlesCounty', state: 'Missouri', country: '', begin: '1850', end: '1925', city: '', alt: 'Millering,', Notes: '' },
//     { surname: 'Moentmann', county: 'St. Charles', state: 'Missouri', country: '', begin: '', end: '', city: 'St. Charles', alt: 'Montmann', Notes: `Rudolf (or Rudolph) Moentmann was born in Germany in 1835 and came to the U.S. as a boy. According to his obituary, he fought for the Union in the Civil War, but not in the Grand Army of the Republic (suggesting possibly Home Guard). He married Anna Wilhelmine Stumberg, daughter of John H. Stumberg, in St. Louis in 1870, but they lived in St. Charles and were members of Immanuel Lutheran. His wife died in 1885 and he died in 1909. His relationship to another Rudolf Moentmann in St. Charles is not clear. The other Rudolf Moentmann was born about 1800 and was a founding member of Immanuel, but the younger Rudolf does not appear in any census as the elder's son, nor in the elder Rudolf's probate file. The younger Rudolf had only daughters, and almost certainly has no Moentmann descendants.` },
//     { surname: 'Morgan', county: 'Lincoln', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Mott', county: 'Philadelphia', state: 'Pennsylvania', country: 'United States', begin: '1748', end: '1923', city: 'Philadelphia', alt: 'Matt', Notes: 'Henry married Sarah Stanton, James married Elizabeth Gale, Allen married Evaline Mathis - all New Jersey' },
//     { surname: 'Mound', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1858', end: '', city: '', alt: 'Mounce', Notes: 'Andrew Mound & Salome Hutchings = Earliest Ancestors' },
//     { surname: 'Mound', county: 'St Charles', state: 'MO', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Muegge', county: 'St. Charles', state: 'MO', country: 'USA', begin: '', end: '', city: '	St. Charles', alt: 'Mugge', Notes: '' },
//     { surname: 'Muschany', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1840', end: '2018', city: 'Howell', alt: 'Mushany, Muschaney, Muschani', Notes: '' },
//     { surname: 'Nadler', county: '', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Nolle', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Obering', county: 'St. Charles', state: 'Mo', country: 'US', begin: '', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     { surname: 'Ohmes', county: 'St. Charles Cty; Lincoln Cty', state: 'Missouri', country: '', begin: '1835', end: '2017', city: 'St. Charles, St. Peters', alt: 'Ohms', Notes: 'Coninuously researching this last name.' },
//     { surname: 'Oldenburg', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Olson', county: 'St Charles', state: 'Mo', country: '', begin: '', end: '', city: 'St Charles', alt: '', Notes: '' },
//     { surname: 'Orrick', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Peters', county: 'USA', state: 'Missouri', country: 'USA', begin: '1839', end: '', city: 'St Charles', alt: 'Petter', Notes: 'Jacob Petters & Margaretha Farber = Earliest Ancestors' },
//     { surname: 'Pitman', county: 'St. Charles', state: 'MO', country: 'United States', begin: '1700', end: '1946', city: 'Howell', alt: 'Pittman', Notes: '' },
//     { surname: 'Pitman', county: 'St Charles', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Powell', county: 'Burllington', state: 'New Jersey', country: 'United States', begin: '1815', end: '1911', city: '', alt: 'Powel', Notes: 'Mary Ann.   Married Alfred Woodward.' },
//     { surname: 'Rehker', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1800', end: '1970', city: 'St. Charles', alt: '', Notes: '' },
//     {
//         surname: 'Robertson', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1817', end: '', city: '', alt: `Robinson Isaac Edward Robertson (ca 1780-1821) is named in one of the older land records in St. Charles County, apparently coming from Tywapity Township in New Madrid County in one of the post-1812 earthquake settlements. He may have been a family member of Edward Robertson who was known as a trader and merchant in Cape Girardeau and New Madrid County.`, Notes: `Isaac was a private in Nathan Boone's Rangers in 1812, and was an early land purchaser at Cote sans Dessein in Callaway County, Missouri. He purchased 100 arpents on "River Dardenne" from Peter and Brigitte Chouteau in May 1818. About 1812 he married Theresa Gaty (1794-before 1870), the daughter of George Gaty and Christina Smith. They had four children. Several years after his death, his widow married Lewellyn Turnbaugh (ca 1797-1835.)

// Isaac carried the U.S. mail from St. Charles to Louisiana and when he died 15 Jul 1821 was owed for "five trips at the rate of $400 per year."` },
//     { surname: 'Roth', county: 'St. Charles', state: 'MO', country: 'United States', begin: '1850', end: '1900', city: 'St. Charles', alt: 'Rhode', Notes: 'Earliest immigrant: Daniel Roth, married to Ursula. Descendant through his son, Augustus Roth, married to Barbara Schmidt.' },
//     { surname: 'ROTHER', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1899', end: '1987', city: 'St. Charles', alt: '', Notes: 'Henry Joseph ROTHER born in Moberly, Missouri on the 22 Feb 1899.  Married Flora Marie LUERDING in 1925.  Owned with partner, Jack Wetter, the Hackman Lumber Company.  Died July, 1987.  Buried in Immanuel Lutheran Cemetery.' },
//     { surname: 'ROTHER', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1926', end: '2008', city: 'St. Charles', alt: '', Notes: 'Dr. Paul H. ROTHER, Founding member of the Boonslick Medical Group. Died Aug 2008 and buried in Bellefontaine Cemetery, St. Louis.' },
//     { surname: 'Rowe', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: 'St. Charles', alt: '', Notes: '' },
//     {
//         surname: 'Ruenzi', county: 'Saint Charles', state: 'Missouri', country: 'United States', begin: '1820', end: '2020', city: 'Saint Charles', alt: `Rünzi, Runzi, Ruenzie, Reunzie 	
// Bernhard Fetter was appointed guardian of Thomas and Lawrence Ruenzi on  26 May, 1834 in St. Charles.
// https://www.familysearch.org/tree/person/LVJV-M8F
// (Found in notes at bottom of that page)
// Bernhard Fetter proportedly from Waltersweier, Baden-Wuttenberg (Prussia, born 1792). `, notes: `Thomas Ruenzi Find-A-Grave ID47772440 died in 1854.
// Wishing to learn and understand the Ruenzi and Fetter family history.  
// Did either of these families use or occupy the First State Capitol building.   Both names are found in censuses.   Their location is referenced as a tavern and inn. It's just not clear what the address is on the censuses found.
// Are there any newspaper articles about Thomas Ruenzi, Lawrence Ruenzi, Bernard Fetter (or Vetter), Victoria (Sachs), and Elizabeth Fetter.`
//     },
//     { surname: 'Rufkahr', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', notes: '' },
//     {
//         surname: 'Runkel', county: 'St Charles', state: 'MO', country: 'USA', begin: '1855', end: '1870', city: 'St Charles', alt: 'Ronkel', Notes: `	
// Helena Runkel and John Schnitzius, Jr were married in St Charles May 29, 1855.  They were in St Louis by 1858 where their first child was born, and then to Richwoods, Washington County by 1860 where their second child was born. ` },
//     { surname: 'saali', county: 'St. Charles Cty; Lincoln Cty', state: 'Missouri', country: '', begin: '1835', end: '2017', city: `St. Peters, St. Charles,O'Fal`, alt: 'sali; salee;', Notes: `Many Saali's in family` },
//     { surname: 'Sachs', county: 'Saint Louis', state: 'Missouri', country: 'United States', begin: '1792', end: '2020', city: 'Saint Louis', alt: '', Notes: '' },
//     { surname: 'Sandridge', county: '', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Schappe', county: 'St. Charles', state: 'MO', country: 'USA', begin: '', end: '', city: 'St. Peters', alt: 'Chaput, Chapue, Chappie, Schappie', Notes: '' },
//     { surname: 'Schellert', county: '', state: 'MO', country: 'USA', begin: '1865', end: '2017', city: 'Old Monroe;St. Louis', alt: 'Shellert', Notes: 'Has been researched back to generations in Germany' },
//     { surname: 'Scherer', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Scherr', county: 'Osage', state: 'Missouri', country: 'United States', begin: '1830', end: '2020', city: '', alt: '', Notes: '' },
//     { surname: 'Schlueter', county: 'St. Charles Cty; Lincoln Cty', state: 'MO', country: '', begin: '1865', end: '2017', city: 'Flint Hill, Josephville', alt: 'Schluter', Notes: '' },
//     { surname: 'Schmiemeier', county: 'St Charles', state: 'Missouri', country: '', begin: '1832', end: '1955', city: 'Saint Charles', alt: '', Notes: '' },
//     { surname: 'Schmiemeier', county: 'St. Charles County', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Schnitzius', county: 'St Charles', state: 'MO', country: 'USA', begin: '1843', end: '1870', city: 'St Charles', alt: '', Notes: 'The Schnitzius family immigrated to New York in 1843 and were in St Charles by 1850.  John Sr and his wife Mary Sheeter were in Savannah, Andrew County, MO by 1860.  I hope to find out more about their life in St Charles between 1850-1860.' },
//     { surname: 'Schwegmann', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Seigler', county: '', state: '', country: '', begin: '1840', end: '', city: '', alt: 'Siegler, Sieglar, Seiglar', Notes: '' },
//     { surname: 'Seigler', county: 'St. Charles', state: 'MO', country: 'USA', begin: '1835', end: '1880', city: 'St. Charles', alt: 'Siglar, Ziglar, Siegler, Ziegler', Notes: '' },
//     { surname: 'Shawan', county: 'St. Charles', state: 'Missouri', country: '', begin: '1880', end: '1947', city: 'Cape Girdeau', alt: '', Notes: '' },
//     { surname: 'Shellenhamer', county: '', state: '', country: '', begin: '', end: '', city: '', alt: 'Shellenhammer, Shellhamer, Shellhammer', Notes: '' },
//     { surname: 'Siebermann', county: 'St. Louis; Calhoun;Greene', state: 'MO; IL', country: '', begin: '1850', end: '2017', city: '', alt: 'Shellenhammer, Shellhamer, Shellhammer', Notes: '' },
//     { surname: 'Siegler', county: 'St. Charles', state: 'Missouri', country: 'United States', begin: '1829', end: '1922', city: 'Black Walnut', alt: 'Seigler, Ziegler, Siglar, Zeigler, Ziglar', Notes: 'Also looking for information on 1903 Floor in Black Walnut, Missouri' },
//     { surname: 'Simms', county: 'Cape May', state: 'New Jersey', country: 'United States', begin: '1846', end: '1947', city: '', alt: 'Sims', Notes: `John, Etna.  Married Mary E. Clouting` },
//     { surname: 'Smith', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1819', end: '1900', city: '', alt: '', Notes: `Capt. John H. Smith & Elizabeth Lyle = Earliest ancestors` },
//     { surname: 'Spalding', county: 'St. Charles', state: 'Missouri', country: '', begin: '', end: '', city: 'St. Charles', alt: 'Spaulding', Notes: 'William Spalding was born in St. Charles about 1838. He is possibly the son of Thomas Spalding (b. 1785), who was in St. Charles as early as 1817. William married Martha Ann Baldridge, daughter of Joseph Logan Baldridge and Mary Ann Gosney Baldridge, on Aug. 26, 1860, in St. Charles. William died in 1870 while working to build the Wabash Railroad bridge over the Missouri River.  He left two sons. HIs widow remarried Elijah Randolph on Nov. 1, 1880, and with him had a third son. She lived to age 90 and died in St. Charles on Jan. 1, 1929.' },
//     { surname: 'Spaulding', county: '', state: '', country: '', begin: '', end: '', city: '', alt: 'Spalding', Notes: '' },
//     { surname: 'Stock', county: 'St. Charles', state: 'Missouri', country: '', begin: '1865', end: '1920' },
//     { surname: 'Stonebraker', county: '', state: 'Missouri', country: '', begin: '', end: '', city: 'Portage des Sioux', alt: 'Stratman', Notes: `Stonebreaker` },
//     {
//         surname: 'Stratmann', county: '', state: '', country: 'United States', begin: '1800', end: '1925', city: 'Portage des Sioux', alt: 'Stratman', Notes: `Stratmann's also from Cape Giredeay along with Shawan family
// ` },
//     { surname: 'Sudbrock', county: 'St CharlesCounty', state: '', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Swagman', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: '', Notes: '' },
//     {
//         surname: 'Tarbell', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1840', end: '', city: '', alt: `Tarble
// Notes / Comments:	
// Earliest Tarbell ancestor coming to St. Charles County was Josiah Woods Tarbell, b. abt 1816, Kennebec Co., Maine, d. 14 Feb 1848, St. Charles Co., Missouri, son of Josiah Tarbell and Sophia 'Sophronia' Hanson, who married Mary Ellender Smith, 14 Apr 1840, St. Charles Co., Missouri.  Mary was b. 11 Nov 1819, St. Charles District, Missouri Territory, d. 05 Oct 1884 Callaway Twp., St. Charles Co., Missouri, daughter of John Smith and Elizabeth Lyle.
//    Josiah Woods Tarbell and Mary Ellender Smith had 2 children that lived to`, Notes: `1. Mary Elizabeth Tarbell, b. 15 Aug 1842, St. Charles Co., Missouri, d. 18 Mar 1885, St. Charles Co., Missouri, m. Thomas Jefferson Howell, b. 18 Nov 1829 - 1831 St. Charles Co., Missouri, d. 12 May 1904, St. Charles Co., Missouri, son of Benjamin Howell and Mahala Castlio.  6 children: Lillian Smith Howell; Eleanor Irene Howell; Thomas Watson Howell; Mary Virginia Adene Howell; Junia Elizabeth  Howell and Hubert Lee Howell/  
// 2. Josiah John Smith Tarbell, b. 20 Jul 1845, St. Charles Co., Missouri, d. by drowning in the Missouri River, 26 June 1870, Darst Bottom, St. Charles Co., Missouri, m. 07 May 1865, Laura Anne Elizabeth Yarnell, b. 1849, St. Charles Co., Missouri, d. 1874, St. Charles Co., Missouri, daughter of Memory Yarnell and Amandelia Howell.  3 children; Josiah John Tarbell married Anna Sarah Peters; George Lee Tarbell; Mary Virginia G. Tarbell married David Gentry Lowder. `
//     },
//     {
//         surname: 'Tayon', county: '', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: `Taillon, Michel dit Taillon
// `, Notes: ''
//     },
//     { surname: 'Thoene', county: 'St CharlesCounty/St Louis', state: 'Missouri', country: '', begin: '', end: '', city: '', alt: '', Notes: '' },
//     { surname: 'Tiedemann', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1849', end: '', city: '', alt: 'Ultzen', Notes: `Lehr ' Leehr' Tiedemann & Caroline Burgermeister = Earliest Ancestors` },
//     { surname: 'Townsend', county: 'Cape May', state: 'New Jersey', country: 'United States', begin: '1690', end: '2017', city: '', alt: 'Townsen, Towsen', Notes: 'Richard Townsends from Oyster Bay, Long Island, Colonies.    Brothers are John and Henry' },
//     { surname: 'Trendley', county: 'St Charles', state: 'Mo', country: 'United States', begin: '1771', end: '1850', city: '', alt: 'Ultzen', Notes: '' },
//     { surname: 'Ueltzen', county: '', state: 'Missouri', country: 'USA', begin: '', end: '', city: '', alt: 'Ultzen', Notes: '' },
//     { surname: 'Van Burkleo', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1798', end: '', city: '', alt: `Burkelo, Van Burken, Vanburkelow, Van Borculo, Vanberkelow. William and Mary (Hirons) Van Burkleo moved to "Petit Cotes" soon after coming to Missouri in 1798. Their first two children had been born in Kent County, Delaware, and at least the next three children were evidently born in Kentucky, where "William Van Borculo" was listed in the 1790 Tax Roll of Mason County. Two sons, who died young, may also have been born in Kentucky. Their youngest child, Mary, was born about 1801 in what would become St. Charles County.`, Notes: 'Many files on this' },
//     { surname: 'Vetsch', county: 'St. Charles Cty; Lincoln Cty', state: 'MO MN', country: '', begin: '1835', end: '2017', city: '	St. Paul, St. Peters, St. Char', alt: '', Notes: 'Many files on this' },
//     {
//         surname: 'Walter', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1850', end: '', city: "St. Charles", alt: "", Notes: `Her younger brother Joseph Walter (1814-1850) was married in 1832 in Eberbach to Maria Eva Schwartz (1809-1887), and had also come to St. Charles, where he owned a saloon. Joseph and Eva had 7 children born in Eberbach before they came to the United States with at least five of them. His children prospered, and in St. Charles County married into the Mueller, Bucher, Heimer, Glosier, Boschert, and Kister families.`
//     },
//     {
//         surname: 'Weber', county: 'St. Charles County', state: 'Missouri', country: '', begin: '1850', end: '', city: "St. Charles", alt: "", Notes: `Her younger brother Joseph Walter (1814-1850) was married in 1832 in Eberbach to Maria Eva Schwartz (1809-1887), and had also come to St. Charles, where he owned a saloon. Joseph and Eva had 7 children born in Eberbach before they came to the United States with at least five of them. His children prospered, and in St. Charles County married into the Mueller, Bucher, Heimer, Glosier, Boschert, and Kister families.
// ` },
//     { surname: 'Weber', county: '', state: '', country: '', begin: '', end: '', city: "St. Charles", alt: "", Notes: `Lorenz Weber (1799-1873) was born in Eberbach, Alsace, France. He and his wife Margaretha Anna Walter (1803-1892) were married in 1822 in Eberbach. He was 50 years old when he arrived at New Orleans aboard the ship "Callendar" on 30 Apr 1850, with his wife and nine children. One son evidently came ahead of them, and at least two others died young before they left France. In St. Charles he owned Lot #45 Block 10 of Cunningham's Survey in the Commons. He also purchased 40 acres in the Evans Survey, Lot #1 of Block 6. His youngest daughter's 1926 obituary described the farm where she grew up as "by the Fischer farm near Boschertown."` },
//     { surname: 'Weiser', county: '', state: 'Pennsylvania', country: '', begin: '', end: '', city: "", alt: "", Notes: "" },
//     { surname: 'Werremeyer', county: 'St. Charles', state: '', country: 'USA', begin: '1830', end: '2018', city: "St. Charles", alt: "", Notes: "" },
//     { surname: 'Westenkuehler', county: 'St. Charles', state: '', country: 'USA', begin: '1830', end: '2018', city: "St. Charles", alt: "", Notes: "" },
//     { surname: 'Westerhold', county: '', state: 'Missouri', country: '', begin: '', end: '', city: "", alt: "", Notes: "My great grandfather Henry Westerhold married a Stock and through the years their family moved between Washington, Mo, St. Louis, Mo. & areas in St. Charles County mainly in Portage des Sioux." },
//     { surname: 'Wilke', county: '', state: '', country: '', begin: '', end: '', city: "", alt: "", Notes: "" },
//     { surname: 'Willbrand', county: '', state: '', country: '', begin: '', end: '', city: "", alt: "", Notes: "" },
//     { surname: 'wille', county: 'st. charles', state: 'MO', country: 'United States', begin: '1830', end: '1990', city: "", alt: "", Notes: "" },
//     { surname: 'Williams', county: 'St. Charles', state: 'Missouri', country: 'USA', begin: '1848', end: '1900', city: "St. Paul", alt: "", Notes: "" },
//     { surname: 'Wilmes', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: "	St. Charles", alt: "", Notes: "" },
//     { surname: 'Wilmes', county: 'St. Charles', state: 'MO', country: '', begin: '', end: '', city: "Josephville", alt: "", Notes: "" },
//     { surname: 'Windmueller', county: '', state: '', country: '', begin: '', end: '', city: "", alt: "", Notes: "" },
//     { surname: 'Wissmann', county: '', state: 'Missouri', country: 'USA', begin: '', end: '', city: "", alt: "Wissman", Notes: "" },
//     { surname: 'Wlllets', county: 'Cape May', state: 'New Jersey', country: 'United States', begin: '1698', end: '1914', city: "", alt: "Willits", Notes: "John, James, Nicholas, Moses, Sarah.   Also Burlington Co., NJ" },
//     { surname: 'Wolf', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1800', end: '', alt: "Woolf", Notes: "Christopher Wolf/Woolf & Eve his wife = Earliest ancestor to St Charles District", city: "" },
//     { surname: 'Wood', county: '', state: '', country: '', begin: '', end: '', alt: "", Notes: "", city: "" },
//     { surname: 'Woodward', county: 'Burllington', state: 'New Jersey', country: 'United States', begin: '1808', end: '1957', alt: "", Notes: "Alfred, Lola.   Also Camden, NJ.", city: "" },
//     { surname: 'Xander', county: 'St. Charles', state: 'MO', country: 'USA', city: "St. Charles", begin: '1860', end: '1920', alt: "", Notes: "" },
//     { surname: 'Yarnall', county: 'St Charles', state: 'Missouri', country: 'USA', begin: '1816', end: '', City: "", alt: "Yarnell", Notes: "John Yarnall & Elizabeth 'Betsey' Wolf = Earliest ancestors to St Charles District" },
//     {
//         surname: 'Zeisler', county: 'Saint Charles', state: 'Missouri', country: 'United States', begin: '1830', end: '2020', city: "Saint Charles", alt: "Zeissler, Zusler", Notes: ""
//     },
//     { surname: 'Ziegemeier', county: '', state: '', country: '', begin: '', end: '', city: "", alt: "", Notes: "" },
//     { surname: 'Ziegler', county: '', state: '', country: '', begin: '', end: '', alt: "Siegler", city: "", alt: "", Notes: "" },
// ];




const itemsPerPage = 20;

export default function surenamelook(pageProp) {
    // const [currentPage, setCurrentPage] = useState(1);

    // const totalPages = Math.ceil(records.length / itemsPerPage);
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const currentItems = records.slice(startIndex, startIndex + itemsPerPage);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTrigger, setSearchTrigger] = useState("");

    // const [filteredData1, setFilteredData1] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);



    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // reset to first page
    };

    const handlePageChange = (e) => {
        setCurrentPage(Number(e.target.value));
    };


    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    const [openIndex, setOpenIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const handleOutsideClick = (event) => {
        if (
            dropdownRefs.current.every(
                (ref) => ref && !ref.contains(event.target)
            )
        ) {
            setOpenIndex(null);
        }
    };

    const tableRef = useRef(null);

    const scrollToTable = () => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);



    const [data, setData] = useState([]);

    // const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        fetch("https://uat.scchs.co.in/api/surname/data")
            .then((res) => res.json())
            .then((res) => {
                console.log("API response:", res); // 🪵 Check what the API gives
                setData(res || []);
            })
            .catch((err) => console.error("Failed to fetch:", err));
    }, []);

    const toggleDropdown = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = data.filter((item) =>
        item.surname?.toLowerCase().includes(searchTrigger.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // const currentItems = data.slice(0, visibleCount);

    // console.log(currentItems)



    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main1">
                <div className="event_main">
                    <div className="surname-container">
                        <div className="content-wrapper">
                            <h1>How To Look Up A Surname</h1>
                            <p>
                                The SCCHS Surname Directory is a collaborative tool giving all users a way to search for surnames of interest and to contact the SCCHS member who is researching the surname. There is no cost to use our Surname Directory and you do not need to be an SCCHS member to conduct a search.
                            </p>
                            <p>
                                To search the Directory, enter the surname you wish to search and then click on the magnifying glass icon -- you also have the option of flipping through the list using the page view.
                            </p>
                            <p>
                                Click on the eye icon and a new window will open with the Surname Detail (which can be printed). If you have a potential match, click the envelope icon, which opens the Surname Inquiry Emailer, and send an email to the member who posted the information to explore and collaborate.
                            </p>

                            <div className="image-section">
                                <img src="https://res.cloudinary.com/dgif730br/image/upload/v1745331971/image_ae6xyi.png" alt="Old street view" />
                            </div>

                            <div className="button-section">
                                <div className="label-box">To begin your search.</div>
                                <button className="start-btn" onClick={scrollToTable}>Click Here</button>
                            </div>

                            <div className="instructions">
                                <p>If you are a member, you may add a surname to the SCCHS Surname Directory by doing the following:</p>
                                <ol>
                                    <li>Open the <strong>MEMBERS</strong> page and login</li>
                                    <li>Open your Profile page,</li>
                                    <li>Open the <strong>Surnames</strong> tab,</li>
                                    <li>Select the + box and add the information about the surname you are researching,</li>
                                    <li>Click <strong>Save</strong> button (upper R/H corner of screen) to save your information.</li>
                                </ol>
                            </div>

                            <div className="instructions1">
                                <p><span>IMPORTANT NOTE TO MEMBERS:</span> The "Surname Inquiry Emailer" reveals no personal information (e.g., member's name or e-mail address) about the member.  All identification takes place after the email has been submitted to the server, where the necessary lookups can be done without concern and the inquiry sent to the member.</p>
                            </div>
                        </div>
                    </div>

                    <div className="memberList_filter" >
                        <div className="event-title-filter memberlist-title-filter tyile_filter">
                            <input value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setSearchTrigger(searchTerm);
                                    }
                                }} type="text" className="search-input serach_inpp" placeholder="Search Surname" />
                            <button onClick={() => setSearchTrigger(searchTerm)} className="search-button">
                                <img width="28" src="https://res.cloudinary.com/dgif730br/image/upload/v1744279927/Mask_group_zicocm.png" alt="this is search image" />
                            </button>
                            <button
                                style={{ padding: "10px" }}
                                className="cemetery-clear-btn"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSearchTrigger("");
                                }}
                            >
                                Clear
                            </button>
                        </div>

                        <div className="filters-right">
                            <div className="listing">
                                <label>Listing Per Page</label>
                                <div className="custom_drop custom_drop1">
                                    <select className="dropdown small" onChange={handleItemsPerPageChange} value={itemsPerPage}>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>
                            </div>

                            <div className="listing" id="listingg">
                                <label>Jump to Page</label>
                                <div className="custom_drop custom_drop1">
                                    <select className="dropdown small" onChange={handlePageChange} value={currentPage}>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="record-info mem-record-info">
                        <p className="record-count-label">
                            Records:{" "}
                            <span>
                                {filteredData.length === 0
                                    ? "0"
                                    : `${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(currentPage * itemsPerPage, filteredData.length)
                                    } of`}
                            </span>{" "}
                            {filteredData.length}
                        </p>
                    </div>

                    <div className="scch-table-container">
                        <table className="scch-member-table" ref={tableRef}>
                            {/* <colgroup>
                                <col style={{ width: "25%" }} />
                                <col style={{ width: "30%" }} />
                                <col style={{ width: "45%" }} />
                            </colgroup> */}
                            <thead>
                                <tr>
                                    <th className="nh1">Surname</th>
                                    <th className="nh1">Country</th>
                                    <th>Stage/Prov./Rgn</th>
                                    <th>Country</th>
                                    <th>Begin Year</th>
                                    <th>End Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.surname}</td>
                                        <td>{item.county}</td>
                                        <td><p>{item?.state}</p></td>
                                        <td>{item?.country}</td>
                                        <td>{item?.start_year}</td>
                                        <td>{item?.end_year}</td>
                                        <td ref={(el) => (dropdownRefs.current[idx] = el)} className="action-col">
                                            <button onClick={() => toggleDropdown(idx)} className="action-btn">
                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28C29.933 0.5 31.5 2.067 31.5 4V28C31.5 29.933 29.933 31.5 28 31.5H4C2.067 31.5 0.5 29.933 0.5 28V4Z" stroke="#AB0635" />
                                                    <path d="M16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14ZM16 8C14.9 8 14 8.9 14 10C14 11.1 14.9 12 16 12C17.1 12 18 11.1 18 10C18 8.9 17.1 8 16 8ZM16 20C14.9 20 14 20.9 14 22C14 23.1 14.9 24 16 24C17.1 24 18 23.1 18 22C18 20.9 17.1 20 16 20Z" fill="#49515C" />
                                                </svg>
                                            </button>
                                            {openIndex === idx && (
                                                <div className="action-dropdown">
                                                    <Link href={{
                                                        pathname: "/surenamedetail",
                                                        query: {
                                                            surname: item.surname,
                                                            city: item.city,
                                                            county: item.county,
                                                            state: item.state,
                                                            country: item.country,
                                                            start_year: item.start_year,
                                                            end_year: item.end_year,
                                                            alt: item.alt_spelling,
                                                            commant: item?.commant
                                                        },
                                                    }} style={{ textDecoration: "none" }}>
                                                        <div className="act_btn">
                                                            <img width={18} height={18} src="https://res.cloudinary.com/dgif730br/image/upload/v1745394773/Mask_group_1_u2msed.svg" />
                                                            <p>View</p>
                                                        </div>
                                                    </Link>
                                                    <Link style={{ textDecoration: "none" }} href="/contact-us">
                                                        <div className="act_btn">
                                                            <img width={18} height={18} src="https://res.cloudinary.com/dgif730br/image/upload/v1745394773/Mask_group_3_zsyixz.svg" />
                                                            <p>Mail</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>


                    {/* <div className="custom-pagination">
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
                            <span>Next</span>
                            <svg width="6" height="12" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.13115 0.5L0.368652 2.2625L6.09365 8L0.368652 13.7375L2.13115 15.5L9.63115 8L2.13115 0.5Z" fill="#666D76" />
                            </svg>

                        </button>
                    </div> */}
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