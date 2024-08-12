import WorkspaceDesktopNavbar from "./WorkspaceDesktopNavbar";
import WorkspaceMobileNavbar from "./WorkspaceMobileNavbar";

/**
 * Sulla falsa riga della Browse Navbar, gestiamo anche
 * la workspace navbar, con dei 
 */
export default function WorkspaceNavbar() {
    
    return (
        <>
            <WorkspaceMobileNavbar />
            <WorkspaceDesktopNavbar />
        </>
    );
}

