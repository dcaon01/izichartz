'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { robotoMono } from "@/app/fonts.js";
import { useAnimate } from "framer-motion";

export default function MobileNavbar() {
    let [isMenuDroppedDown, setMenuDropDown] = useState(false);
    const [scope, animate] = useAnimate();

    function handleMenuDropDown() {
        if (isMenuDroppedDown) {
            setMenuDropDown(false);
        } else {
            setMenuDropDown(true);
        }
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.headSection}>
                <Link className={classes.logo} href="/">
                    {/* Dimensioni originali: w=181, h=135*/}
                    <img src="/assets/global/logo-mobile.png" height={30} width={41} alt="Back to Home" />
                </Link>
                <div className={classes.menu} onClick={handleMenuDropDown}>
                    <span className={classes.line1}/>
                    <span className={classes.line2}/>
                    <span className={classes.line3}/>
                </div>
                {
                    isMenuDroppedDown &&
                    <div className={classes.links}>
                        <Link className={`${classes.link} ${robotoMono.className}`} href="">Plans</Link>
                        <Link className={`${classes.link} ${robotoMono.className}`} href="">Contacts</Link>
                        <Link className={`${classes.link} ${robotoMono.className}`} href="">About</Link>
                        <Link className={`${classes.link} ${robotoMono.className}`} href="">Login</Link>
                        <Link
                            className={`${classes.navBotton} ${robotoMono.className}`}
                            href=""
                        >
                            Register
                        </Link>
                    </div>
                }
            </div>

        </nav>
    );
};