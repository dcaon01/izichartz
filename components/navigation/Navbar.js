'use client';

import { useEffect, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar.js";

/**
 * Navbar
 * Componente che si occupa della renderizzazione condizionata del tipo di navbar
 * da mostrare in base al formato della pagina.
 * @returns 
 */
export default function Navbar() {
    let [isMobile, setIsMobile] = useState(false);

    function handleIsMobile(event) {
        if (document.documentElement.clientWidth < 700) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleIsMobile);
        if (document.documentElement.clientWidth < 700) {
            setIsMobile(true);
        }

    }, []);

    return (
        <>
            {
                isMobile
                    ? <MobileNavbar />
                    : <DesktopNavbar />
            }
        </>
    );
}