import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import HeadSEO from "../../components/common/Head/head";
import GlobalHeaderFooter from "../../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../../components/common/Head/head1";
import "../css/login.module.scss";
import { toast } from "react-toastify";
var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function memberlogin(pageProp) {
    const [showLogin, setShowLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

     const addToCartApi = async (id , access) => {

        const resp = await fetch('https://uat.scchs.co.in/api/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
             "Authorization":`Bearer ${access}`
          },
          body: JSON.stringify({
            product_id: id,
            quantity: 1,
          }),
        })
          .then(response => response.json())
         
          .catch(error => console.error('Error:', error));
    
      }


    const submitLogin = async (e) => {
        e.preventDefault();

        const url = `https://uat.scchs.co.in/api/login`;
        const payload = {
            username: username,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });


            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            const data = await response.json();
            console.log(data);
            
          if(data.status === false){
            toast.error(data.message);
            return
          }
         


            localStorage.setItem("scchs_Access", JSON.stringify(data?.user?.access_token));
            localStorage.setItem("scchs_User", JSON.stringify(data?.user?.user_info));

            // added the carts into the user carts 
            let allCarts = JSON.parse(sessionStorage.getItem("cartItems")) || [];

            for(let cart of allCarts){
                 console.log("cart" , cart);
                await addToCartApi(cart?.id , data?.user?.access_token);
            }
            toast.success(data?.message);
            window.location.href = "/join/memberplan";
            setUserName('');
            setPassword('');


        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />


            <div className="scchs-login-wrapper">
                <div className="scchs-login-card">
                    <p className="scchs-info-text">
                        If you are a member, please enter your login information below. If you are not a member, and would like more information about becoming one, please{" "}
                        <Link href="/membership-information-join-us"><span className="scchs-click-here">CLICK HERE.</span></Link>
                    </p>
                    <h2 className="scchs-login-title">Sign in</h2>
                    <form onSubmit={submitLogin}>
                        <div className="scchs-input-group">
                            <input required onChange={(e) => setUserName(e.target.value)} name="username" value={username} type="text" placeholder="Login Name" />
                            <span
                                onClick={() => setShowLogin(!showLogin)}
                                className="scchs-eye-icon"
                            >
                                <svg width="24" height="17" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0007 18.024C16.6673 18.024 18.084 17.3859 19.2507 16.1099C20.4173 14.8338 21.0007 13.2843 21.0007 11.4613C21.0007 9.63831 20.4173 8.08878 19.2507 6.8127C18.084 5.53662 16.6673 4.89857 15.0007 4.89857C13.334 4.89857 11.9173 5.53662 10.7507 6.8127C9.58398 8.08878 9.00065 9.63831 9.00065 11.4613C9.00065 13.2843 9.58398 14.8338 10.7507 16.1099C11.9173 17.3859 13.334 18.024 15.0007 18.024ZM15.0007 15.3989C14.0007 15.3989 13.1507 15.0161 12.4507 14.2504C11.7507 13.4848 11.4007 12.5551 11.4007 11.4613C11.4007 10.3675 11.7507 9.43778 12.4507 8.67213C13.1507 7.90648 14.0007 7.52366 15.0007 7.52366C16.0007 7.52366 16.8507 7.90648 17.5506 8.67213C18.2507 9.43778 18.6006 10.3675 18.6006 11.4613C18.6006 12.5551 18.2507 13.4848 17.5506 14.2504C16.8507 15.0161 16.0007 15.3989 15.0007 15.3989ZM15.0007 22.3991C11.7562 22.3991 8.80065 21.4086 6.13398 19.4277C3.46732 17.4467 1.53398 14.7912 0.333984 11.4613C1.53398 8.13131 3.46732 5.47585 6.13398 3.49488C8.80065 1.51392 11.7562 0.523438 15.0007 0.523438C18.2451 0.523438 21.2006 1.51392 23.8673 3.49488C26.534 5.47585 28.4673 8.13131 29.6673 11.4613C28.4673 14.7912 26.534 17.4467 23.8673 19.4277C21.2006 21.4086 18.2451 22.3991 15.0007 22.3991ZM15.0007 19.4824C17.5118 19.4824 19.8173 18.7593 21.9173 17.313C24.0173 15.8668 25.6229 13.9162 26.734 11.4613C25.6229 9.00634 24.0173 7.05576 21.9173 5.60953C19.8173 4.16331 17.5118 3.4402 15.0007 3.4402C12.4895 3.4402 10.184 4.16331 8.08398 5.60953C5.98398 7.05576 4.37843 9.00634 3.26732 11.4613C4.37843 13.9162 5.98398 15.8668 8.08398 17.313C10.184 18.7593 12.4895 19.4824 15.0007 19.4824Z" fill="#909CA8" />
                                </svg>

                            </span>
                        </div>

                        <div className="scchs-input-group">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="scchs-eye-icon"
                            >
                                <svg width="24" height="17" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.0007 18.024C16.6673 18.024 18.084 17.3859 19.2507 16.1099C20.4173 14.8338 21.0007 13.2843 21.0007 11.4613C21.0007 9.63831 20.4173 8.08878 19.2507 6.8127C18.084 5.53662 16.6673 4.89857 15.0007 4.89857C13.334 4.89857 11.9173 5.53662 10.7507 6.8127C9.58398 8.08878 9.00065 9.63831 9.00065 11.4613C9.00065 13.2843 9.58398 14.8338 10.7507 16.1099C11.9173 17.3859 13.334 18.024 15.0007 18.024ZM15.0007 15.3989C14.0007 15.3989 13.1507 15.0161 12.4507 14.2504C11.7507 13.4848 11.4007 12.5551 11.4007 11.4613C11.4007 10.3675 11.7507 9.43778 12.4507 8.67213C13.1507 7.90648 14.0007 7.52366 15.0007 7.52366C16.0007 7.52366 16.8507 7.90648 17.5506 8.67213C18.2507 9.43778 18.6006 10.3675 18.6006 11.4613C18.6006 12.5551 18.2507 13.4848 17.5506 14.2504C16.8507 15.0161 16.0007 15.3989 15.0007 15.3989ZM15.0007 22.3991C11.7562 22.3991 8.80065 21.4086 6.13398 19.4277C3.46732 17.4467 1.53398 14.7912 0.333984 11.4613C1.53398 8.13131 3.46732 5.47585 6.13398 3.49488C8.80065 1.51392 11.7562 0.523438 15.0007 0.523438C18.2451 0.523438 21.2006 1.51392 23.8673 3.49488C26.534 5.47585 28.4673 8.13131 29.6673 11.4613C28.4673 14.7912 26.534 17.4467 23.8673 19.4277C21.2006 21.4086 18.2451 22.3991 15.0007 22.3991ZM15.0007 19.4824C17.5118 19.4824 19.8173 18.7593 21.9173 17.313C24.0173 15.8668 25.6229 13.9162 26.734 11.4613C25.6229 9.00634 24.0173 7.05576 21.9173 5.60953C19.8173 4.16331 17.5118 3.4402 15.0007 3.4402C12.4895 3.4402 10.184 4.16331 8.08398 5.60953C5.98398 7.05576 4.37843 9.00634 3.26732 11.4613C4.37843 13.9162 5.98398 15.8668 8.08398 17.313C10.184 18.7593 12.4895 19.4824 15.0007 19.4824Z" fill="#909CA8" />
                                </svg>

                            </span>
                        </div>

                        <Link style={{ textDecoration: "none" }} href="/member/loginchange"><p className="scchs-forgot-link">Forgot Username or Password?</p></Link>

                        <button type="submit" className="scchs-login-button">Login</button>
                    </form>
                </div>
            </div>
            <div className="login_problem">
                <div className="login_problem_wrapper">
                    <h2>Login Problems?</h2>
                    <p>Click on the ? icon to the right of the Login Name or Password field if you have misplaced or don't know your login name or password. The login name or password re-set instructions will be sent to the email address in your profile on file at SCCHS. If you don't have an email address or don't know the one on file at SCCHS please call <span>(636) 946-9828.</span></p>
                </div>
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