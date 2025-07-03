import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Country, State, City } from 'country-state-city';
import CreatableSelect from 'react-select/creatable';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from "next/router";

var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

const tabList = [
    "Member Info",
    "Contact Info",
    "Alt. Contact Info",
    "Custom Data",
    "Surnames",
    "Member Setting"
];

const data = [
    {
        surname: "Trendley",
        county: "St Charles",
        state: "Mo",
        country: "United States",
        beginYear: "1771",
        endYear: "1850"
    }
];

export default function myprofile(pageProp) {

    // const [activeTab, setActiveTab] = useState("Member Info");

    const [activeTab, setActiveTab] = useState(tabList[0]);
    const [errors, setErrors] = useState({})
    const [errors1, setErrors1] = useState({})
    const [errors2, setErrors2] = useState({})

    const router = useRouter();


    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab && tabList.includes(savedTab)) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        localStorage.setItem("activeTab", tab);
    };


    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [instaUser, setInstaUser] = useState(null);

    const [displayData1, setDisplayData1] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem("scchs_User");
        if (storedUser) {
            setInstaUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (!instaUser?.id) return;

        const fetchMemberships = async () => {
            try {
                const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser.id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch');
                }
                const json = await res.json();
                console.log(json)
                setMemberships(json.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberships();
    }, [instaUser]);

    const [donations, setDonations] = useState([]);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://uat.scchs.co.in/api/donaction/payment/history", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                    }
                });
                const data = await res.json();
                console.log(data)
                setDonations(data.data);
            } catch (error) {
                console.error("Failed to fetch donation history", error);
            }
        };

        fetchData();
    }, []);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        seasonal: '',
        from_year: '',
        to_year: '',
        from_day_month: '',
        to_day_month: '',
        phone: '',
        intl_phone: '',
        preferred: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        postal_code: '',
        email: '',
        country: ''
    });

    const userId = instaUser?.id;


    const [open1, setOpen1] = useState(false);
    const [formData1, setFormData1] = useState({
        address: '',
        address2: '',
        mobile_number: '',
        cell_phone: '',
        int_phone: '',
        city: '',
        preferred: '',
        state: '',
        postal_code: '',
        email: '',
        website: '',
        country: ''

    });





    const handleChange1 = (e) => {
        setFormData1(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const handlePhoneChange = (value) => {
        setFormData1((prev) => ({
            ...prev,
            mobile_number: value,
        }));
    };

    const handlePhoneChange1 = (value) => {
        setFormData1((prev) => ({
            ...prev,
            cell_phone: value,
        }));
    };

    const handlePhoneChange2 = (value) => {
        setFormData1((prev) => ({
            ...prev,
            int_phone: value,
        }));
    };

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (!formData1.country || !countries.length) return;

        const selectedCountry = countries.find(
            (c) => c.name === formData1.country
        );

        if (!selectedCountry) return;

        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates);

        // Reset state/city only if not editing
        // if (!isEditing) {
        //     setFormData1((prev) => ({
        //         ...prev,
        //         state: '',
        //         city: '',
        //     }));
        // }
    }, [formData1.country, countries]);

    useEffect(() => {
        if (!formData1.country || !formData1.state || !countries.length) return;

        const selectedCountry = countries.find(
            (c) => c.name === formData1.country
        );
        if (!selectedCountry) return;

        const selectedState = State.getStatesOfCountry(selectedCountry.isoCode).find(
            (s) => s.name === formData1.state
        );
        if (!selectedState) return;

        const stateCities = City.getCitiesOfState(
            selectedCountry.isoCode,
            selectedState.isoCode
        );
        setCities(stateCities);

        // Reset city only if not editing
        // if (!isEditing) {
        //     setFormData1((prev) => ({
        //         ...prev,
        //         city: '',
        //     }));
        // }
    }, [formData1.state, formData1.country, countries]);


    const toOptions = (list, key = 'name') =>
        list.map((item) => ({ label: item[key], value: item[key] }));

    const validateAddressForm = (addressDetail) => {
        const errors = {};

        if (!addressDetail.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressDetail.email)) {
            errors.email = 'Invalid email format';
        }

        if (addressDetail.website?.trim()) {
            const websiteRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[\w\-./?%&=]*)?$/;
            if (!websiteRegex.test(addressDetail.website.trim())) {
                errors.website = 'Invalid website format';
            }
        }

        return errors;
    };


    const handleEditClick1 = async () => {
        setOpen1(true);
        try {
            const res = await fetch('https://uat.scchs.co.in/api/contact-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}` },
                body: JSON.stringify({ userId })
            });

            if (res.ok) {
                const data = await res.json();
                // if (data.data) setFormData1(data.data);
                if (data.data) {
                    const fixedData = {
                        ...data.data,
                        mobile_number: data.data.mobile_number ? String(data.data.mobile_number) : '',  // Ensure phone is a string
                    };
                    setFormData1(fixedData);
                }

            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const handleSave1 = async () => {
        const errors = validateAddressForm(formData1);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
        try {
            const res = await fetch('https://uat.scchs.co.in/api/contact-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}` },
                body: JSON.stringify({ userId, ...formData1 })
            });

            if (res.ok) {
                toast.success('Saved successfully!');
                window.location.href = "/member/myprofile"
                setOpen1(false);
            } else {
                toast.success('Failed to save.');
            }
        } catch (err) {
            console.error('Save error:', err);
        }
    };



    // ========================================alt information logic==================
    const handleEditClick = async () => {
        setOpen(true);
        try {
            const res = await fetch(`https://uat.scchs.co.in/api/alt-contact-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}` },
                body: JSON.stringify({ userId })
            });

            if (res.ok) {
                const result = await res.json();
                if (result.data) setFormData(result.data); // fix: use result.data
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors1((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const handlePhoneChange3 = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value,
        }));
    };

    const handlePhoneChange4 = (value) => {
        setFormData((prev) => ({
            ...prev,
            intl_phone: value,
        }));
    };

    const validateAddressForm1 = (addressDetail) => {
        const errors = {};

        if (!addressDetail.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addressDetail.email)) {
            errors.email = 'Invalid email format';
        }

        const numericRegex = /^\d+$/;

        // if (addressDetail.from_day_month && (addressDetail.from_day_month.length !== 2 || !numericRegex.test(addressDetail.from_day_month))) {
        //     errors.from_day_month = 'Day must be 2 digits and numbers only (e.g., 01)';
        // }

        if (addressDetail.from_day_month) {
            if (!numericRegex.test(addressDetail.from_day_month)) {
                errors.from_day_month = 'Day must be 2 digits and numbers only (e.g., 01)';
            } else {
                const day = parseInt(addressDetail.from_day_month, 10);
                if (day < 1 || day > 31) {
                    errors.from_day_month = 'Day must be between 01 and 31';
                }
            }
        }

        //  if (addressDetail.to_day_month && (addressDetail.to_day_month.length !== 2 || !numericRegex.test(addressDetail.to_day_month))) {
        //     errors.to_day_month = 'Day must be 2 digits and numbers only (e.g., 01)';
        // }

        if (addressDetail.to_day_month) {
            if (!numericRegex.test(addressDetail.to_day_month)) {
                errors.to_day_month = 'Day must be 2 digits and numbers only (e.g., 01)';
            } else {
                const day = parseInt(addressDetail.to_day_month, 10);
                if (day < 1 || day > 31) {
                    errors.to_day_month = 'Day must be between 01 and 31';
                }
            }
        }

        return errors;
    };

    const [countries1, setCountries1] = useState([]);
    const [states1, setStates1] = useState([]);
    const [cities1, setCities1] = useState([]);

    useEffect(() => {
        setCountries1(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (!formData.country || !countries1.length) return;

        const selectedCountry = countries1.find(
            (c) => c.name === formData.country
        );

        if (!selectedCountry) return;

        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates1(countryStates);

        // Reset state/city only if not editing
        // if (!isEditing) {
        //     setFormData1((prev) => ({
        //         ...prev,
        //         state: '',
        //         city: '',
        //     }));
        // }
    }, [formData.country, countries1]);

    useEffect(() => {
        if (!formData.country || !formData.state || !countries1.length) return;

        const selectedCountry = countries1.find(
            (c) => c.name === formData.country
        );
        if (!selectedCountry) return;

        const selectedState = State.getStatesOfCountry(selectedCountry.isoCode).find(
            (s) => s.name === formData.state
        );
        if (!selectedState) return;

        const stateCities = City.getCitiesOfState(
            selectedCountry.isoCode,
            selectedState.isoCode
        );
        setCities1(stateCities);

        // Reset city only if not editing
        // if (!isEditing) {
        //     setFormData1((prev) => ({
        //         ...prev,
        //         city: '',
        //     }));
        // }
    }, [formData.state, formData.country, countries1]);


    const toOptions1 = (list, key = 'name') =>
        list.map((item) => ({ label: item[key], value: item[key] }));

    const handleSave = async () => {
        const errors = validateAddressForm1(formData);
        if (Object.keys(errors).length > 0) {
            setErrors1(errors);
            return;
        }
        try {
            const res = await fetch(`https://uat.scchs.co.in/api/alt-contact-info`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}` },
                body: JSON.stringify({ userId, ...formData })
            });

            if (res.ok) {
                toast.success('Saved successfully!');
                window.location.href = "/member/myprofile";
                setOpen(false);
            } else {
                toast.error('Failed to save.');
            }
        } catch (err) {
            console.error('Save error:', err);
        }
    };


    // ============surename table start=============

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({
        surname: "",
        city: "",
        county: "",
        state: "",
        country: "",
        start_year: "",
        end_year: "",
        alt_spelling: "",
        commant: ""
    });

    const handleChangeform = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors2((prev) => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const validateAddressForm2 = (addressDetail) => {
        const errors = {};
        if (!addressDetail.surname?.trim()) {
            errors.surname = 'Surname is required';
        }
        const numericRegex = /^\d+$/;

        if (addressDetail.start_year && (addressDetail.start_year.length !== 4 || !numericRegex.test(addressDetail.start_year))) {
            errors.start_year = 'Year must be 4 digits and numbers only (e.g., 01)';
        }



        if (addressDetail.end_year && (addressDetail.end_year.length !== 4 || !numericRegex.test(addressDetail.end_year))) {
            errors.end_year = 'Year must be 4 digits and numbers only (e.g., 01)';
        }


        return errors;
    };

    const [countries2, setCountries2] = useState([]);
    const [states2, setStates2] = useState([]);
    const [cities2, setCities2] = useState([]);

    useEffect(() => {
        setCountries2(Country.getAllCountries());
    }, []);

    useEffect(() => {
        if (!form.country || !countries2.length) return;

        const selectedCountry = countries2.find(
            (c) => c.name === form.country
        );

        if (!selectedCountry) return;

        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates2(countryStates);

    }, [form.country, countries2]);

    useEffect(() => {
        if (!form.country || !form.state || !countries2.length) return;

        const selectedCountry = countries2.find(
            (c) => c.name === form.country
        );
        if (!selectedCountry) return;

        const selectedState = State.getStatesOfCountry(selectedCountry.isoCode).find(
            (s) => s.name === form.state
        );
        if (!selectedState) return;

        const stateCities = City.getCitiesOfState(
            selectedCountry.isoCode,
            selectedState.isoCode
        );
        setCities2(stateCities);

    }, [form.state, form.country, countries2]);


    const toOptions2 = (list, key = 'name') =>
        list.map((item) => ({ label: item[key], value: item[key] }));

    // const handleAdd = async () => {
    //     try {
    //         const res = await fetch('https://uat.scchs.co.in/api/surnames', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
    //             },
    //             body: JSON.stringify(form)
    //         });

    //         if (res.ok) {
    //             const newItem = await res.json();
    //             setData([...data, newItem.data || form]);
    //             setForm({
    //                 surname: "",
    //                 city: "",
    //                 county: "",
    //                 state: "",
    //                 country: "",
    //                 start_year: "",
    //                 end_year: "",
    //                 alt_spelling: "",
    //                 commant: ""
    //             });
    //             alert("success")
    //             setShowModal(false);

    //         } else {
    //             console.error("Failed to add surname entry");
    //         }
    //     } catch (error) {
    //         console.error("Error while adding:", error);
    //     }
    // };

    const handleAdd = async () => {
        const errors = validateAddressForm2(form);
        if (Object.keys(errors).length > 0) {
            setErrors2(errors);
            return;
        }
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode
            ? `https://uat.scchs.co.in/api/surnames/${editId}`
            : `https://uat.scchs.co.in/api/surnames`;

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const responseData = await res.json();

                if (isEditMode) {
                    setData(prev =>
                        prev.map(item =>
                            item.id === editId ? responseData.data || form : item
                        )
                    );
                    toast.success("Surname updated successfully!"); // 🟢 Edit alert
                } else {
                    setData([...data, responseData.data || form]);
                    toast.success("Surname added successfully!"); // 🟢 Add alert
                }

                // Reset
                setForm({
                    surname: "",
                    city: "",
                    county: "",
                    state: "",
                    country: "",
                    start_year: "",
                    end_year: "",
                    alt_spelling: "",
                    commant: ""
                });
                setIsEditMode(false);
                setEditId(null);
                setShowModal(false);
                window.location.href = "/member/myprofile"
            } else {
                const err = await res.json();
                console.error("API error:", err);
            }
        } catch (error) {
            console.error("Error while saving:", error);
        }
    };


    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await fetch(`https://uat.scchs.co.in/api/surnames/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${JSON?.parse(localStorage.getItem("scchs_Access"))}`
                        }
                    });

                    if (res.ok) {
                        setData(prev => prev.filter(item => item.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Surname has been deleted.',
                            'success'
                        );
                        window.location.href = "/member/myprofile"
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Failed to delete surname.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error("Error while deleting:", error);
                    Swal.fire(
                        'Error!',
                        'Something went wrong.',
                        'error'
                    );
                }
            }
        });
    };


    const handleAddClick = () => {
        setIsEditMode(false);
        setEditId(null);
        setForm({});
        setShowModal(true);
    };

    // ===================custom setting logic===========

    // const [showMembershipPopup, setShowMembershipPopup] = useState(false);
    // const [showEmailPopup, setShowEmailPopup] = useState(false);
    // const [savedSettings, setSavedSettings] = useState(null);

    // const [formData3, setFormData3] = useState({
    //     general_notices: false,
    //     event_reminders: false,
    //     newsletters: false,
    //     surname_inquiries: false,
    //     show_name: false,
    //     address: false,
    //     telephone: false,
    //     email_address: false,
    //     website: false,
    //     photo: false,
    // });

    const defaultSettings = {
        general_notices: false,
        event_reminders: false,
        newsletters: false,
        surname_inquiries: false,
        show_name: false,
        address: false,
        telephone: false,
        email_address: false,
        website: false,
        photo: false,
    };

    const [formData3, setFormData3] = useState(defaultSettings);
    const [showMembershipPopup, setShowMembershipPopup] = useState(false);
    const [showSpecialPopup, setShowSpecialPopup] = useState(false);



    const specialKeys = [
        "general_notices",
        "event_reminders",
        "newsletters",
        "surname_inquiries",
    ];


    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData3((prev) => ({ ...prev, [name]: checked }));
    };


    const openMembershipEditPopup = () => {
        const saved = localStorage.getItem("scchs_MemberSettings");
        if (saved) {
            const parsed = JSON.parse(saved);
            setFormData3({ ...defaultSettings, ...parsed }); // Ensure fallback values
        } else {
            setFormData3(defaultSettings);
        }
        setShowMembershipPopup(true);
    };

    const openMembershipEditPopup1 = () => {
        const saved = localStorage.getItem("scchs_MemberSettings");
        if (saved) {
            const parsed = JSON.parse(saved);
            setFormData3({ ...defaultSettings, ...parsed }); // Ensure fallback values
        } else {
            setFormData3(defaultSettings);
        }
        setShowSpecialPopup(true);
    };




    // const handleSubmit = async () => {
    //     try {
    //         const res = await fetch('https://uat.scchs.co.in/api/member-settings-store', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("scchs_Access"))}`
    //             },
    //             body: JSON.stringify(formData3)
    //         });

    //         console.log(res)

    //         if (res.ok) {
    //             Swal.fire('Success', 'Settings updated successfully', 'success');
    //             setShowMembershipPopup(false);
    //             setShowEmailPopup(false);
    //         } else {
    //             Swal.fire('Error', 'Something went wrong!', 'error');
    //         }
    //     } catch (error) {
    //         Swal.fire('Error', 'Network error', 'error');
    //     }
    // };

    const handleSubmit = async () => {
        try {
            const res = await fetch('https://uat.scchs.co.in/api/member-settings-store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify(formData3),
            });

            if (res.ok) {
                localStorage.setItem("scchs_MemberSettings", JSON.stringify(formData3));
                Swal.fire('Success', 'Settings updated successfully', 'success');
                setShowMembershipPopup(false);
                setShowSpecialPopup(false);
                window.location.href = "/member/myprofile"
            } else {
                Swal.fire('Error', 'Something went wrong!', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Network error', 'error');
        }
    };

    const [data1, setData1] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("scchs_MemberSettings");
        if (saved) {
            setData1(JSON.parse(saved));
        }
    }, []);


    const excludeKeys = [
        "general_notices",
        "event_reminders",
        "newsletters",
        "surname_inquiries",
    ];



    // const openMembershipEditPopup = () => {
    //   const saved = JSON.parse(localStorage.getItem("scchs_MemberSettings"));
    //   if (saved && typeof saved === 'object') {
    //     // Ensure defaults for missing keys
    //     const withDefaults = {
    //       general_notices: !!saved.general_notices,
    //       event_reminders: !!saved.event_reminders,
    //       newsletters: !!saved.newsletters,
    //       surname_inquiries: !!saved.surname_inquiries,
    //       show_name: !!saved.show_name,
    //       address: !!saved.address,
    //       telephone: !!saved.telephone,
    //       email_address: !!saved.email_address,
    //       website: !!saved.website,
    //       photo: !!saved.photo,
    //     };
    //     setFormData3(withDefaults);
    //   } else {
    //     // fallback to default values
    //     setFormData3({
    //       general_notices: false,
    //       event_reminders: false,
    //       newsletters: false,
    //       surname_inquiries: false,
    //       show_name: false,
    //       address: false,
    //       telephone: false,
    //       email_address: false,
    //       website: false,
    //       photo: false,
    //     });
    //   }

    //   setShowMembershipPopup(true);
    // };

    // const [showPopup, setShowPopup] = useState(false);

    // const [loginName, setLoginName] = useState(memberships[0]?.user?.username || "");
    // const [newLoginName, setNewLoginName] = useState("");

    // const handleEditClick11 = () => {
    //     setNewLoginName(loginName);
    //     setShowPopup(true);
    // };

    // const handleSubmit11 = async () => {
    //     try {
    //         const res = await fetch("https://uat.scchs.co.in/api/login-name-update", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("scchs_Access"))}`
    //             },
    //             body: JSON.stringify({
    //                 username: newLoginName,
    //                 id: memberships[0]?.user?.id, // API ke hisaab se ID bhej rahe
    //             }),
    //         });

    //         if (!res.ok) throw new Error("Network response was not ok");

    //         const result = await res.json();
    //         toast.success(result?.message);
    //         setLoginName(newLoginName);
    //         setShowPopup(false);
    //     } catch (err) {
    //         console.error("Error:", err);
    //         alert("Failed to update login name.");
    //     }
    // };

    const [showPopup, setShowPopup] = useState(false);
    const [newLoginName, setNewLoginName] = useState("");

    const currentLoginName = memberships[0]?.user?.username || "";

    const handleEditClick11 = () => {
        setNewLoginName(currentLoginName);
        setShowPopup(true);
    };

    const handleSubmit11 = async () => {
        try {
            const res = await fetch("https://uat.scchs.co.in/api/login-name-update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify({
                    username: newLoginName,
                    id: memberships[0]?.user?.id,
                }),
            });

            if (!res.ok) throw new Error("Network error");

            Swal.fire('Success', 'Settings updated successfully', 'success');
            window.location.href = "/member/myprofile";

            // await refreshMemberships(); // refresh memberships from backend
            setShowPopup(false);
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to update login name.");
        }
    };

    // ===================password reset============
    const [showPopup1, setShowPopup1] = useState(false);
    const [password, setPassword] = useState("");

    const handleEditClick22 = () => {
        setPassword(""); // input box empty rahe
        setShowPopup1(true);
    };

    const handleSubmit22 = async () => {
        const passwordRegex = /^(?=[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            // alert("Password must start with a capital letter, include a special character, and be at least 8 characters long.");
            Swal.fire('Error', 'Password must start with a capital letter, include a special character, and be at least 8 characters long.', 'error');
            return;
        }

        try {
            const res = await fetch("https://uat.scchs.co.in/api/login-password-update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("scchs_Access"))}`
                },
                body: JSON.stringify({
                    new_password: password, // ✅ correct payload key
                    id: userId,
                }),
            });

            if (!res.ok) throw new Error("Network error");

            setShowPopup1(false);
            Swal.fire('Success', 'Settings updated successfully', 'success');
        } catch (err) {
            console.error("Error:", err);
            alert("Failed to update password.");
        }
    };

    const totalAmount = donations.reduce(
        (acc, item) => acc + parseFloat(item.donation_amount || 0),
        0
    );

    // ================fetch active member plan==========
    const [validPlans, setValidPlans] = useState([]);
    const [selectedPlanId, setSelectedPlanId] = useState("");
    const [onlySingleMemberPlans, setOnlySingleMemberPlans] = useState(false);

    // useEffect(() => {
    //     const fetchPlans = async () => {
    //         try {
    //             const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser?.id}`);
    //             const data = await res.json();

    //             const today = new Date();

    //             const purchasedPlans = data?.data?.filter(plan => {
    //                 const isPurchased = plan?.type?.toLowerCase() === "purchased";
    //                 const isActive = plan?.status?.toLowerCase() === "active";
    //                 const endDate = new Date(plan?.end_date);
    //                 return isPurchased && isActive && endDate >= today;
    //             });

    //             console.log("All Purchased Plans:", purchasedPlans);

    //             // Check if all plans have allow_member === "1"
    //             const allSingleMember = purchasedPlans.every(plan => plan?.plan?.allow_member === "1");
    //             setOnlySingleMemberPlans(allSingleMember); // 👈 create this state

    //             // Filter out single-member plans for dropdown
    //             const filteredPlans = purchasedPlans.filter(plan => plan?.plan?.allow_member !== "1");

    //             const mappedPlans = filteredPlans.map(plan => ({
    //                 membership_plan_id: plan.membership_plan_id,
    //                 name: plan.plan?.name || `Plan ${plan.membership_plan_id}`
    //             }));

    //             setValidPlans(mappedPlans);

    //             if (mappedPlans.length > 0) {
    //                 setSelectedPlanId(mappedPlans[0].membership_plan_id);
    //             }
    //         } catch (err) {
    //             console.error("Error loading plans:", err);
    //         }
    //     };

    //     if (instaUser?.id) fetchPlans();
    // }, [instaUser?.id]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch(`https://uat.scchs.co.in/api/user-memberships/${instaUser?.id}`);
                const data = await res.json();

                const today = new Date();

                const purchasedPlans = data?.data?.filter(plan => {
                    const isPurchased = plan?.type?.toLowerCase() === "purchased";
                    const isActive = plan?.status?.toLowerCase() === "active";
                    const endDate = new Date(plan?.end_date);
                    return isPurchased && isActive && endDate >= today;
                });

                console.log("All Purchased Plans:", purchasedPlans);

                // Check if all plans allow only 1 member
                const allSingleMember = purchasedPlans.every(plan => plan?.plan?.allow_member === "1");
                setOnlySingleMemberPlans(allSingleMember);

                // Filter plans where used_slots < allow_member
                const filteredPlans = purchasedPlans.filter(plan => {
                    const allowed = parseInt(plan?.plan?.allow_member || "0", 10);
                    const used = parseInt(plan?.used_slots || "0", 10);
                    return allowed > 1 && used < allowed;
                });

                const mappedPlans = filteredPlans.map(plan => ({
                    membership_plan_id: plan.membership_plan_id,
                    name: plan.plan?.name || `Plan ${plan.membership_plan_id}`
                }));

                if (mappedPlans.length > 0) {
                    setValidPlans(mappedPlans);
                    setSelectedPlanId(mappedPlans[0].membership_plan_id);
                } else {
                    setValidPlans([]);
                    setSelectedPlanId(null);
                }
            } catch (err) {
                console.error("Error loading plans:", err);
            }
        };

        if (instaUser?.id) fetchPlans();
    }, [instaUser?.id]);


    const handleRedirect = () => {
        if (!selectedPlanId) return;
        localStorage.setItem("selected_member_plan_id", selectedPlanId);
        router.push("/join/register1");
        // if (!selectedPlanId || validPlans.length === 0) {
        //     alert("You have reached your maximum allowed members.");
        //     return;
        // }

        // localStorage.setItem("selected_member_plan_id", selectedPlanId);
        // router.push("/join/register1");
    };

    // if (validPlans.length === 0) return ;
    //    ========================fetch active member plan finished======

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"memberprofile"} description={"this is member profile"} image={null} />

            <HeadSEO1 />

            <div className="event_system_main event_system_main2">
                <div className="event_main">

                    {/* {!onlySingleMemberPlans && (
                            <select
                                value={selectedPlanId}
                                onChange={(e) => setSelectedPlanId(e.target.value)}
                                className="your-select-class"
                            >
                                {validPlans.map(plan => (
                                    <option key={plan.membership_plan_id} value={plan.membership_plan_id}>
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <button
                            onClick={handleRedirect}
                            className="your-button-class"
                            disabled={onlySingleMemberPlans}
                        >
                            Add Member
                        </button> */}
                    <div className="newsection1-wrapper">
                        <div className="newsection1-inner">
                            {!onlySingleMemberPlans && (
                                <select
                                    value={selectedPlanId}
                                    onChange={(e) => setSelectedPlanId(e.target.value)}
                                    className="newsection1-select"
                                >
                                    {validPlans.map(plan => (
                                        <option key={plan.membership_plan_id} value={plan.membership_plan_id}>
                                            {plan.name}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <button
                                onClick={handleRedirect}
                                className="newsection1-button"
                                disabled={onlySingleMemberPlans}
                            >
                                Add Member
                            </button>
                        </div>
                    </div>



                    <div className="membership_info">
                        <div className="membership_info_left">
                            <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="22" cy="22" r="22" fill="#AB0635" />
                                <path d="M21.616 25.672L21.208 20.776V13.96H23.296V20.776L22.888 25.672H21.616ZM23.488 30.664C23.152 31.016 22.736 31.192 22.24 31.192C21.744 31.192 21.32 31.016 20.968 30.664C20.632 30.312 20.464 29.888 20.464 29.392C20.464 28.912 20.64 28.496 20.992 28.144C21.344 27.776 21.76 27.592 22.24 27.592C22.72 27.592 23.136 27.776 23.488 28.144C23.84 28.496 24.016 28.912 24.016 29.392C24.016 29.888 23.84 30.312 23.488 30.664Z" fill="white" />
                            </svg>

                        </div>
                        <div className="membership_info_right">
                            <p><span>Password Note :</span>Only letters and numbers, please. Special characters like punctuation will not be saved, and you will not be able to</p>
                            <p>log in with a password like that.</p>
                        </div>
                    </div>
                    <div className="membership-container">
                        <div className="section-header">Membership Info</div>

                        <div className="card-wrapper">
                            <div className="info-section info-section1">
                                <div className="info-header info-header22">Membership :</div>
                                {
                                    memberships?.map((val, index) => {
                                        return (
                                            <div key={index} className="info-card">
                                                <p><strong>Membership Plan :</strong>{val?.plan.name}</p>
                                                <p><strong>Membership # :</strong>{val?.membership_plan_id}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className="info-section info-section2">
                                <div className="info-header">Mailing Information :</div>
                                <div className="info-card">
                                    <p><strong>Send Mail To :</strong>{memberships[0]?.user?.address}</p>
                                    <p><strong>Always Mail Pubs :</strong> No</p>
                                    {/* <div className="grid-2col">
                                        <div><strong className="lable1">Send Mail To:</strong></div>
                                        <div><strong className="lable1">Always Mail Pubs:</strong> </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="info-section info-section3">
                                <div className="info-header info-header11">Dues & Renewal :</div>
                                {/* <div className="info-card">
                                    <p><strong>Expiration Date :</strong> 2026 Feb 25 <span> | </span>  <strong>Amount Paid :</strong> 30.00</p>
                                    <p><strong>Donation :</strong> <span>0.00</span>  <span> | </span> <strong>Date :</strong> 2025 Feb 26</p>
                                    <p><strong>Payment Type :</strong> Paypal <span> | </span> <strong>Comment :</strong> GWalker</p>
                                </div> */}
                                <div className="info-card">
                                    <div className="grid-2col">
                                        <div><strong className="lable1">Expiration Date  :</strong>{memberships[0]?.end_date &&
                                            (() => {
                                                const date = new Date(memberships[0].end_date);
                                                const mm = String(date.getMonth() + 1).padStart(2, '0');
                                                const dd = String(date.getDate()).padStart(2, '0');
                                                const yy = String(date.getFullYear()).slice(-2);
                                                return `${mm}-${dd}-${yy}`;
                                            })()}</div>
                                        <div><strong className="lable1">Amount Paid       :</strong>${memberships[0]?.plan?.monthly_price}</div>
                                        <div><strong className="lable1">Donation             :</strong>{totalAmount}</div>
                                        <div><strong className="lable1">Date                      :</strong>{new Date(donations[0]?.created_at).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            // hour: "numeric",
                                            // minute: "2-digit",
                                            // hour12: true,
                                        })}</div>
                                        <div><strong className="lable1">Payment Type    :</strong>Paypal</div>
                                        <div><strong className="lable1">Comment            :</strong> No</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div className="member-settings-wrapper">
                        <div className="ms-tabs">
                            {tabList.map((tab) => (
                                <button
                                    key={tab}
                                    className={`ms-tab ${activeTab === tab ? "selected" : ""}`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        {
                            activeTab === "Member Info" &&
                            <div className="card cardissso">
                                <div className="grid-2col">
                                    <div><strong className="lable1">Member Active:</strong>{memberships[0]?.status === "active" ? "Yes" : "No"}</div>
                                    {/* <div><strong className="lable1">Address :</strong> Yes <span className="edit-icon edit-icon1"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" /></span></div> */}
                                    <div><strong className="lable1">Join Date:</strong>{memberships[0]?.end_date &&
                                        (() => {
                                            const date = new Date(memberships[0].start_date);
                                            const mm = String(date.getMonth() + 1).padStart(2, '0');
                                            const dd = String(date.getDate()).padStart(2, '0');
                                            const yy = String(date.getFullYear()).slice(-2);
                                            return `${mm}-${dd}-${yy}`;
                                        })()}</div>
                                    <div><strong className="lable1">Prefix:</strong>{memberships[0]?.prefix}</div>
                                    <div><strong className="lable1">First Name:</strong>{memberships[0]?.user.first_name}</div>
                                    <div><strong className="lable1">Last Name:</strong>{memberships[0]?.user.last_name}</div>
                                    <div><strong className="lable1">Preferred Name:</strong>{memberships[0]?.user.preferred_name}</div>
                                    <div><strong className="lable1">Middle:</strong>{memberships[0]?.user.middle}</div>
                                    <div><strong className="lable1">Maiden Name:</strong>{memberships[0]?.user.maiden_name}</div>
                                    {/* maiden_name */}
                                    <div><strong className="lable1">Use Maiden Name:</strong>{memberships[0]?.user.maiden_name}</div>
                                    <div><strong className="lable1">Suffix:</strong>{memberships[0]?.user.suffix}</div>
                                    {/* <div><strong className="lable1">Photo:</strong> No</div> */}
                                    <div><strong className="lable1">Date of birth:</strong>{memberships[0]?.user.dobMonth} {memberships[0]?.user.dob}{memberships[0]?.user.dobYear}</div>
                                </div>
                            </div>
                        }
                        {
                            activeTab === "Contact Info" && <div className="card cardissso">
                                <div className="grid-2col">
                                    <div><strong className="lable1">Address:</strong>{memberships[0]?.user?.address}</div>
                                    <div><strong className="lable1">Phone :</strong> {memberships[0]?.user?.mobile_number} <span onClick={handleEditClick1} className="edit-icon edit-icon1"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" /></span></div>
                                    <div><strong className="lable1">Address 2:</strong>{memberships[0]?.user?.address2}  </div>
                                    <div><strong className="lable1">Cell Phone:</strong> {memberships[0]?.user.cell_phone}</div>
                                    <div><strong className="lable1">City:</strong>{memberships[0]?.user?.city}</div>
                                    <div><strong className="lable1">Int'l. Phone:</strong>{memberships[0]?.user?.
                                        int_phone
                                    }</div>
                                    <div><strong className="lable1">State / Province:</strong>{memberships[0]?.user?.
                                        state}</div>
                                    <div><strong className="lable1">Preferred #:</strong>{memberships[0]?.user?.
                                        preferred
                                    }</div>
                                    {/* preferred */}
                                    <div><strong className="lable1">Postal Code:</strong>{memberships[0]?.user?.
                                        postal_code
                                    }</div>
                                    <div><strong className="lable1">Country:</strong>{memberships[0]?.user?.country}</div>
                                    <div><strong className="lable1">Email:</strong>{memberships[0]?.user?.email}</div>
                                    <div><strong className="lable1">Website:</strong>{memberships[0]?.user?.website}</div>

                                </div>
                            </div>
                        }

                        {open1 && (
                            <div className="alt-popup-overlay">
                                <div className="alt-popup-content">
                                    <h2 className="alt-popup-title">Edit Contact Info</h2>
                                    <div className="alt-popup-form">
                                        <div className="alt-popup-field">
                                            <label>Address:</label>
                                            <input type="text" name="address" value={formData1?.address} onChange={handleChange1} className="alt-popup-input" />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Phone:</label>
                                            {/* <input type="text" name="mobile_number" value={formData1?.mobile_number} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <PhoneInput
                                                className="test_inpuy"
                                                country={'us'}
                                                value={formData1.mobile_number}
                                                onChange={handlePhoneChange}
                                                //  className="nameform-input"
                                                inputProps={{
                                                    name: 'mobile_number',
                                                    required: true,
                                                    autoFocus: false,
                                                }}
                                                countryCodeEditable={false}
                                            />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Address 2:</label>
                                            <input type="text" name="address2" value={formData1?.address2} onChange={handleChange1} className="alt-popup-input" />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Cell Phone:</label>
                                            {/* <input type="text" name="cell_phone" value={formData1?.cell_phone} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <PhoneInput
                                                className="test_inpuy"
                                                country={'us'}
                                                value={formData1.cell_phone}
                                                onChange={handlePhoneChange1}
                                                //  className="nameform-input"
                                                inputProps={{
                                                    name: 'cell_phone',
                                                    required: true,
                                                    autoFocus: false,
                                                }}
                                                countryCodeEditable={false}
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Int'l Phone:</label>
                                            {/* <input type="text" name="int_phone" value={formData1?.int_phone} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <PhoneInput
                                                className="test_inpuy"
                                                country={'us'}
                                                value={formData1.int_phone}
                                                onChange={handlePhoneChange2}
                                                //  className="nameform-input"
                                                inputProps={{
                                                    name: 'int_phone',
                                                    required: true,
                                                    autoFocus: false,
                                                }}
                                                countryCodeEditable={false}
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Preferred #:</label>
                                            {/* <input type="text" name="preferred" value={formData1?.preferred} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <select name="preferred" value={formData1?.preferred} onChange={handleChange1} className="alt-popup-input">
                                                <option disabled>Select Preferred</option>
                                                <option>Int'l Phone</option>
                                                <option>Phone</option>
                                            </select>
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Country:</label>
                                            {/* <input type="text" name="country" value={formData1?.country} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <CreatableSelect
                                                placeholder="Select or type country"
                                                options={toOptions(countries)}
                                                value={
                                                    formData1.country
                                                        ? { label: formData1.country, value: formData1.country }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setFormData1((prev) => ({
                                                        ...prev,
                                                        country: selected?.value || '',
                                                        state: '',
                                                        city: '',
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>State:</label>
                                            {/* <input type="text" name="state" value={formData1?.state} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <CreatableSelect
                                                placeholder="Select or type state"
                                                options={toOptions(states)}
                                                value={
                                                    formData1.state
                                                        ? { label: formData1.state, value: formData1.state }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setFormData1((prev) => ({
                                                        ...prev,
                                                        state: selected?.value || '',
                                                        city: '',
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>City:</label>
                                            {/* <input type="text" name="city" value={formData1?.city} onChange={handleChange1} className="alt-popup-input" /> */}
                                            <CreatableSelect
                                                placeholder="Select or type city"
                                                options={toOptions(cities)}
                                                value={
                                                    formData1.city
                                                        ? { label: formData1.city, value: formData1.city }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setFormData1((prev) => ({
                                                        ...prev,
                                                        city: selected?.value || '',
                                                    }))
                                                }
                                            />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Postal Code:</label>
                                            <input type="text" name="postal_code" value={formData1?.postal_code} onChange={handleChange1} className="alt-popup-input" />
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Email:</label>
                                            <input type="email" name="email" value={formData1?.email} onChange={handleChange1} className="alt-popup-input" />
                                            {errors.email && <p style={{ color: "red" }} className="error-text">{errors.email}</p>}
                                        </div>
                                        <div className="alt-popup-field">
                                            <label>Website:</label>
                                            <input type="text" name="website" value={formData1?.website} onChange={handleChange1} className="alt-popup-input" />
                                            {errors.website && <p style={{ color: "red" }} className="error-text">{errors.website}</p>}
                                        </div>
                                    </div>
                                    <div className="alt-popup-buttons">
                                        <button onClick={() => setOpen1(false)} className="alt-cancel-btn">Cancel</button>
                                        <button onClick={handleSave1} className="alt-save-btn">Save</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {
                            activeTab === "Alt. Contact Info" && <div className="card cardissso">
                                <div className="grid-2col">
                                    <div><strong className="lable1">Seasonal Use:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.seasonal}</div>
                                    <div><strong className="lable1">Address :</strong> {memberships[0]?.user.
                                        alt_contact_infos[0]?.address} <span onClick={handleEditClick} className="edit-icon edit-icon1"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" /></span></div>

                                    <div><strong className="lable1">From:</strong> {memberships[0]?.user.
                                        alt_contact_infos[0]?.from_year} {memberships[0]?.user.
                                            alt_contact_infos[0]?.from_day_month} </div>
                                    <div><strong className="lable1">To:</strong>  {memberships[0]?.user.
                                        alt_contact_infos[0]?.to_year} {memberships[0]?.user.
                                            alt_contact_infos[0]?.to_day_month}</div>

                                    <div><strong className="lable1">Phone:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.phone}</div>
                                    <div><strong className="lable1">Address 2:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.address2}</div>
                                    <div><strong className="lable1">Int'l Phone:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.intl_phone}</div>
                                    <div><strong className="lable1">City:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.city}</div>
                                    {/* preferred */}
                                    <div><strong className="lable1">Preferred #:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.preferred}</div>
                                    <div><strong className="lable1">State / Province:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.state}</div>
                                    <div><strong className="lable1">Postal Code:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.postal_code}</div>
                                    <div><strong className="lable1">Country:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.country}</div>
                                    <div><strong className="lable1">Email:</strong>{memberships[0]?.user.
                                        alt_contact_infos[0]?.email}</div>
                                </div>
                            </div>
                        }


                        {open && (
                            <div className="alt-popup-overlay">
                                <div className="alt-popup-content">
                                    <h2 className="alt-popup-title">Edit Alt Contact Info</h2>
                                    <div className="alt-popup-form">
                                        <div className="alt-popup-field">
                                            <label>Seasonal Use:</label>
                                            <input
                                                type="text"
                                                name="seasonal"
                                                value={formData.seasonal}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>From Month:</label>
                                            {/* <input
                                                type="text"
                                                name="from_year"
                                                value={formData.from_year}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <select name="from_year" onChange={handleChange} value={formData?.from_year} className="alt-popup-input">
                                                <option></option>
                                                <option>January</option>
                                                <option>February</option>
                                                <option>March</option>
                                                <option>April</option>
                                                <option>May</option>
                                                <option>June</option>
                                                <option>July</option>
                                                <option>August</option>
                                                <option>September</option>
                                                <option>October</option>
                                                <option>November</option>
                                                <option>December</option>
                                            </select>
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>To Month:</label>
                                            {/* <input
                                                type="text"
                                                name="to_year"
                                                value={formData.to_year}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <select className="alt-popup-input" name="to_year" value={formData?.to_year} onChange={handleChange}>
                                                <option></option>
                                                <option>January</option>
                                                <option>February</option>
                                                <option>March</option>
                                                <option>April</option>
                                                <option>May</option>
                                                <option>June</option>
                                                <option>July</option>
                                                <option>August</option>
                                                <option>September</option>
                                                <option>October</option>
                                                <option>November</option>
                                                <option>December</option>
                                            </select>
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>From Day:</label>
                                            <input
                                                type="text"
                                                name="from_day_month"
                                                value={formData.from_day_month}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                            {errors1.from_day_month && <p style={{ color: "red" }} className="error-text">{errors1.from_day_month}</p>}
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>To Day:</label>
                                            <input
                                                type="text"
                                                name="to_day_month"
                                                value={formData.to_day_month}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                            {errors1.to_day_month && <p style={{ color: "red" }} className="error-text">{errors1.to_day_month}</p>}
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Phone:</label>
                                            {/* <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <PhoneInput
                                                className="test_inpuy"
                                                country={'us'}
                                                value={formData.phone}
                                                onChange={handlePhoneChange3}
                                                //  className="nameform-input"
                                                inputProps={{
                                                    name: 'phone',
                                                    required: true,
                                                    autoFocus: false,
                                                }}
                                                countryCodeEditable={false}
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Int'l Phone:</label>
                                            {/* <input
                                                type="text"
                                                name="intl_phone"
                                                value={formData.intl_phone}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <PhoneInput
                                                className="test_inpuy"
                                                country={'us'}
                                                value={formData.intl_phone}
                                                onChange={handlePhoneChange4}
                                                //  className="nameform-input"
                                                inputProps={{
                                                    name: 'intl_phone',
                                                    required: true,
                                                    autoFocus: false,
                                                }}
                                                countryCodeEditable={false}
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Preferred #:</label>
                                            {/* <input
                                                type="text"
                                                name="preferred"
                                                value={formData.preferred}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <select name="preferred" value={formData?.preferred} onChange={handleChange} className="alt-popup-input">
                                                <option>Select Preferred</option>
                                                <option>Phone</option>
                                                <option>Int'l Phone</option>
                                            </select>
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Address:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Address 2:</label>
                                            <input
                                                type="text"
                                                name="address2"
                                                value={formData.address2}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Country:</label>
                                            {/* <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <CreatableSelect
                                                placeholder="Select or type country"
                                                options={toOptions1(countries1)}
                                                value={
                                                    formData.country
                                                        ? { label: formData.country, value: formData.country }
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
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>State / Province:</label>
                                            {/* <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <CreatableSelect
                                                placeholder="Select or type state"
                                                options={toOptions1(states1)}
                                                value={
                                                    formData.state
                                                        ? { label: formData.state, value: formData.state }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        state: selected?.value || '',
                                                        city: '',
                                                    }))
                                                }
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>City:</label>
                                            {/* <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            /> */}
                                            <CreatableSelect
                                                placeholder="Select or type city"
                                                options={toOptions1(cities1)}
                                                value={
                                                    formData.city
                                                        ? { label: formData.city, value: formData.city }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        city: selected?.value || '',
                                                    }))
                                                }
                                            />
                                        </div>



                                        <div className="alt-popup-field">
                                            <label>Postal Code:</label>
                                            <input
                                                type="text"
                                                name="postal_code"
                                                value={formData.postal_code}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                        </div>

                                        <div className="alt-popup-field">
                                            <label>Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="alt-popup-input"
                                            />
                                            {errors1.email && <p style={{ color: "red" }} className="error-text">{errors1.email}</p>}
                                        </div>
                                    </div>


                                    <div className="alt-popup-buttons">
                                        <button onClick={() => setOpen(false)} className="alt-cancel-btn">Cancel</button>
                                        <button onClick={handleSave} className="alt-save-btn">Save</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {
                            activeTab === "Custom Data" && <div className="card cardissso">
                                <div className="grid-2col">
                                    <div><strong className="lable1">Company Name:</strong></div>
                                </div>
                            </div>
                        }
                        {
                            activeTab === "Surnames" &&
                            <div className="st-table-wrapper">
                                <div className="st-add-button-container">
                                    <button style={{ color: "white" }} className="st-add-button" onClick={handleAddClick}>Add</button>
                                </div>

                                {showModal && (
                                    <div className="st-modal-overlay">
                                        <div className="st-modal">
                                            <h3 className="st-modal-title">{isEditMode ? "Update New Surname" : "Add New Surname"}</h3>
                                            <div className="st-form-modal">
                                                <div style={{ width: "100%" }}>
                                                    <input name="surname" placeholder="Surname" value={form.surname} onChange={handleChangeform} />
                                                    {errors2.surname && <p style={{ color: "red" }} className="error-text">{errors2.surname}</p>}
                                                </div>
                                                <input name="county" placeholder="County" value={form.county} onChange={handleChangeform} />

                                                {/* <input name="country" placeholder="Country" value={form.country} onChange={handleChangeform} /> */}
                                                <CreatableSelect
                                                    placeholder="Select or type country"
                                                    options={toOptions2(countries2)}
                                                    value={
                                                        form.country
                                                            ? { label: form.country, value: form.country }
                                                            : null
                                                    }
                                                    onChange={(selected) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            country: selected?.value || '',
                                                            state: '',
                                                            city: '',
                                                        }))
                                                    }
                                                />
                                                {/* <input name="state" placeholder="State" value={form.state} onChange={handleChangeform} /> */}
                                                <CreatableSelect
                                                    placeholder="Select or type state"
                                                    options={toOptions2(states2)}
                                                    value={
                                                        form.state
                                                            ? { label: form.state, value: form.state }
                                                            : null
                                                    }
                                                    onChange={(selected) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            state: selected?.value || '',
                                                            city: '',
                                                        }))
                                                    }
                                                />
                                                {/* <input name="city" placeholder="City" value={form.city} onChange={handleChangeform} /> */}
                                                <CreatableSelect
                                                    placeholder="Select or type city"
                                                    options={toOptions2(cities2)}
                                                    value={
                                                        form.city
                                                            ? { label: form.city, value: form.city }
                                                            : null
                                                    }
                                                    onChange={(selected) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            city: selected?.value || '',
                                                        }))
                                                    }
                                                />
                                                <div style={{ width: "100%" }}>
                                                    <input name="start_year" placeholder="Start Year" value={form.start_year} onChange={handleChangeform} />
                                                    {errors2.start_year && <p style={{ color: "red" }} className="error-text">{errors2.start_year}</p>}
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <input name="end_year" placeholder="End Year" value={form.end_year} onChange={handleChangeform} />
                                                    {errors2.end_year && <p style={{ color: "red" }} className="error-text">{errors2.end_year}</p>}
                                                </div>
                                                <input name="alt_spelling" placeholder="Alt Spelling" value={form.alt_spelling} onChange={handleChangeform} />
                                                {/* <input name="commant" placeholder="Comment" value={form.commant} onChange={handleChangeform} /> */}
                                                <div>
                                                    <textarea style={{ height: "80px", padding: "8px", fontSize: "16px" }} value={form?.commant} name="commant" onChange={handleChangeform} placeholder="Comment"></textarea>
                                                </div>
                                                <div className="st-modal-buttons">
                                                    <button onClick={handleAdd} className="st-save-btn">{isEditMode ? "Update" : "Save"}</button>
                                                    <button onClick={() => setShowModal(false)} className="st-cancel-btn">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <table className="st-table">
                                    <thead>
                                        <tr>
                                            <th>Actions</th>
                                            <th>Surname</th>
                                            <th>City</th>
                                            <th>County</th>
                                            <th>State</th>
                                            <th>Country</th>
                                            <th>Start Year</th>
                                            <th>End Year</th>
                                            <th>Alt Spelling</th>
                                            <th>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {memberships[0]?.user?.surnames.map((entry, index) => (
                                            <tr key={index}>
                                                <td className="st-actions-cell">
                                                    <button onClick={() => {
                                                        setForm(entry); // Prefill the form with current row data
                                                        setEditId(entry.id); // Set ID for PUT
                                                        setIsEditMode(true); // Mark as edit mode
                                                        setShowModal(true); // Open modal
                                                    }} className="st-edit-btn">✏️</button>
                                                    <button onClick={() => handleDelete(entry.id)} className="st-delete-btn">🗑️</button>
                                                </td>
                                                <td>{entry.surname}</td>
                                                <td>{entry.city}</td>
                                                <td>{entry.county}</td>
                                                <td>{entry.state}</td>
                                                <td>{entry.country}</td>
                                                <td>{entry.start_year}</td>
                                                <td>{entry.end_year}</td>
                                                <td>{entry.alt_spelling}</td>
                                                <td>{entry.commant}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                        {
                            activeTab === "Member Setting" && <div>
                                <div className="card-section">
                                    <h2 className="section-title">Site Access :</h2>
                                    <div className="site-access-grid">
                                        <div className="access-box">
                                            <span className="label">Login Name :</span>
                                            <span className="value">{currentLoginName}<span onClick={handleEditClick11} className="edit-icon"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" alt="" /></span></span>

                                        </div>
                                        <div className="access-box">
                                            <span className="label">Password :</span>
                                            <span className="value">Null  <span onClick={handleEditClick22} className="edit-icon"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" alt="" /></span></span>

                                        </div>
                                    </div>
                                </div>

                                {showPopup && (
                                    <div className="site-access-popup-overlay-unique">
                                        <div className="site-access-popup-box-unique">
                                            <h3>Edit Login Name</h3>
                                            <input
                                                type="text"
                                                value={newLoginName}
                                                onChange={(e) => setNewLoginName(e.target.value)}
                                            />
                                            <div className="password-popup-actions-unique">
                                                <button onClick={handleSubmit11}>Save</button>
                                                <button onClick={() => setShowPopup(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ===========reset password======== */}

                                {showPopup1 && (
                                    <div className="password-popup-overlay-unique">
                                        <div className="password-popup-box-unique">
                                            <h3>Set New Password</h3>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="password-popup-actions-unique">
                                                <button onClick={handleSubmit22}>Save</button>
                                                <button onClick={() => setShowPopup1(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="card-section">
                                    <h2 className="section-title">Membership List :</h2>
                                    <div className="card-row">
                                        <div className="card">
                                            <div className="grid-2col">
                                                <div><strong className="lable1">Show Name :</strong>{memberships[0]?.user.
                                                    member_settings[0]?.show_name === 1 ? "Yes" : "No"}</div>
                                                <div><strong className="lable1">Address :</strong>{memberships[0]?.user?.member_settings[0]?.address === 1 ? "Yes" : "No"}<span onClick={openMembershipEditPopup} className="edit-icon edit-icon1"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" /></span></div>
                                                <div><strong className="lable1">Telephone :</strong>{memberships[0]?.user?.member_settings[0]?.
                                                    telephone === 1 ? "Yes" : "No"
                                                }</div>
                                                <div><strong className="lable1">Email Address :</strong>{memberships[0]?.user?.member_settings[0]?.
                                                    email_address === 1 ? "Yes" : "No"
                                                }</div>
                                                <div><strong className="lable1">Website :</strong>{memberships[0]?.user?.member_settings[0]?.
                                                    website === 1 ? "Yes" : "No"
                                                }</div>
                                                <div><strong className="lable1">Photo :</strong>{memberships[0]?.user?.member_settings[0]?.photo === 1 ? "Yes" : "No"}</div>
                                            </div>
                                        </div>

                                        <div className="card card11">
                                            <h2 className="section-title">Receive Email Now :</h2>
                                            <div className="grid-2col grid-2col11">
                                                <div><strong className="lable1">General Notices :</strong>{memberships[0]?.user?.member_settings[0]?.
                                                    general_notices === 1 ? "Yes" : "No"} <span onClick={openMembershipEditPopup1} className="edit-icon edit-icon1"><img width={24} height={24} src="https://res.cloudinary.com/dgif730br/image/upload/v1744636032/Mask_group_gzjnak.png" alt="" /></span></div>
                                                <div><strong className="lable1">Event Reminders :</strong> {memberships[0]?.user?.member_settings[0]?.
                                                    event_reminders === 1 ? "Yes" : "No"}</div>
                                                <div><strong className="lable1">News Letters :</strong>{memberships[0]?.user?.member_settings[0]?.
                                                    newsletters === 1 ? "Yes" : "No"
                                                }</div>
                                                <div><strong className="lable1">Surname Inquiries :</strong> {data1?.surname_inquiries
                                                    === true ? "Yes" : "No"
                                                }</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* {showMembershipPopup && (
                            <div className="popup">
                                <h3>Membership List</h3>
                                <label><input type="checkbox" name="show_name" checked={formData.show_name} onChange={handleCheckboxChange} /> Show Name</label>
                                <label><input type="checkbox" name="address" checked={formData.address} onChange={handleCheckboxChange} /> Address</label>
                                <label><input type="checkbox" name="telephone" checked={formData.telephone} onChange={handleCheckboxChange} /> Telephone</label>
                                <label><input type="checkbox" name="email_address" checked={formData.email_address} onChange={handleCheckboxChange} /> Email Address</label>
                                <label><input type="checkbox" name="website" checked={formData.website} onChange={handleCheckboxChange} /> Website</label>
                                <label><input type="checkbox" name="photo" checked={formData.photo} onChange={handleCheckboxChange} /> Photo</label>
                                <button onClick={handleSubmit}>Save</button>
                            </div>
                        )}

                        {showEmailPopup && (
                            <div className="popup">
                                <h3>Receive Email Now</h3>
                                <label><input type="checkbox" name="general_notices" checked={formData.general_notices} onChange={handleCheckboxChange} /> General Notices</label>
                                <label><input type="checkbox" name="event_reminders" checked={formData.event_reminders} onChange={handleCheckboxChange} /> Event Reminders</label>
                                <label><input type="checkbox" name="newsletters" checked={formData.newsletters} onChange={handleCheckboxChange} /> News Letters</label>
                                <label><input type="checkbox" name="surname_inquiries" checked={formData.surname_inquiries} onChange={handleCheckboxChange} /> Surname Inquiries</label>
                                <button onClick={handleSubmit}>Save</button>
                            </div>
                        )} */}
                        {showMembershipPopup && (
                            <div className="popup-overlay" onClick={() => setShowMembershipPopup(false)}>
                                <div
                                    className="popup-content"
                                    onClick={(e) => e.stopPropagation()} // click overlay pe close, content pe nahi
                                >
                                    <h3>Edit Membership Settings</h3>

                                    <form>
                                        {Object.keys(defaultSettings)
                                            .filter((key) => !excludeKeys.includes(key))
                                            .map((key) => (
                                                <label key={key} className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        name={key}
                                                        checked={formData3[key]}
                                                        onChange={handleCheckboxChange}
                                                        className="checkbox-input"
                                                    />
                                                    {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                </label>
                                            ))}

                                        <div className="popup-buttons">
                                            <button
                                                type="button"
                                                onClick={() => setShowMembershipPopup(false)}
                                                className="btn btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                className="btn btn-save"
                                            >
                                                Save
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>

                        )}

                        {showSpecialPopup && (
                            <div className="popup-overlay" onClick={() => setShowSpecialPopup(false)}>
                                <div
                                    className="popup-content"
                                    onClick={(e) => e.stopPropagation()} // overlay click pe close, content pe nahi
                                >
                                    <h3>Recieve Email Now</h3>
                                    <form>
                                        {specialKeys.map((key) => (
                                            <label key={key} className="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    name={key}
                                                    checked={formData3[key]}
                                                    onChange={handleCheckboxChange}
                                                    className="checkbox-input"
                                                />
                                                {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                            </label>
                                        ))}

                                        <div className="popup-buttons">
                                            <button
                                                type="button"
                                                onClick={() => setShowSpecialPopup(false)}
                                                className="btn btn-cancel"
                                            >
                                                Cancel
                                            </button>
                                            <button type="button" onClick={handleSubmit} className="btn btn-save">
                                                Save
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>


        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        console.log(context);
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