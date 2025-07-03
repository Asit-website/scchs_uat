import Image from 'next/image'
import React, { useRef, useState } from 'react'
import style from "./css/login.module.scss";
import moment from 'moment';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const baseurl = `https://admin.instacertify.com`


export default function CreateAccount() {

    const router = useRouter();
    const { status } = useSession()
    const [formSubmit, setFormSubmit] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [conEmail, setConEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameRef = useRef();
    const emailRef = useRef();
    const conEmailRef = useRef();
    const passwordRef = useRef();

    if (status == "authenticated") {
        router.push("/");
        return;
    }

    const createAccount = async () => {

        const nameSplit = name?.trim()?.split(' ');
        let fName = "";
        let lName = "";

        if (nameSplit.length == 1) {
            fName = name;
            lName = " .";
        }
        else if (nameSplit.length > 1) {
            lName = "";
            nameSplit.map((ls, i) => {
                if (i === 0) {
                    fName = ls;
                } else {
                    lName += ls + " ";
                }
            })
        }

        const data = {
            "email": conEmail,
            "name": fName?.trim(),
            "last_name": lName?.trim(),
            "password": password
        }

        try {

            const registrationRes = await fetch(`${process.env.server.api}registration`, {
                method: "POST", body: JSON.stringify(data), headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            const regiData = await registrationRes.json();

            if (regiData.status == false) {
                let nameMsg = regiData?.message?.name;
                let emailMsg = regiData?.message?.email;
                if (typeof nameMsg == "undefined") {
                    nameMsg = "";
                }
                if (typeof emailMsg == "undefined") {
                    emailMsg = "";
                }
                setMessage(`${nameMsg} <br /> ${emailMsg}`)
                setFormSubmit(false);
            }

            if (regiData.status == true) {
                setMessage(`${regiData?.message}`);
                setName('');
                setEmail('');
                setConEmail('');
                setPassword('');
                setFormSubmit(false);
                window.location.href = "/login"
            }

        } catch (error) {
            setMessage(`Something went wrong.`)
            setFormSubmit(false);
        }



    }

    // const submitAccount = (e) => {
    //     e.preventDefault();

    //     if (status == "authenticated") {
    //         router.push("/");
    //         return;
    //     }

    //     if (name == "") {
    //         setMessage("Please enter name.")
    //         setFormSubmit(false);
    //         nameRef.current.focus();
    //         return false;
    //     }
    //     else if (email == "") {
    //         setMessage("Please enter the correct email address.")
    //         setFormSubmit(false);
    //         emailRef.current.focus();
    //         return false;
    //     }
    //     else if (conEmail == "") {
    //         setMessage("Please enter the correct confirm email address.")
    //         setFormSubmit(false);
    //         conEmailRef.current.focus();
    //         return false;
    //     }
    //     else if (email != conEmail) {
    //         setMessage("The confirmation email does not match the email address.")
    //         setFormSubmit(false);
    //         conEmailRef.current.focus();
    //         return false;
    //     }
    //     else if (password == "") {
    //         setMessage("Please enter the secure password.")
    //         setFormSubmit(false);
    //         passwordRef.current.focus();
    //         return false;
    //     }
    //     else if (password.search(/[a-z]/i) < 0) {
    //         setMessage("Your password must contain at least one letter.")
    //         setFormSubmit(false);
    //         passwordRef.current.focus();
    //         return false;
    //     }
    //     else if (password.search(/[0-9]/) < 0) {
    //         setMessage("Your password must contain at least one letter.")
    //         setFormSubmit(false);
    //         passwordRef.current.focus();
    //         return false;
    //     }
    //     else if (password.length < 8) {
    //         setMessage("The password must be at least 8 characters.")
    //         setFormSubmit(false);
    //         passwordRef.current.focus();
    //         return false;
    //     }
    //     else {
    //         setMessage("")
    //         setFormSubmit(true);
    //         createAccount();
    //         return true;
    //     }
    // }


    const submitAccount = async (e) => {
        e.preventDefault();

        if (email === "" || conEmail === "" || password === "" || name === "") {
            return alert("Please Fill all fields");
        }

        if (email !== conEmail) {
            return alert("Email Do not Match");
        }


        const url = "https://uat.scchs.co.in/api/registration"
        const payload = {
            name: name,
            email: email,
            last_name: name,
            password: password,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });


            if (!response.status) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log("Dataa ", data);

            if (data?.status) {
                alert("Successfuly register");
                router.push("/login");
            }

            if (!data?.status) {
                if (data?.message?.password) {
                    alert(data?.message?.password[0]);
                }
                else {
                    alert(data?.message?.email[0]);
                }
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };


    return (
        <div>
            <Head>
                <title>Create an Account</title>
                <meta name="description" content='Create an Account'></meta>
            </Head>
            <div className="page_auth">
                <div className={style.parent_registeration}>
                    <div className={style.left}>
                        <div className={style.loginForm}>

                            {formSubmit == true ? (<span className='loadingOverlay' style={{ display: 'block' }} />) : ""}

                            {/* <Link href={'/'}>
                            <Image
                            className={style.faf_logo}
                            src={'https://cdn11.bigcommerce.com/s-suzeuussqe/images/stencil/original/image-manager/fairchild-fun-logo.png'}
                            width="182"
                            height="65"
                            quality={100}
                            alt={'fairchild'} />
                        </Link> */}

                            <a href="/"><img width="200" src='https://res.cloudinary.com/dgif730br/image/upload/v1730890917/Layer_1_2_zplfnk.png' /></a>

                            <h1>Create an Account</h1>
                            <p>
                                Have to Instacertify?
                                <Link className={style.faf_anchor} href="/login"> <span>Log In</span> </Link>
                            </p>

                            {message != '' ? (<span className={style.formMessge} dangerouslySetInnerHTML={{ __html: message }}></span>) : ""}

                            <form onSubmit={submitAccount}>
                                <div className='syst'>
                                    <div className='syst_left'>
                                        <div className={style.form_control}>
                                            <input ref={nameRef} required type="text" placeholder="First Name" value={name} onChange={(e) => { setName(e.target.value); setMessage("") }} />
                                        </div>
                                        <div className={style.form_control}>
                                            <input ref={emailRef} required type="email" placeholder="Email address" value={email} onChange={(e) => { setEmail(e.target.value); setMessage("") }} maxLength={'50'} />
                                        </div>
                                        <div className={style.form_control}>
                                            <input ref={conEmailRef} required type="email" placeholder="Confirm email address" value={conEmail} onChange={(e) => { setConEmail(e.target.value); setMessage("") }} maxLength={'50'} />
                                        </div>
                                        <div className={style.form_control}>
                                            <input ref={passwordRef} required type="password" placeholder="Create a secure password" value={password} onChange={(e) => { setPassword(e.target.value); setMessage("") }} maxLength={'20'} />
                                        </div>
                                        <div className={style.form_control}>
                                            <input type="text" placeholder="Company Name" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input type="text" placeholder="Designation" />
                                        </div>
                                        <div className={style.form_control}>
                                            <select>
                                                <option>Interested in</option>
                                                <option>Certification</option>
                                                <option>Testing</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='syst_right'>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="Last Name" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="GST" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="Office Address" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="Country" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="State" />
                                        </div>
                                        <div className={style.form_control}>
                                            <input required type="text" placeholder="Pin Code" />
                                        </div>
                                    </div>
                                </div>

                               

                                <button className={style.faf_btn_primary}>Create Account</button>
                            </form>
                        </div>
                        <p className={style.footerCopyrgiht}>
                            Copyright @{moment(new Date()).format('Y')} Instacertify.
                        </p>
                    </div>
                    <div className={style.right}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            {/* <Image
                                className={style.faf_logo}
                                src={'/images/create-account-back.png'}
                                width="800"
                                height="1024"
                                quality={100}
                                alt={'InstaCertify'} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
