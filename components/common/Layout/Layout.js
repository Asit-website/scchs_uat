// import Navbar from '../Navbar/Navbar'
// import Footer from '../Footer/Footer'
// const Layout = ({children, pageProps}) => {
//   return (
//     <>
   
//       <Navbar navbarProps={pageProps.navbar} />
      
//       <main role="main">{children}</main>
//       <Footer footerProps={pageProps.footer} />
      
//     </>
//   )
// }

// export default Layout;

import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children, pageProps }) => {
  const [boolValue, setBoolValue] = useState(false);

  const toggleBoolValue = () => setBoolValue(prev => !prev);

  useEffect(() => {
    const storedBoolValue = JSON.parse(sessionStorage.getItem("boolValue") || "false");
    setBoolValue(storedBoolValue);

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);

      // Google Translate Initialization Function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // Default language
          includedLanguages: "en,hi,es,fr,de", // Specify allowed languages (English, Hindi, Spanish, French, German)
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

  }, []);


  useEffect(() => {
    sessionStorage.setItem("boolValue", JSON.stringify(boolValue));
  }, [boolValue]);

  return (
    <div className='allaboutoverall'>

      <Navbar navbarProps={pageProps.navbar} boolValue={boolValue} />
      
      <main role="main">
        {React.cloneElement(children, { boolValue, toggleBoolValue })}
      </main>

      <Footer footerProps={pageProps.footer} />

      
    </div>
  );
};

export default Layout;
