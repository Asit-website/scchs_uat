import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import HeadSEO from "../components/common/Head/head";
import GlobalHeaderFooter from "../utils/common/global-header-footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadSEO1 from "../components/common/Head/head1";
import { toast } from "react-toastify";
// import "../css/login.module.scss";
var settingsMorePhotos = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};

export default function resetpassword(pageProp) {
    const router = useRouter();
    const { token, email } = router.query;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
        if (token && email) {
            setFormReady(true);
        }
    }, [token, email]);

    const handleReset = async () => {
        const payload = {
            token,
            email: decodeURIComponent(email),
            password,
            password_confirmation: confirmPassword
        };

        try {
            const response = await fetch("https://uat.scchs.co.in/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log("Reset Success:", data);
            toast.success(data?.message);
            setPassword("");
            setConfirmPassword("");
            router.push("/user/userlogin");
            // Redirect or show success message here
        } catch (error) {
            console.error("Reset Error:", error);
        }
    };

    if (!formReady) return <p>Loading...</p>;

    return (
        <div className="page_shopping_list sop">
            <HeadSEO title={"login"} description={"this is member login page"} image={null} />

            <HeadSEO1 />


            <div className="scchs-login-wrapper scchs-dev-card">
                <Link href="/user/userlogin"><button className="black_set">Back</button></Link>
                <div className="scchs-login-card scchs-reset-card rt_card">
                    <div>
                        <h2 style={{marginBottom:"30px"}}>Reset Your Password</h2>
                        <div className="scchs-input-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div className="scchs-input-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        </div>
                        <button className="scchs-login-button" onClick={handleReset}>Submit</button>
                    </div>
                </div>
            </div>
            {/* <div className="login_problem">
                <div className="login_problem_wrapper">
                    <h2>Login Problems?</h2>
                    <p>Click on the ? icon to the right of the Login Name or Password field if you have misplaced or don't know your login name or password. The login name or password re-set instructions will be sent to the email address in your profile on file at SCCHS. If you don't have an email address or don't know the one on file at SCCHS please call <span>(636) 946-9828.</span></p>
                </div>
            </div> */}
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