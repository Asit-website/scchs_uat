import React, { useEffect, useState } from "react";
import RequireAuthentication from "../../utils/requireAuthentication";
import Head from "next/head";
import style from "./../css/account.module.scss";
import NumberOnly from "../../utils/common/number-only";
import Countries from "../../components/common/GeoGraphy/Countries";
import State from "../../components/common/GeoGraphy/State";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navigation from "./navigation";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";

export default function EditProfile(props) {
  const [pageLoad, setPageLoad] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [formType, setFormType] = useState("add");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address_1, setAddress_1] = useState("");
  const [address_2, setAddress_2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [state, setState] = useState("");
  const [stateName, setStateName] = useState("");
  const [updateState, setUpdateState] = useState('');
  const [zipCode, setZipCode] = useState("");

  const userData = props?.page_content?.user;
  

  const getuserData = async () => {
    setPageLoad(true);
    const address_id = Cookies.get('customer_address');

    if(typeof address_id != "undefined" && address_id > 0){

      const getAddresses = await fetch(`${process.env.next.api_url}customer-address/get`,
        {
          method: "POST",
          body: JSON.stringify({customer_id:userData.bcId, address_id: address_id}),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const addressesRes = await getAddresses.json();
      if(addressesRes.data.length > 0){
        setFormType('update')
        const addressData = addressesRes.data[0];
        setFirstName(addressData.first_name);
        setLastName(addressData.last_name);
        setCompany(addressData.company);
        setPhoneNumber(addressData.phone);
        setAddress_1(addressData.address1);
        setAddress_2(addressData.address2);
        setCity(addressData.city);
        setCountryName(addressData.country_code);
        setStateName(addressData.state_or_province);
        setUpdateState(addressData.state_or_province);
        setZipCode(addressData.postal_code);
        setPageLoad(false);
      }else{
        Cookies.remove('customer_address');
        setPageLoad(false);
      }

    }else{
      Cookies.remove('customer_address');
      setPageLoad(false);
    }

    
  };
  NumberOnly()

  useEffect(() => {
    getuserData();
  }, []);

  
  const pageReset = () => {
    Cookies.remove('customer_address');
    router.push('/account/address-book')
  }

  //add to BC
  const addBCData = async () => {
    setPageLoad(true);
    const formData = {
      customer_id:userData.bcId,
      first_name: firstName,
      last_name: lastName,
      company: company,
      phone: phoneNumber,
      address1: address_1,
      address2: address_2,
      city: city,
      country_code: countryName,
      state_or_province: stateName,
      postal_code: zipCode,
    };
    
    const updateFormData = await fetch(`${process.env.next.api_url}customer-address/create`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const updateRes = await updateFormData.json();
    
    if (updateRes.status == false) {
      setMessage('Something went wrong please try again.');
      setPageLoad(false);
    } else {
      if(updateRes.data.length == 0){
        setMessage('Already exists.');
        setPageLoad(false);
      }else{
        router.push('/account/address-book')
      }
    }
  };

  //add to BC
  const updateBCData = async () => {
    const address_id = Cookies.get('customer_address');
    setPageLoad(true);
    const formData = {
      id:parseInt(address_id),
      first_name: firstName,
      last_name: lastName,
      company: company,
      phone: phoneNumber,
      address1: address_1,
      address2: address_2,
      city: city,
      country_code: countryName,
      state_or_province: stateName,
      postal_code: zipCode,
    };

    const updateFormData = await fetch(`${process.env.next.api_url}customer-address/update`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const updateRes = await updateFormData.json();
    
    if (updateRes.status == false) {
      setMessage('Something went wrong please try again.');
      setPageLoad(false);
    } else {
      Cookies.remove('customer_address');
      router.push('/account/address-book')
    }
    // setPageLoad(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    if (firstName == "") {
      setMessage("First Name field cannot be blank.");
      setFormSubmit(false);
    }
    else if (lastName == "") {
      setMessage("Last Name field cannot be blank.");
      setFormSubmit(false);
    }
    else if (address_1 == "") {
      setMessage("Address Line 1 field cannot be blank.");
      setFormSubmit(false);
    }
    else if (city == "") {
      setMessage("City field cannot be blank.");
      setFormSubmit(false);
      return false;
    }
    else if (country == "") {
      setMessage("Country field cannot be blank.");
      setFormSubmit(false);
      return false;
    }
    else if (state == "") {
      setMessage("State field cannot be blank.");
      setFormSubmit(false);
      return false;
    }
    else if (zipCode == "") {
      setMessage("Zip/Postcode field cannot be blank.");
      setFormSubmit(false);
      return false;
    } else {
      setMessage("");
      setFormSubmit(true);
      if(formType == 'add'){
        addBCData();
      }else{
        updateBCData();
      }
    }
  };

  return (
    <div className={style.pageAccountBG}>
      <div className={style.pageAccount}>
    
      <Head>
        <title>{formType == "add" ? "Add Address" :"Update Address"}</title>
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

        <h1 className={style.pageHead}> {formType == "add" ? "Add Address" :"Update Address"}</h1>

        <Navigation isActive="2" />

        <div className={style.accountContainer}>
          <div className={style.formBuilder}>
            <form
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {message != "" ? (
                <span className={style.formMessge}>{message}</span>
              ) : (
                ""
              )}

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>
                    First Name <small>*</small>
                  </label>
                  <input
                    type="text"
                    maxLength={'30'} 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className={style.formControl}>
                  <label>
                    Last Name <small>*</small>
                  </label>
                  <input
                    type="text"
                    maxLength={'30'} 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>Company</label>
                  <input
                    type="text"
                    value={company}
                    maxLength={'30'} 
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className={style.formControl}>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    maxLength={'13'} 
                    className="numberOnly"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>
                    Address Line 1<small>*</small>
                  </label>
                  <input
                    type="text"
                    value={address_1}
                    onChange={(e) => setAddress_1(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    value={address_2}
                    maxLength={'50'} 
                    onChange={(e) => setAddress_2(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>
                    City <small>*</small>
                  </label>
                  <input
                    type="text"
                    maxLength={'20'} 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className={style.formControl}>
                  <label>
                      Country <small>*</small>
                  </label>
                  <Countries dataLoad={pageLoad} dataSetLoad={setPageLoad} dataValue={country} dataSetValue={setCountry} dataValueName={countryName} dataSetValueName={setCountryName} />
                </div>

              </div>

              <div className={style.formGroup}>
                <div className={style.formControl}>
                  <label>State <small>*</small></label>
                  <State dataLoad={pageLoad} dataSetLoad={setPageLoad} dataUpdateName={updateState} dataSetUpdateName={setUpdateState} dataValue={state} dataSetValue={setState} dataValueName={stateName} dataSetValueName={setStateName} dataCountryID={country} />
                </div>

                <div className={style.formControl}>
                  <label>
                    Zip/Postal Code <small>*</small>{" "}
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    maxLength={'15'} 
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className={style.formAction}>
                <button type="submit" className={style.buttonSubmit}>
                  Save Address
                </button>
                <span className={style.buttonCancel} onClick={pageReset}>Cancel</span>
              </div>
            </form>
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
    return {
      props: {
        page_content: { user: session.user },
        navbar: globalSettings?.header,
        footer: globalSettings?.footer
      },
    };
  });
}
