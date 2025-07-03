import Image from 'next/image'
import React, { useRef, useState } from 'react'
import style from "./css/login.module.scss";
import moment from 'moment';
import Link from 'next/link';
import Head from 'next/head';


export default function ForgotPassword() {

    const [formSubmit, setFormSubmit] = useState(false);
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [email, setEmail] = useState('');
    const emailRef = useRef();

    const submitForgot = (e) => {
        e.preventDefault();
        if (email == "") {
            setMessage("Please enter the email address.")
            setMessageColor("red")
            setFormSubmit(false);
            emailRef.current.focus();
            return false;
        } else {
            setFormSubmit(true);
            setMessageColor("green")
            setMessage("If the email address you submitted is a valid username, you will receive an email with instructions on how to reset your password within a few minutes.")
            //signIn("credentials", {username: email, password:password, redirect:true, callbackUrl:"/" })
            setFormSubmit(false);
            setEmail('')
            return true;
        }
    }

    return (
        <div>
            <Head>
                <title>Forgot Password</title>
                <meta name="description" content='Forgot Password'></meta>
            </Head>
            <div className="page_auth">
                <div className={style.parent_registeration}>
                    <div className={style.left}>
                        <div className={style.loginForm}>

                            {formSubmit == true ? (<span className='loadingOverlay' style={{ display: 'block' }} />) : ""}

                            {/* <Link href={'/'}>
                            <Image
                            className={style.faf_logo}
                            src={'https://demoadmin.mwrweb.com/backend/admin/images/header/15504930851710902620.png&w=256&q=100'}
                            width="182"
                            height="65"
                            quality={100}
                            alt={'Logo'} />
                        </Link> */}

                            <a href="/"><img width="200" src='https://res.cloudinary.com/dgif730br/image/upload/v1730890917/Layer_1_2_zplfnk.png' /></a>

                            <h1>Forgot Password</h1>
                            <p>
                                Have to Instacertify?
                                <Link className={style.faf_anchor} href="/login"> <span>Log In</span> </Link>
                            </p>

                            {message != '' ? (<span style={{ color: ' ' + messageColor }} className={style.formMessge}>{message}</span>) : ""}

                            <form onSubmit={submitForgot}>
                                <p style={{ marginTop: '50px' }}>Enter your email and we'll send you a password reset link.</p>
                                <div className={style.form_control}>
                                    <input ref={emailRef} required type="email" placeholder="Email address" value={email} onChange={(e) => { setEmail(e.target.value); setMessage("") }} maxLength={'50'} />
                                </div>
                                <button className={style.faf_btn_primary}>Email reset link</button>
                            </form>

                        </div>
                        <p className={style.footerCopyrgiht}>
                            Copyright @{moment(new Date()).format('Y')} Instacertify.
                        </p>
                    </div>
                    <div className={style.right}>
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image
                                className={style.faf_logo}
                                src={'/images/create-account-back.png'}
                                width="800"
                                height="1024"
                                quality={100}
                                alt={'fairchild'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


{/* <div class="g-recaptcha" data-sitekey="6Lf_-nYqAAAAAFQaoi8HhEofoJKPAW0gcSvHUAJ6"></div> */}