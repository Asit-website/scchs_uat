import React, { useEffect } from "react";
import Head from "next/head";
import { signOut } from "next-auth/react";
import RequireAuthentication from "../utils/requireAuthentication";
import GlobalHeaderFooter from "../utils/common/global-header-footer";

export default function Logout(props) {
  const { access_token } = props?.page_content?.session?.user;
  
  const logout = async () => {
    if(typeof access_token != "undefined"){
      await fetch(`${process.env.server.api}logout`, {
        method: "POST",
        headers: new Headers({
          Authorization: "Bearer " + access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
    }
    
    setTimeout(() => {
      fetch("login.php?action=logout", {mode: 'no-cors',credentials: 'include'}).then(response => response.json()).then((json) => {
        signOut({redirect:false})
        window.location.href = "https://www.instacertify.com/";  
       }).catch((error) => { 
        signOut({redirect:false})
        window.location.href = "https://www.instacertify.com/";
      });
    }, 10);
    //if(logoutRes?.status == true){}
  };

  useEffect(() => {
    logout();
  });

  return (
    <div>
      <Head>
        <title>logout Account</title>
        <meta name="description" content="Logout Account"></meta>
      </Head>
      <div style={{height:'80vh'}}>
        <span className='loadingOverlay' style={{display:'block',position:'fixed'}} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return RequireAuthentication(context, async (session) => {
    const globalSettings = await GlobalHeaderFooter();
    return {
      props: {
        page_content: { session },
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      },
    };
  });
}