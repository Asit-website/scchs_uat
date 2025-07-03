import React, { useState } from "react";
import RequireAuthentication from "../../utils/requireAuthentication";
import Head from "next/head";
import style from "./../css/account.module.scss";
import Link from "next/link";
import $ from "jquery";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navigation from "./navigation";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import { cookies } from "next/dist/client/components/headers";

export default function AddressBook(props) {
  
  const router = useRouter();
  const [pageLoad, setPageLoad] = useState(false);
  const [message, setMessage] = useState("");
  const addressesList = props?.page_content?.addressesList;


  const editHandle = (id) => {
    console.log("cookies id" , id);
    Cookies.set("customer_address",id , {expires:7});
    
    router.push('/account/address')
  }

  const deleteHandle = async (id) => {
    if(confirm("Are you sure you want to delete this address?") == true) {
      setPageLoad(true);
      try {
        setMessage('')
        const deleteData = await fetch(process.env.next.api_url + "customer-address/delete", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id })
        });
        await deleteData.json();
        setMessage("Deleted address.")
        setPageLoad(false);
        $('li[data-id="'+id+'"]').remove();
      } catch (error) {
        console.log(error)
        setPageLoad(false); 
      }

    }
  }

  useEffect(()=>{
    if(props.page_content == false){
      setMessage("Something went wrong.")
    }
    Cookies.remove('customer_address');

    
  },[])

  return (
    <div className={style.pageAccountBG}>
      <div className={style.addressBook}>
        <Head>
          <title>Address Book</title>
          <meta
            name="description"
            content="We're the 92d Force Support Squadron, at Fairchild Air Force Base, delivering exceptional experiences to REFUEL Airmen, their families and the Fairchild community. Join the FUN!"
          ></meta>
        </Head>

        

        {pageLoad == true ? (
          <span
            className="loadingOverlay"
            style={{ display: "block", position: "fixed" }}
          />
        ) : (
          ""
        )}

        <div className="container">

          <h1 className={style.pageHead}>Address Book</h1>

          <Navigation isActive="2" />

          {message != "" ? (
                <span className={style.formMessge}>{message}</span>
              ) : (
                ""
              )}


          {props.page_content == false ? "" : (
          <div className={style.addressBookList}>
            <ul>
              { 
                addressesList?.length > 0 && addressesList?.map(ls => (
                    <li key={ls.id} data-id={ls.id}>
                        <h4>{ls.first_name} {ls.last_name}</h4>
                        <p>{ls.company}</p>
                        <span>{ls.address1},</span>
                        {ls.address2 != "" ? (<span>{ls.address2}</span>) : ""}
                        {ls.city != "" ? (<span>{ls.city}</span>) : ""}
                        {ls.country != "" ? (<span>{ls.country}</span>) : ""}
                        {ls.state_or_province != "" ? (<span>{ls.state_or_province}</span>) : ""}
                        {ls.postal_code != "" ? (<span>{ls.postal_code}</span>) : ""}
                        <button type="button" onClick={()=>{editHandle(ls.id)}} className={style.edit}>Edit</button>
                        <button type="button" onClick={()=>{deleteHandle(ls.id)}} className={style.delete}>Delete</button>
                      </li>
                ))
              }
              
              <li className={style.addressBookNew}>
                  <Link href={'/account/address'}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.9987 3.33325C10.7987 3.33325 3.33203 10.7999 3.33203 19.9999C3.33203 29.1999 10.7987 36.6666 19.9987 36.6666C29.1987 36.6666 36.6654 29.1999 36.6654 19.9999C36.6654 10.7999 29.1987 3.33325 19.9987 3.33325ZM28.332 21.6666H21.6654V28.3333H18.332V21.6666H11.6654V18.3333H18.332V11.6666H21.6654V18.3333H28.332V21.6666Z" fill="#7E8299"/>
                    </svg>
                    <span>Add New Address</span>
                  </Link>
              </li>
            </ul>
          </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return RequireAuthentication(context, async (session) => {
    const globalSettings = await GlobalHeaderFooter();
    console.log('session.user.bcId --------------')
    console.log(session.user.bcId)

    

    const getAddresses = await fetch(`${process.env.next.api_url}customer-address/get`,
      {
        method: "POST",
        body: JSON.stringify({customer_id:session.user.bcId}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    
    const addressesRes = await getAddresses.json();
    console.log('addressesRes')
    console.log(addressesRes)

    if(addressesRes.status == false){
      return {
        props: {
          page_content: false,
          navbar: globalSettings?.header,
          footer: globalSettings?.footer
        },
      };
    }else{
      return {
        props: {
          page_content: { user: session.user, addressesList: addressesRes.data },
          navbar: globalSettings?.header,
          footer: globalSettings?.footer
        },
      };
    }

  });
}
