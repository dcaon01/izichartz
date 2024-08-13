'use client';

import classes from "./DesktopNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { robotoMono } from "@/app/fonts.js";
import { motion, AnimatePresence } from "framer-motion";
import WorkspaceDesktopDropdown from "./WorkspaceDesktopDropdown.js";
import NewProject from "../workspace/NewProject";

export default function WorkspaceDesktopNavbar() {
    let [modulesDropDown, setModulesDropDown] = useState(false);
    let [modal, setModal] = useState(false);

    function handleModulesDropDown(event) {
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    function handleRedirect() {
        setModulesDropDown(false);
    }

    function handleModal() {
        setModulesDropDown(false);
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }

    return (
        <>
            <nav className={classes.navbar}>
                <Link className={classes.logo} onClick={handleRedirect} href="/">
                    {/* Dimensioni originali: w=878, h=135*/}
                    <img src="/assets/global/logo.png" height={30} width={198} alt="Back to Home" />
                </Link>
                <div className={classes.links2}>
                    <Link className={`${classes.link} ${robotoMono.className}`} onClick={handleRedirect} href="/">Back Home</Link>
                    <div className={classes.modulesSelector} onClick={handleModulesDropDown}>
                        <p className={`${classes.modulesSelectorText} ${robotoMono.className}`} style={{ marginRight: 5 }}>Account</p>
                        <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                            <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                        </motion.svg>
                        <AnimatePresence>
                            {modulesDropDown &&
                                <WorkspaceDesktopDropdown />
                            }
                        </AnimatePresence>
                    </div>
                    <button
                        className={`${classes.navBotton} ${robotoMono.className}`}
                        onClick={handleModal}
                    >
                        New Project
                    </button>
                </div>
            </nav>
            {modal && <NewProject funct={handleModal}/>}
        </>
    );
}

