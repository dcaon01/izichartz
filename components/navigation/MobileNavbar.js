'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { robotoMono } from "@/app/fonts.js";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileNavbar() {
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
                <div className={classes.menu} onClick={handleMenuDropDown}>
                    <span className={`${classes.line1} ${isMenuDroppedDown && classes.toggleLine1}`}/>
                    <span className={`${isMenuDroppedDown && classes.toggleLine2}`}/>
                    <span className={`${classes.line3} ${isMenuDroppedDown && classes.toggleLine3}`}/>
                </div>
                <AnimatePresence>
                {
                    isMenuDroppedDown &&
                    <motion.div className={classes.links}
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: "auto"
                        }}
                        exit={{
                            height: 0
                        }}
                    >
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
                    </motion.div>
                }
                </AnimatePresence>
            </div>

        </nav>
    );
};