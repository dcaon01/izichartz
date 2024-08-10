import BrowseDesktopNavbar from "./BrowseDesktopNavbar";
import BrowseMobileNavbar from "./BrowseMobileNavbar";

/**
 * Navbar
 * Componente che si occupa della renderizzazione condizionata del tipo di navbar
 * da mostrare in base al formato della pagina.
 * @returns 
 */
export default function BrowseNavbar() {

    return (
        <>
            <BrowseMobileNavbar />
            <BrowseDesktopNavbar />
        </>
    );
}