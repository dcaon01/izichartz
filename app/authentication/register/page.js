'use client';

import classes from "../Auth.module.css";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";
import { useState } from "react";

export default function RegisterPage() {
    let [isVisible1, setIsVisible1] = useState(false);
    let [isVisible2, setIsVisible2] = useState(false);

    function handlePswVisible1(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isVisible1) {
            setIsVisible1(false);
        } else {
            setIsVisible1(true);
        }
    }

    function handlePswVisible2(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("culo");
        if (isVisible2) {
            setIsVisible2(false);
        } else {
            setIsVisible2(true);
        }
        console.log(isVisible2);
    }

    return (
        <>
            <h1 className={`${robotoMono.className}`}>Register</h1>
            <form className={classes.form}>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Username</label>
                    <input className={`${robotoMono.className} ${classes.input}`} type="text" id="register-username" name="register-email" required />
                </div>
                <div className={classes.inputWrapper}>
                    <label className={`${robotoMono.className}`}>Email</label>
                    <input className={`${robotoMono.className} ${classes.input}`} type="email" id="register-email" name="register-email" required />
                </div>
                <div className={classes.inputWrapper}>
                    <div className={classes.passwordHead}>
                        <label className={`${robotoMono.className}`}>Password</label>
                        <div className={classes.visible} onClick={handlePswVisible1} >
                            <img src={isVisible1 ? "/assets/global/visible.png" : "/assets/global/not_visible.png"} height={16} width={16} alt={isVisible2 ? "hide" : "show"} />
                        </div>
                    </div>
                    <input
                        className={`${classes.input}`}
                        type={isVisible1 ? "text" : "password"}
                        id="register-password"
                        name="register-password"
                        required
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <div className={classes.passwordHead}>
                        <label className={`${robotoMono.className}`}>Confirm Password</label>
                        <div className={classes.visible} onClick={handlePswVisible2}>
                            <img src={isVisible2 ? "/assets/global/visible.png" : "/assets/global/not_visible.png"} height={16} width={16} alt={isVisible2 ? "hide" : "show"}  />
                        </div>
                    </div>
                    <input
                        className={`${classes.input}`}
                        type={isVisible2 ? "text" : "password"}
                        id="register-confirm-password"
                        name="register-confirm-password"
                        required
                    />
                </div>
                <button className={`${classes.submitButton} ${robotoMono.className}`} type="submit">Register</button>
            </form>
            <div className={classes.account}>
                <p className={`${robotoMono.className} ${classes.already}`}>
                    Already have an account?&nbsp;
                </p>
                <Link className={`${classes.toLogin} ${robotoMono.className}`} href="/authentication/login">Login</Link>
            </div>
        </>
    );
}