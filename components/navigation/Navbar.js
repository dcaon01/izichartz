'use client';

import classes from "./Navbar.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { robotoMono } from "@/app/fonts.js";

export default function Navbar() {
    let [modulesDropDown, setModulesDropDown] = useState(false);

    function handleModulesDropDown() {
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    return (
        <nav className={classes.navbar}>
            <Link className={classes.logo} href="/">
                {/* Dimensioni originali: w=878, h=135*/}
                <img src="/assets/global/logo.png" height={30} width={198} alt="Back to Home" />
            </Link>
            {/*<span className={classes.whiteSpace} />*/}
            <div className={classes.links}>
                <div>
                    <button onClick={handleModulesDropDown} className={`${classes.link} ${robotoMono.className}`}>Modules</button>
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