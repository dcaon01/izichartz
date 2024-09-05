import DesktopToolbar from "./DesktopToolbar";

export default function Toolbar({ projectName, id }) {
    return (
        <>
            <DesktopToolbar projectName={projectName} id={id}/>
        </>
    );
}

