import { robotoMono } from "@/app/fonts.js";
import general from "@/app/general.module.css"
import classes from "./ManagePage.module.css";
import ProjectsGrid from "@/components/workspace/ProjectsGrid";

/** 
 * Sei hai problemi con layout vari perché in workspace voi fare 
 * diverse pagine, metti dopo [user] un (privateArea) che sarà fratello di editor,
 * in modo da poter aggiungere un layout per tutte le pagine.
 */
export default function ManagePage() {
    return (
        <main>
            <div className={general.content}>
                <div className={classes.description}>
                    <h1 className={`${robotoMono.className} ${general.title}`}>
                        Workspace
                    </h1>
                    <p className={`${robotoMono.className}`} style={{textAlign: "center"}}> Manage your projects here:</p>
                </div>
                <ProjectsGrid />
            </div>
        </main>
    );
}

