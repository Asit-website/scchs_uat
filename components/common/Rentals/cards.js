import React from 'react'
import style from "../../../pages/css/rentalCards.module.scss";
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';

export default function RentalCards(props) {
  const parentPage = props.parentPage;
  let rentalCardsSlider = ""
  if(parentPage == "slider"){ rentalCardsSlider = style.rentalCardsSlider; }
  
  const product = props?.item;
  const imagePath = props?.imagePath;
  
  return (
    <div className={style.rentalCards + " "+ rentalCardsSlider}>
      <div className={style.rentalCard}>
        <div className={style.imageContainer}>
          <Link href={`/rental/${product?.slug}`}>
              {
                product?.images?.length > 0 ?
                (
                  <Image
                    className={style.banner_image}
                    src={imagePath+"/"+product?.images[0]}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
                :
                (
                  <Image
                    className={style.banner_image}
                    src={'https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/coming-soon.png'}
                    width="100"
                    height="304"
                    layout="responsive"
                    objectFit="cover"
                    alt={product?.title}
                  />
                )
              }
              
          </Link>
        </div>
        <div className={style.cardsBody}>
          <h4 className={style.title}><Link href={`/rental/${product?.slug}`}>{product?.title}</Link></h4>
          <p className={style.location}>{product?.location}</p>
          <p className={style.date}>
            { moment(product?.check_in).format('ddd, MMMM DD') }
          </p>
          <p className={style.price}><span>${product?.price?.toFixed(2)}</span> /night</p>
        </div>
      </div>
    </div>
  )
}


import React, { useState, useEffect, useRef } from "react";

const navItems = [
  {
    title: "About us",
    dropdown: [
      "History of SCCHS",
      "History of Our Building",
      "History of Our County"
    ]
  },
  {
    title: "Research",
    dropdown: [
      "Workshop Handouts",
      "External Research Site Links",
      "The TNT Story: Cemeteries"
    ]
  },
  {
    title: "Join us",
    dropdown: [
      "Membership Information",
      "Online Join"
    ]
  },
  {
    title: "Get involved",
    dropdown: [
      "Volunteers and Interns"
    ]
  },
  {
    title: "Support us",
    dropdown: [
      "Donations",
      "Planned Giving"
    ]
  },
  {
    title: "Events"
  },
  {
    title: "Store",
    dropdown: [
      "Store1",
      "Store2"
    ]
  }
];

// const Navbar = () => {
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//   const dropdownRefs = useRef([]);

//   const toggleDropdown = (index) => {
//     setOpenDropdownIndex((prev) => (prev === index ? null : index));
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         openDropdownIndex !== null &&
//         dropdownRefs.current[openDropdownIndex] &&
//         !dropdownRefs.current[openDropdownIndex].contains(event.target)
//       ) {
//         setOpenDropdownIndex(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [openDropdownIndex]);

//   return (
//     <div className="scchs_navbar_up">
//       <div className="scchs_navbar">
//         <ul className="scchs_nav_ul">
//           <div className="scchs_logo">
//             <img
//               src="https://res.cloudinary.com/dgif730br/image/upload/v1743768420/SCCHS_Logo_vFINAL_1_1_whtysx.svg"
//               alt="SCCHS Logo"
//             />
//           </div>

//           {navItems.map((item, index) => (
//             <div
//               key={index}
//               className="schss_parent"
//               onClick={() => toggleDropdown(index)}
//               ref={(el) => (dropdownRefs.current[index] = el)}
//             >
//               <li className="dev_svg">
//                 <a>{item.title}</a>
//                 {item.dropdown && openDropdownIndex === index && (
//                   <svg
//                     width="10"
//                     height="6"
//                     viewBox="0 0 13 8"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
//                       fill="#292929"
//                     />
//                   </svg>
//                 )}
//               </li>

//               {item.dropdown && openDropdownIndex === index && (
//                 <div className="test_drop">
//                   {item.dropdown.map((subItem, subIndex) => (
//                     <div key={subIndex}>
//                       <p>{subItem}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}

//           <li className="test_sign">
//             <button>SIGN IN</button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

