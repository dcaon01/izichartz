'use client';

import { usePathname } from "next/navigation";
import Navbar from "../navigation/Navbar.js";

/**
 * Header
 * Compomemte che si occupa della gestione generale dell'header delle pagine in base al
 * path in cui ci troviamo. Tutti i path avranno la navbar tranne quello del progetto, 
 * poiché non 
 * @returns 
 */
export default function Header() {
    let path = usePathname();

    return (
        <header>
            {path.startsWith("/workspace/editor/")
                ? null
                : <Navbar />
            }
        </header>
    );
}

