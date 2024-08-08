import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { cookies } from "next/headers";

/**
 * Navbar
 * Componente che si occupa della renderizzazione condizionata del tipo di navbar
 * da mostrare in base al formato della pagina.
 * @returns 
 */
export default function Navbar() {
    let sid = cookies().get("sid");
    let isSessionOn = false;

    if(sid) {
        isSessionOn=true;
    }

    return (
        <>
            <MobileNavbar session={isSessionOn}/>
            <DesktopNavbar session={isSessionOn}/>
        </>
    );
}