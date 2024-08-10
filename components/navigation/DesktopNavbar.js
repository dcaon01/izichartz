'use client';

import classes from "./DesktopNavbar.module.css";
import { useState } from "react";
import Link from "next/link";
import { robotoMono } from "@/app/fonts.js";
import { motion, AnimatePresence } from "framer-motion";
import DesktopModulesDropdown from "./DesktopModulesDropdown.js";

export default function DesktopNavbar() {
    let [modulesDropDown, setModulesDropDown] = useState(false);

    function handleModulesDropDown(event) {
        event.preventDefault();
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    let isSessionOn = false;

    function handleRedirect() {
        setModulesDropDown(false);
    }

    /* Redering */
    return (
        <nav className={classes.navbar}>
            <Link className={classes.logo} onClick={handleRedirect} href="/">
                {/* Dimensioni originali: w=878, h=135*/}
                <img src="/assets/global/logo.png" height={30} width={198} alt="Back to Home" />
            </Link>
            {/*<span className={classes.whiteSpace} />*/}
            <div className={classes.links}>
                <div className={classes.modulesSelector} onClick={handleModulesDropDown}>
                    <p className={`${classes.modulesSelectorText} ${robotoMono.className}`} style={{ marginRight: 5 }}>Modules</p>
                    <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                        <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                    </motion.svg>
                    <AnimatePresence>
                        {modulesDropDown &&
                            <DesktopModulesDropdown />
                        }
                    </AnimatePresence>
                </div>
                <Link className={`${classes.link} ${robotoMono.className}`} onClick={handleRedirect} href="">Plans</Link>
                <Link className={`${classes.link} ${robotoMono.className}`} onClick={handleRedirect} href="">Contacts</Link>
                <Link className={`${classes.link} ${robotoMono.className}`} onClick={handleRedirect} href="">About</Link>
                {isSessionOn
                    ?
                    <Link
                        className={`${classes.navBotton} ${robotoMono.className}`}
                        href="/workspace"
                        onClick={handleRedirect}
                    >
                        Workspace
                    </Link>
                    :
                    <>
                        <Link className={`${classes.link} ${robotoMono.className}`} onClick={handleRedirect} href="/authentication/login">Login</Link>
                        <Link
                            className={`${classes.navBotton} ${robotoMono.className}`}
                            href="/authentication/register"
                            onClick={handleRedirect}
                        >
                            Register
                        </Link>
                    </>
                }
            </div>
        </nav>
    );
}