'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { useState } from "react";
import { robotoMono } from "@/app/fonts.js";
import { AnimatePresence, motion, useAnimate } from "framer-motion";

export default function MobileNavbar() {
    let [isMenuDroppedDown, setMenuDropDown] = useState(false);
    let [scope, animate] = useAnimate();

    function handleMenuDropDown() {
        if (isMenuDroppedDown) {
            setMenuDropDown(false);
            animate("div", { opacity: 0 }, { duration: 0.3 });
        } else {
            setMenuDropDown(true);
        }
    }

    function animateLinksPresence() {
        animate("div", { opacity: 1 }, { duration: 0.3 });
    }

    return (
        <nav
            className={classes.navbar}
            style={{ 
                height: "auto",
            }}
        >
            <div className={classes.headSection}>
                <Link className={classes.logo} href="/">
                    {/* Dimensioni originali: w=181, h=135*/}
                    <img src="/assets/global/logo-mobile.png" height={30} width={41} alt="Back to Home" />
                </Link>
                <div className={classes.menu} onClick={handleMenuDropDown}>
                    <span className={`${classes.line1} ${isMenuDroppedDown && classes.toggleLine1}`} />
                    <span className={`${isMenuDroppedDown && classes.toggleLine2}`} />
                    <span className={`${classes.line3} ${isMenuDroppedDown && classes.toggleLine3}`} />
                </div>
            </div>
            <AnimatePresence wait>
                {
                    isMenuDroppedDown &&
                    <motion.div 
                        initial={{
                            margin: 0,
                            height: 0,
                        }}
                        animate={{
                            margin: 20,
                            height: "auto",
                        }}
                        exit={{
                            margin: 0,
                            height: 0,
                        }}
                        onAnimationComplete={animateLinksPresence}
                        ref={scope}
                    >
                        <div className={classes.links} style={{ opacity: 0 }}>
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
                    </motion.div>
                }
            </AnimatePresence>
        </nav>
    );
};