import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import Link from "next/link";
import { useRouter } from "next/router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

var settingsMorePhotos = {
  arrows: true,
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
};

const planss = [
  { name: 'Individual', for: 'person(s)', members: '1', fee: '$30.00', description: 'See JOIN US > Member Benefits section.' },
  // { name: 'Individual - Facebook Group Member', for: 'person(s)', members: '1', fee: '$25.00', description: 'See JOIN US > Member Benefits section' },
  { name: 'Family', for: 'person(s)', members: '2', fee: '$45.00', description: 'See JOIN US > Member Benefits section.' },
  // { name: 'Family - Facebook Group Member', for: 'person(s)', members: '2', fee: '$40.00', description: 'See JOIN US > Member Benefits section' },
  { name: 'Blanchette', for: 'person(s)', members: '2', fee: '$100.00', description: 'See JOIN US > Member Benefits section.' },
  { name: 'DuSable', for: 'person(s)', members: '2', fee: '$175.00', description: 'See JOIN US > Member Benefits section.' },
  { name: 'Boone', for: 'person(s)', members: '2', fee: '$250.00', description: 'See JOIN US > Member Benefits section.' },
  { name: 'Alexander McNair', for: 'person(s)', members: '2', fee: '$1000.00', description: 'See JOIN US > Member Benefits section.' },
  { name: 'Business', for: 'person(s)', members: '1', fee: '$150.00', description: 'See JOIN US > Member Benefits section.' },
];



