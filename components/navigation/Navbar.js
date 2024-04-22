'use client';

import { useState } from "react";
import classes from "./Navbar.module.css";
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
            <Image src="/assets/global/logo.png" className={classes.logo} width={176} height={27} alt="Back to Home" />
            <span className={classes.whiteSpace} />
            <div className={classes.links}>
                <div>
                    <button onClick={handleModulesDropDown}>Modules</button>

                </div>
                {modulesDropDown && /* renderizza il dropdown */ null}
                <Link className={`${classes.link} ${robotoMono.className}`} href="">Plans</Link>
                <Link className={classes.link} href="">Contacts</Link>
                <Link className={classes.link} href="">About</Link>
                <Link className={classes.link} href="">Login</Link>
                <Link
                    className={classes.link}
                    href=""
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 15,
                    }}
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}