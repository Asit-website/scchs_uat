

import React, { useEffect, useRef, useState } from "react";
import style from "../../../pages/css/header.module.scss";
import Image from "next/image";
import Link from "next/link";

import GlobalArrowDown from "../svg/global/arrowDown";
import GlobalAccount from "../svg/global/account";
import GlobalVerified from "../svg/global/verified";
import useBodyOutsideClick from "../../../utils/body-outside-click";
import GlobalMenu from "../svg/global/menu";
import GlobalClose from "../svg/global/close";
import MenuToggel from "../../../utils/common/menu";
import GlobalLogout from "../svg/global/logout";
import GlobalLogin from "../svg/global/login";
import { useSession } from "next-auth/react";
import GlobalOrder from "../svg/global/order";
import GlobalCart from "../svg/global/cart";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ShoppingCart } from 'lucide-react';
import { userInfo } from "os";

const staticItems = [
  { id: "Archives", title: "ARCHIVES", link: "/archieve" },
  { id: "Photos", title: "PHOTOS", link: "/photos/mainhome" },
  { id: "surname", title: "SURNAME LOOKUP", link: "/surenamelook" },
  { id: "business", title: "OUR BUSINESS FRIENDS", link: "/business" },
  { id: "contact", title: "CONTACT US", link: "/contact-us" },
];


