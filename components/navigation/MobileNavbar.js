'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
            <Link className={classes.logo} href="/">
                {/* Dimensioni originali: w=878, h=135*/}
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
        </nav>
    );
};