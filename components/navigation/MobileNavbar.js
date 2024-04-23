'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { robotoMono } from "@/app/fonts.js";

export default function () {
    let [isMenuDroppedDown, setMenuDropDown] = useState(false);

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
                <button
                    className={classes.menu}
                    onClick={handleMenuDropDown}
                >
                    {
                        isMenuDroppedDown
                            ?
                            <img
                                src="/assets/global/crossed-menu.png"
                                height={29}
                                width={29}
                                alt="Close Menu"
                            />
                            :
                            <img
                                src="/assets/global/hamburger-menu.png"
                                alt="Menu"
                                height={29}
                                width={29}
                            />
                    }
                </button>
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
        </nav>
    );
};