// const itemsPerPage = 10;
export default function memberplan(pageProp) {

  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);


  const [accessToken, setAccessToken] = useState(null);
  const [instaUser, setInstaUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensures code only runs in the browser
      const storedAccessToken = localStorage.getItem("scchs_Access");
      const storedInstaUser = localStorage.getItem("scchs_User");

      setAccessToken(storedAccessToken ? JSON.parse(storedAccessToken) : null);
      setInstaUser(storedInstaUser ? JSON.parse(storedInstaUser) : null);
    }
  }, []);

  console.log(accessToken);
  console.log(instaUser?.id);

  

  

  const fetchPlan = async () => {
    try {

      const resp = await fetch("https://uat.scchs.co.in/api/get/subscription/plan", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      const formateddata = await resp.json();
      console.log(formateddata.data);
      setPlans(formateddata?.data);




    } catch (error) {

      console.error("There was an error fetching the categories:", error);
    }
  };

  const handleNext = () => {
    const plan = plans.find((p) => p.id.toString() === selectedPlanId);
    console.log(plan);

    if (!plan) {
      toast.error("Please select a plan");
      return;
    }
    setSelectedPlan(plan);
    console.log(selectedPlan)
    // console.log(selectedPlan.price)

    setShowPayPal(true);
  };

  // console.log(selectedPlan.price)

  // const handlePurchaseSuccess = async (details) => {
  //   try {
  //     const response = await fetch("https://uat.scchs.co.in/api/membership/purchase", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       //  "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`,
  //       body: JSON.stringify({
  //         user_id: instaUser.id,
  //         membership_plan_id: selectedPlan.id,
  //         amount: selectedPlan.price,
  //         transaction_id: details.id,
  //         payerEmail: details.payer.email_address,
  //         currency: "USD"
  //       }),
  //     });

  //     if (!response.ok) throw new Error("Purchase failed");

  //     toast.success("Payment successful!");
  //   } catch (err) {
  //     toast.error("Purchase failed after payment");
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    fetchPlan();
  }, [])

  const [showPaypal, setShowPaypal] = useState(false);

  const [hasSameActivePlan, setHasSameActivePlan] = useState(false);

  useEffect(() => {
    if (selectedPlan && instaUser) {
      setShowPaypal(true);
    }
  }, [selectedPlan, instaUser]);


  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser?.id}`);
        const data = await res.json();
  
        const today = new Date();
  
        const alreadyPurchased = data?.data?.some(plan => {
          const isSamePlan = plan.membership_plan_id === selectedPlan.id;
          const isActive = plan.status === "active";
          const endDate = new Date(plan.end_date); // assuming `end_date` is in ISO format
          const stillValid = endDate >= today;
  
          return isSamePlan && isActive && stillValid;
        });
  
        setHasSameActivePlan(alreadyPurchased);
      } catch (err) {
        console.error("Error checking membership:", err);
      }
    };
  
    if (instaUser?.id && selectedPlan?.id) {
      checkMembership();
    }
  }, [instaUser?.id, selectedPlan?.id]);
  


  return (

    <div className="page_shopping_list sop">
      <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

      <HeadSEO1 />

      <div className="event_system_main event_system_main1">
        <div className="event_main">

          

          {
            accessToken ? <div className="scchs-wrapper">

              <div className="scchs-new-membership">
                <h2 className="scchs-title">New Membership</h2>
                <p className="scchs-non-refundable">
                  ANNUAL MEMBERSHIP DUES ARE NOT REFUNDABLE
                </p>
                <p className="scchs-note">
                  NOTE: If you are already a member you should{" "}
                  <a href="/signin" className="scchs-sign-in-link">
                    SIGN IN
                  </a>{" "}
                  and do an Online Renew instead of an Online Join.
                </p>
                <p className="scchs-business-note">
                  If you are purchasing a <strong>Business Membership</strong>, please
                  enter the name of your company when asked to do so. Otherwise, please
                  enter N/A as a company name.
                </p>
                {/* <button type="button" onClick={handleNext} className="scchs-next-btn">Next</button> */}
              </div>

              <div className="scchs-membership-plan">
                <h3 className="scchs-plan-title">Membership Plan</h3>
                <select value={selectedPlanId}
                  onChange={(e) => {
                    setSelectedPlanId(e.target.value);
                    setShowPayPal(false);
                  }} className="scchs-plan-dropdown">
                  <option>Select Membership Plan</option>
                  {
                    plans?.map((val, index) => {
                      return <option key={index} value={val?.id}>{val?.name}</option>
                    })
                  }
                  {/* <option>Individual Membership</option>
                                    <option>Business Membership</option> */}
                </select>
              </div>

              <div className="table-container">
                <h2 className="table-title">Membership Plans Offered</h2>


                <div className="scch-table-container scch_sety">
                  <table className="scch-member-table ss_mem_tb">
                    <thead>
                      <tr>
                        <th className="nh1">Plan Name</th>
                        {/* <th className="nh1">For</th> */}
                        <th>Maximum Associated Members</th>
                        <th>Annual Fee</th>
                        {/* <th>Description</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          {/* <td>{item.for}</td> */}
                          <td>
                            {/* {item?.members} */}
                            {item?.allow_member}
                          </td>
                          <td>
                            {/* {item?.fee} */}
                            ${item?.price}
                          </td>
                          {/* <td>
                            {item?.description}
                          </td> */}
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
                <button onClick={handleNext} type="button" className="scchs_hj_btn">Next</button>

                {/* {showPayPal && selectedPlan && (
                                <div className="mt-6">
                                    <PayPalScriptProvider options={{ "client-id": "AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy", currency: "USD" }}>
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: selectedPlan.price.toFixed(2),
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                const details = await actions.order.capture();
                                                console.log(details);
                                                handlePurchaseSuccess(details);
                                            }}
                                            onError={(err) => {
                                                toast.error("PayPal error");
                                                console.error(err);
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                </div>
                            )} */}



                {showPaypal && selectedPlan && (
                  <PayPalScriptProvider options={{ "client-id": "AQ5IvOr3xtXtOErP6Wwm9BYdiVPIZEvLr13wcS53uRxxWIuXYJL9l77bDYw5d7sJCme18awK5iEsTjAy", currency: "USD" }}>
                    {
                      hasSameActivePlan ?   <div className="text-red-600 font-semibold">
                      You have already purchased this membership.
                    </div> :  
                     <PayPalButtons
                    //  onClick={(data, actions) => {
                    //   if (hasSameActivePlan) {
                    //     alert("You already purchased this plan and it's still active.");
                    //     return actions.reject();
                    //   }
                    //   return actions.resolve();
                    // }}
                     style={{ layout: "vertical" }}

                     
                     
                     createOrder={async (data, actions) => {
                      
                       const amount = Number(selectedPlan?.price || 0).toFixed(2);
                       console.log("Creating PayPal order for amount:", amount);
                       return actions.order.create({
                         purchase_units: [
                           {
                             amount: {
                               value: amount // like "45.00"
                             },
                           },
                         ],
                       });


                     }}


                     onApprove={async (data, actions) => {

                      
                       try {
                        
                         const details = await actions.order.capture();
                         console.log(details?.id);
                         console.log("Payment Successful:", details);
                         //  console.log(details?.pri)
                         const payload = {
                           user_id: parseInt(instaUser.id),
                           membership_plan_id: parseInt(selectedPlan.id),
                           amount: selectedPlan.price.toFixed(2),
                           transaction_id: details.id,
                           // status: "success", 
                           status: details?.status,
                           currency: "USD",
                           payment_gateway: "paypal"
                         };

                         console.log(payload);

                         const response = await fetch("https://uat.scchs.co.in/api/membership/purchase", {
                           method: "POST",
                           headers: {
                             "Content-Type": "application/json",
                           },
                           body: JSON.stringify(payload),
                         });

                         const result = await response.json();
                         console.log("Purchase API response:", result);

                         toast.success("membership plan purchased successfully")
                         window.location.href = "/member/welcomemember";
                         

                         // Optional: show success message or redirect
                       } catch (error) {
                         console.error("Error during payment or API call:", error);
                       }
                     }}
                     onError={(err) => {
                       alert(`payment succesfull of ${selectedPlan.price}`);
                     }}
                   />
                    }
                   
                  </PayPalScriptProvider>
                )}


                {/* {showPaypal && (
                                    <PayPalScriptProvider options={{ "client-id": "AQUoEi-7BxQtfIAz4ulCu1obszrCBZ5NXJQriaMbotUhBEa0_7yJLUrYG7QbTqpOJM-FyoViTuYduBZz", currency: "USD" }}>
                                        <PayPalButtons
                                            style={{ layout: "vertical" }}
                                            createOrder={async (data, actions) => {
                                                const amount = Number(selectedPlan?.price || 0).toFixed(2);
                                                console.log("Creating PayPal order for amount:", amount);
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: amount,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (data, actions) => {
                                                try {
                                                    const details = await actions.order.capture();
                                                    console.log("Payment Successful:", details);

                                                    // Map PayPal status to your Laravel API expected status
                                                    const statusMap = {
                                                        completed: "success",
                                                        failed: "failed",
                                                        pending: "pending",
                                                    };

                                                    const payload = {
                                                        user_id: parseInt(instaUser.id),
                                                        membership_plan_id: parseInt(selectedPlan.id),
                                                        transaction_id: details.id,
                                                        amount: parseFloat(selectedPlan.price).toFixed(2),
                                                        currency: details.purchase_units?.[0]?.amount?.currency_code || "USD",
                                                        status: statusMap[details.status.toLowerCase()] || "pending",
                                                        payment_gateway: "paypal",
                                                    };

                                                    console.log("Sending payload to Laravel API:", payload);

                                                    const response = await fetch("https://uat.scchs.co.in/api/membership/purchase", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify(payload),
                                                    });

                                                    const result = await response.json();
                                                    console.log("Laravel API response:", result);

                                                    if (response.ok) {
                                                        alert("Membership Purchased Successfully!");
                                                    } else {
                                                        alert("Error: " + result.message);
                                                    }
                                                } catch (error) {
                                                    console.error("Error during payment or API call:", error);
                                                    alert("Something went wrong while purchasing membership.");
                                                }
                                            }}
                                            onError={(err) => {
                                                console.error("PayPal Error:", err);
                                                alert("PayPal payment failed.");
                                            }}
                                        />
                                    </PayPalScriptProvider>
                                )} */}
              </div>
            </div> :
              <div>
                <h1 style={{ textAlign: "center" }}>Need to login for purchase membership plan</h1>
                <Link style={{ textDecoration: "none" }} href={"/user/userlogin"}> <button className="scchs_hj_btn">Sign In</button></Link>
              </div>
          }




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