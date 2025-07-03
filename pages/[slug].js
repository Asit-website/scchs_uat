import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import HeadSEO from '../components/common/Head/head';

export default function ContentDetails(pageProp) {

  // const [slug,setSlug] = useState({});

    const pageBuilder = pageProp?.page_content?.page;
    const seo_data = pageProp?.seo_data;

    console.log("seo_data",seo_data);

    // const fetchCategory = async () => {
    //   try {
  
    //     const resp = await fetch(`https://admin.instacertify.com/api/pages?slug=/about`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });
  
       
    //       const formateddata = await resp.json();
    //       console.log(formateddata);
    //       setSlug(formateddata?.page)
  
        
  
  
    //   } catch (error) {
  
    //     console.error("There was an error fetching the categories:", error);
    //   }
    // };


    

    // useEffect(()=>{
    //   fetchCategory();
    // },[])


    const addToCartApi = async (id) => {
     alert(1);
      const resp = await fetch('https://admin.instacertify.com/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           "Authorization":`Bearer ${JSON?.parse(localStorage.getItem("insta_Access"))}`
        },
        body: JSON.stringify({
          product_id: id,
          quantity: 1,
        }),
      })
        .then(response => response.json())
        .then(data => {
          alert(data?.message)
          toggleBoolValue();
        })
        .catch(error => console.error('Error:', error));
  
        // alert(resp)
    }
    
    if (typeof window !== "undefined") {
      window.addToCartApi = addToCartApi;
    }

    return (
        <div>
          <HeadSEO title={seo_data?.seo_title} description={seo_data?.seo_description} image={false}  />
          <div role="article" dangerouslySetInnerHTML={ {__html:pageProp?.page_content} }></div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const urlSlug = context.params.slug;
    console.log("urlSlug",urlSlug);
    if(urlSlug != ""){
  
      try {
        const contentFetch = await fetch(process.env.server.api+"pages?slug=/"+urlSlug);
        console.log("hi")
        console.log(process.env.server.api)
        const contentDetial = await contentFetch.json();

        console.log("fetch",contentDetial);


        if(contentDetial.page == null){
          return {
              props: {
                page_content: false,
                navbar: false,
                footer: false,
              },
              notFound: true
          };  
        }else{

          const headerData = {
            settings:contentDetial?.header,
            navigation:contentDetial?.navigation
          }

          const regex = new RegExp("../../../", "g");
          const htmlFinal = contentDetial?.page?.html.replace(regex, process.env.server.path);
          

          return {
              props: {
                  page_content: htmlFinal,
                  navbar: headerData,
                  footer: contentDetial?.footer,
                  seo_data: contentDetial?.page
              },
          };
        }

        
      }
      catch(err) {
        
        return {
          props: {
            page_content: false,
            navbar: false,
            footer: false,
          },
          notFound: true
        };
  
      }
  
    }else{
        return {
            props: {
              page_content: false,
              navbar: false,
              footer: false,
            },
            notFound: true
        };  
    }
}

  