import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import { Country, State, City } from 'country-state-city';
// import 'react-phone-input-2/lib/style.css';
import CreatableSelect from 'react-select/creatable';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from 'next/link';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-input-2';
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};


const itemsPerPage = 10;
export default function donation(pageProp) {

    const router = useRouter();

    const [formdata, setFormData] = useState({
        first_name: '',
        last_name: '',
        organization: '',
        email: '',
        phone: '',
        donation_amount: '',
        donation_type: '',
        comment: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        anonymous: false
    })

    const [isEditMode, setIsEditMode] = useState(false);


    const [errors, setErrors] = useState({});

    const [instaUser, setInstaUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            setInstaUser(JSON.parse(storedUser));
        }
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    // const handlePhoneChange = (value) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         phone: value,
    //     }));
    // };


    // =============================================================================================
    // const handlePhoneChange = (value) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         phone: '+' + value,
    //     }));
    // };


    const handlePhoneChange = (value) => {
        const numericValue = value.replace(/\D/g, ''); // Remove non-digits

        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));

        if (numericValue.length < 11) {
            setErrors((prev) => ({
                ...prev,
                phone: 'Phone number must be at least 10 digits',
            }));
        }

        else {
            setErrors((prev) => ({
                ...prev,
                phone: '',
            }));
        }
    };


    // ==============================================================================================
    // ============for country state city=======

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    // useEffect(() => {
    //     if (formdata.country) {
    //         // Get ISO code of country by name
    //         const selectedCountry = countries.find(
    //             (c) => c.name === formdata.country
    //         );

    //         if (selectedCountry) {
    //             const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
    //             setStates(countryStates);
    //             setFormData((prev) => ({ ...prev, state: '', city: '' }));
    //         }
    //     }
    // }, [formdata.country, countries]);

    useEffect(() => {
        if (formdata.country) {
            const selectedCountry = countries.find((c) => c.name === formdata.country);
            if (selectedCountry) {
                const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
                setStates(countryStates);

                // 🔒 Only reset state and city if current state is NOT in new list
                const isStateValid = countryStates.some((s) => s.name === formdata.state);
                if (!isStateValid) {
                    setFormData((prev) => ({ ...prev, state: '', city: '' }));
                }
            }
        }
    }, [formdata.country, countries]);



    // useEffect(() => {
    //     if (formdata.country && formdata.state) {
    //         const selectedCountry = countries.find(
    //             (c) => c.name === formdata.country
    //         );
    //         const selectedState = State.getStatesOfCountry(selectedCountry?.isoCode).find(
    //             (s) => s.name === formdata.state
    //         );

    //         if (selectedCountry && selectedState) {
    //             const stateCities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
    //             setCities(stateCities);
    //             setFormData((prev) => ({ ...prev, city: '' }));
    //         }
    //     }
    // }, [formdata.state, formdata.country, countries]);

    useEffect(() => {
        if (formdata.country && formdata.state) {
            const selectedCountry = countries.find((c) => c.name === formdata.country);
            const selectedState = State.getStatesOfCountry(selectedCountry?.isoCode)
                .find((s) => s.name === formdata.state);

            if (selectedCountry && selectedState) {
                const stateCities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
                setCities(stateCities);

                // 🔒 Only reset city if current city is not in the list
                const isCityValid = stateCities.some((c) => c.name === formdata.city);
                if (!isCityValid) {
                    setFormData((prev) => ({ ...prev, city: '' }));
                }
            }
        }
    }, [formdata.state, formdata.country, countries]);

    const toOptions = (list, key = 'name') =>
        list.map((item) => ({ label: item[key], value: item[key] }));

    const validateAddressForm = (addressDetail) => {
        const errors = {};

        if (!addressDetail.first_name?.trim()) {
            errors.first_name = 'First name is required';
        }

        if (!addressDetail.last_name?.trim()) {
            errors.last_name = 'Last name is required';
        }

        if (!addressDetail.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressDetail.email)) {
            errors.email = 'Invalid email format';
        }



        if (!addressDetail.address1?.trim()) {
            errors.address1 = 'Address1 is required';
        }

        if (!addressDetail.country?.trim()) {
            errors.country = 'Country is required';
        }

        if (!addressDetail.city?.trim()) {
            errors.city = 'City is required';
        }

        if (!addressDetail.state?.trim()) {
            errors.state = 'State is required';
        }

        if (!addressDetail.postal_code?.trim()) {
            errors.postal_code = 'postal code is required';
        }
        if (!addressDetail.phone.trim()) {
            errors.phone = 'Phone number is required';
        }

        // else if (!/^\d{5}$/.test(addressDetail.zipcode)) {
        //     errors.zipcode = 'ZipCode must be exactly 5 digits and numeric';
        // }

        if (addressDetail.donation_amount === undefined || addressDetail.donation_amount === null || addressDetail.donation_amount === '') {
            errors.donation_amount = 'Donation amount is required';
        } else if (isNaN(addressDetail.donation_amount) || Number(addressDetail.donation_amount) < 10) {
            errors.donation_amount = 'Minimum donation amount is $10';
        }


        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!instaUser) {
            window.location.href = "/user/userlogin"; // or use router.push if using Next.js Router
            return;
        }
        const errors = validateAddressForm(formdata);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // console.log({ ...formdata });

        // localStorage.setItem('donationFormData', JSON.stringify(formdata));
        // router.push("/support/contribute");
        // toast.success("form submitted successfully");

        let finalFormData = { ...formdata };

        if (formdata.anonymous) {
            finalFormData.first_name = 'Anonymous';
            finalFormData.last_name = 'Anonymous';
        }

        // localStorage.setItem('donationFormData', JSON.stringify(formdata));
        localStorage.setItem('donationFormData', JSON.stringify(finalFormData));

        if (isEditMode) {
            toast.success('Edited form submitted');
            router.push("/support/contribute")
        } else {
            toast.success('New form submitted');
            router.push("/support/contribute")
        }

        // localStorage.removeItem('donationFormMode');
    }

    // useEffect(() => {
    //     const saved = localStorage.getItem('donationFormData');
    //     if (saved) {
    //         setFormData(JSON.parse(saved));
    //     }
    // }, []);


    // useEffect(() => {
    //     const mode = localStorage.getItem('donationFormMode');
    //     if (mode === 'edit') {
    //         const saved = localStorage.getItem('donationFormData');
    //         if (saved) {
    //             setFormData(JSON.parse(saved));
    //             setIsEditMode(true);
    //         }
    //         localStorage.removeItem('donationFormMode');
    //     }
    // }, []);

      useEffect(() => {
        // Jab bhi user login ho, uska saved donation data pre-fill ho
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            const saved = localStorage.getItem('donationFormData');
            if (saved) {
                setFormData(JSON.parse(saved));
                setIsEditMode(true);
            }
        }
    }, []);

    //     useEffect(() => {
    //   const mode = localStorage.getItem('donationFormMode');
    //   const saved = localStorage.getItem('donationFormData');

    //   if (mode === 'edit' && saved) {
    //     setFormData(JSON.parse(saved));
    //     setIsEditMode(true);
    //   } else {
    //     // New entry: clear everything
    //     localStorage.removeItem('donationFormData');
    //     localStorage.removeItem('donationFormMode');
    //     setIsEditMode(false);
    //     setFormData({
    //       first_name: '',
    //       last_name: '',
    //       organization: '',
    //       email: '',
    //       phone: '',
    //       donation_amount: '',
    //       donation_type: '',
    //       comment: '',
    //       address1: '',
    //       address2: '',
    //       city: '',
    //       state: '',
    //       postal_code: '',
    //       country: '',
    //     });
    //   }
    // }, []);






    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberlogin"} description={"this member is login"} image={null} />

            <HeadSEO1 />
            <div className="terros">
                <div className="container111">
                    <h2 className="donation-heading">Donations</h2>


                    <p className="donation-paragraph">
                        The primary mission of the St. Charles County Historical Society is to
                        preserve, interpret and make publicly available the rich historical record
                        of St. Charles County. Up until 2016 the Society has accepted donations of
                        items of all sorts that are historically significant to St. Charles
                        County. Over the sixty years of our existence we have accumulated an
                        enormous collection of artifacts ranging from quilts to uniforms to type
                        frames to theater ephemera. This is in addition to the many photographs,
                        letters, family histories, church vital records, maps, census records and
                        other official records of the county such as circuit court and immigration
                        documents. Because of space limitations and our inability to display the
                        objects in our collection, we have decided to de-accession these items and
                        transfer them to the St. Charles County Heritage Museum where it is hoped
                        they will be available for public viewing on a more regular basis.
                    </p>
                    <p className="welcome-your-donation">
                        <strong>
                            We are a 501(c)(3) non-profit organization and welcome your donations.
                        </strong>
                    </p>
                    <div className="box_1">
                        <p className="box-paragraph">You may make an online donation.</p>
                        <a className="hov-link" href="#fghj">Click Here</a>
                    </div>
                    <p className="donation-of-papers">
                        Donations of papers, photographs, books and other miscellaneous documents
                        will be gladly accepted as they pertain to St. Charles County. People
                        desiring to donate historical artifacts will now be referred to the
                        Heritage Museum. We stand ready and willing to assist parties in making
                        such donations as our interest in the preservation of St. Charles County
                        history remains undiminished.
                    </p>
                    <p className="we-all-accept">
                        We also accept financial donations in a variety of forms from cash to
                        equities to real estate. In fact, we rely on these types of donations for
                        a substantial portion of our yearly operating revenue.
                    </p>
                </div>
                <section className="scchs-contribution">
                    <div className="note-section">
                        <h3>SCCHS Contributions</h3>
                        <p className="note">
                            Please complete the form below to make an online CONTRIBUTION.
                        </p>
                        <p className="note">
                            <strong>NOTE:</strong> If you are trying to{" "}
                            <strong>become a member</strong> please exit this section and click on{" "}
                            <strong>JOIN</strong> at the top of the HOME page. If you are trying{" "}
                            <br /> to <strong>renew your membership</strong> please exit this
                            section and click on <strong>SIGN IN</strong> at the top of the HOME
                            page
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="container-1" id="fghj">
                            <div className="form-title">Place a Donation:</div>

                            <div className="scrolling-text-wrapper">
                                <div className="scrolling-text">
                                    Already have an account?&nbsp;
                                    <Link href="/user/userlogin" className="scroll-link">Sign in</Link>
                                    &nbsp;to make a donation.&nbsp;&nbsp;|&nbsp;&nbsp;
                                    New here?&nbsp;
                                    <Link href="/join/register" className="scroll-link">Create a free account</Link>
                                    &nbsp;to get started — it's quick and easy!
                                </div>
                            </div>


                            {/* <form> */}
                            <input
                                className="donation-input"
                                type="text"
                                id="name"
                                placeholder="First Name*"
                                name="first_name"
                                onChange={handleChange}
                                value={formdata?.first_name}
                            />
                            {errors.first_name && <p className="text_red">{errors.first_name}</p>}
                            <input
                                className="donation-input"
                                type="text"
                                id="name"
                                placeholder="Last Name*"
                                name="last_name"
                                value={formdata?.last_name}
                                onChange={handleChange}
                            />
                            {errors.last_name && <p className="text_red">{errors.last_name}</p>}
                            <input
                                className="donation-input"
                                type="text"
                                placeholder="Organization"
                                value={formdata?.organization}
                                name="organization"
                                onChange={handleChange}
                            />
                            <input
                                className="donation-input"
                                type="text"
                                id="name"
                                placeholder="Email Address* "
                                name="email"
                                value={formdata?.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text_red">{errors.email}</p>}
                            {/* <input
                                name="phone"
                                value={formdata?.phone}
                                onChange={handleChange}
                                className="small-input-1"
                                type="text"
                                placeholder="Phone"
                            /> */}
                            {/* <PhoneInput
                                className="small-input-1"
                                country={'us'}
                                value={formdata.phone}
                                onChange={handlePhoneChange}
                                className="rect-input"
                                 className="nameform-input"
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: false,

                                }}
                            /> */}
                            <PhoneInput
                                country={'us'}
                                value={formdata.phone.replace('+', ' ')}
                                onChange={handlePhoneChange}
                                className="rect-input"
                                inputProps={{
                                    name: 'phone',
                                    required: true,
                                    autoFocus: false,
                                }}
                                countryCodeEditable={false}
                            />
                            {errors.phone && <p className="text_red">{errors.phone}</p>}
                            {/* <div className="warning">Required, formatted as (000) 000-0000</div> */}
                            <input
                                style={{ marginTop: "20px" }}
                                className="small-input"
                                type="text"
                                placeholder="Donation Amount (USD):"
                                name="donation_amount"
                                value={formdata?.donation_amount}
                                onChange={handleChange}
                            />
                            <div className="warning">
                                Required, $10.00 Minimum Donation, Format as 123.45
                            </div>
                            {errors.donation_amount && <p className="text_red">{errors.donation_amount}</p>}
                            <select name="donation_type" value={formdata?.donation_type} onChange={handleChange} className="hgjg">
                                <option>Donation Type</option>
                                <option>One Time</option>
                                <option>Recur Monthly</option>
                            </select>
                            {formdata.donation_type === "Recur Monthly" && (
                                <>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                                        <span>for</span>
                                        <input
                                            type="number"
                                            name="months"
                                            value={formdata.months}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                if (/^\d{0,3}$/.test(value)) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        months: value
                                                    }));
                                                }
                                            }}
                                            min="0"
                                            max="999"
                                            style={{
                                                width: "60px",
                                                padding: "3px",
                                                fontSize: "14px"
                                            }}
                                        />
                                        <span style={{ color: "red" }}>(R)</span>
                                        <span>months</span>
                                    </div>
                                </>
                            )}


                            <textarea
                                className="textarea"
                                name="comment"
                                id="comment"
                                value={formdata?.comment}
                                onChange={handleChange}
                                placeholder="Donor Comments"
                                defaultValue={""}
                            />
                            <div className="chek-box-parent">
                                <input className="checkbox" type="checkbox" checked={formdata.anonymous}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            anonymous: e.target.checked,
                                        }))
                                    } />
                                <span>
                                    I would like to make this donation anonymously. Please do not
                                    publish my name.
                                </span>
                            </div>
                            {/* </form> */}
                        </div>
                        <div className="container-2">
                            {/* <form action=""> */}
                            <input
                                className="donation-input"
                                type="text"
                                id="address1"
                                placeholder="Address*"
                                value={formdata?.address1}
                                onChange={handleChange}
                                name="address1"
                            />
                            {errors.address1 && <p className="text_red">{errors.address1}</p>}
                            <input value={formdata?.address2} onChange={handleChange} name="address2" className="donation-input" type="text" placeholder="Address 2" />
                            {/* <input name="country" onChange={handleChange} value={formdata?.country} className="donation-input" type="text" placeholder="Country" /> */}
                            <div style={{ marginBottom: '20px', }}>
                                {/* <CreatableSelect
                                    placeholder="Select or type country"
                                    options={toOptions(countries)}
                                    value={formdata.country ? { label: formdata.country, value: formdata.country } : null}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            country: selected?.value || '',
                                            state: '',
                                            city: '',
                                        }))
                                    }
                                    styles={{
                                        input: (provided) => ({
                                            ...provided,
                                            minHeight: '48px',
                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            minHeight: '48px',
                                            fontSize: '18px',
                                            border: '2px solid #888'

                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,

                                        }),
                                    }}
                                /> */}
                                <CreatableSelect
                                    placeholder="Select or type country"
                                    options={toOptions(countries)}
                                    value={
                                        formdata.country
                                            ? { label: formdata.country, value: formdata.country }
                                            : null
                                    }
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            country: selected?.value || '',
                                            state: '',
                                            city: '',
                                        }))
                                    }
                                    styles={{
                                        input: (provided) => ({
                                            ...provided,
                                            minHeight: '48px',
                                        }),
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '48px',
                                            fontSize: '18px',
                                            border: '2px solid rgb(114 114 115)',
                                            boxShadow: state.isFocused ? 'rgb(114 114 115)' : 'none',
                                            '&:hover': {
                                                borderColor: 'rgb(114 114 115)',
                                            },
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                        }),
                                    }}
                                />

                            </div>
                            {/* <input
                                className="donation-input"
                                type="text"
                                id="state"
                                placeholder="State / Province*"
                                name="state"
                                value={formdata?.state}
                                onChange={handleChange}
                            /> */}
                            <div style={{ marginBottom: '20px', }}>
                                <CreatableSelect

                                    placeholder="Select or type state"
                                    // isDisabled={!states.length}
                                    options={toOptions(states)}
                                    value={formdata.state ? { label: formdata.state, value: formdata.state } : null}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            state: selected?.value || '',
                                            city: '',
                                        }))
                                    }
                                    // styles={{
                                    //     input: (provided) => ({
                                    //         ...provided,
                                    //         minHeight: '48px', // make sure input height is normal
                                    //     }),
                                    //     control: (provided) => ({
                                    //         ...provided,
                                    //         minHeight: '48px', // default or adjust as needed
                                    //         fontSize: '18px',
                                    //         border: '2px solid #888'
                                    //     }),
                                    //     placeholder: (provided) => ({
                                    //         ...provided,

                                    //     }),
                                    // }}
                                    styles={{
                                        input: (provided) => ({
                                            ...provided,
                                            minHeight: '48px',
                                        }),
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '48px',
                                            fontSize: '18px',
                                            border: '2px solid rgb(114 114 115)',
                                            boxShadow: state.isFocused ? 'rgb(114 114 115)' : 'none',
                                            '&:hover': {
                                                borderColor: 'rgb(114 114 115)',
                                            },
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                        }),
                                    }}
                                />

                            </div>
                            {errors.state && <p className="text_red">{errors.state}</p>}
                            {/* <input
                                className="donation-input"
                                type="text"
                                id="city"
                                name="city"
                                onChange={handleChange}
                                value={formdata?.city}
                                placeholder="City*"
                            /> */}
                            <div style={{ marginBottom: '20px', }}>
                                <CreatableSelect
                                    placeholder="Select or type city"
                                    className="select-margin"
                                    // isDisabled={!cities.length}
                                    options={toOptions(cities)}
                                    value={formdata.city ? { label: formdata.city, value: formdata.city } : null}
                                    onChange={(selected) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            city: selected?.value || '',
                                        }))
                                    }
                                    // styles={{
                                    //     input: (provided) => ({
                                    //         ...provided,

                                    //         minHeight: '48px',
                                    //     }),
                                    //     control: (provided) => ({
                                    //         ...provided,
                                    //         minHeight: '48px',
                                    //         fontSize: '18px',
                                    //         border: '2px solid #888'

                                    //     }),
                                    //     placeholder: (provided) => ({
                                    //         ...provided,


                                    //     }),
                                    // }}
                                    styles={{
                                        input: (provided) => ({
                                            ...provided,
                                            minHeight: '48px',
                                        }),
                                        control: (provided, state) => ({
                                            ...provided,
                                            minHeight: '48px',
                                            fontSize: '18px',
                                            border: '2px solid rgb(114 114 115)',
                                            boxShadow: state.isFocused ? 'rgb(114 114 115)' : 'none',
                                            '&:hover': {
                                                borderColor: 'rgb(114 114 115)',
                                            },
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }),
                                        menuList: (provided) => ({
                                            ...provided,
                                            outline: 'none',
                                        }),
                                    }}
                                />
                            </div>

                            {errors.city && <p className="text_red">{errors.city}</p>}

                            <input
                                className="donation-input"
                                type="text"
                                id="postal_code"
                                name="postal_code"
                                placeholder="Postal Code*"
                                value={formdata?.postal_code}
                                onChange={handleChange}
                            />
                            <p style={{ marginTop: "6px" }}>Please mention applicable postal code, zip code, pin code, postcode</p>

                            {errors.postal_code && <p className="text_red">{errors.postal_code}</p>}

                            {/* </form> */}
                        </div>
                        <div className="submit_donation">
                            {/* <button type="submit"
                             disabled={!!errors.phone}
                             className={`btn ${errors.phone ? 'opacity-50 cursor-not-allowed' : ''}`} >
                            {isEditMode ? 'Edit' : 'Submit'}</button> */}
                            <button
                                type="submit"
                                disabled={!!errors.phone}
                                className={`bg-[#002f5f] text-white px-6 py-2 rounded-full font-semibold 
              ${errors.phone ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#002f5f]'}`}>
                                Submit
                            </button>


                        </div>
                    </form>
                </section>
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