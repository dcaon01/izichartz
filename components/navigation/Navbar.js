import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

/**
 * Navbar
 * Componente che si occupa della renderizzazione condizionata del tipo di navbar
 * da mostrare in base al formato della pagina.
 * @returns 
 */
export default function Navbar() {
    return (
        <>
            <MobileNavbar />
            <DesktopNavbar />
        </>
    );
}