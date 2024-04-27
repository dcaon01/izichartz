'use client';

import classes from "./DesktopNavbar.module.css";
import { useState } from "react";
import Link from "next/link";
import { robotoMono } from "@/app/fonts.js";
import { useAnimate, motion } from "framer-motion";

export default function Navbar() {
    let [modulesDropDown, setModulesDropDown] = useState(false);
    const [scope, animate] = useAnimate();

    function handleModulesDropDown(event) {
        event.preventDefault();
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    /* Redering */
    return (
        <nav className={classes.navbar}>
            <Link className={classes.logo} href="/">
                {/* Dimensioni originali: w=878, h=135*/}
                <img src="/assets/global/logo.png" height={30} width={198} alt="Back to Home" />
            </Link>
            {/*<span className={classes.whiteSpace} />*/}
            <div className={classes.links}>
                <div className={classes.modulesSelector} onClick={handleModulesDropDown} ref={scope}>
                    <p className={`${classes.modulesSelectorText} ${robotoMono.className}`} style={{ marginRight: 5 }}>Modules</p>
                    <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                        <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                    </motion.svg>
                </div>
                {modulesDropDown && /* renderizza il dropdown */ null}
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
        </nav>
    );
}