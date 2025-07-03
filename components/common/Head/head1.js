import React from 'react'
import Head from "next/head";

export default function HeadSEO1(props) {
  return (
    <>
      <Head>
        <title>{props?.title}</title>
        <meta name="description" content={props?.description} />
        <meta name="author" content='Fairchild Air Force Base' />   
        <meta name="publisher" content='Fairchild Air Force Base' />
        <meta name="Keywords" content='The Official Website of Fairchild FSS - United States Air Force - 92d Force Support Squadron - Fairchild Air Force Base' />
        <link rel="icon" type="image/x-icon" href="https://res.cloudinary.com/dgif730br/image/upload/v1743761106/Group_1171281599_ofsyzk.png"></link>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

        {/* Google / Search Engine Tags */}
        <meta itemprop="name" content={props?.title} />
        <meta itemprop="description" content={props?.description} />
        
        {props?.image != false ? (<meta itemprop="image" content={props?.image} />):""}
        
        {/* Twitter */}
        {props?.image != false ? (<meta property="twitter:image" content={props?.image} />):""}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props?.title} />
        <meta property="twitter:description" content={props?.description} />

        {/* Facebook & Others */}
        {props?.image != false ? (<meta property="og:image" content={props?.image} />):""}
        <meta property="og:title" content={props?.title} />
        <meta property="og:description" content={props?.description} />
      </Head>
    </>
  )
}
