import Link from 'next/link';
import React from 'react'
import HeadSEO from '../../components/common/Head/head';

export default function ContentDetails(pageProp) {

    const pageBuilder = pageProp?.page_content?.page;
    
    return (
        <div>
          <HeadSEO title={pageBuilder?.seo_title} description={pageBuilder?.seo_description} image={false}  />
          {/* <div className='container'>
            <Link className='ff_btn_primary_outline' href={'/'}>Back</Link>
          </div>
          <br />
          <br /> */}
          <div role="article" dangerouslySetInnerHTML={ {__html:pageProp?.page_content?.page?.html} }></div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const urlSlug = context.params.slug;
    if(urlSlug != ""){
  
      try {
        const contentFetch = await fetch(process.env.server.api+"pages?slug=/"+urlSlug);
        const contentDetial = await contentFetch.json();


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

          return {
              props: {
                  page_content: contentDetial,
                  navbar: headerData,
                  footer: contentDetial?.footer
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
  