'use client';

import classes from "./MobileNavbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import MobileModulesDropdown from "./BrowseMobileModulesDropdown";
import { getCookie } from "cookies-next";
import BlackOpaqueBackGround from "../utility/BlackOpaqueBackGround";

export default function MobileNavbar() {
    let [isMenuDroppedDown, setMenuDropDown] = useState(false);
    let [modulesDropDown, setModulesDropDown] = useState(false);
    let [scope, animate] = useAnimate();
    let [isSessionOn, setIsSessionOn] = useState(false);
    let [username, setUsername] = useState(null);

    function handleMenuDropDown() {
        if (isMenuDroppedDown) {
            setMenuDropDown(false);
            animate("div", { opacity: 0 }, { duration: 0.3 });
        } else {
            setMenuDropDown(true);
        }
    }

    function handleModulesDropDown(event) {
        event.preventDefault();
        if (modulesDropDown) {
            setModulesDropDown(false);
        } else {
            setModulesDropDown(true);
        }
    }

    function animateLinksPresence() {
        animate("div", { opacity: 1 }, { duration: 0.3 });
    }

    function handleMenuDeselection() {
        if (isMenuDroppedDown) {
            animate("div", { opacity: 0 }, { duration: 0.3 });
            setMenuDropDown(false);
            setModulesDropDown(false);
        }
    }

    useEffect(() => {
        const sid = getCookie('sid');
        if (sid) {
            const value = JSON.parse(sid);
            setIsSessionOn(true);
            setUsername(value.username);
        }
    }, []);
    return (
        <>
            <motion.nav
                className={classes.navbar}
                animate={{
                    height: "auto",
                }}
            >
                <div className={classes.headSection}>
                    <Link className={classes.logo} href="/" onClick={handleMenuDeselection}>
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
                                <div className={classes.modulesSelector} onClick={handleModulesDropDown}>
                                    <p className={`${classes.modulesSelectorText}`} style={{ marginRight: 5 }}>Modules</p>
                                    <motion.svg height={10} width={10} xmlns="http://www.w3.org/2000/svg" animate={{ transform: `rotate(${modulesDropDown ? 180 : 0}deg)` }} >
                                        <polygon points="0,0 10,0 5,10" className={classes.modulesSelectorArrow} />
                                    </motion.svg>
                                </div>
                                <AnimatePresence>
                                    {modulesDropDown &&
                                        <MobileModulesDropdown key="modulesDropdown" handler={handleMenuDeselection} />
                                    }
                                    <Link key="plans-link" className={`${classes.link}`} onClick={handleMenuDeselection} href="/plans">Plans</Link>
                                    <Link key="contacts-link" className={`${classes.link}`} onClick={handleMenuDeselection} href="">Contacts</Link>
                                    <Link key="about-link" className={`${classes.link}`} onClick={handleMenuDeselection} href="">About</Link>
                                    {isSessionOn
                                        ?
                                        <Link
                                            key="register-link"
                                            className={`${classes.navBotton}`}
                                            href={`/workspace/${username}`}
                                            onClick={handleMenuDeselection}
                                        >
                                            Workspace
                                        </Link>
                                        :
                                        <>
                                            <Link key="login-link" className={`${classes.link}`} onClick={handleMenuDeselection} href="/authentication/login">Login</Link>
                                            <Link
                                                key="register-link"
                                                className={`${classes.navBotton}`}
                                                href="/authentication/register"
                                                onClick={handleMenuDeselection}
                                            >
                                                Register
                                            </Link>
                                        </>
                                    }
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.nav>
            <AnimatePresence>
                {
                    isMenuDroppedDown &&
                    <BlackOpaqueBackGround funct={handleMenuDeselection} />
                }
            </AnimatePresence>
        </>
    );
};