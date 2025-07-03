import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';


export default function Footer(footerProps) {
  const [data, setData] = useState({});
  if (typeof footerProps.footerProps == "undefined" || footerProps.footerProps == false) { return ""; }
  else {

    const footerData = footerProps.footerProps;

    // console.log(footerData.footer_logo);

    let footerItems = null;
    console.log(footerItems)
    if (footerData?.items) {
      footerItems = JSON.parse(JSON.parse(footerData?.items));
      console.log(footerItems);
    }

    const fetchFooter = async () => {
      try {
        const resp = await fetch("https://uat.scchs.co.in/api/footer", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }

        });

        const formdata = await resp.json();
        console.log(formdata);
        setData(formdata?.data);
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchFooter();
    }, [])

    const itemsSetting = {
      "--footerBCColor": footerData?.background_color,
      "--footerItemColor": footerData?.parent_text_color,
      "--footerItemHoverColor": footerData?.parent_text_hover_color
    }

    const stop = (e) => {
      document.getElementById("jj").style.scrollBehavior = "none"
    }

    const [value, setValue] = useState({
      name: "",
      email: "",
      phone: "",
      message: ""
    })

    const changeHandler = (e) => {
      const { name, value } = e.target;

      if (name === "phone" && value.length > 10) {
        return
      }

      setValue((prev) => ({
        ...prev,
        [name]: value
      }))
    }

    const handleRecaptchaChange = (value) => {
      console.log('Captcha value:', value);
    };

    const [sendvalue, setsetndvalue] = useState(false);






    return (


      <>
        <footer
          className="site-footer style1"
        >
          <div className="footer-top">
            <div className="container amrgin-left10px">
              {/* row */}
              <div className="rwing ">

                <div className="rwing1">
                  <div className="widget widget_getintuch" height="240px">
                    <div className='foot_logs'>
                      {/* https://res.cloudinary.com/dgif730br/image/upload/v1743836030/SCCHS_Logo_vFINAL_1_1_1_valuvw.svg */}
                      <img src={data?.footer_logo} alt='hh' />
                    </div>

                    <div className='footer_para'>

                      <div dangerouslySetInnerHTML={{ __html: data?.sub_title }} />
                      {/* The St. Charles County Historical Society (SCCHS) is a 501(c)(3) nonprofit organization focused on preserving the history and genealogy of St. Charles County. */}

                    </div>
                    {/* <h4 className="footer-title kl_title">Contact Us</h4>

                    <ul className="contactus-footer font-opensans">
                      <li >
                        <div className='cort'>
                          <svg width="19" height="29" viewBox="0 0 19 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2589_829)">
                              <path d="M19 9.86526C18.9911 11.4905 18.5705 13.0019 17.7783 14.4147C15.2492 18.9248 12.7179 23.4338 10.1676 27.9328C10.0241 28.1847 9.72033 28.4772 9.46776 28.5002C9.26636 28.5177 8.95815 28.1913 8.82129 27.9504C6.27327 23.4513 3.72748 18.95 1.21395 14.4312C-1.93825 8.76677 1.333 1.92065 7.7687 0.667734C12.9226 -0.335473 18.1032 3.27761 18.8454 8.39988C18.9155 8.88505 18.9488 9.3757 18.9989 9.86417L19 9.86526ZM9.49001 5.20188C6.87634 5.20188 4.74669 7.27948 4.73333 9.84336C4.71998 12.3842 6.873 14.5177 9.46108 14.5286C12.0803 14.5396 14.2578 12.4083 14.2456 9.84445C14.2333 7.28167 12.1037 5.20188 9.49001 5.20188Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2589_829">
                                <rect width="19" height="28" fill="white" transform="translate(0 0.5)" />
                              </clipPath>
                            </defs>
                          </svg>
                          <h4>ADDRESS (CORPORATE <br /> OFFICE)</h4>
                        </div>

                        <span className='bas'>A-34, Sector 63 A, Noida, <br />
                          Uttar Pradesh 201307</span>

                      </li>

                      <li >
                        <div className='cort'>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3558 0.00792976C12.1328 -0.0240483 11.9087 0.0419064 11.7304 0.183809C11.5472 0.32771 11.4326 0.535567 11.4077 0.768408C11.355 1.23908 11.6946 1.66479 12.1646 1.71776C15.4063 2.07951 17.9259 4.60477 18.2904 7.85654C18.3392 8.29224 18.7047 8.62101 19.1409 8.62101C19.1738 8.62101 19.2057 8.61902 19.2385 8.61502C19.4666 8.59004 19.6697 8.47711 19.8132 8.29724C19.9556 8.11736 20.0203 7.89351 19.9944 7.66467C19.5403 3.60746 16.4002 0.45862 12.3558 0.00792976ZM12.4181 3.48994C11.942 3.402 11.5048 3.70579 11.4142 4.17047C11.3236 4.63515 11.6283 5.08884 12.0914 5.17978C13.4857 5.45159 14.5623 6.53085 14.8351 7.92989V7.93089C14.9128 8.33361 15.2674 8.62641 15.6757 8.62641C15.7305 8.62641 15.7852 8.62141 15.841 8.61142C16.3041 8.51849 16.6088 8.0658 16.5182 7.60012C16.1109 5.51055 14.5025 3.89666 12.4181 3.48994ZM14.0001 13.0905C14.4515 12.8302 14.9615 12.5362 15.6047 12.673C16.1873 12.7959 18.1731 14.4078 18.7169 14.9665C19.0734 15.3322 19.2716 15.7099 19.3025 16.0877C19.3562 17.5697 17.3425 19.2615 16.976 19.4724C16.489 19.8231 15.9224 20 15.286 20C14.6357 20 13.9106 19.8151 13.1199 19.4464C8.82956 17.6556 2.27553 11.231 0.542661 6.97395C-0.17638 5.38903 -0.18136 4.08193 0.53071 3.09961C0.814542 2.63892 2.43288 0.713245 3.88192 0.774204C4.26733 0.807181 4.64179 1.00505 5.00928 1.3648C5.56499 1.90942 7.13653 3.90106 7.25803 4.48565C7.39247 5.13521 7.09769 5.65185 6.83576 6.10554C6.7799 6.20307 6.70463 6.31881 6.62217 6.4456C6.3092 6.92683 5.89264 7.56735 6.04004 7.97626C7.09669 10.5705 9.53764 12.8339 12.133 13.8972C12.5343 14.0431 13.1745 13.6235 13.6542 13.3092C13.7791 13.2273 13.8932 13.1525 13.9893 13.0967L14.0001 13.0905Z" fill="white" />
                          </svg>
                          <h4>PHONE</h4>
                        </div>

                        <a style={{ textDecoration: "none" }} href='tel:+919999118039'><span className='bas'>+91 9999118039</span></a>
                      </li>

                      <li>
                        <div className='cort'>
                          <svg className='oklo' width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2589_914)">
                              <path d="M18.9907 0.125222C18.8392 0.288556 18.7564 0.383444 18.6674 0.472111C16.0029 3.136 13.3385 5.79911 10.6733 8.46222C10.1609 8.974 9.83983 8.97478 9.32897 8.46378C6.66376 5.80067 3.99934 3.13756 1.33491 0.472889C1.24508 0.383444 1.1615 0.287778 1.01074 0.126C1.3107 0.0754445 1.53488 0.00466667 1.75828 0.00466667C7.25273 -0.00155556 12.7472 -0.00155556 18.2409 0.00466667C18.465 0.00466667 18.6884 0.0746667 18.9907 0.125222Z" fill="white" />
                              <path d="M12.8825 7.89824C14.9072 9.88857 16.9045 11.8517 18.9604 13.8731C18.6949 13.9214 18.4746 13.9952 18.2543 13.996C12.7473 14.0022 7.23961 14.0022 1.73266 13.996C1.52098 13.996 1.30851 13.9276 1.07886 13.8871C3.11526 11.8859 5.11104 9.92513 7.14432 7.92779C7.58956 8.37268 8.12698 8.91091 8.66673 9.44602C9.16666 9.94302 9.77125 10.1468 10.4485 9.94302C10.7703 9.84657 11.089 9.65213 11.339 9.42579C11.8951 8.92335 12.4076 8.37346 12.8825 7.89746V7.89824Z" fill="white" />
                              <path d="M0.115607 12.9105C0.0835807 12.7184 0.00703015 12.4672 0.00624902 12.2167C-0.00234338 8.7424 -0.00156226 5.26807 0.0054679 1.79451C0.0054679 1.54329 0.0788939 1.29207 0.114045 1.06885C2.1317 3.06307 4.12904 5.03863 6.1053 6.99162C4.1431 8.93062 2.14263 10.907 0.115607 12.9105Z" fill="white" />
                              <path d="M19.8712 12.9879C17.8207 10.9587 15.8296 8.987 13.8557 7.03245C15.8538 5.05845 17.8543 3.08211 19.8727 1.08789C19.9071 1.26834 19.993 1.51022 19.9938 1.75211C20.0024 5.25134 20.0024 8.75134 19.9938 12.2506C19.9938 12.4886 19.9165 12.7273 19.8712 12.9871V12.9879Z" fill="white" />
                            </g>
                            <defs>
                              <clipPath id="clip0_2589_914">
                                <rect width="20" height="14" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>

                          <h4>EMAIL</h4>
                        </div>

                        <a style={{ textDecoration: "none" }} href='mailto:contact@instacertify.com'><span className='bas bask1'>Contact@instacertify.com</span></a>
                      </li>

                    </ul> */}

                  </div>
                </div>

                {
                  // <p>{data?.footer_1}</p>
                }



                {/* <div className="rwing2">
                  <div className="widget ">
                    <h4 className="footer-title">Join Us</h4>

                    <ul className="list-2 font-opensans lopl">
                     

                      <li>
                        <a>Membership Information</a>
                      </li>
                      <li>
                        <a>Online join</a>
                      </li>

                    
                    </ul>







                  </div>
                  <div className="widget ">
                    <h4 className="footer-title">Get Involved</h4>

                    <ul className="list-2 font-opensans lopl">
                      <li>
                        <a>Volunteers and Interns</a>
                      </li>

                    </ul>
                  </div>
                  <div className="widget ">
                    <h4 className="footer-title">Support Us</h4>

                    <ul className="list-2 font-opensans lopl">
                     

                      <li>
                        <a>Planned Giving</a>
                      </li>
                      <li>
                        <a>Contribute Now</a>
                      </li>

                    
                    </ul>







                  </div>

                </div> */}

                {
                  <div className='editor-content' dangerouslySetInnerHTML={{ __html: data?.footer_1 }} />
                }



                {/* <div className="rwing2">
                  <div className="widget ">
                    <h4 className="footer-title">Archives Hours</h4>

                    <ul className="list-2 font-opensans lopl lopl1">
                      <li>
                        <a>Monday : <span>10:00 </span> AM  to <span>3:00 </span> PM  </a>
                        <p>Open</p>
                      </li>
                      <li>
                        <a>Wednesday : <span>10:00</span> AM  to <span>3:00 </span> PM </a>
                        <p>Open</p>
                      </li>

                      <li>
                        <a>Friday : <span>10:00 AM</span>  to <span>3:00 </span> PM  </a>
                        <p>Open</p>
                      </li>

                      <li className='tues'>
                        <a>Tuesday, Thursday <span className='sung'>&</span> Sunday</a>
                        <p className='closed'>Closed</p>
                      </li>

                    </ul>
                    <div className='archieve_text'>
                      <p>We are open on <span>Saturdays</span>  for research by appointment only take off “until further notice”</p>
                    </div>

                  </div>
                </div> */}

                {
                  <div className='editor-content editor-content1' dangerouslySetInnerHTML={{ __html: data?.footer_2 }} />
                }

                {/* <div className="rwing3 margin-top25">

                  <div className="widget">
                    <h4 className="footer-title">Contact</h4>

                    <ul className="list-2 font-opensans lopl">
                      <li>
                        <img width="22" height="22" src='https://res.cloudinary.com/dgif730br/image/upload/v1743839733/Mask_group_d396h5.svg' alt='' />

                        <a>Old Market House <br />
                          St. Charles County Historical <br /> Society <br /> 101 South Main StreetSt. <br />  Charles, Missouri 63301</a>
                      </li>
                      <li>
                        <img width="22" height="22" src='https://res.cloudinary.com/dgif730br/image/upload/v1743839732/Mask_group_1_v0jifu.svg' alt='' />

                        <a>(636) 946-9828</a>
                      </li>
                      <li>
                        <img width="22" height="22" src='https://res.cloudinary.com/dgif730br/image/upload/v1743839733/Group_1171281377_cwmljq.svg' alt='' />

                        <a>Contact@scchs.org</a>
                      </li>
                    </ul>
                  </div>

                </div> */}
                {
                  <div className='editor-content editor-content11' dangerouslySetInnerHTML={{ __html: data?.footer_3 }} />
                }

                <div
                  className='footerlastimg cursor-pointer'
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <img
                    src='https://res.cloudinary.com/dal5dlztv/image/upload/v1747851760/arrow_forward_ios_FILL0_wght400_GRAD0_opsz24_1_idvl8i.png'
                    alt='Scroll to top'
                  />
                </div>



              </div>





            </div>
          </div>



          <footer className="footer-bottom">
            <div className="footer-bottom-top-line" />
            <div className="footer-bottom-content">
              <div className="footer-bottom-left">
                <p>
                  © 2025 St. Charles County Historical Society, Designed By
                  Digitalgrowthus
                </p>
              </div>
              <div className="footer-bottom-right">
                <span className="footer-bottom-connect">Connect:</span>
                <a href="#">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                    alt="Facebook"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                    alt="Instagram"
                  />
                </a>
                <a href="#">
                  <img
                    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                    alt="YouTube"
                  />
                </a>
              </div>
            </div>
          </footer>


        </footer >

      </>

    )
  }
}