export default function Navbar(props) {

  const { boolValue } = props;

  const [countCart, setCountCart] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [authPopup1, setAuthPopup1] = useState(false)
  const refAuthPopup = useRef(null);
  const refAuthPopup1 = useRef(null)

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef();

  const [membershipStatus, setMembershipStatus] = useState("loading");

  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);



  // ==========this is for mobile responsive=============
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // ================= this is for mobile responsive dropdown end============
  const { data: userSession } = useSession();
  const router = useRouter();
  MenuToggel();
  useBodyOutsideClick(refAuthPopup, () => {
    setAuthPopup(false);
  });

  useBodyOutsideClick(refAuthPopup1, () => {
    setAuthPopup1(false);
  });


  //  ==============dropdown ref=============

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef11 = useRef(null);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef11.current &&
        !dropdownRef11.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ============dropdown==============

  const [open, setOpen] = useState(false);
  const dropdownRef12 = useRef(null);

  useEffect(() => {
    const handleClickOutsides = (event) => {
      if (dropdownRef12.current && !dropdownRef12.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsides);
    return () => document.removeEventListener('mousedown', handleClickOutsides);
  }, []);


  useEffect(() => {
    if (userSession?.user.error === "invalid-version") {
      document.cookie =
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      document.cookie =
        "next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      signOut();
    }
  }, [userSession?.user?.error, router]);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);

  const [isDropdownOpen5, setIsDropdownOpen5] = useState(false);

  const [isDropdownOpen6, setIsDropdownOpen6] = useState(false);

  // ==============uper wale header ka dropdown============

  const [isDropdownOpen7, setIsDropdownOpen7] = useState(false);



  const currentPath = router.asPath;

  const dropdownRef = useRef(null);

  const dropdownRef2 = useRef(null);

  const dropdownRef3 = useRef(null);

  const dropdownRef4 = useRef(null);

  const dropdownRef5 = useRef(null);

  const dropdownRef6 = useRef(null);

  // ==============uper wale header ka dropdown============

  const dropdownRef7 = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false); // Close dropdown if click is outside of it
    }
  };

  const handleClickOutside2 = (e) => {
    if (dropdownRef2.current && !dropdownRef2.current.contains(e.target)) {
      setIsDropdownOpen2(false); // Close dropdown if click is outside of it
    }
  };

  const handleClickOutside3 = (e) => {
    if (dropdownRef3.current && !dropdownRef3.current.contains(e.target)) {
      setIsDropdownOpen3(false); // Close dropdown if click is outside of it
    }
  };

  const handleClickOutside4 = (e) => {
    if (dropdownRef4.current && !dropdownRef4.current.contains(e.target)) {
      setIsDropdownOpen4(false); // Close dropdown if click is outside of it
    }
  };

  const handleClickOutside5 = (e) => {
    if (dropdownRef5.current && !dropdownRef5.current.contains(e.target)) {
      setIsDropdownOpen5(false); // Close dropdown if click is outside of it
    }
  };

  const handleClickOutside6 = (e) => {
    if (dropdownRef6.current && !dropdownRef6.current.contains(e.target)) {
      setIsDropdownOpen6(false); // Close dropdown if click is outside of it
    }
  };

  // ============uper header script======

  const handleClickOutside7 = (e) => {
    if (dropdownRef7.current && !dropdownRef7.current.contains(e.target)) {
      setIsDropdownOpen7(!isDropdownOpen7); // Close dropdown if click is outside of it
    }
  };



  useEffect(() => {
    if (isDropdownOpen) {
      document?.addEventListener("click", handleClickOutside);
    } else {
      document?.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen2) {
      document?.addEventListener("click", handleClickOutside2);
    } else {
      document?.removeEventListener("click", handleClickOutside2);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside2);
    };
  }, [isDropdownOpen2]);

  useEffect(() => {
    if (isDropdownOpen3) {
      document?.addEventListener("click", handleClickOutside3);
    } else {
      document?.removeEventListener("click", handleClickOutside3);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside3);
    };
  }, [isDropdownOpen3]);

  useEffect(() => {
    if (isDropdownOpen4) {
      document?.addEventListener("click", handleClickOutside4);
    } else {
      document?.removeEventListener("click", handleClickOutside4);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside4);
    };
  }, [isDropdownOpen4]);

  useEffect(() => {
    if (isDropdownOpen5) {
      document?.addEventListener("click", handleClickOutside5);
    } else {
      document?.removeEventListener("click", handleClickOutside5);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside5);
    };
  }, [isDropdownOpen5]);

  useEffect(() => {
    if (isDropdownOpen6) {
      document?.addEventListener("click", handleClickOutside6);
    } else {
      document?.removeEventListener("click", handleClickOutside6);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside6);
    };
  }, [isDropdownOpen6]);

  // ===========uper wale ka dropdown===========

  useEffect(() => {
    if (isDropdownOpen7) {
      document?.addEventListener("click", handleClickOutside7);
    } else {
      document?.removeEventListener("click", handleClickOutside7);
    }
    return () => {
      document?.removeEventListener("click", handleClickOutside7);
    };
  }, [isDropdownOpen7]);




  const getCarts = async () => {

    try {
      const response = await fetch("https://uat.scchs.co.in/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
        }
      });

      const data = await response.json();
      setCountCart(data?.cart?.length);
    } catch (error) {
    }
  };



  useEffect(() => {
    const isLoggedIn = JSON?.parse(localStorage.getItem("scchs_Access"));
    if (isLoggedIn) {
      getCarts(); // Call getCarts if logged in
    } else {
      let allCarts = JSON.parse(sessionStorage.getItem("cartItems")) || [];
      setCountCart(allCarts?.length); // Use sessionStorage if not logged in
    }
  }, [boolValue]);

  const jok = {
    backgroundColor: "white !important"
  }

  const [accessToken, setAccessToken] = useState(null);
  const [instaUser, setInstaUser] = useState(null);

  console.log(instaUser);



  const [allProduct, setAllProduct] = useState();

  // useEffect(() => {
  //   if (typeof window !== "undefined") { // Ensures code only runs in the browser
  //     const storedAccessToken = localStorage.getItem("insta_Access");
  //     const storedInstaUser = localStorage.getItem("insta_User");

  //     setAccessToken(storedAccessToken ? JSON.parse(storedAccessToken) : null);
  //     setInstaUser(storedInstaUser ? JSON.parse(storedInstaUser) : null);
  //   }
  // }, [instaUser]);

  // const [instaUser, setInstaUser] = useState(null);



  console.log(accessToken);
  console.log(instaUser);


  if (typeof props.navbarProps == "undefined" || props.navbarProps == false) {
    return "";
  } else {
    const navbarData = props?.navbarProps;
    const settings = navbarData?.settings;
    const navigation = navbarData?.navigation;

    let navbarItems = null;
    console.log(navbarItems);
    if (navigation?.items) {
      navbarItems = JSON.parse(navigation?.items);
      console.log(navbarItems);
    }



    const handleDropdownToggle = () => {
      setIsDropdownOpen2(false);
      setIsDropdownOpen3(false);
      setIsDropdownOpen4(false);
      setIsDropdownOpen5(false);
      setIsDropdownOpen6(false);
      setIsDropdownOpen((prev) => !prev);
    };

    const handleDropdownToggle2 = () => {
      setIsDropdownOpen(false);
      setIsDropdownOpen3(false);
      setIsDropdownOpen4(false);
      setIsDropdownOpen5(false);
      setIsDropdownOpen6(false);
      setIsDropdownOpen2((prev) => !prev);
    };

    const handleDropdownToggle3 = () => {
      setIsDropdownOpen(false);
      setIsDropdownOpen2(false);
      setIsDropdownOpen4(false);
      setIsDropdownOpen5(false);
      setIsDropdownOpen6(false);
      setIsDropdownOpen3((prev) => !prev);
    };

    const handleDropdownToggle4 = () => {
      setIsDropdownOpen(false);
      setIsDropdownOpen2(false);
      setIsDropdownOpen3(false);
      setIsDropdownOpen5(false);
      setIsDropdownOpen6(false);
      setIsDropdownOpen4((prev) => !prev);
    };

    const handleDropdownToggle5 = () => {
      setIsDropdownOpen(false);
      setIsDropdownOpen2(false);
      setIsDropdownOpen3(false);
      setIsDropdownOpen4(false)
      setIsDropdownOpen6(false);
      setIsDropdownOpen5((prev) => !prev);
    };

    const handleDropdownToggle6 = () => {
      setIsDropdownOpen(false);
      setIsDropdownOpen2(false);
      setIsDropdownOpen3(false);
      setIsDropdownOpen4(false);
      setIsDropdownOpen5(false)
      setIsDropdownOpen6((prev) => !prev);
    };

    const handleDropdownToggle7 = () => {
      // setIsDropdownOpen(false);
      // setIsDropdownOpen2(false);
      // setIsDropdownOpen3(false);
      // setIsDropdownOpen4(false);
      // setIsDropdownOpen5(false)
      setIsDropdownOpen7((prev) => !prev);
    };



    const navItemss = [
      {
        title: "About us",
        link: "/about-us",
        // dropdown: ["History of SCCHS", "History of Our Building", "History of Our County"]
        dropdown: [
          {
            title: "History of SCCHS",
            link: "/history-of-scchs"
          },
          {
            title: "History of Our Building",
            link: "/history-of-0ur-building"
          },
          {
            title: "History of Our County",
            link: "/history-of-our-country"
          }
        ]
      },
      {
        title: "Research",
        link: "/research-1",
        // dropdown: ["Workshop Handouts", "External Research Site Links", "The TNT Story: Cemeteries"]
        dropdown: [
          {
            title: "Workshop Handouts",
            link: "/workshop-buttons"
          },
          {
            title: "External Research Site Links",
            link: "/extrnal-research-links"
          },
          {
            title: "The TNT Story: Cemeteries",
            link: "/cemetry-virtual-tour "
          }
        ]
      },
      {
        title: "Join us",
        link: "/join-us",
        // dropdown: ["Membership Information", "Online Join"]
        dropdown: [
          {
            title: "Membership Information",
            link: "/membership-information-join-us"
          },
          {
            title: "Online Join",
            link: "/join/register1"
          }
        ]
      },
      {
        title: "Get Involved",
        dropdown: [{
          title: "Volunteers and Interns",
          link: "/volunteer-and-interns"
        }]
        // dropdown: ["Volunteers and Interns"]
      },
      {
        title: "Support us",
        link: '/support-us',
        // dropdown: ["Donations", "Planned Giving"]
        dropdown: [
          {
            title: "Donations",
            link: "/support/donation"
          },
          {
            title: "Planned Giving",
            link: "/planed-giving"
          }
        ]
      },
      { title: "Events", link: "/event" },
      {
        title: "Store", link: "/store"
        // dropdown: ["Store1", "Store2"]
      }
    ];


    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const toggleDropdown = (index) => {
      setOpenDropdownIndex((prev) => (prev === index ? null : index));
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          openDropdownIndex !== null &&
          dropdownRefs.current[openDropdownIndex] &&
          !dropdownRefs.current[openDropdownIndex].contains(event.target)
        ) {
          setOpenDropdownIndex(null);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdownIndex]);


    // ============for renew=============
    const [subscription, setSubscription] = useState(null);
    const [daysLeft, setDaysLeft] = useState(null);
    const [endDateFormatted, setEndDateFormatted] = useState('');
    // const router = useRouter();

    useEffect(() => {
      if (!instaUser || !instaUser.id) return; // 👈 prevent fetch if instaUser is null

      const fetchSubscription = async () => {
        try {
          const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
          const result = await res.json();
          console.log(result);
          const data = result.data;
          console.log(data);
          setSubscription(data);


          const end = new Date(data.end_date);
          const today = new Date();
          const diffInDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
          setDaysLeft(diffInDays);
        } catch (err) {
          console.error('Error fetching subscription:', err);
        }
      };

      fetchSubscription();
    }, [instaUser]); // 👈 dependency to re-run when instaUser changes


    const handleRenewClick = () => {
      console.log("HI");
      if (daysLeft !== null) {
        if (daysLeft <= 2) {
          router.push('/join/memberplan'); // Replace with your payment route
        } else {
          toast.error(`You are allowed to renew 2 days before end of your subscription.`);
        }
      }
    };




    //  =====plan purchased or not=============
    // useEffect(() => {
    //   const storedUser = localStorage.getItem("scchs_User");
    //   if (storedUser) {
    //     setInstaUser(JSON.parse(storedUser));
    //   }
    // }, []);

    useEffect(() => {
      const storedUser = localStorage.getItem("scchs_User");
      if (storedUser) setInstaUser(JSON.parse(storedUser));
    
      const handleProfileUpdate = () => {
        const updatedUser = localStorage.getItem("scchs_User");
        if (updatedUser) setInstaUser(JSON.parse(updatedUser));
      };
    
      window.addEventListener("userProfileUpdated", handleProfileUpdate);
    
      return () => {
        window.removeEventListener("userProfileUpdated", handleProfileUpdate);
      };
    }, []);


    // useEffect(() => {
    //   const fetchMembership = async () => {
    //     if (!instaUser?.id) return;

    //     try {
    //       const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
    //       const data = await res.json();

    //       console.log(data);

    //       const today = new Date();

    //       const activePlan = data?.data?.find(plan => {
    //         const isActive = plan.status === "active";
    //         const endDate = new Date(plan.end_date);
    //         return isActive && endDate >= today;
    //       });

    //       setMembershipStatus(activePlan ? "active" : "none");
    //     } catch (err) {
    //       console.error("Error fetching membership:", err);
    //       setMembershipStatus("none");
    //     }
    //   };

    //   fetchMembership();
    // }, [instaUser]);


    // ===============for renew=========


    const [usedSlot, setUsedSlot] = useState(0);
    const [allowedSlot, setAllowedSlot] = useState(0);

    // Replace your fetchMembership useEffect with this:
   useEffect(() => {
  const fetchMembership = async () => {
    if (!instaUser?.id) return;

    try {
      const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
      const data = await res.json();

      const today = new Date();

      // Filter all active (not expired) plans
      const activePlans = (data?.data || []).filter(plan => {
        const isActive = plan.status === "active";
        const endDate = new Date(plan.end_date);
        return isActive && endDate >= today;
      });

      console.log(activePlans);

      setMembershipStatus(activePlans.length > 0 ? "active" : "none");

      // Sum all allow_member and used_slots from all active plans
      let totalAllowed = 0;
      let totalUsed = 0;
      activePlans.forEach(plan => {
        totalAllowed += Number(plan.plan?.allow_member || 0);
        totalUsed += Number(plan.used_slots || 0);
      });

      setUsedSlot(totalUsed);
      setAllowedSlot(totalAllowed);

    } catch (err) {
      setMembershipStatus("none");
      setUsedSlot(0);
      setAllowedSlot(0);
    }
  };

  fetchMembership();
}, [instaUser]);



    const handleMember = () => {
      membershipStatus != "active" && toast.error("Please purchase membership plan");
    }


    const [query, setQuery] = useState("");
    const router = useRouter();


    const handleSearch = async (e) => {
      e.preventDefault();
      if (!query.trim()) return;
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    };


    // ===============member dropdown mobile==========
    const dropdownRef = useRef();
    const [isOpen1, setIsOpen1] = useState(false);

    const [mainOpen, setMainOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setMainOpen(false);
          setSubOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const toggleDropdown112 = () => setIsOpen1(!isOpen1);



    return (
      <>
        {/* desktop view  */}
        <div className="scchs_header_up">
          <div className="scchs_header">
            <ul className="scchs_ul">
              {/* <div className="schss_parent" onClick={handleToggle} ref={buttonRef}>
                  <li className="dev_svg">
                    <a>Members only</a>
                    {isOpen && (
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 13 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </li>
  
                  {isOpen && (
                    <div ref={dropdownRef11} className="test_drop1">
                      <div>
                        <p>Membership List</p>
                      </div>
                      <div>
                        <p>SCCHS Publications Archives</p>
                      </div>
                      <div>
                        <p>My Profile</p>
                      </div>
                      <div>
                        <p>Logout</p>
                      </div>
                      <span>
                        <div>
                          <p>Research</p>
                        </div>
                        <div>
                          <p>Cemetery Records</p>
                        </div>
                      </span>
                    </div>
                  )}
                </div> */}


              <div className="schss_parent">
                {/* Only this button toggles */}
                <li className="dev_svg" onClick={handleToggle} ref={buttonRef}>

                  <Link onClick={handleMember} href="#">Members only</Link>

                  {isOpen && (
                    membershipStatus === "active" &&
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 13 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </li>

                {/* Dropdown appears separately, not wrapped in toggle */}
                {isOpen && (
                  membershipStatus === "active" &&
                  <div ref={dropdownRef11} className="test_drop1">
                    <a href="/member/memberlist"><div><p>Membership List</p></div></a>
                    <div onClick={handleDropdownToggle7} ref={dropdownRef7} className="tyino">
                      <p>SCCHS Publications Archives</p>
                      {/* {isDropdownOpen7 && */}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 13 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
                          fill="white"
                        />
                      </svg>
                      {/* } */}
                      {
                        isDropdownOpen7 &&

                        <span className="newsLetter_why">
                          <ol>
                            <a href="/research4"> <li>SCCHS Heritage Journal</li></a>
                            <a href="/heritage"> <li>SCCHS Newsletters</li></a>
                            <a href="/genealogy-newsletter"> <li>Genealogy Newsletter</li></a>
                            <a href="/message-1"> <li>SCCHS President Messages</li></a>
                          </ol>
                        </span>
                      }
                    </div>
                    <a href="/member/myprofile"><div><p>My Profile</p></div></a>
                    <div onClick={() => {
                      localStorage.removeItem("scchs_Access");
                      localStorage.removeItem("scchs_User");
                      setAccessToken(null)
                      setInstaUser(null)
                      toast.success("Logout successfully");
                      window.location.href = "/"
                    }} className="logout"><p>Logout</p></div>

                    <a href="/research"><div><p>Research</p></div></a>
                    <a style={{ paddingRight: "0px" }} href="/cementryrecord"><div><p>Cemetery Records</p></div></a>

                  </div>
                )}
              </div>


              <li>
                <Link href={"/archieve"}>Archives</Link>
              </li>
              <li>
                <Link href={"/checkout"}>photos</Link>
              </li>
              <li>
                <Link href="/surenamelook">surname lookup</Link>
              </li>
              <li>
                <Link href="/business">our business friends</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact us</Link>
              </li>
              <div className="scchs_searchbar">
                <form onSubmit={handleSearch}>
                  <input value={query}
                    onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
                  <button className="scchs_searchbarbutton" type="submit" ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                  </svg>
                  </button>
                </form>
              </div>

            </ul>

            {/* ===========yaha pe ayega===== */}

          </div>
        </div>

        <div className="scchs_navbar_up">
          <div className="scchs_navbar">
            <ul className="scchs_nav_ul">
              <div className="scchs_logo">
                <a href="/"><img
                  src="https://res.cloudinary.com/dgif730br/image/upload/v1745856268/High_Res_SCCHS_Logo_vFINAL_2_1_zlnojv.svg"
                  alt="SCCHS Logo"
                /></a>
              </div>

              {/* {navbarItems.map((item, index) => (
                <div
                  key={index}
                  className="schss_parent"
                  onClick={() => toggleDropdown(index)}
                  ref={(el) => (dropdownRefs.current[index] = el)}
                >
                  <li className="dev_svg">
                    <Link href={item?.parentItems?.link}>{item?.parentItems?.title}</Link>
                    {item.subItems?.length != 0 && openDropdownIndex === index && (
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 13 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
                          fill="#292929"
                        />
                      </svg>
                    )}
                  </li>

                  {openDropdownIndex === index && (
                    <div className="test_drop">
                      {item.subItems.map((subItem, subIndex) => (
                        <div key={subIndex}>
                          <a href={subItem?.link}><p>{subItem?.title}</p></a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))} */}

              {navbarItems
                .filter(item => !(instaUser && item?.parentItems?.title === "JOIN US"))
                .map((item, index) => (
                  <div
                    key={index}
                    className="schss_parent"
                    onClick={() => toggleDropdown(index)}
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <li className="dev_svg">
                      <Link href={item?.parentItems?.link}>{item?.parentItems?.title}</Link>
                      {item.subItems?.length != 0 && openDropdownIndex === index && (
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 13 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.66016 7.19531L0.328125 1.89062C0.0820312 1.61719 0.0820312 1.20703 0.328125 0.960938L0.957031 0.332031C1.20312 0.0859375 1.61328 0.0859375 1.88672 0.332031L6.125 4.54297L10.3359 0.332031C10.6094 0.0859375 11.0195 0.0859375 11.2656 0.332031L11.8945 0.960938C12.1406 1.20703 12.1406 1.61719 11.8945 1.89062L6.5625 7.19531C6.31641 7.44141 5.90625 7.44141 5.66016 7.19531Z"
                            fill="#292929"
                          />
                        </svg>
                      )}
                    </li>

                    {openDropdownIndex === index && (
                      <div className="test_drop">
                        {item.subItems.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            <a href={subItem?.link}><p>{subItem?.title}</p></a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}


              <li className="test_sign">
                {instaUser ? <button onClick={() => {
                  localStorage.removeItem("scchs_Access");
                  localStorage.removeItem("scchs_User");
                  setAccessToken(null)
                  setInstaUser(null)
                  toast.success("Logout successfully");
                  window.location.href = "/"
                }}>Logout</button> : <Link href="/user/userlogin"><button>SIGN IN</button></Link>}
              </li>
              <li>
                <Link href={"/storeorder"}><div className="cart-container">
                  {/* <svg className="cart-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6h15l-1.5 9h-13z" stroke="black" strokeWidth="2" />
                    <circle cx="9" cy="21" r="1" fill="black" />
                    <circle cx="18" cy="21" r="1" fill="black" />
                  </svg> */}
                  <ShoppingCart />
                  {countCart > 0 && <span className="cart-count">{countCart}</span>}

                </div></Link>
                <style jsx>{`
  .cart-container {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .cart-icon {
    width: 100%;
    height: 100%;
  }

  .cart-count {
    position: absolute;
    top: -6px;
    right: 7px;
    background-color: rgba(0, 49, 92, 1);
    color: white;
    font-size: 10px;
     width:18px;
    height:18px;
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
  }
                    `}</style>
              </li>
              {
                instaUser && <li onClick={() => setOpen(!open)} ><Link href={"#"}><img width={35} height={35} src="https://res.cloudinary.com/dgif730br/image/upload/v1748089475/user_xegqs3.png" /></Link>

                  {open && (
                    <div ref={dropdownRef12} className="dropdown-menusss">
                      {/* <a>Hello, </a> */}
                      <a href="/ViewProfile">View Profile</a>
                      <a href="/orderhistory">Order History</a>
                      {/* <a href="/eventhistory">🎫 Event Orders</a> */}
                      <a href="/eventhistory">Event Order History</a>
                      <a href="/donationhistory">Donation History</a>
                      <a href="/storeorder">View Cart</a>
                      {/* onClick={handleRenewClick} */}
                      <a href="/join/memberplan">{membershipStatus === "active" ? "Purchase another plan" : "Purchase Plan"}</a>
                      {membershipStatus === "active" && <Link href={"/renew"}><p style={{ cursor: "pointer" }} >RENEW ONLINE</p></Link>}
                      {membershipStatus === "active" && usedSlot < allowedSlot && (
                        <a href="/join/register1">Create Member</a>
                      )}

                    </div>

                  )}
                  <style jsx>{`
        .dropdown-toggle {
          background: #fff;
          border: 1px solid #ccc;
          padding: 6px 10px;
          font-size: 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        .dropdown-menusss {
          position: absolute;
          top: 66px;
          right: 20px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          min-width: 160px;
          z-index: 999;
          animation: fadeIn 0.2s ease-in-out;
        }

        .dropdown-menusss a {
          display: block;
          padding: 10px 15px;
          text-decoration: none;
          color: #333;
          font-size: 14px;
        }
          .dropdown-menusss p {
          display: block;
          padding: 10px 15px;
          text-decoration: none;
          color: #333;
          font-size: 14px;
          font-weight:500
        }

        .dropdown-menusss a:hover, .dropdown-menusss p:hover {
          background-color: #f5f5f5;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
                </li>

              }
              {instaUser && <li className="test_sign"><a>Hi, <span style={{ fontWeight: "bold" }}>{instaUser?.first_name?.slice(0, 10)}</span></a></li>}
            </ul>
          </div>
        </div>

        {/* ==========mobile========== */}
        {/* <div className="navbar-wrapper" ref={navRef}>
          <div className="logo-and-toggle">
            <a href="/"><img
              className="logo"
              src="https://res.cloudinary.com/dgif730br/image/upload/v1743768420/SCCHS_Logo_vFINAL_1_1_whtysx.svg"
              alt="Logo"
            /></a>
            <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
              ☰
            </button>
          </div>

          <ul className={`nav-list ${mobileOpen ? "open" : ""}`}>
          
            <li className="nav-item">
              <a href="/archieve">Archives</a>
            </li>
            <li className="nav-item">
              <a href="/photos/mainhome">photos</a>
            </li>
            <li className="nav-item">
              <a href="/surenamelook">surname lookup</a>
            </li>
            <li className="nav-item">
              <a href="/our-business-freind">our business friends</a>
            </li>
            <li className="nav-item">
              <a href="/contact-us">Contact us</a>
            </li>
            <div className="scchs_searchbar nav-item">
              <form>
                <input placeholder="Search" name="search" />
                <button><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z" fill="#FD605D" stroke="white" />
                </svg>
                </button>
              </form>
            </div>

         
            {navItemss.map((item, index) => (
              <li
                key={index}
                className="nav-item"
                onClick={() =>
                  setActiveDropdown(activeDropdown === index ? null : index)
                }
              >
                <span className="nav-title">
                  <a href={item.link}>{item.title}</a>
                  {item.dropdown && <span className="arrow">▼</span>}
                </span>
                {item.dropdown && activeDropdown === index && (
                  <ul className="dropdown">
                    {item.dropdown.map((subItem, idx) => (
                      <a href={subItem?.link}><li key={idx} className="dropdown-item">{subItem?.title}</li></a>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <Link style={{ marginLeft: "auto" }} href={"/storeorder"}><div className="cart-container">
             
              <ShoppingCart />

              {countCart > 0 && <span className="cart-count">{countCart}</span>}

            </div></Link>
            <style jsx>{`
  .cart-container {
    position: relative;
    top:11px !important;
    width: 40px;
    height: 40px;
  }

  .cart-icon {
    width: 100%;
    height: 100%;
  }

  .cart-count {
    position: absolute;
    top: -6px;
    right: 7px;
    background-color: rgba(0, 49, 92, 1);
    color: white;
    font-size: 12px;
    width:20px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
  }
                    `}</style>

            <li className="nav-signin">
              <Link href="/user/userlogin">
                <button className="signin-btn">SIGN IN</button>
              </Link>
            </li>


          </ul>
        </div> */}
        <div className="mobile-navbar-wrapper">
          <div className="mobile-navbar-header">
            <a href="/"><img
              className="logo"
              src="https://res.cloudinary.com/dgif730br/image/upload/v1743768420/SCCHS_Logo_vFINAL_1_1_whtysx.svg"
              alt="Logo"
            /></a>
            <button
              className="mobile-navbar-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>


          <div className={`mobile-navbar-menu ${menuOpen ? "open" : ""}`}>
            {membershipStatus === "active" && <div className="member-dropdown-container" ref={dropdownRef}>
              <div
                className="member-dropdown-button"
                onClick={() => setMainOpen(!mainOpen)}
              >
                MEMBERS ONLY ▾
              </div>

              {mainOpen && (
                <div className="member-dropdown-menu">
                  <div
                    className="member-dropdown-item"
                    onClick={() => setSubOpen(!subOpen)}
                  >
                    SCCHS Publications Archives ▸
                  </div>

                  {subOpen && (
                    <div className="member-sub-dropdown">
                      <a href={"/research4"}><div className="member-sub-item">SCCHS Heritage Journal</div></a>
                      <a href={"/heritage"}><div className="member-sub-item">Scchs Newsletters</div></a>
                      <a href="/genealogy-newsletter"><div className="member-sub-item">SCCHS Genealogy Newsletters</div></a>
                      <a href="/message-1"><div className="member-sub-item">SCCHS President Message</div></a>
                    </div>
                  )}

                  <a style={{ textDecoration: "none", color: "white" }} href="/member/myprofile"><div className="member-dropdown-item">My Profile</div></a>
                  <a style={{ textDecoration: "none", color: "white" }} href="/research"><div className="member-dropdown-item">Research</div></a>
                  <a style={{ textDecoration: "none", color: "white" }} href="/cementryrecord"><div className="member-dropdown-item">Cementry Records</div></a>
                  <a style={{ textDecoration: "none", color: "white" }} href="/member/memberlist"><div className="member-dropdown-item">Membership List</div></a>
                </div>
              )}
            </div>}

            {/* Static Items */}
            {staticItems.map((item) => (
              <div key={item.id} className="mobile-navbar-item">
                <div className="mobile-navbar-parent">
                  <a href={item.link}>{item.title}</a>
                </div>
              </div>
            ))}

            {/* Dynamic Items */}
            {navbarItems
              .filter(item => !(instaUser && item?.parentItems?.title === "JOIN US"))
              .map((item) => (
                <div key={item.parentId} className="mobile-navbar-item">
                  <div
                    className="mobile-navbar-parent"
                    onClick={() =>
                      setExpanded((prev) =>
                        prev === item.parentId ? null : item.parentId
                      )
                    }
                  >
                    <a href={item.parentItems.link}>{item.parentItems.title}</a>
                    {item.subItems.length > 0 && (
                      <span>{expanded === item.parentId ? "▲" : "▼"}</span>
                    )}
                  </div>
                  <div
                    className={`mobile-navbar-submenu ${expanded === item.parentId ? "expanded" : ""
                      }`}
                  >
                    {item.subItems.map((sub) => (
                      <a key={sub.id} href={sub.link}>
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

            <Link style={{ marginLeft: "auto" }} href={"/storeorder"}><div className="cart-container">

              <ShoppingCart />

              {countCart > 0 && <span className="cart-count">{countCart}</span>}

            </div></Link>
            <style jsx>{`
  .cart-container {
    position: relative;
    top:11px !important;
    width: 40px;
    height: 40px;
  }

  .cart-icon {
    width: 100%;
    height: 100%;
  }

  .cart-count {
    position: absolute;
    top: -6px;
    right: 7px;
    background-color: rgba(0, 49, 92, 1);
    color: white;
    font-size: 12px;
    width:20px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content: center;
    border-radius: 50%;
    font-weight: bold;
  }
                    `}</style>

            <li style={{ listStyle: "none", marginTop: "15px" }} className="test_sign">
              {instaUser ? <button onClick={() => {
                localStorage.removeItem("scchs_Access");
                localStorage.removeItem("scchs_User");
                setAccessToken(null)
                setInstaUser(null)
                toast.success("Logout successfully");
                window.location.href = "/"
              }}>Logout</button> : <Link href="/user/userlogin"><button>SIGN IN</button></Link>}
            </li>

            {instaUser && <div className="user-dropdown-wrapper">
              <div className="user-avatar" onClick={toggleDropdown112}>
                <img src="https://res.cloudinary.com/dgif730br/image/upload/v1748089475/user_xegqs3.png" alt="User" />
              </div>

              {isOpen1 && (
                <ul className="user-dropdown-menu">
                  {/* <li><a href="/cart">Add to Cart</a></li>
                  <li><a href="/order-history">Order History</a></li>
                  <li><a href="/logout">Logout</a></li> */}
                  <li><a href="/orderhistory">Order History</a></li>
                  {/* <a href="/eventhistory">🎫 Event Orders</a> */}
                  <li> <a href="/eventhistory">Event Order History</a></li>
                  <li><a href="/donationhistory">Donation History</a></li>
                  <li><a href="/storeorder">View Cart</a></li>
                  <li><a href="/join/memberplan">{membershipStatus === "active" ? "Purchase another plan" : "Purchase Plan"}</a></li>
                  {membershipStatus === "active" && <li><a href="/renew" style={{ cursor: "pointer" }}>Renew Online</a></li>}
                   {membershipStatus === "active" && usedSlot < allowedSlot && (
                        <li><a href="/join/register1">Create Member</a></li>
                      )}
                </ul>
              )}
            </div>}



          </div>
        </div>

        {/* end======================= */}

        {/* ipad mobile  */}
        {/* <div className="IpAD" onScroll={changeNavBg}>
          <header
            id={`${navBg ? "lower" : "lower_head"}`}
            className={style.header}
            style={navBg ? itemsSetting : itemsSetting}
            role="banner"
         
          >
            <div className="nav_cont">
              <div className="">
                <div id="some" className={style.headerParent}>
                  <div id="left_nav" className={style.hpLeft}>
                    <a href={"/"} aria-label="logo">
                      {settings?.default_logo == "" ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: settings?.text }}
                        ></div>
                      ) : settings ? (
                        <img className="kalish" src={`${navBg || currentPath === "/contact" || currentPath === "/address" || currentPath === "/epr-used-oil-testing" || currentPath === "/bis-isi-mark-foreign-manufacturers" || currentPath === "/bis-crs-mark" || currentPath === "/analytical-measurement-testing" || currentPath === "/bee-certification" || currentPath === "/labware-equipments" || currentPath === "/bis-mark" || currentPath === "/catalog" || currentPath === "/catalogdetail" || currentPath.startsWith("/catalogdetail") || currentPath === "/cart" || currentPath === "/accounts" || currentPath === "/bis-isi-foreign" || currentPath === "/bis-isi-domestic" || currentPath === "/epr-plastic-waste" || currentPath === "/epr-e-waste" || currentPath === "/epr-battery-waste" || currentPath === "/epr-used-oil" || currentPath === "/epr-tyre" || currentPath === "/peso-certification" || currentPath === "/nsic-msme" || currentPath === "/stqc-certification" || currentPath === "/fssai-registration" || currentPath === "/cdsco-registration" || currentPath === "/noc-steel" || currentPath === "/bee-certification" || currentPath === "/wpc-eta-certification" || currentPath === "/iso-certification" || currentPath === "/haccp" || currentPath === "/halal-certification" || currentPath === "/saber" || currentPath === "/g-mark-toys" || currentPath === "/g-mark-lved" || currentPath === "/sfda-rice" || currentPath === "/sfda-food" || currentPath === "/sfda-cosmetics" || currentPath === "/ce-certification" || currentPath === "/fcc-certification" || currentPath === "/imei-registration" || currentPath === "/tec-approval" || currentPath === "/imei-icdr-registration" || currentPath === "/account/account-details" ? "./images/sodag.svg" : "./images/sad.svg"}`} alt="" />
                      ) : (
                        ""
                      )}
                    </a>

                    <div
                      id="right_men"
                      className={
                        menuToggel == true
                          ? style.hpRight + " " + style.isMenuOpen
                          : style.hpRight
                      }
                    >
                      <ul className={style.navItems + " navItems"} role="menu">
                        {navbarItems != null &&
                          navbarItems?.length > 0 &&
                          navbarItems?.map((ls, i) => (
                            <li key={i}>

                              <a
                                href={
                                  ls?.parentItems?.link == null ||
                                    ls?.parentItems?.link == ""
                                    ? "#"
                                    : "" + ls?.parentItems?.link
                                }
                                target={
                                  ls?.parentItems?.linkType == "true"
                                    ? "_blank"
                                    : "_self"
                                }
                              >
                                {ls?.parentItems?.title}
                                {ls?.subItems?.length > 0 ? (
                                  <span className={style.menuIcon + " menuIcon"}>
                                    <GlobalArrowDown />
                                  </span>
                                ) : (
                                  ""
                                )}
                              </a>

                           
                              {ls?.subItems?.length > 0 ? (
                                <ul
                                  className={style.navItemsLeave1 + " navItemsLeave1"}
                                >
                                  {ls?.subItems?.length > 0 &&
                                    ls?.subItems?.map((lss, ii) => (
                                      <li key={ii}>
                                        <a
                                          className="listmi"
                                          href={
                                            lss.link == null || lss.link == ""
                                              ? "#"
                                              : lss.link
                                          }
                                          target={
                                            lss.linkType == "true"
                                              ? "_blank"
                                              : "_self"
                                          }
                                        >
                                          <nav
                                            style={{
                                              backgroundColor: "#065175",
                                              height: "54px",
                                              width: "950px",
                                              transform: "translateX(-13px)",
                                              marginTop: "30px",
                                              padding: "6px 50px",
                                              color: "white",
                                              fontWeight: "700",
                                              fontSize: "24px",
                                              borderBottom: "1.5px solid  #F07A40"
                                            }}
                                            className="fosty"
                                          >
                                            {ls.title}
                                          </nav>

                                          <div
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              padding: "50px",
                                              display: "flex",
                                              alignItems: "flex-start",
                                            }}
                                            className="klk"
                                          >
                                            <div
                                              style={{
                                                display: "grid",
                                                width: "40%",
                                                gridTemplateColumns: "repeat(2 , 1fr)",
                                                gap: "20px 50px",
                                                zIndex: "100",
                                                backgroundColor: "white"

                                              }}
                                              className="sosty"
                                            >


                                              <p className="hoving" style={{ color: "black" }}>{lss?.title}</p>

                                            </div>

                                            <img className="sofa" src="./images/rightimg.png" alt="" />

                                          </div>


                                          {lss?.childrenItems?.length > 0 ? (
                                            <span
                                              id={`${navBg ? "lll" : "kkkk"}`}
                                              className={style.menuIcon + " menuIcon"}
                                            >
                                              <GlobalArrowDown />
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </a>

                                        {lss?.childrenItems?.length > 0 ? (
                                          <div className="sofas">
                                            <ul
                                              id="iko"
                                              className={
                                                style.navItemsLeave2 + " navItemsLeave2"
                                              }
                                            >
                                              {lss?.childrenItems?.length > 0 &&
                                                lss?.childrenItems?.map((lsss, iii) => (
                                                  <li key={iii}>
                                                    <a
                                                      href={
                                                        lsss.link == null ||
                                                          lsss.link == ""
                                                          ? "#"
                                                          : lsss.link
                                                      }
                                                      target={
                                                        lsss.linkType == "true"
                                                          ? "_blank"
                                                          : "_self"
                                                      }
                                                    >
                                                      {lsss?.title}
                                                    </a>
                                                  </li>
                                                ))}
                                            </ul>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    ))}
                                </ul>
                              ) : (
                                ""
                              )}
                             
                            </li>
                          ))}

                        <div className="hj">
                          <div class="insta-certify-header-searchbar">
                            <div class="insta-certify-header-searchbar-menu">
                              <input
                                type="text"
                                placeholder="Search"
                                value={searchbar}
                                onChange={(e) => {
                                  setSearchbar(e.target.value)
                                }}
                                onKeyPress={()=>{
                                  router.push(`/products?search=${encodeURIComponent(searchbar)}`);
                                }}
                              />
                              <svg
                                onClick={() => {
                                  router.push(`/products?search=${encodeURIComponent(searchbar)}`);
                                  setMenuToggel(false)
                                 
                                }}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z"
                                  stroke="#808080"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="insta-cartify-bbtn">
                            <div className="insta-cartify-leftbttm">
                              <div className="headline">
                                <hr />
                              </div>
                              <div>
                                <svg
                                  width="25"
                                  height="25"
                                  viewBox="0 0 25 25"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.875 20.75V20.625C6.875 18.875 9.375 17.5 12.5 17.5C15.625 17.5 18.125 18.875 18.125 20.625V20.75C20.75 19 22.5 15.875 22.5 12.5C22.5 7 18 2.5 12.5 2.5C7 2.5 2.5 7 2.5 12.5C2.5 16 4.25 19 6.875 20.75ZM12.5 25C5.625 25 0 19.375 0 12.5C0 5.625 5.625 0 12.5 0C19.375 0 25 5.625 25 12.5C25 19.375 19.375 25 12.5 25ZM12.5 13.75C10.75 13.75 9.375 12.375 9.375 10.625C9.375 8.875 10.75 7.5 12.5 7.5C14.25 7.5 15.625 8.875 15.625 10.625C15.625 12.375 14.25 13.75 12.5 13.75Z"
                                    fill="#444444"
                                  />
                                </svg>
                              </div>
                              <div className="headline">
                                <hr />
                              </div>
                              <div>
                                <svg
                                  width={25}
                                  height={23}
                                  viewBox="0 0 25 23"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_290_478)">
                                    <path
                                      d="M8.33333 4.05882H25L22.2222 16.2353H5.55556V2.70588H0V0H8.33333V4.05882ZM8.33333 6.76471V13.5294H20L21.5278 6.76471H8.33333ZM5.55556 23V20.2941H10.6944V23H5.55556ZM15.2778 23V20.2941H20.4167V23H15.2778Z"
                                      fill="#444444"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_290_478">
                                      <rect width={25} height={23} fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                              <div className="headline">
                                <hr />
                              </div>
                            </div>
                            <div className="insta-cartify-flex">
                              <svg
                                width={52}
                                height={40}
                                viewBox="0 0 52 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 30C17.5228 30 22 25.5228 22 20C22 14.4772 17.5228 10 12 10C6.47715 10 2 14.4772 2 20C2 25.5228 6.47715 30 12 30Z"
                                  stroke="#7D7D7D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2 20H22"
                                  stroke="#7D7D7D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 10C14.5013 12.7384 15.9228 16.292 16 20C15.9228 23.708 14.5013 27.2616 12 30C9.49872 27.2616 8.07725 23.708 8 20C8.07725 16.292 9.49872 12.7384 12 10Z"
                                  stroke="#7D7D7D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M34.5134 16.288L33.9214 19.664H37.7614L37.5214 21.072H33.6814L33.0574 24.576H37.3774L37.1214 26H30.9774L32.9454 14.864H39.0894L38.8334 16.288H34.5134ZM45.4 17.04C46.328 17.04 47.064 17.2907 47.608 17.792C48.1627 18.2827 48.44 18.992 48.44 19.92C48.44 20.1547 48.4133 20.448 48.36 20.8L47.432 26H45.624L46.504 21.072C46.5467 20.7733 46.568 20.56 46.568 20.432C46.568 19.8453 46.4027 19.3973 46.072 19.088C45.752 18.7787 45.304 18.624 44.728 18.624C44.0347 18.624 43.448 18.8373 42.968 19.264C42.4987 19.68 42.2 20.2827 42.072 21.072V21.024L41.192 26H39.368L40.92 17.184H42.744L42.568 18.208C42.9307 17.8453 43.3573 17.5627 43.848 17.36C44.3493 17.1467 44.8667 17.04 45.4 17.04Z"
                                  fill="#7D7D7D"
                                />
                              </svg>
                              <span>
                                <svg
                                  width={14}
                                  height={8}
                                  viewBox="0 0 14 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M1 1L7 7L13 1"
                                    stroke="#7D7D7D"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </ul>

                      <ul id="jhjhj" className={style.navItemsUser} style={{ display: "none", opacity: "0" }}>
                        <li>
                          <span
                            onClick={() => setAuthPopup((value) => !value)}
                            ref={refAuthPopup}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.8" clip-path="url(#clip0_295_359)">
                                <path d="M6.6 19.92V19.8C6.6 18.12 9 16.8 12 16.8C15 16.8 17.4 18.12 17.4 19.8V19.92C19.92 18.24 21.6 15.24 21.6 12C21.6 6.72 17.28 2.4 12 2.4C6.72 2.4 2.4 6.72 2.4 12C2.4 15.36 4.08 18.24 6.6 19.92ZM12 24C5.4 24 0 18.6 0 12C0 5.4 5.4 0 12 0C18.6 0 24 5.4 24 12C24 18.6 18.6 24 12 24ZM12 13.2C10.32 13.2 9 11.88 9 10.2C9 8.52 10.32 7.2 12 7.2C13.68 7.2 15 8.52 15 10.2C15 11.88 13.68 13.2 12 13.2Z" fill="#444444" />
                              </g>
                              <defs>
                                <clipPath id="clip0_295_359">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>

                          </span>
                          {authPopup == true ? (
                            <div className={style.hdrAuthPopup}>
                              <div className={style.apParent}>
                                <div className={style.apLeft}>
                                  <span>
                                    Go to Account to <br /> download QR Code
                                  </span>
                                  <GlobalVerified />
                                </div>
                                <div className={style.apRight}>
                                  <ul>
                                    {accessToken == null ||
                                      typeof accessToken == "undefined" ? (
                                      <>
                                       
                                        <li>
                                          <Link href={"/login"}>login</Link>
                                        </li>
                                        <li>
                                          <Link href={"/create-account"}>
                                            Create on account
                                          </Link>
                                        </li>
                                      </>
                                    ) : (
                                      <>
                                        <li>
                                          <Link href={"/cart"}>View Cart</Link>
                                        </li>
                                        <li>
                                          <Link href={"/account/order"}>Orders</Link>
                                        </li>
                                        <li>
                                          <Link href={"/accounts"}>
                                            Account info
                                          </Link>
                                        </li>
                                        <li>
                                          <a onClick={() => {
                                            localStorage.removeItem("insta_Access")
                                            localStorage.removeItem("insta_User")
                                            setAccessToken(null)
                                            setInstaUser(null)
                                            alert("Successfuly logout");
                                            window.location.href = "/";

                                          }}>
                                            <span>Logout</span>
                                          </a>
                                        </li>
                                      </>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>

                        {accessToken == null ? (
                          <>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/cart"}>
                                <GlobalCart /> View Cart
                              </Link>
                            </li>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/login"}>
                                <GlobalLogin /> login
                              </Link>
                            </li>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/create-account"}>
                                <GlobalAccount /> Create on account
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/cart"}>
                                <GlobalCart /> View Cart
                              </Link>
                            </li>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/account/order"}>
                                <GlobalOrder /> Orders
                              </Link>
                            </li>
                            <li className={style.navUserLinkMobile}>
                              <Link href={"/account/account-details"}>
                                <GlobalAccount /> Account info
                              </Link>
                            </li>
                            <li className={style.navUserLinkMobile}>
                              <a onClick={() => {
                                localStorage.removeItem("insta_Access")
                                localStorage.removeItem("insta_User")
                                setAccessToken(null)
                                setInstaUser(null)
                                alert("Successfuly logout");
                                window.location.href = "/";

                              }}>
                                <span>Logout</span>
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div
                      className={style.hdrToggelIcon}
                      onClick={() => setMenuToggel((value) => !value)}
                    >
                      {menuToggel == true ? <GlobalClose /> : <GlobalMenu navBg={navBg} currentPath={currentPath} />}
                    </div>
                    
                    <div className="search_das">
                      <input onChange={(e) => {
                        setSearchbar(e.target.value);
                        router.push(`/products?search=${encodeURIComponent(searchbar)}`);
                        }}  onKeyPress={()=>{
                          router.push(`/products?search=${encodeURIComponent(searchbar)}`);
                        }} value={searchbar} type="text" placeholder="Search" />
                      <svg
                        onClick={() => {

                          router.push(`/products?search=${encodeURIComponent(searchbar)}`);

                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.7547 13.7078V13.9149L14.9012 14.0614L19.4113 18.5713L18.5724 19.4111L14.0604 14.9006L13.7497 14.59L13.4017 14.8581C11.7892 16.1004 9.76435 16.6824 7.73832 16.4858C5.71229 16.2893 3.83703 15.329 2.49341 13.7999C1.14979 12.2709 0.438561 10.2878 0.504167 8.25341C0.569772 6.21901 1.40729 4.28585 2.84664 2.84656C4.28598 1.40727 6.21921 0.56977 8.2537 0.504166C10.2882 0.438563 12.2714 1.14977 13.8005 2.49335C15.3295 3.83692 16.2899 5.7121 16.4864 7.73805C16.683 9.764 16.101 11.7888 14.8587 13.4012L14.7547 13.5361V13.7064V13.7078ZM18.724 19.5626L18.7236 19.5622C18.7238 19.5625 18.724 19.5627 18.7242 19.5629L18.724 19.5626ZM8.50489 15.9684C9.48508 15.9684 10.4557 15.7753 11.3612 15.4002C12.2668 15.0251 13.0897 14.4754 13.7828 13.7823C14.4759 13.0892 15.0257 12.2664 15.4008 11.3609C15.7759 10.4553 15.9689 9.48475 15.9689 8.50459C15.9689 7.52443 15.7759 6.55386 15.4008 5.64831C15.0257 4.74276 14.4759 3.91996 13.7828 3.22688C13.0897 2.53381 12.2668 1.98403 11.3612 1.60894C10.4557 1.23385 9.48508 1.04079 8.50489 1.04079C6.52531 1.04079 4.6268 1.82715 3.22702 3.22688C1.82724 4.62661 1.04085 6.52506 1.04085 8.50459C1.04085 10.4841 1.82724 12.3826 3.22702 13.7823C4.6268 15.182 6.52531 15.9684 8.50489 15.9684Z"
                          stroke="#808080"
                        />
                      </svg>
                    </div>
                    <div className="insta-cartify-bbtn">
                      <div className="insta-cartify-leftbttm">
                        <div>

                          <ul id="hjhj" className={style.navItemsUser} style={{ display: "block" }}>
                            <li>
                              <span
                                onClick={() => setAuthPopup1((value) => !value)}
                                ref={refAuthPopup1}
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g opacity="0.8" clip-path="url(#clip0_295_359)">
                                    <path d="M6.6 19.92V19.8C6.6 18.12 9 16.8 12 16.8C15 16.8 17.4 18.12 17.4 19.8V19.92C19.92 18.24 21.6 15.24 21.6 12C21.6 6.72 17.28 2.4 12 2.4C6.72 2.4 2.4 6.72 2.4 12C2.4 15.36 4.08 18.24 6.6 19.92ZM12 24C5.4 24 0 18.6 0 12C0 5.4 5.4 0 12 0C18.6 0 24 5.4 24 12C24 18.6 18.6 24 12 24ZM12 13.2C10.32 13.2 9 11.88 9 10.2C9 8.52 10.32 7.2 12 7.2C13.68 7.2 15 8.52 15 10.2C15 11.88 13.68 13.2 12 13.2Z" fill="#444444" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_295_359">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>



                              </span>
                              {authPopup1 == true ? (
                                <div className={style.hdrAuthPopup}>
                                  <div className={style.apParent}>
                                    <div className={style.apLeft}>
                                      <span>
                                        Go to Account to <br /> download QR Code
                                      </span>
                                      <GlobalVerified />
                                    </div>
                                    <div className={style.apRight}>
                                      <ul>
                                        {userSession == null ||
                                          typeof userSession == "undefined" ? (
                                          <>
                                            <li>
                                              <Link href={"/cart"}>View Cart</Link>
                                            </li>
                                            <li>
                                              <Link href={"/login"}>login</Link>
                                            </li>
                                            <li>
                                              <Link href={"/create-account"}>
                                                Create on account
                                              </Link>
                                            </li>
                                          </>
                                        ) : (
                                          <>
                                            <li>
                                              <Link href={"/cart"}>View Cart</Link>
                                            </li>
                                            <li>
                                              <Link href={"/account/order"}>Orders</Link>
                                            </li>
                                            <li>
                                              <Link href={"/accounts"}>
                                                Account info
                                              </Link>
                                            </li>
                                            <li>
                                              <Link href={"/logout"}>Logout</Link>
                                            </li>
                                          </>
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </li>

                            {userSession == null ? (
                              <>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/cart"}>
                                    <GlobalCart /> View Cart
                                  </Link>
                                </li>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/login"}>
                                    <GlobalLogin /> login
                                  </Link>
                                </li>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/create-account"}>
                                    <GlobalAccount /> Create on account
                                  </Link>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/cart"}>
                                    <GlobalCart /> View Cart
                                  </Link>
                                </li>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/account/order"}>
                                    <GlobalOrder /> Orders
                                  </Link>
                                </li>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/accounts"}>
                                    <GlobalAccount /> Account info
                                  </Link>
                                </li>
                                <li className={style.navUserLinkMobile}>
                                  <Link href={"/logout"}>
                                    <GlobalLogout /> Logout
                                  </Link>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>
                        <div className="headline">
                          <hr />
                        </div>
                        <div className="safaio">
                          {
                            userSession == null || typeof userSession == "undefined" ? <Link href={"/cart"}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g opacity="0.8" clip-path="url(#clip0_295_362)">
                                <path d="M8 4.23529H24L21.3333 16.9412H5.33333V2.82353H0V0H8V4.23529ZM8 7.05882V14.1176H19.2L20.6667 7.05882H8ZM5.33333 24V21.1765H10.2667V24H5.33333ZM14.6667 24V21.1765H19.6V24H14.6667Z" fill="#444444" />
                              </g>
                              <defs>
                                <clipPath id="clip0_295_362">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            </Link> :
                              <Link href={"/cart"}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g opacity="0.8" clip-path="url(#clip0_295_362)">
                                    <path d="M8 4.23529H24L21.3333 16.9412H5.33333V2.82353H0V0H8V4.23529ZM8 7.05882V14.1176H19.2L20.6667 7.05882H8ZM5.33333 24V21.1765H10.2667V24H5.33333ZM14.6667 24V21.1765H19.6V24H14.6667Z" fill="#444444" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_295_362">
                                      <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </Link>

                          }
                          <p>Cart</p>
                        </div>
                        <div className="headline">
                          <hr />
                        </div>
                      </div>
                      <div className="insta-cartify-flex">
                        <svg
                          width={52}
                          height={40}
                          viewBox="0 0 52 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 30C17.5228 30 22 25.5228 22 20C22 14.4772 17.5228 10 12 10C6.47715 10 2 14.4772 2 20C2 25.5228 6.47715 30 12 30Z"
                            stroke="#7D7D7D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 20H22"
                            stroke="#7D7D7D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 10C14.5013 12.7384 15.9228 16.292 16 20C15.9228 23.708 14.5013 27.2616 12 30C9.49872 27.2616 8.07725 23.708 8 20C8.07725 16.292 9.49872 12.7384 12 10Z"
                            stroke="#7D7D7D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M34.5134 16.288L33.9214 19.664H37.7614L37.5214 21.072H33.6814L33.0574 24.576H37.3774L37.1214 26H30.9774L32.9454 14.864H39.0894L38.8334 16.288H34.5134ZM45.4 17.04C46.328 17.04 47.064 17.2907 47.608 17.792C48.1627 18.2827 48.44 18.992 48.44 19.92C48.44 20.1547 48.4133 20.448 48.36 20.8L47.432 26H45.624L46.504 21.072C46.5467 20.7733 46.568 20.56 46.568 20.432C46.568 19.8453 46.4027 19.3973 46.072 19.088C45.752 18.7787 45.304 18.624 44.728 18.624C44.0347 18.624 43.448 18.8373 42.968 19.264C42.4987 19.68 42.2 20.2827 42.072 21.072V21.024L41.192 26H39.368L40.92 17.184H42.744L42.568 18.208C42.9307 17.8453 43.3573 17.5627 43.848 17.36C44.3493 17.1467 44.8667 17.04 45.4 17.04Z"
                            fill="#7D7D7D"
                          />
                        </svg>

                        <span>
                          <svg
                            width={14}
                            height={8}
                            viewBox="0 0 14 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 1L7 7L13 1"
                              stroke="#7D7D7D"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>



               


                </div>
              </div>
            </div>

            {settings?.background_image != null &&
              settings?.background_image != "" ? (
              <Image
                className={style.headerImage}
                src={settings?.background_image}
                width="200"
                height="212"
                alt={"Background"}
                quality={100}
              />
            ) : (
              ""
            )}
          </header>
        </div>  */}

      </>
    );
  }
}
