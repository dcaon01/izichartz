'use client'

import { robotoMono } from "@/app/fonts";
import classes from "./ProjectName.module.css";
import { useState } from "react";
import RenameProject from "@/components/workspace/RenameProject";

/**
 * ProjectName
 * Componente che si occupa della renderizzazione del nome del progetto e 
 * della sua ridenominazione.
 * @param name nome del progetto 
 */
export default function ProjectName({ name }) {
    let [isRenaming, setIsRenaming] = useState(false);

    /**
     * handleRenaming
     * Funzione di gestione dell'evento OnClick sul componente che triggera
     * la renderizzazione del modale per la ridenominazine del progetto.
     * @param event 
     */
    function handleRenaming() {
        if (isRenaming) {
            setIsRenaming(false);
        } else {
            setIsRenaming(true);
        }
    }

    return (
        <>
            <div className={classes.projectName} >
                <p className={`${robotoMono.className} ${classes.name}`}>{name}&nbsp;</p>
                <img onClick={handleRenaming} className={classes.pen} src="/assets/global/pen.png" width={15} height={15} />
            </div>
            {isRenaming && <RenameProject name={name} funct={handleRenaming} />}
        </>
    );
}