import React, { useState } from "react";
import RequireAuthentication from "../../utils/requireAuthentication";
import Head from "next/head";
import style from "./../css/account.module.scss";
import moment from 'moment'; 
import $ from "jquery";

import { useEffect } from "react";
import Navigation from "./navigation";
import Image from "next/image";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";

export default function Order(props) {
  
  const orderList = props?.page_content?.orderList;
  const [pageLoad, setPageLoad] = useState(false);
  const [message, setMessage] = useState("");

  console.log('orderList')
  console.log(orderList)

  const verfyUSer = async () => {
    setPageLoad(true)

    try {

      const bcType = props?.page_content?.user?.bcId;
      const access_token = props?.page_content?.user?.access_token;
      if(bcType > 0){
        const verfyUser = await fetch(process.env.next.api_url+"login/verify", {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json"},
          body: JSON.stringify({ bcType: bcType, access_token:access_token }),
        });
        const verfyUserRes = await verfyUser.json();
        if(verfyUserRes?.status == true){
          fetch(verfyUserRes.verfy_url, {mode: 'no-cors',credentials: 'include'}).then(response => response.json()).then((json) => { setPageLoad(false) }).catch((error) => { setPageLoad(false) });
        }else{
          setPageLoad(false)
        }
      }else{
        setPageLoad(false)
      }
      
    } catch (error) {
      setMessage('Something went wrong');
      setPageLoad(false)
    }

    
  }
  

  const getProduct = async () => {
    if(typeof orderList != "undefined"){
      orderList.length > 0 && orderList.map(async (ls,i)=>{
        const getData = await fetch(`${process.env.next.api_url}orders/products`,
          {
            method: "POST",
            body: JSON.stringify({id:ls.id}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }  
        );
        const resData = await getData.json();
        if(resData.length > 0){
          resData.map((lss, i)=>{
            const url_thumbnail = lss.image?.data[0]?.url_thumbnail;
            if(typeof url_thumbnail != "undefined"){
              $(".productFigure-"+ls.id).html(`<img src="${url_thumbnail}" width="100" height="100" alt="Product Image" />`)
            }else{
              $(".productFigure-"+ls.id).html(`<img src="https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/coming-soon.png" width="100" height="100" alt="Product Image" />`)
            }
          })
        }
      }); 
    }
    else if(orderList?.status == false){
      setPageLoad(false)
    }
  }
  
  useEffect(()=>{
    verfyUSer();
    if(orderList?.status != false){
      getProduct();
    }
  },[])
  
  return (
    <div className={style.pageAccountBG}>
      <div className={style.addressBook}>
        <Head>
          <title>Orders</title>
          <meta
            name="description"
            content="We're the 92d Force Support Squadron, at Fairchild Air Force Base, delivering exceptional experiences to REFUEL Airmen, their families and the Fairchild community. Join the FUN!"
          ></meta>
        </Head>

        

        {pageLoad == true ? ( <span className="loadingOverlay" style={{ display: "block", position: "fixed" }} /> ) : ( "" )}

        <div className="container">

          <h1 className={style.pageHead}>Orders</h1>

          <Navigation isActive="1" />

          {message != "" ? (<span className={style.formMessge}>{message}</span>) : ("")}

          <div className={style.accountContainer}>
            <div className={style.orderList}>

                {typeof orderList != "undefined" && orderList?.length > 0 ? (
                  <ul className={style.orderListUL}>
                    {orderList?.map((ls,i)=>(
                      <li key={i} className={style.accountListItem}>
                        <div className={style.accountProduct}>
                          <div className={style.productFigure + ' productFigure-'+ls.id}>
                              <span className={style.productFigureLoad}></span>
                          </div>
                          <div className={style.productBody}>

                            <div className={style.bodyContent}>

                              <h5>Order #{ls.id}</h5>
                              <p>{ls.items_total} products totaling ${ls.total_inc_tax}</p>

                              <div className={style.orderDates}>
                                <div className={style.dates}>
                                  <span className={style.label}>Order Placed </span>  
                                  <span className={style.date}>
                                    {moment(ls.date_created).format('DD/MM/YYYY')}
                                  </span>  
                                </div>
                                <div className={style.dates}>
                                  <span className={style.label}>Last Update</span>  
                                  <span className={style.date}>
                                    {moment(ls.date_modified).format('DD/MM/YYYY')}
                                  </span>  
                                </div>
                              </div>

                            </div>


                            <div className={style.bodyAction}>
                              
                              <span className={style.orderStatus}>{ls.status}</span>
                              
                              {/* <div className={style.orderQrCode}>
                                <Image
                                  className={style.figure}
                                  src={process.env.bc.store_url+"product_images/uploaded_images/or-code-sample.png"}
                                  width="66"
                                  height="66"
                                  alt={'Download QR'}
                                  quality={100}
                                />
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M19 9.5H15V3.5H9V9.5H5L12 16.5L19 9.5ZM11 11.5V5.5H13V11.5H14.17L12 13.67L9.83 11.5H11ZM5 18.5H19V20.5H5V18.5Z" fill="#3595F6"/>
                                </svg>
                                Download QR
                              </div> */}

                            </div>


                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : 
                    (
                      <div className={style.noOrder}>
                        <svg height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M19,21H13a3,3,0,0,0-3,3v2h2V24a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v2h2V24A3,3,0,0,0,19,21Z"/><path d="M16,20a4,4,0,1,0-4-4A4,4,0,0,0,16,20Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,16,14Z"/><path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z"/></svg>
                        <p>No upcoming orders</p>
                      </div> 
                    )
                }

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps(context) {
  return RequireAuthentication(context, async (session) => {
    const globalSettings = await GlobalHeaderFooter();
    try {
      
      const getData = await fetch(`${process.env.next.api_url}orders/get`,
        {
          method: "POST",
          body: JSON.stringify({id:session.user.bcId}),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }  
      );
      const resData = await getData.json();
      
      return {
        props: {
          page_content: {user:session.user, orderList: resData},
          navbar: globalSettings?.header,
          footer: globalSettings?.footer
        }
      };
    
  } catch (error) {
    return {
      props: {
        page_content: {user:session.user},
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      }
    };

  }

    
    
  });
}